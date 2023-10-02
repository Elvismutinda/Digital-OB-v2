import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { registerCaseSchema } from "@/lib/validations/case";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (session?.user.role !== "Police") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { ob_number, crime, statement, complainantId } =
      registerCaseSchema.parse(body);

    // check if case already exists
    const caseExists = await db.case.findFirst({
      where: {
        ob_number,
      },
    });

    if (caseExists) {
      return new Response("Case already exists", { status: 409 });
    }

    // create case and associate with complainant, station and user
    const user = await db.user.findFirst({
      select: {
        stationId: true,
      },
      where: {
        id: session.user.id,
      },
    });

    const stationId = user?.stationId ?? "";

    const createCase = await db.case.create({
      data: {
        ob_number,
        crime,
        statement,
        creatorId: session.user.id,
        complainantId,
        stationId,
      },
    });

    return new Response("Case Created", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid POST request data passed", { status: 422 });
    }

    return new Response(error, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getAuthSession();

    if (session?.user.role !== "Police") {
      return new Response("Unauthorized", { status: 401 });
    }

    const cases = await db.case.findMany({
      include: {
        complainant: {
          select: {
            name: true,
          },
        },
        police: {
          select: {
            name: true,
          },
        },
        detective: {
          select: {
            name: true,
          },
        },
      },
    });

    const caseDetails = cases.map((c) => ({
      id: c.id,
      ob_number: c.ob_number,
      crime: c.crime,
      status: c.status,
      statement: c.statement,
      dateAdded: c.dateAdded,
      dateClosed: c.dateClosed || "------",
      complainant: c.complainant?.name || "No complainant",
      police: c.police?.name || "Unknown",
      detective: c.detective?.name || "No detective assigned",
    }));

    return new Response(JSON.stringify(caseDetails), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}
