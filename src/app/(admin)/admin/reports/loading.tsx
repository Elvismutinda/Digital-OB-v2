import CardSkeleton from "@/components/CardSkeleton";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";

const AdminReportsLoading = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Reports" text="View system reports." />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </SiteShell>
  );
};

export default AdminReportsLoading;
