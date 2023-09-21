import { redirect} from "next/navigation";

import { authOptions, getAuthSession } from "@/lib/auth";
import SiteShell from "@/components/SiteShell";
import SiteHeader from "@/components/SiteHeader";
import DashboardPolice from "@/components/police/DashboardPolice";

export const metadata = {
  title: "Police",
}

const PolicePage = async () => {
  const session = await getAuthSession();

  if (session?.user?.role !== "Police") {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <SiteShell>
      <SiteHeader heading="Dashboard" />
      <DashboardPolice />
    </SiteShell>
  );
};

export default PolicePage;
