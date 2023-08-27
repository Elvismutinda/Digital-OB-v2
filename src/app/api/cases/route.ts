import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET() {
  const cases = await db.case.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return NextResponse.json(cases);
}

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new Response("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { caseId, title, description } = body;

        const newCase = await db.case.create({
            data: {
                caseId,
                title,
                description,
                userId: currentUser.id,
            }
        })

        return NextResponse.json(newCase);
    } catch (error) {
        
    }
}