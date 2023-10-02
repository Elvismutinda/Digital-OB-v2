import { db } from "@/lib/db";

export async function GET() {
  try {
    const stations = await db.station.findMany({
      select: {
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return new Response(
      JSON.stringify(stations.map((station) => station.name)),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Could not fetch stations", { status: 500 });
  }
}
