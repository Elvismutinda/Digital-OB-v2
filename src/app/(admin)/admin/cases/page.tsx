import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";

export const metadata = {
  title: "Cases",
  description: "Manage cases",
};

const CasesPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <SiteShell>
      <SiteHeader heading="Cases" text="Manage cases." />
      <div className="grid gap-10">{/* TODO: Add cases data */}</div>
    </SiteShell>
  );
};

export default CasesPage;
