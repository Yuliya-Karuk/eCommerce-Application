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

export interface ProductCategory {
  id: string;
  typeId: string;
}

export interface FiltersProps {
  values: string[];
  name: string;
  filters: Filters;
  setFilters: (data: Filters) => void;
}

export interface Filters {
  [key: string]: string[];
}

export interface SearchSettings {
  'text.en-US': string;
  fuzzy: boolean;
  fuzzyLevel: number;
}

export interface QueryParams {
  filter: string[];
  'text.en-US'?: string;
  fuzzy?: boolean;
  fuzzyLevel?: number;
}
