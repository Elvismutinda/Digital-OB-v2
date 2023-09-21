import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";
import ComplainantCreateButton from "@/components/police/ComplainantCreateButton";
import ComplainantsDetails from "@/components/police/ComplainantsDetails";

export const metadata = {
  title: "Complainants",
};

const ComplainantsPage = async () => {
  return (
    <SiteShell>
      <SiteHeader heading="Complainants">
        <ComplainantCreateButton />
      </SiteHeader>
      <ComplainantsDetails />
    </SiteShell>
  );
};

export default ComplainantsPage;
