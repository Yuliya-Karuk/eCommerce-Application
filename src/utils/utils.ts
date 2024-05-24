import { AttributeEnumType, AttributeSetType, ProductType } from '@commercetools/platform-sdk';
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

export function prepareCategories(types: ProductType[]): CategoryList {
  const customCategories = types.reduce(
    (acc, result) => {
      acc[result.name.toLowerCase()] = {
        name: result.name,
        id: `"${result.id}"`,
      };
      return acc;
    },
    {} as { [key: string]: { name: string; id: string } }
  );

  customCategories.all = {
    name: 'All Products',
    id: types.map(oneType => `"${oneType.id}"`).join(','),
  };

  return customCategories;
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
