import CardSkeleton from "@/components/CardSkeleton";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";

const AdminLogsLoading = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Audit Logs" text="View system audit logs." />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </SiteShell>
  );
};

export default AdminLogsLoading;
