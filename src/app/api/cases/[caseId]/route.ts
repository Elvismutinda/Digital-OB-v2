import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface IParams {
    caseId: string;
}

export async function DELETE(
    req: Request, {
        params
    }: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return new Response("Unauthorized", { status: 401 });
    }

    const caseId = params

    if(!caseId || typeof caseId !== "string") {
        return new Response("Invalid caseId", { status: 400 });
    }

    const deleted = await db.case.deleteMany({
        where: {
            id: caseId,
            userId: currentUser.id,
        }
    })

    return NextResponse.json(deleted);
}

export async function PUT(
    req: Request,
    {params}:{params: IParams}
) {
    const currentUser = await getCurrentUser();
    const {caseId} = params;
    const json = await req.json();

    if (!currentUser) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!caseId || typeof caseId !== "string") {
        return new Response("Invalid case Id", { status: 400 });
    }

    const updated = await db.case.update({
        where: {
            id: caseId,
        },
        data: json
    })

    return NextResponse.json(updated);
}