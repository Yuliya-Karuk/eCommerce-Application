import {
  Attribute,
  AttributeEnumType,
  AttributeSetType,
  BaseAddress,
  Category,
  Image,
  LineItem,
  MyCustomerUpdateAction,
  ProductProjection,
  ProductType,
} from '@commercetools/platform-sdk';
import { ProductAttributes } from '@components/ProductAttributes/ProductAttributesView';
import {
  CategoryList,
  CustomCategory,
  Filters,
  ProductCategory,
  QueryParams,
  SearchSettings,
  SortSettings,
} from '@models/index';
import { RegisterOptions } from 'react-hook-form';
import { ReactImageGalleryItem } from 'react-image-gallery';
import { countries, searchIdentifier, UpdateAddressActions } from './constants';

export function isNotNullable<T>(value: T, errorMessage?: string): NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(errorMessage || 'Not expected value');
  }
  return value;
}

/**
 * Checks if a value is present and throws an error if the value is missing.
 * @param value - The value to check.
 * @param errorMessage - The error message to throw if the value is missing.
 * @throws {Error} - Throws an error with the specified message.
 */
export function assertValue<T>(value: T | undefined | null, errorMessage: string): asserts value is T {
  if (value === undefined || value === null) {
    throw new Error(errorMessage);
  }
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

export function prepareQueryParams(
  filters: Filters,
  categoryId: string,
  searchSettings: SearchSettings,
  sortSettings: SortSettings
) {
  const preparedFilters = prepareFilters(filters, categoryId);
  let queryParams: QueryParams = {
    filter: [...preparedFilters],
  };

  if (searchSettings[searchIdentifier] !== '') {
    queryParams = {
      ...queryParams,
      ...searchSettings,
    };
  }

  if (sortSettings.sort !== '') {
    queryParams = {
      ...queryParams,
      ...sortSettings,
    };
    if (sortSettings.sort === 'price asc' || sortSettings.sort === 'price desc') {
      queryParams.currencyCode = 'USD';
    }
  }

  return queryParams;
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
interface KeyValue {
  key: string;
  label: string;
}

export interface MyAttribute {
  name: keyof ProductAttributes;
  value: string[] | KeyValue[];
}

export function convertProductAttributesArrayToObject(attributesArray: Attribute[] | undefined): ProductAttributes {
  if (attributesArray === undefined) {
    throw new Error('error: attributes array is undefined');
  }
  const result: ProductAttributes = {
    details: '',
  };
  attributesArray.forEach(item => {
    const { name, value } = item as MyAttribute;
    const [firstValue] = value;
    if (typeof firstValue === 'string') {
      result[name] = firstValue;
    } else {
      result[name] = firstValue.label;
    }
  });
  return result;
}

export function convertImagesToReactImageGalleryItems(
  items: Image[] | undefined,
  isFullScreen: boolean,
  nonFullScreenStyles: string
): ReactImageGalleryItem[] {
  const imageGallery: ReactImageGalleryItem[] = [];
  items?.forEach(image => {
    const slideItem: ReactImageGalleryItem = {
      original: image.url,
      thumbnail: image.url,
      originalClass: isFullScreen ? '' : nonFullScreenStyles,
    };
    imageGallery.push(slideItem);
  });
  return imageGallery;
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

export function sumQuantities(items: LineItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}
