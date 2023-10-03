import { db } from "@/lib/db";

export async function GET() {
  try {
    const response = await db.case.groupBy({
      by: ["dateAdded"],
      _count: {
        status: true,
      },
    });

    const chartData = response.map((item) => ({
      x: new Date(item.dateAdded).toLocaleDateString(),
      y: item._count.status,
    }));

    return new Response(JSON.stringify(chartData), { status: 200 });
  } catch (error) {
    return new Response("Could not fetch users", { status: 500 });
  }
}
