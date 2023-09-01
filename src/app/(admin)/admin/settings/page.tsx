import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";

export const metadata = {
  title: "Settings",
  description: "Manage account settings",
};

const SettingsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <SiteShell>
      <SiteHeader heading="Settings" text="Manage account settings." />
      <div className="grid gap-10">{/* TODO: Add settings details */}</div>
    </SiteShell>
  );
};

export default SettingsPage;
