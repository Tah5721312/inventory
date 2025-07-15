"use client";

import { useState } from "react";
import { useAuth } from "@/app/authContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "@/components/Loading"; // Import Loading component

interface LoginProps {
  onLogin?: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Start loading
    try {
      await login(email, password);
      if (onLogin) {
        onLogin();
      } else {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("Invalid email or password.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  if (isLoading) {
    return <Loading />; // Show loading animation during login
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
