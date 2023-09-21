import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";
import CaseCreateButton from "@/components/police/CaseCreateButton";
import CasesDetails from "@/components/police/CasesDetails";

export const metadata = {
  title: "Cases",
};

const CasesPage = async () => {
  return (
    <SiteShell>
      <SiteHeader heading="Cases">
        <CaseCreateButton />
      </SiteHeader>
      <CasesDetails />
    </SiteShell>
  );
};

export default CasesPage;
