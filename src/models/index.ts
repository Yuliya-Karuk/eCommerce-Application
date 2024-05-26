export interface LoginFormData {
  email: string;
  password: string;
}

export interface CustomCategory {
  name: string;
  id: string;
  slug: string[];
  children: CategoryList;
  parent: string;
}

export type CategoryList = {
  [key: string]: CustomCategory;
};
