import { redirect} from "next/navigation";

import { authOptions, getAuthSession } from "@/lib/auth";
import SiteShell from "@/components/SiteShell";
import SiteHeader from "@/components/SiteHeader";
import DashboardAdmin from "@/components/admin/DashboardAdmin";

export const metadata = {
  title: "Admin",
}

const AdminPage = async () => {
  const session = await getAuthSession();

  if (session?.user?.role !== "Admin") {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <SiteShell>
      <SiteHeader heading="Dashboard" />
      <DashboardAdmin />
    </SiteShell>
  );
};

export default AdminPage;
