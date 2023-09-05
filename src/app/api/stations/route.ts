import { db } from "@/lib/db";
import { registerStationSchema } from "@/lib/validations/station";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, county, sub_county, contact } =
      registerStationSchema.parse(body);

    // check if station already exists
    const stationExists = await db.station.findFirst({
      where: {
        name,
      },
    });

    if (stationExists) {
      return new Response("Station already exists", { status: 409 });
    }

    // create station

    const station = await db.station.create({
      data: {
        name,
        county,
        sub_county,
        contact,
      },
    });

    return new Response(station.name, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid POST request data passed", { status: 422 });
    }

    return new Response("Could not create station", { status: 500 });
  }
}

export async function GET() {
  try {
    const stations = await db.station.findMany({
      select: {
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
