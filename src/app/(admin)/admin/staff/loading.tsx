import CardSkeleton from "@/components/CardSkeleton";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";
import StaffCreateButton from "@/components/admin/StaffCreateButton";

const AdminStaffLoading = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Staff">
        <StaffCreateButton />
      </SiteHeader>
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </SiteShell>
  );
};

export default AdminStaffLoading;
