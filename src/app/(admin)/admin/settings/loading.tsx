import CardSkeleton from "@/components/CardSkeleton";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";

const AdminSettingsLoading = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Account" text="Update your account settings." />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </SiteShell>
  );
};

export default AdminSettingsLoading;
