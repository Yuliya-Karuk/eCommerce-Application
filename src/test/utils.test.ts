import { Category } from '@commercetools/platform-sdk';
import { assertValue, convertCentsToDollarsString, isNotNullable, simplifyCategories } from '@utils/utils';

describe('Utility Functions', () => {
  it('throws an error for null or undefined value', () => {
    expect(() => isNotNullable(null)).toThrow();
    expect(() => isNotNullable(undefined)).toThrow();
  });

  it('returns the value for a non-null, non-undefined value', () => {
    const value = 'test';
    expect(isNotNullable(value)).toBe(value);
  });

  it('throws an error for null or undefined value', () => {
    expect(() => assertValue(null, 'Test error')).toThrowError('Test error');
    expect(() => assertValue(undefined, 'Test error')).toThrowError('Test error');
  });

  it('does not throw an error for a non-null, non-undefined value', () => {
    const value = 'test';
    expect(() => assertValue(value, 'Test error')).not.toThrow();
  });

  it('correctly converts cents to dollars string', () => {
    const dollars = convertCentsToDollarsString(1000);

    expect(dollars).toBe('$10.00');
  });

  it('simplifyCategories should return custom categories', () => {
    const categories: Category[] = [
      {
        id: '1',
        name: { 'en-US': 'Category 1' },
        slug: { 'en-US': 'category-1' },
        version: 0,
        createdAt: '',
        lastModifiedAt: '',
        ancestors: [],
        orderHint: '',
      },
      {
        id: '2',
        name: { 'en-US': 'Category 2' },
        slug: { 'en-US': 'category-2' },
        version: 0,
        createdAt: '',
        lastModifiedAt: '',
        ancestors: [],
        orderHint: '',
      },
    ];
    const result = simplifyCategories(categories);
    expect(result).toHaveProperty('1');
    expect(result).toHaveProperty('2');
    expect(result['1'].name).toEqual('Category 1');
    expect(result['2'].name).toEqual('Category 2');
  });

  // const mockProductTypes: ProductType[] = [
  //   {
  //     id: '1',
  //     name: 'Product Type 1',
  //     attributes: [
  //       { name: 'brand', type: { elementType: { values: [{ key: 'brand-a', label: { 'en-US': 'Brand A' } }] } } },
  //       { name: 'size', type: { elementType: { values: [{ key: 'size-m', label: { 'en-US': 'Size M' } }] } } },
  //       { name: 'color', type: { elementType: { values: [{ key: 'color-red', label: { 'en-US': 'Color Red' } }] } } },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     name: 'Product Type 2',
  //     attributes: [
  //       { name: 'brand', type: { elementType: { values: [{ label: { 'en-US': 'Brand B' } }] } } },
  //       { name: 'size', type: { elementType: { values: [{ label: { 'en-US': 'Size L' } }] } } },
  //       { name: 'color', type: { elementType: { values: [{ label: { 'en-US': 'Color Blue' } }] } } },
  //     ],
  //   },
  // ];

  // it('prepareBrands should return unique brands', () => {
  //   const brands = prepareBrands(mockProductTypes);
  //   expect(brands).toEqual(['Brand A', 'Brand B']);
  // });

  // it('prepareSizes should return unique sizes', () => {
  //   const sizes = prepareSizes(mockProductTypes);
  //   expect(sizes).toEqual(['Size M', 'Size L']);
  // });

  // it('prepareColors should return unique colors', () => {
  //   const colors = prepareColors(mockProductTypes);
  //   expect(colors).toEqual(['Color Red', 'Color Blue']);
  // });

  // it('prepareProductSlugs should return slugs from categories', () => {
  //   const categories: CategoryList = {
  //     '1': { id: '1', slug: ['category-1', 'category-1-sub'], name: 'Category 1', parent: '' },
  //     '2': { id: '2', slug: ['category-2'], name: 'Category 2', parent: '' },
  //   };
  //   const productCategories: ProductCategory[] = [
  //     {
  //       id: '1',
  //       typeId: '',
  //     },
  //     {
  //       id: '2',
  //       typeId: '',
  //     },
  //   ];
  //   const slugs = prepareProductSlugs(categories, productCategories);
  //   expect(slugs).toEqual(['category-1', 'category-1-sub', 'category-2']);
  // });

  // it('prepareFilters should return valid filters', () => {
  //   const filters = prepareFilters({ brands: ['Brand A'], sizes: ['Size M'], color: ['Color Red'], price: [] }, '1');
  //   expect(filters).toEqual([
  //     'categories.id:"1"',
  //     'variants.attributes.brand.key:"Brand A"',
  //     'variants.attributes.size.key:"Size M"',
  //     'variants.attributes.color.key:"Color Red"',
  //   ]);
  // });

  // it('prepareQuery should return valid query parameters', () => {
  //   const queryParams = new URLSearchParams('brand=Brand A&size=Size M&color=Color Red');
  //   const filters = prepareQuery(queryParams, { brands: [], sizes: [], color: [], price: [] });
  //   expect(filters).toEqual({ brands: ['Brand A'], sizes: ['Size M'], color: ['Color Red'], price: [] });
  // });
});
