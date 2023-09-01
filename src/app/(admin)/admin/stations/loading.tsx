import CardSkeleton from "@/components/CardSkeleton";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";
import StationCreateButton from "@/components/admin/StationCreateButton";

const AdminStationLoading = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Stations">
        <StationCreateButton />
      </SiteHeader>
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </SiteShell>
  );
};

export default AdminStationLoading;
