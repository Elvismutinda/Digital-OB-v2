import { notFound } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import AdminNav from "@/components/admin/AdminNav";
import { adminConfig } from "@/config/admin";
import UserAccountNav from "@/components/UserAccountNav";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
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
                {user.name} - {user.role}
              </div>
              <div>
                <UserAccountNav
                  user={{
                    name: user.name,
                    image: user.image,
                    email: user.email,
                  }}
                />
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
