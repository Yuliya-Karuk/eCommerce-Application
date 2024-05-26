import { AttributeEnumType, AttributeSetType, Category, ProductType } from '@commercetools/platform-sdk';
import { CategoryList } from '@models/index';

export function isNotNullable<T>(value: T): NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Not expected value`);
  }
  return value;
}

export function convertCentsToDollarsString(num: number, fractionDigits = 2): string {
  const divisor = 10 ** fractionDigits;
  const result = num / divisor;

  return result.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

// export function prepareCategories(types: ProductType[]): CategoryList {
//   const customCategories = types.reduce(
//     (acc, result) => {
//       acc[result.name.toLowerCase()] = {
//         name: result.name,
//         id: `"${result.id}"`,
//       };
//       return acc;
//     },
//     {} as { [key: string]: { name: string; id: string } }
//   );

//   customCategories.all = {
//     name: 'All Products',
//     id: types.map(oneType => `"${oneType.id}"`).join(','),
//   };

//   return customCategories;
// }

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
