import { QueryDocumentSnapshot } from "firebase/firestore";

export interface ProductStore {
  products: Product[];
  isLoading: boolean;
  lastDoc: QueryDocumentSnapshot | null;
  hasMore: boolean;
  loadProducts: (categoryId: string, forceFetch: boolean) => Promise<void>;
  loadMoreProducts: (categoryId: string) => Promise<void>;
  reset: () => void;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: { id: string; name: string };
  price: number;
  stock: number;
  createdAt?: Date;
  tags?: string[];
  supplier?: string;
}

export interface FetchProductsResult {
  products: Product[];
  lastDoc: QueryDocumentSnapshot | null;
  hasMore: boolean;
}