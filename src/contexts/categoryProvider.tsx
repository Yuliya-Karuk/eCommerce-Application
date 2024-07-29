import { sdkService } from '@commercetool/sdk.service';
import { Category, CategoryReference } from '@commercetools/platform-sdk';
import { CategoryList } from '@models/index';
import { startCategory } from '@utils/constants';
import { simplifyCategories } from '@utils/utils';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { useToast } from './toastProvider';

interface CategoryContextValue {
  catalogCategories: CategoryList;
  categories: Category[];
  checkCatalogRoute: (urlSlugs: (string | undefined)[]) => boolean;
  checkProductRoute: (urlSlugs: (string | undefined)[], productCategories: CategoryReference[]) => boolean;
}

const CategoryContext = createContext<CategoryContextValue>({} as CategoryContextValue);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [catalogCategories, setCatalogCategories] = useState<CategoryList>({});
  const initialized = useRef(false);
  const { errorNotify } = useToast();

  const checkCatalogRoute = (urlSlugs: (string | undefined)[]) => {
    const urlSlug = urlSlugs.filter(el => el !== undefined).join('/');
    const isExists = Object.values(catalogCategories).filter(el => el.slug.join('/') === urlSlug);
    return isExists.length !== 0;
  };

  const checkProductRoute = (urlSlugs: (string | undefined)[], productCategories: CategoryReference[]) => {
    const slugs: string[] = [];
    productCategories.forEach(prodCat => {
      const slug = categories.filter(cat => cat.id === prodCat.id)[0].slug['en-US'];
      slugs.push(slug);
    });

    const preparedUrlSlugs = urlSlugs.filter(el => el !== undefined);

    const isExist = !!Object.values(catalogCategories).find(el => el.slug.join('/') === preparedUrlSlugs.join('/'));
    const isRight = preparedUrlSlugs.sort().toString() === slugs.sort().toString();
    return isExist && isRight;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await sdkService.getCategories();
        setCategories(data);

        const preparedData = simplifyCategories(data);
        preparedData.default = startCategory;
        setCatalogCategories(preparedData);
      } catch (e) {
        errorNotify((e as Error).message);
      }
    };

    // fetchCategories();
    if (!initialized.current) {
      initialized.current = true;
      fetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, catalogCategories, checkCatalogRoute, checkProductRoute }}>
      {children}
    </CategoryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCategories = () => {
  const context = useContext(CategoryContext);

  if (context === undefined) {
    throw new Error('useCategories hook must be used within a CategoriesProvider');
  }

  return context;
};
