import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";

export const metadata = {
  title: "Reports",
  description: "View system reports.",
};

const ReportsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <SiteShell>
      <SiteHeader heading="Reports" text="View system reports." />
      <div className="grid gap-10">{/* TODO: Add reports data*/}</div>
    </SiteShell>
  );
};

export default ReportsPage;
