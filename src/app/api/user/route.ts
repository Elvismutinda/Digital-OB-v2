import { db } from "@/lib/db";
import { registerUserSchema } from "@/lib/validations/user";
import { z } from "zod";
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { staffId, email, name, password, role } =
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
        staffId,
        email,
        name,
        hashedPassword,
        role,
      },
    });

    return new Response(user.staffId, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid POST request data passed", { status: 422 });
    }

    return new Response("Could not create user", { status: 500 });
  }
}
