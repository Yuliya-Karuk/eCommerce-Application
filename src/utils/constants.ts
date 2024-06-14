import { BaseAddress } from '@commercetools/platform-sdk';
import { Country, Filters, SearchSettings, SortSettings } from '@models/index';

export const CustomErrors = {
  SERVER_ERROR: 'Sorry, there is error with server response',
};

export const SuccessLoginMessage = 'Congratulations, you have successfully logged in!';

export const SuccessUpdateDataMessage = 'Congratulations, your profile was successfully updated!';

export const SuccessUpdatePasswordMessage = 'Congratulations, your password was successfully updated!';

export const SuccessNewAddressMessage = 'Congratulations, your new address was successfully added!';

export const SuccessChangeAddressMessage = 'Congratulations, your address was successfully updated!';

export const SuccessRemoveAddressMessage = 'Congratulations, your address was successfully deleted!';

export const NothingFoundByFiltering = "Sorry, we didn't find any products that meet your criteria.";

export const promoCodeBanner =
  "Enjoy 10% off with our summer promo code SUMMER2024, or get 15% off your first order with promo code FIRST! Don't miss out on these great deals!";

export const ProductAddToCart = 'The product has been successfully added to your cart!';

export const ProductRemoveFromCart = 'The product has been successfully removed from your cart!';

export const countries: Country[] = [
  {
    name: 'Germany',
    code: 'DE',
    postalCodePattern: /^[0-9]{5}$/,
    validationMessage: 'Postal code format for Germany - 5 digits',
  },
  {
    name: 'Belarus',
    code: 'BY',
    postalCodePattern: /^[0-9]{6}$/,
    validationMessage: 'Postal code format for Belarus - 6 digits',
  },
  {
    name: 'Poland',
    code: 'PL',
    postalCodePattern: /^[0-9]{2}-[0-9]{3}$/,
    validationMessage: 'Postal code format for Poland - 2 digits, dash, 3 digits',
  },
];

export const defaultAddress: BaseAddress = {
  id: 'no_id',
  country: '',
  postalCode: '',
  city: '',
  streetName: '',
};

export interface AddAddressActions {
  isShipping: 'addShippingAddressId';
  isBilling: 'addBillingAddressId';
}

export enum AddressesTypes {
  isShipping = 'isShipping',
  isBilling = 'isBilling',
}

export const addAddressActions: AddAddressActions = {
  isShipping: 'addShippingAddressId',
  isBilling: 'addBillingAddressId',
};

export interface SetDefaultAddressActions {
  isShipping: 'setDefaultShippingAddress';
  isBilling: 'setDefaultBillingAddress';
}

export const setDefaultAddressActions: SetDefaultAddressActions = {
  isShipping: 'setDefaultShippingAddress',
  isBilling: 'setDefaultBillingAddress',
};

export type UpdateAddressActions =
  | 'addAddress'
  | 'changeAddress'
  | 'addShippingAddressId'
  | 'addBillingAddressId'
  | 'setDefaultShippingAddress'
  | 'setDefaultBillingAddress'
  | 'removeAddress';

export const startCategory = {
  name: 'All Products',
  id: '',
  slug: [''],
  children: {},
  parent: '',
};

export const defaultFilter: Filters = {
  brands: [],
  color: [],
  sizes: [],
  price: [],
};

export const defaultPriceLimits = ['5.99', '100.00'];

export const searchIdentifier = 'text.en-US';

export const defaultSearch: SearchSettings = {
  'text.en-US': '',
  fuzzy: true,
  fuzzyLevel: 1,
};

export const defaultSort: SortSettings = {
  sort: '',
};

export const ColorsHex: { [key: string]: string } = {
  Bronze: '#845b32',
  Brown: '#492201',
  Burgundy: '#590016',
  Green: '#464e3c',
  Gray: '#808080',
  Blue: '#697f8b',
};

export type SizeKey = 'S' | 'M' | 'L';

export const sizeDescriptions: Record<SizeKey, string> = {
  S: 'Small',
  M: 'Medium',
  L: 'Large',
};
