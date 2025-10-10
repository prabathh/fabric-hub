import { db } from "./firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
  getDocs,
  getDoc,
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

// Fetch products by CategoryId with pagination
export const fetchProductsByTag = async (
  tagId: string,
  limitCount: number = 10,
  lastDoc: QueryDocumentSnapshot | null = null
): Promise<FetchProductsResult> => {
  try {
    const productsRef = collection(db, "products");

    let q = query(
      productsRef,
      // FIX: Use array-contains to match the tag in the product's tags array
      where("tags", "array-contains", tagId),
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
    console.error("Error fetching products by tag:", err);
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

export const fetchProductById = async (productId: string): Promise<Product | null> => {
    try {
        const productRef = doc(db, "products", productId);
        const docSnap = await getDoc(productRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...(docSnap.data() as Omit<Product, "id">),
            } as Product;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw new Error("Failed to load product data.");
    }
};
