import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";

export const metadata = {
  title: "Audit Logs",
  description: "View system audit logs.",
};

const LogsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <SiteShell>
      <SiteHeader heading="Audit Logs" text="View system audit logs." />
      <div className="grid gap-10">{/* TODO: Add logs data */}</div>
    </SiteShell>
  );
};

export default LogsPage;
