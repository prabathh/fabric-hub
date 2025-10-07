"use client";

import { useState } from "react";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { isAuthorized } from "@/helper/utils";
import { auth } from "@/lib/firebase";
import { fetchUser } from "@/lib/user";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/auth";
import { Input, Button, Loading } from "@/components/common";
import logo from "../../../public/assets/logo.png";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const role = await fetchUser(user);

      if (isAuthorized(role as UserRole | null)) {
        router.replace("/dashboard");
      } else {
        router.replace("/shop");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
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
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              theme="secondary"
              size="small"
              type="submit"
              className="w-full mx-auto block py-3 text-lg font-semibold"
            >
              {isLoading ? (
                <Loading color="secondary" />
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
