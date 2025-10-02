"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button/Button";
import { Input } from "@/components/common/Input/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchUserRole } from "@/lib/user";
import { useRouter } from "next/navigation";
import { UserData } from "@/types/auth";
import { UserRole } from "@/types/auth";
import logo from "../../../public/assets/logo.png";

const isAuthorized = (role: UserRole | null): boolean => {
    return role === 'super' || role === 'admin';
};

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Execute signInWithEmailAndPassword
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch role from DB
      const role = await fetchUserRole(user.uid);

      // Prepare data for the store
      const userData: UserData = {
        uid: user.uid,
        email: user.email,
        role: role as "super" | "admin" | "user" | null,
      };

      // 1. Save data to the new Auth Store
      setCurrentUser(userData);

      // 2. Conditional Redirection
      if (isAuthorized(role as UserRole | null)) {
        router.replace("/dashboard");
      } else {
        router.replace("/shop");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        // In a production app, map Firebase error codes to user-friendly messages
        setError(err.message);
      } else {
        setError("An unknown error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-8">
        <Image src={logo} alt="Fabric Hub" width={180} />
      </div>

      {/* RIGHT COLUMN (1/2 Screen): Login Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-4 sm:p-8 bg-gray-200">
        <div className="w-full max-w-lg lg:max-w-md p-6">
          <div className="flex justify-center mb-8 md:hidden">
            <Image
              src={logo}
              alt="Fabric Hub"
              width={180}
              className="md:hidden flex justify-center"
            />
          </div>
          <h1 className="text-3xl font-bold mb-1 text-gray-800 text-center">
            Welcome back
          </h1>
          <p className="text-gray-500 mb-8 text-center">
            Please enter your details
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Sign In Button */}
            <Button
              theme="secondary"
              size="small"
              type="submit"
              className="w-full mx-auto block py-3 text-lg font-semibold"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-1 py-3">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.4s]"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.25s]"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
