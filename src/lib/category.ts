import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Category } from "@/types/category";

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  const q = query(collection(db, "categories"), orderBy("name", "asc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Category, "id">),
  }));
};

// Add a category and optionally refresh Zustand store
export const addCategory = async (category: Category): Promise<void> => {
  try {
    await addDoc(collection(db, "categories"), {
      ...category,
      isActive: category.isActive ?? true,
      createdAt: serverTimestamp(),
    });

    // Automatically refresh Zustand store after adding
    const loadCategories = useCategoryStore.getState().loadCategories;
    if (loadCategories) {
      await loadCategories(true);
    }
  } catch (err) {
    console.error("Error adding category:", err);
    throw err; // rethrow if modal/page wants to handle it too
  }
};
