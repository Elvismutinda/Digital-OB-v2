import { db } from "@/lib/db";
import { registerUserSchema } from "@/lib/validations/user";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, rank, email, password, staffId, role, gender, station } =
      registerUserSchema.parse(body);

    // check if user already exists
    const userExistsByEmail = await db.user.findFirst({
      where: {
        email,
      },
    });

    const userExistsByStaffId = await db.user.findFirst({
      where: {
        staffId,
      },
    });

    if (userExistsByEmail || userExistsByStaffId) {
      return new Response("User already exists", { status: 409 });
    }

    // create user

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        rank,
        email,
        hashedPassword,
        staffId,
        role,
        gender,
        station,
      },
    });

    return new Response(user.name, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid POST request data passed", { status: 422 });
    }

    return new Response("Could not create user", { status: 500 });
  }
}

export async function GET() {
  try {
    // const session = await getServerSession(authOptions);

    // if (!session) {
    //   return new Response("Unauthorized", { status: 401 });
    // }

    const users = await db.user.findMany({
      select: {
        staffId: true,
        name: true,
        rank: true,
        email: true,
        station: true,
        role: true,
        gender: true,
      },
    });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Could not fetch users", { status: 500 });
  }
}
