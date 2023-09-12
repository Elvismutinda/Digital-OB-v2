import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";

export const metadata = {
  title: "Audit Logs",
  description: "View system audit logs.",
};

const LogsPage = async () => {
  return (
    <SiteShell>
      <SiteHeader heading="Audit Logs" text="View system audit logs." />
      <div className="grid gap-10">{/* TODO: Add logs data */}</div>
    </SiteShell>
  );
};

export default LogsPage;
