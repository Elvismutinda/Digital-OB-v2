import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { registerComplainantSchema } from "@/lib/validations/complainant";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (session?.user.role !== "Police") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { address, age, contact, gender, name, occupation } =
      registerComplainantSchema.parse(body);

    // create complainant

    const complainant = await db.complainant.create({
      data: {
        address,
        age,
        contact,
        gender,
        name,
        occupation,
      },
    });

    return new Response(complainant.id, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid POST request data passed", { status: 422 });
    }

    return new Response("Could not create complainant", { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getAuthSession();

    if (session?.user.role !== "Police") {
      return new Response("Unauthorized", { status: 401 });
    }

    const complainants = await db.complainant.findMany({
      select: {
        id: true,
        name: true,
        contact: true,
        occupation: true,
        age: true,
        address: true,
        gender: true,
      },
      orderBy: {
        dateAdded: "desc",
      },
    });

    return new Response(JSON.stringify(complainants), { status: 200 });
  } catch (error) {
    return new Response("Could not fetch complainants", { status: 500 });
  }
}
