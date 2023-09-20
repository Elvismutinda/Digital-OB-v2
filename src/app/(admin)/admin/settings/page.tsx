import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";
import UserUpdateForm from "@/components/UserUpdateForm";
import { getAuthSession } from "@/lib/auth";

export const metadata = {
  title: "Settings",
  description: "Manage account settings",
};

const SettingsPage = async () => {
  const session = await getAuthSession()
  return (
    <SiteShell>
      <SiteHeader heading="Account" text="Update your account settings." />
      <div className="grid gap-10">
        <UserUpdateForm />
      </div>
    </SiteShell>
  );
};

export default SettingsPage;
