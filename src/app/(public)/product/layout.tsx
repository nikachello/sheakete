export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center font-georgian">
      {children}
    </div>
  );
}
