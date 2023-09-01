import CardSkeleton from "@/components/CardSkeleton";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";

const AdminPageLoading = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Dashboard" />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </SiteShell>
  );
};

export default AdminPageLoading;
