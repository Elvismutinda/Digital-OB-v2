import CardSkeleton from "@/components/CardSkeleton";
import SiteHeader from "@/components/SiteHeader";
import SiteShell from "@/components/SiteShell";
import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const AdminStationLoading = () => {
  return (
    <SiteShell>
      <SiteHeader heading="Stations">
        <Button className={cn(buttonVariants({ variant: "default" }))}>
          Test
        </Button>
      </SiteHeader>
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </SiteShell>
  );
};

export default AdminStationLoading;
