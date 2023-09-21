import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";
import CaseCreateButton from "@/components/police/CaseCreateButton";
import ComplainantsDetails from "@/components/police/ComplainantsDetails";

export const metadata = {
  title: "Complainants",
};

const ComplainantsPage = async () => {
  return (
    <SiteShell>
      <SiteHeader heading="Complainants">
        <CaseCreateButton />
      </SiteHeader>
      <ComplainantsDetails />
    </SiteShell>
  );
};

export default ComplainantsPage;
