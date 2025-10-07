import { db, auth } from "./firebase";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser, updateEmail, User } from "firebase/auth";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { UserRole, UserData, ProfileFormValues } from "@/types/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { extractProfileFields } from "@/helper/utils";

// Fetches the user's role from the 'users' collection using their UID.
export const fetchUser = async (user: User): Promise<UserRole> => {
  const setCurrentUser = useAuthStore.getState().setCurrentUser;
  const userUID = user.uid;
  
  let role: UserRole = "user";
  let profileFields = extractProfileFields({});

  try {
    const docRef = doc(db, "users", userUID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userDataFromDB = docSnap.data();
    
      profileFields = extractProfileFields(userDataFromDB);
      
      const fetchedRole = userDataFromDB.role;
      if (fetchedRole === "super" || fetchedRole === "admin" || fetchedRole === "user") {
        role = fetchedRole;
      }
    }
  } catch (error) {
    console.error("Error fetching user data for UID:", userUID, error);
  }
 
  const userData: UserData = {
    uid: user.uid,
    email: user.email,
    role: role,
    ...profileFields,
  };

  setCurrentUser(userData);
  return role;
};

export const updateUserProfile = async (
    uid: string, 
    data: ProfileFormValues
): Promise<void> => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("No authenticated user found.");
    }

    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phone: data.phone,
        country: data.country,
        city: data.city,
        postalCode: data.postalCode,
    });

    if (user.email !== data.email) {
        await updateEmail(user, data.email);
    }
    
    await fetchUser(user);
};

export const updateUserPassword = async (
    email: string,
    currentPassword: string,
    newPassword: string
): Promise<void> => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("No authenticated user found.");
    }

    const credential = EmailAuthProvider.credential(email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
};

export const deleteCurrentUserAccount = async (uid: string): Promise<void> => {
  const setCurrentUser = useAuthStore.getState().setCurrentUser;
    const user = auth.currentUser;
    if (!user) {
        throw new Error("No authenticated user found.");
    }

    const userDocRef = doc(db, "users", uid);
    await deleteDoc(userDocRef);

    await deleteUser(user);
    setCurrentUser(null); 
};