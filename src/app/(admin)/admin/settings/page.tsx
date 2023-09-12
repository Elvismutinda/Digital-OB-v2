import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";

export const metadata = {
  title: "Settings",
  description: "Manage account settings",
};

const SettingsPage = async () => {
  return (
    <SiteShell>
      <SiteHeader heading="Account" text="Update your account settings." />
      <div className="grid gap-10">{/* TODO: Add settings details */}</div>
    </SiteShell>
  );
};

export default SettingsPage;
