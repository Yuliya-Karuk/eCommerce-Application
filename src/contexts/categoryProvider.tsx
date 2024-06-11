import { sdkService } from '@commercetool/sdk.service';
import { Category, CategoryReference } from '@commercetools/platform-sdk';
import { CategoryList } from '@models/index';
import { startCategory } from '@utils/constants';
import { simplifyCategories } from '@utils/utils';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useToast } from './toastProvider';

interface CategoryContextValue {
  catalogCategories: CategoryList;
  categories: Category[];
  checkCatalogRoute: (urlSlugs: (string | undefined)[], data: CategoryList) => boolean;
  checkProductRoute: (urlSlugs: (string | undefined)[], productCategories: CategoryReference[]) => boolean;
}

const CategoryContext = createContext<CategoryContextValue>({} as CategoryContextValue);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [catalogCategories, setCatalogCategories] = useState<CategoryList>({});

  const { errorNotify } = useToast();

  const checkCatalogRoute = (urlSlugs: (string | undefined)[], data: CategoryList) => {
    const urlSlug = urlSlugs.filter(el => el !== undefined).join('/');
    const isExists = Object.values(data).filter(el => el.slug.join('/') === urlSlug);
    return isExists.length !== 0;
  };

  const checkProductRoute = (urlSlugs: (string | undefined)[], productCategories: CategoryReference[]) => {
    const slugs: string[] = [];
    productCategories.forEach(prodCat => {
      const slug = categories.filter(cat => cat.id === prodCat.id)[0].slug['en-US'];
      slugs.push(slug);
    });

    const preparedUrlSlugs = urlSlugs.filter(el => el !== undefined);

    return preparedUrlSlugs.join('/') === slugs.join('/');

    // const isCategoriesCorrect =
    //   (category === category1Slug && (!subcategory || subcategory === category2Slug)) ||
    //   (category === category2Slug && (!subcategory || subcategory === category1Slug));
    // console.log(slugs);
    // const [category1, category2] = productCategories;
    // const slug1 = categories.filter(cat => cat.id === category1.id)[0].slug['en-US'];
    // const slug2 = categories.filter(cat => cat.id === category2.id)[0].slug['en-US'];
    // return true;
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

    fetchCategories();
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
