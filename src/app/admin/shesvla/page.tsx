"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    document.cookie = `admin_access=${password}; path=/; max-age=86400`;

    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white rounded-xl shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">ადმინისტრაცია</h1>
        <input
          type="password"
          placeholder="შეიყვანეთ პაროლი"
          className="border p-2 rounded w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-[#8B5E3C] text-white py-2 rounded">
          შესვლა
        </button>
      </form>
    </div>
  );
}
