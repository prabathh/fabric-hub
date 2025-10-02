import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 NEW IMPORT

// Firebase config from environment variables (use actual env variables in production)
const firebaseConfig = {
  //   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  //   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  //   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  //   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  //   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  //   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
  apiKey: "AIzaSyAQ3gHFgZp4flB4Juc8niOD5s3IWBI00ew",
  authDomain: "drive-line-def15.firebaseapp.com",
  projectId: "drive-line-def15",
  storageBucket: "drive-line-def15.appspot.com",
  messagingSenderId: "289118358883",
  appId: "1:289118358883:web:aecef4a43e565012f85756",
  measurementId: "G-W798HGYNS6",
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app); // 👈 NEW: Export the Firestore instance
export default app;
