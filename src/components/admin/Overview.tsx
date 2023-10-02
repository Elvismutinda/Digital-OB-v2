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
import { formatDistanceToNow, differenceInDays } from "date-fns";

const Overview = async () => {
  const staffCount = await db.user.count();
  const stationsCount = await db.station.count();
  const casesPendingCount = await db.case.count({
    where: {
      status: "Pending",
    },
  });
  const casesClosedCount = await db.case.count({
    where: {
      status: "Closed",
    },
  });

  const pendingCasesPeriod = await db.case.findMany({
    where: {
      status: "Pending",
    },
    include: {
      station: true,
    },
    orderBy: {
      dateAdded: "asc",
    },
  });

  // Filter cases pending for more than 5 days
  const longPendingCases = pendingCasesPeriod.filter((caseItem) => {
    const daysSinceAdded = differenceInDays(
      new Date(),
      new Date(caseItem.dateAdded)
    );
    return daysSinceAdded > 5;
  });

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Staff Members
            </CardTitle>
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
              Total Stations Country-wide
            </CardTitle>
            <Icons.case className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stationsCount}</div>
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
            <CardTitle>Cases Flow</CardTitle>
          </CardHeader>
          <CardContent>{/* TODO: Graph */}</CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Cases Pending for long</CardTitle>
            <CardDescription>Cases requiring priority</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4">
              {pendingCasesPeriod.map((caseItem) => (
                <li key={caseItem.id} className="py-2 border-b border-gray-400">
                  {caseItem.ob_number} - Reported{" "}
                  {formatDistanceToNow(new Date(caseItem.dateAdded), {
                    addSuffix: true,
                  })}{" "}
                  at {caseItem.station.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Overview;
