"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

import { Suspense } from "react";

function AdminLoginInner() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const search = useSearchParams();
  const router = useRouter();
  const callbackUrl = search.get("callbackUrl") || "/admin";

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl">Login</h1>
      <hr className="border-t border-white/30 w-1/4 my-4" />
      <div className="border p-6 rounded-lg shadow-lg mt-4 bg-black/25 max-w-sm w-full">
        {err && <p className="text-red-400 text-sm mb-2">{err}</p>}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setErr("");
            const res = await signIn("credentials", {
              username,
              password,
              redirect: false,
              callbackUrl,
            });
            if (res?.error) {
              setErr("Invalid credentials");
            } else {
              router.push(callbackUrl);
            }
          }}
        >
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded w-full mb-4 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
            <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded w-full mb-4 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded transition cursor-pointer hover:bg-blue-900 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminLoginInner />
    </Suspense>
  );
}