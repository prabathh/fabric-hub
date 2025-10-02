import { db } from './firebase'; // 👈 Import the initialized Firestore instance
import { doc, getDoc } from 'firebase/firestore'; 


// Fetches the user's role from the 'users' collection using their UID.
export const fetchUserRole = async (uid: string): Promise<string | null> => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const role = userData.role;
            if (role === 'super' || role === 'admin' || role === 'user') {
                return role;
            }
        }
        
        // Default to the lowest privilege if document is missing or role is invalid
        return 'user'; 
    } catch (error) {
        console.error("Error fetching user role for UID:", uid, error);
        return 'user'; 
    }
};