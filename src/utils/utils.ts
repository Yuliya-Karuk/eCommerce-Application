import { AttributeEnumType, AttributeSetType, Category, ProductType } from '@commercetools/platform-sdk';
import { CategoryList, CustomCategory, Filters, ProductCategory } from '@models/index';

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

export function prepareCategoryTree(categories: CategoryList) {
  const rootCategories: CategoryList = {};

  Object.entries(categories).forEach(([key, category]) => {
    if (category.parent !== '') {
      rootCategories[category.parent].children[key] = category;
    } else {
      rootCategories[key] = category;
    }
  });

  return rootCategories;
}

export function findCategoryBySlug(categories: CategoryList, path: string): CustomCategory {
  const trimmedPath = path.replace('/catalog/', '');
  let needed = Object.values(categories).find(category => category.slug.join('/') === trimmedPath);
  if (needed === undefined) {
    needed = categories.default;
  }
  return needed;
}

export function prepareBrands(types: ProductType[]): string[] {
  const brands = new Set(
    types.reduce<string[]>((acc, el) => {
      const brandAttribute = isNotNullable(el.attributes).find(attr => attr.name === 'brand');
      if (brandAttribute) {
        const brandValues = ((brandAttribute.type as AttributeSetType).elementType as AttributeEnumType).values.map(
          value => value.label
        );
        acc.push(...brandValues);
      }
      return acc;
    }, [])
  );
  return [...brands];
}

export function prepareSizes(types: ProductType[]): string[] {
  const sizes = new Set(
    types.reduce<string[]>((acc, el) => {
      const brandAttribute = isNotNullable(el.attributes).find(attr => attr.name === 'size');
      if (brandAttribute) {
        const brandValues = ((brandAttribute.type as AttributeSetType).elementType as AttributeEnumType).values.map(
          value => value.label
        );
        acc.push(...brandValues);
      }
      return acc;
    }, [])
  );
  return [...sizes];
}

export function prepareColors(types: ProductType[]): string[] {
  const colors = new Set(
    types.reduce<string[]>((acc, el) => {
      const brandAttribute = isNotNullable(el.attributes).find(attr => attr.name === 'color');
      if (brandAttribute) {
        const brandValues = ((brandAttribute.type as AttributeSetType).elementType as AttributeEnumType).values.map(
          value => value.label
        );
        acc.push(...brandValues);
      }
      return acc;
    }, [])
  );
  return [...colors];
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

export function prepareFilters(filters: Filters, categoryId: string) {
  const filtersArr = [];

  if (categoryId !== '') {
    const categoryString = `categories.id:"${categoryId}"`;
    filtersArr.push(categoryString);
  }

  if (filters.brands.length > 0) {
    const brandString = `variants.attributes.brand.key:${filters.brands.map(el => `"${el}"`).join(',')}`;
    filtersArr.push(brandString);
  }
  if (filters.color.length > 0) {
    const colorString = `variants.attributes.color.key:${filters.color.map(el => `"${el}"`).join(',')}`;
    filtersArr.push(colorString);
  }
  if (filters.sizes.length > 0) {
    const sizeString = `variants.attributes.size.key:${filters.sizes.map(el => `"${el}"`).join(',')}`;
    filtersArr.push(sizeString);
  }
  if (filters.price.length > 0) {
    const priceString = `variants.prices.value.centAmount:range (${filters.price[0] || ''} to ${filters.price[1] || ''})`;
    filtersArr.push(priceString);
  }

  return filtersArr;
}

export function prepareQuery(queryParams: URLSearchParams, filters: Filters) {
  const newFilters = { ...filters };
  Object.keys(filters).forEach(el => {
    const value = queryParams.get(el);
    if (value) {
      newFilters[el] = value.split(',');
    }
  });
  return newFilters;
}

export function generateBreadcrumbsSlugs(slugs: string[]) {
  return slugs.reduce(
    (acc, item, index) => {
      acc[item] = slugs.slice(0, index + 1).join('/');
      return acc;
    },
    {} as { [key: string]: string }
  );
}
