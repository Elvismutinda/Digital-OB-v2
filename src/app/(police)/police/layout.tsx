import { redirect } from "next/navigation";

import PoliceNav from "@/components/police/PoliceNav";
import { policeConfig } from "@/config/police";
import { PoliceAccountNav } from "@/components/police/PoliceAccountNav";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const PoliceLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session || session?.user?.role !== "Police") {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <PoliceNav items={policeConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-40 border-b bg-background mb-10">
            <div className="container flex h-16 items-center justify-between py-4">
              <div>
                {session?.user.name} - {session?.user.role}
              </div>
              <div>
                <PoliceAccountNav user={session.user} />
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

export default PoliceLayout;
