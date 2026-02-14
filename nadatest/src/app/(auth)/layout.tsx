import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-accent to-background">
      <header className="flex h-14 items-center px-4">
        <Link href="/" className="text-lg font-bold text-primary">
          Nadatest
        </Link>
      </header>
      <div className="flex flex-1 items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
