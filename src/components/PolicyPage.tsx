import type { ReactNode } from "react";
import Link from "next/link";
import { storeInfo } from "@/lib/store-info";

export function PolicyPage({ title, introduction, children }: { title: string; introduction: string; children: ReactNode }) {
  return (
    <main lang="ka" className="mx-auto min-h-[65vh] w-full max-w-2xl px-5 py-8 text-zinc-800">
      <Link href="/" className="inline-flex min-h-11 items-center text-sm text-zinc-500 underline underline-offset-4">პროდუქტებზე დაბრუნება</Link>
      <header className="mb-8 mt-4 space-y-3 border-b border-zinc-100 pb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">{storeInfo.name}</p>
        <h1 className="text-2xl font-bold leading-relaxed text-zinc-950">{title}</h1>
        <p className="text-xs text-zinc-500">განახლებულია: {storeInfo.policyUpdated}</p>
        <p className="text-sm leading-7">{introduction}</p>
      </header>
      <div className="space-y-7 text-sm leading-7 [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">{children}</div>
    </main>
  );
}

export function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="space-y-3"><h2 className="text-base font-bold text-zinc-950">{title}</h2>{children}</section>;
}
