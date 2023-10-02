import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (session?.user.role !== "Police") {
      return new Response("Unauthorized", { status: 401 });
    }

    const caseNumber = await db.case.findMany({
      select: {
        ob_number: true,
      },
    });

    const obNumbers = caseNumber.map((c) => c.ob_number);

    return new Response(JSON.stringify(obNumbers), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}
