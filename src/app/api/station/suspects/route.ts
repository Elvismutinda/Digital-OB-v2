import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { registerSuspectSchema } from "@/lib/validations/suspect";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { obNumber, name, description, national_id, age, contact, gender } =
      registerSuspectSchema.parse(body);

    // check if case exists

    const caseExists = await db.case.findFirst({
      where: {
        ob_number: obNumber,
      },
    });

    if (!caseExists) {
      return new Response("Case does not exist", { status: 404 });
    }

    // check if suspect already exists for that specific case

    const suspectExists = await db.suspect.findFirst({
      where: {
        AND: [
          {
            caseId: caseExists.id,
          },
          {
            name: name,
          },
        ],
      },
    });

    if (suspectExists) {
      return new Response("Suspect already exists", { status: 409 });
    }

    // create suspect

    const suspect = await db.suspect.create({
      data: {
        caseId: caseExists.id,
        name,
        description,
        national_id,
        age,
        contact,
        gender,
      },
    });

    return new Response(suspect.name, { status: 201 });
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

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const suspects = await db.suspect.findMany({
      include: {
        case: {
          select: {
            ob_number: true,
          },
        },
      },
      orderBy: {
        dateAdded: "desc",
      },
    });

    const suspectsWithCase = suspects.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      national_id: s.national_id,
      age: s.age,
      contact: s.contact,
      gender: s.gender,
      date_added: s.dateAdded,
      case: s.case.ob_number,
    }));

    return new Response(JSON.stringify(suspectsWithCase), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}
