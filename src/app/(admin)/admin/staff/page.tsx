import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";
import StaffCreateButton from "@/components/admin/StaffCreateButton";
import StaffDetails from "@/components/admin/StaffDetails";

export const metadata = {
  title: "Staff",
};

const StaffPage = async () => {
  return (
    <SiteShell>
      <SiteHeader heading="Staff">
        <StaffCreateButton />
      </SiteHeader>
      <StaffDetails />
    </SiteShell>
  );
};

export default StaffPage;
