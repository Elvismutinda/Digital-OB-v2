import { redirect } from "next/navigation";

import AdminNav from "@/components/admin/AdminNav";
import { adminConfig } from "@/config/admin";
import { UserAccountNav } from "@/components/UserAccountNav";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  if (session?.user?.role !== "Admin") {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <AdminNav items={adminConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-40 border-b bg-background mb-10">
            <div className="container flex h-16 items-center justify-between py-4">
              <div>
                {session?.user.name} - {session?.user.role}
              </div>
              <div>
                <UserAccountNav user={session.user} />
              </div>
            </div>
          </header>
          {children}
          {/* <SiteFooter className="border-t" /> */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
