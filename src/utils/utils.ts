import { BaseAddress, Category, ProductProjection } from '@commercetools/platform-sdk';
import { CategoryList, ProductCategory } from '@models/index';

export function isNotNullable<T>(value: T): NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Not expected value`);
  }
  return value;
}

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

export function dateSorting(productsArray: ProductProjection[]) {
  return productsArray.sort((a, b) => new Date(a.lastModifiedAt).getTime() - new Date(b.lastModifiedAt).getTime());
}

export function findAddresses(addresses: BaseAddress[], neededIds: string[] | undefined) {
  if (neededIds) {
    const newAddresses = addresses.filter(address => neededIds.includes(isNotNullable(address.id)));
    return newAddresses;
  }
  return [];
}
