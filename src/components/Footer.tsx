import Link from "next/link";
import { policyLinks, storeInfo } from "@/lib/store-info";

export default function Footer() {
  return (
    <footer lang="ka" className="mx-auto mt-10 w-full max-w-2xl border-t border-zinc-200 px-5 py-8 text-sm text-zinc-600">
      <Link href="/" className="inline-flex min-h-11 items-center text-lg font-bold text-zinc-950">{storeInfo.georgianName} / {storeInfo.name}</Link>
      <address className="mt-2 space-y-1 not-italic leading-7">
        <p>{storeInfo.address}</p>
        <p><a href={storeInfo.phoneHref} className="inline-flex min-h-11 items-center underline underline-offset-4">{storeInfo.phone}</a></p>
        <p><a href={`mailto:${storeInfo.email}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{storeInfo.email}</a></p>
      </address>
      <nav aria-label="საინფორმაციო გვერდები" className="mt-5 grid grid-cols-2 gap-x-5 gap-y-1 text-xs leading-6">
        {policyLinks.map((link) => <Link key={link.href} href={link.href} className="flex min-h-11 items-center underline underline-offset-4">{link.label}</Link>)}
      </nav>
      <p className="mt-6 text-xs text-zinc-400">© 2026 {storeInfo.name}</p>
    </footer>
  );
}
