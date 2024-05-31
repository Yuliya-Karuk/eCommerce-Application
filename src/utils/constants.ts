import { BaseAddress } from '@commercetools/platform-sdk';
import { Country } from '@models/index';

export const CustomErrors = {
  SERVER_ERROR: 'Sorry, there is error with server response',
};

export const SuccessLoginMessage = 'Congratulations, you have successfully logged in!';

export const SuccessUpdateDataMessage = 'Congratulations, your profile was successfully updated!';

export const SuccessUpdatePasswordMessage = 'Congratulations, your password was successfully updated!';

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
