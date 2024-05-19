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
