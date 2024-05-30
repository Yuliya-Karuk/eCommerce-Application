import { RegisterOptions } from 'react-hook-form';

export const InputPasswordErrors: { [key: string]: string } = {
  required: 'Password is required',
  minLength: 'Password must be at least 8 characters long',
  uppercase: 'Password must contain at least one uppercase letter (A-Z)',
  lowercase: 'Password must contain at least one lowercase letter (a-z)',
  digit: 'Password must contain at least one digit (0-9)',
  specialChar: 'Password must contain at least one special character (e.g., !@#$%^&*)',
  noWhitespace: 'Password cannot contain leading or trailing whitespace',
};

export const InputEmailErrors: { [key: string]: string } = {
  required: 'E-mail is required',
  pattern: 'Invalid e-mail format',
};

export const InputNameErrors: { [key: string]: string } = {
  required: 'This field is required',
  pattern: 'Only Latin letters are allowed',
};

export const InputDateErrors: { [key: string]: string } = {
  required: 'This field is required',
  minAge: 'You must be 13 years old or older',
};

export const validEmailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const onlyLatinLettersRegExp = /^[A-Za-z]+$/;

export const passwordValidationRules: RegisterOptions = {
  required: InputPasswordErrors.required,
  minLength: { value: 8, message: InputPasswordErrors.minLength },
  validate: {
    uppercase: value => /(?=.*[A-Z])/.test(value) || InputPasswordErrors.uppercase,
    lowercase: value => /(?=.*[a-z])/.test(value) || InputPasswordErrors.lowercase,
    digit: value => /(?=.*\d)/.test(value) || InputPasswordErrors.digit,
    specialChar: value => /(?=.*[!@#$%^&*])/.test(value) || InputPasswordErrors.specialChar,
    noWhitespace: value => !/\s/.test(value) || InputPasswordErrors.noWhitespace,
  },
};

export const emailValidationRules: RegisterOptions = {
  required: InputEmailErrors.required,
  pattern: {
    value: validEmailRegExp,
    message: InputEmailErrors.pattern,
  },
};

export const nameValidationRules: RegisterOptions = {
  required: InputNameErrors.required,
  pattern: {
    value: onlyLatinLettersRegExp,
    message: InputNameErrors.pattern,
  },
};

export const dateValidationRules: RegisterOptions = {
  required: InputDateErrors.required,
  validate: value => {
    const dateOfBirth = new Date(value);
    const minAgeDate = new Date();
    minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);

    return dateOfBirth <= minAgeDate || InputDateErrors.minAge;
  },
};
