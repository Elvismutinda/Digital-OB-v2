import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";
import StationCreateButton from "@/components/admin/StationCreateButton";
import StationDetails from "@/components/admin/StationDetails";

export const metadata = {
  title: "Stations",
};

const StationsPage = async () => {
  return (
    <SiteShell>
      <SiteHeader heading="Stations">
        <StationCreateButton />
      </SiteHeader>
      <StationDetails />
    </SiteShell>
  );
};

export default StationsPage;
