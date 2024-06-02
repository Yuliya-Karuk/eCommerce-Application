/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BaseAddress, Category, MyCustomerUpdateAction, ProductProjection } from '@commercetools/platform-sdk';
import { CategoryList, ProductCategory } from '@models/index';
import { countries, UpdateAddressActions } from '@utils/constants';
import { RegisterOptions } from 'react-hook-form';

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

export function findNewAddresses(
  addresses: BaseAddress[],
  billingIds: string[] | undefined,
  shippingIds: string[] | undefined
) {
  const billingArr = billingIds === undefined ? [] : billingIds;
  const shippingArr = shippingIds === undefined ? [] : shippingIds;
  const needed = addresses.filter(
    addr => !billingArr.includes(isNotNullable(addr.id)) && !shippingArr.includes(isNotNullable(addr.id))
  );
  return needed[0];
}

export const getPostalCodeValidationRules = (selectedCountry: string): RegisterOptions => {
  const currentCountry = countries.find(country => country.code === selectedCountry);
  if (currentCountry) {
    return {
      required: 'Postal code is required',
      pattern: {
        value: currentCountry.postalCodePattern,
        message: currentCountry.validationMessage,
      },
    };
  }
  return {
    required: 'Postal code is required',
  };
};

export const prepareAddressRequest = (
  action: UpdateAddressActions,
  newAddress: BaseAddress,
  id?: string
): MyCustomerUpdateAction[] => {
  if (action === 'addAddress') {
    return [
      {
        action,
        address: newAddress,
      },
    ];
  }

  if (action === 'changeAddress' && id) {
    return [
      {
        action,
        addressId: id,
        address: newAddress,
      },
    ];
  }

  if (
    action === 'addShippingAddressId' ||
    action === 'addBillingAddressId' ||
    action === 'removeAddress' ||
    (action === 'setDefaultShippingAddress' && id) ||
    (action === 'setDefaultBillingAddress' && id)
  ) {
    return [
      {
        action,
        addressId: id,
      },
    ];
  }

  if ((action === 'setDefaultShippingAddress' || action === 'setDefaultBillingAddress') && !id) {
    return [
      {
        action,
      },
    ];
  }

  throw new Error('There is no such action for change address');
};
