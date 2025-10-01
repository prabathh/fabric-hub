"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import "@/lib/firebase";

export default function App({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Redirect '/' to '/shop'
    // if (pathname === "/") {
    //   router.replace("/shop");
    //   return;
    // }

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Redirect dashboard users if not logged in
      if (!currentUser) {
        router.replace("/login"); // keep login route for dashboard
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return <div className="min-h-screen w-full">{children}</div>;
}
