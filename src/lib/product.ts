import { db } from "./firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  QueryDocumentSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useProductStore } from "@/store/useProductStore";
import { Product, FetchProductsResult } from "@/types/product";

// Fetch products by category with pagination
export const fetchProductsByCategory = async (
  categoryId: string,
  limitCount: number = 10,
  lastDoc: QueryDocumentSnapshot | null = null
): Promise<FetchProductsResult> => {
  try {
    const productsRef = collection(db, "products");

    let q = query(
      productsRef,
      where("category.id", "==", categoryId),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);

    const products: Product[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Product, "id">),
    }));

    const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;
    const hasMore = snapshot.docs.length === limitCount;

    return { products, lastDoc: lastVisible, hasMore };
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

// Add a new product and refresh Zustand store internally
export const addProduct = async (product: Product) => {
  try {
    await addDoc(collection(db, "products"), {
      ...product,
      createdAt: serverTimestamp(),
    });

    // Refresh store after adding
    const loadProducts = useProductStore.getState().loadProducts;
    if (loadProducts) {
      await loadProducts(product.category.id, true);
    }
  } catch (err) {
    console.error("Error adding product:", err);
    throw err;
  }
};
