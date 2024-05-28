import { sdkService } from '@commercetool/sdk.service';
import { Category } from '@commercetools/platform-sdk';
import { ProductCategory } from '@models/index';

export function convertCentsToDollarsString(num: number, fractionDigits = 2): string {
  const divisor = 10 ** fractionDigits;
  const result = num / divisor;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(result);
}

export function simplifyCategories(categories: Category[]): CategoryList {
  const customCategories = categories.reduce((acc, result) => {
    acc[result.id] = {
      name: result.name['en-US'],
      id: result.id,
      slug: [result.slug['en-US']],
      children: {} as CategoryList,
      parent: result.parent?.id || '',
    };
    return acc;
  }, {} as CategoryList);

  categories.forEach(category => {
    if (category.parent) {
      customCategories[category.id].slug = [
        ...customCategories[category.parent.id].slug,
        ...customCategories[category.id].slug,
      ];
    }
  });

  return customCategories;
}

export function prepareProductSlugs(categories: CategoryList, productCategories: ProductCategory[]) {
  const slugs: string[][] = [];

  productCategories.forEach(cat => {
    slugs.push(categories[cat.id].slug);
  });

  const result: string[] = slugs.reduce((acc, curr) => {
    return curr.length > acc.length ? curr : acc;
  }, [] as string[]);

  return result;
}

export async function getSortedProducts(quantity: number) {
  const prods = await sdkService.getProducts();
  prods.sort((a, b) => new Date(a.lastModifiedAt).getTime() - new Date(b.lastModifiedAt).getTime());
  return prods.slice(0, quantity);
}

export async function getCategories() {
  const data = await sdkService.getCategories();
  const preparedData = simplifyCategories(data);
  return preparedData;
}

export interface CustomCategory {
  name: string;
  id: string;
  slug: string[];
  children: CategoryList;
  parent: string;
}

export interface CategoryList {
  [key: string]: CustomCategory;
}
