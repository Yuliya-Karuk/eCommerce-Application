export interface LoginFormData {
  email: string;
  password: string;
}

export interface ProductCategory {
  id: string;
  typeId: string;
}

export interface CustomCategory {
  name: string;
  id: string;
  slug: string[];
  children: CategoryList;
  parent: string;
}

export interface CategoryList {
  [key: string]: CustomCategory;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface Country {
  name: string;
  code: string;
  postalCodePattern: RegExp;
  validationMessage: string;
}
