import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Icons } from "@/components/Icons";
import { AiOutlineFileDone, AiOutlineFileSearch } from "react-icons/ai";
import { db } from "@/lib/db";

const Overview = async () => {
  const staffCount = await db.user.count()
  const complaintsCount = await db.complainant.count()
  const casesPendingCount = await db.case.count({
    where: {
      status: "Pending"
    }
  })
  const casesClosedCount = await db.case.count({
    where: {
      status: "Closed"
    }
  })

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Icons.complaint className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffCount}</div>
            <p className="text-xs text-muted-foreground">
              Test staff total card
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Complaints
            </CardTitle>
            <Icons.case className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complaintsCount}</div>
            <p className="text-xs text-muted-foreground">
              Test complaints card
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cases Pending</CardTitle>
            <AiOutlineFileSearch className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{casesPendingCount}</div>
            <p className="text-xs text-muted-foreground">
              Test cases pending card
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cases Closed</CardTitle>
            <AiOutlineFileDone className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{casesClosedCount}</div>
            <p className="text-xs text-muted-foreground">
              Test cases closed card
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Case Analytics Reports</CardTitle>
          </CardHeader>
          <CardContent>{/* TODO: Graph */}</CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Cases Pending for long</CardTitle>
            <CardDescription>Cases requiring priority</CardDescription>
          </CardHeader>
          <CardContent>{/* TODO: List long-pending cases */}</CardContent>
        </Card>
      </div>
    </>
  );
};

export default Overview;
