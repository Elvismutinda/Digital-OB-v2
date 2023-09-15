import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { stationSchema } from "@/lib/validations/station";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    stationId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getAuthSession();

    if (session?.user.role !== "Admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const { params } = routeContextSchema.parse(context);

    // Check if the station exists
    const stationExists = await db.station.findUnique({
      where: {
        id: params.stationId as string,
      },
    });

    if (!stationExists) {
      return new Response("Station not found", { status: 404 });
    }

    // Delete the station
    await db.station.delete({
      where: {
        id: params.stationId as string,
      },
    });

    return new Response("Station deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Could not delete station", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getAuthSession();

    if (session?.user.role !== "Admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const { params } = routeContextSchema.parse(context);

    const json = await req.json();
    const body = stationSchema.parse(json);

    // Update the station
    await db.station.update({
      where: {
        id: params.stationId,
      },
      data: {
        name: body.name,
        county: body.county,
        sub_county: body.sub_county,
        contact: body.contact,
      },
    });

    return new Response("Station updated successfully", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid PATCH request data passed", {
        status: 422,
      });
    }

    return new Response("Could not update station", { status: 500 });
  }
}
