import CardSkeleton from "@/components/CardSkeleton";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";

const AdminCasesLoading = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Cases" text="Manage cases." />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </SiteShell>
  );
};

export default AdminCasesLoading;
