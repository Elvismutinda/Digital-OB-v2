import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";
import SuspectCreateButton from "@/components/police/SuspectCreateButton";
import SuspectsDetails from "@/components/police/SuspectsDetails";

export const metadata = {
  title: "Suspects",
};

const SuspectsPage = async () => {
  return (
    <SiteShell>
      <SiteHeader heading="Suspects">
        <SuspectCreateButton />
      </SiteHeader>
      <SuspectsDetails />
    </SiteShell>
  );
};

export default SuspectsPage;
