import { Filters, SearchSettings } from '@models/index';

export const CustomErrors = {
  SERVER_ERROR: 'Sorry, there is error with server response',
};

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

export const defaultPriceBorder = ['5.99', '100.00'];

export const searchIdentifier = 'text.en-US';

export const defaultSearch: SearchSettings = {
  'text.en-US': '',
  fuzzy: true,
  fuzzyLevel: 0,
};
