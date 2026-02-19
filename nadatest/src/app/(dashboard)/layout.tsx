import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Navbar } from "@/components/navigation/Navbar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    redirect("/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const navUser = {
    email: user.email ?? "",
    nombre: user.user_metadata?.nombre ?? null,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={navUser} />
      <main id="main-content" className="mx-auto w-full max-w-6xl p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
