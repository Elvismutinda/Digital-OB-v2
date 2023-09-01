import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";
import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import StationCreateButton from "@/components/admin/StationCreateButton";

export const metadata = {
  title: "Stations",
};

const StationsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <SiteShell>
      <SiteHeader heading="Stations">
        <StationCreateButton />
      </SiteHeader>
      <div className="grid gap-10">{/* TODO: Add stations data */}</div>
    </SiteShell>
  );
};

export default StationsPage;
