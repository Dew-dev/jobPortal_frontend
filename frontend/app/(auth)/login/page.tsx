"use client";
import Link from "next/link";
import { loginAction } from "./actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import { useSearchParams } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login to your account",
// };
// export const metadata = { title: "Login" };

export default function LoginPage() {
  const searchParams = useSearchParams();
  const fromRegister = searchParams.get("fromRegister");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [register, setRegister] = useState<string | null>(null);

  useEffect(() => {
    if (fromRegister === "true") {
      setRegister("Registration successful!");
    }
  }, [fromRegister]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.success) {
      setSuccess("Login successful!");
      router.push("/"); // redirect di client
    } else {
      setError(result?.error || "Login failed");
    }
  }
  return (
    <main className="container mx-auto max-w-md px-4 py-10">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h1 className="mb-1 text-2xl font-bold">Log in</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Gunakan akun demo:&nbsp;
          <b>aisha@example.com</b> / <b>password</b>
        </p>

        {error && (
          <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
            {error}
          </p>
        )}
        {success && (
          <p className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300">
            {success}
          </p>
        )}

        {register && (
          <p className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300">
            {register}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <input
              name="email"
              type="email"
              required
              // defaultValue="aisha@example.com"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Password</label>
            <input
              name="password"
              type="password"
              required
              // defaultValue="password"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link
            href="/reset-password"
            className="text-primary underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
          <Link
            href="/register"
            className="text-primary underline-offset-4 hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}
