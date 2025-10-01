// app/AuthProvider.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname, redirect } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import "@/lib/firebase";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    // const auth = getAuth();
    // const unsubscribe = onAuthStateChanged(async (user) => {
     
    //   const userRole = user ? 'super_user' : null; // MOCK
    //   const isElevatedUser = ['admin', 'super_user'].includes(userRole);
     
    //   if (user) {
    //     // Guard 1: Elevated user is not on a dashboard route (and not already redirecting)
    //     if (isElevatedUser && !pathname.startsWith('/dashboard')) {
    //        // Use replace to redirect them to the correct section if they manually navigate to /shop
    //        router.replace('/dashboard/ongoing-jobs');
    //     }
    //   } else {
    //     // Guard 2: Unauthenticated user is on a protected dashboard route
    //     if (pathname.startsWith('/dashboard')) {
    //       router.replace('/login');
    //     }
    //   }

    //   setLoading(false);
    // });

    // return () => unsubscribe();




    // const auth = getAuth();
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    //   setLoading(false);

    //   // Redirect dashboard users if not logged in
    //   if (!currentUser) {
    //     router.replace("/login"); // keep login route for dashboard
    //   }
    // });

    // return () => unsubscribe();

    if (pathname === "/") {
    redirect('/shop'); 
      //router.replace("/shop");
      return;
    }
  }, [router, pathname]); // Depend on router and pathname

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading....
      </div>
    );
  }

  return <div className="min-h-screen w-full">{children}</div>;
}