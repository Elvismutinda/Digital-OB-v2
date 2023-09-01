import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";
import StaffCreateButton from "@/components/admin/StaffCreateButton";

export const metadata = {
  title: "Staff",
};

const StaffPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <SiteShell>
      <SiteHeader heading="Staff">
        <StaffCreateButton />
      </SiteHeader>
      <div className="grid gap-10">{/* TODO: Add staff data */}</div>
    </SiteShell>
  );
};

export default StaffPage;
