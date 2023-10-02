import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (session?.user.role !== "Admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const stations = await db.station.findMany({
      select: {
        id: true,
        name: true,
        county: true,
        sub_county: true,
        contact: true,
      },
    });

    return new Response(JSON.stringify(stations), { status: 200 });
  } catch (error) {
    return new Response("Could not fetch stations", { status: 500 });
  }
}
