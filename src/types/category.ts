export interface CategoryStore {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  loadCategories: (forceFetch?: boolean) => Promise<void>;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
}