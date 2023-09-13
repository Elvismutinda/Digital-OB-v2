import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import Overview from "./Overview";
import Analytics from "./Analytics";
import Reports from "./Reports";

const DashboardAdmin = () => {
  return (
    <div className="flex-1 space-y-4 py-8 pt-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Overview />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Analytics />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Reports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAdmin;
