import { db } from "@/lib/db";
import { registerUserSchema } from "@/lib/validations/user";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (session?.user.role !== "Admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, email, password, staffId, rank, role, gender, station } =
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

    // check if station exists
    const stationExists = await db.station.findFirst({
      where: {
        name: station,
      },
    });

    if (!stationExists) {
      return new Response("Station does not exist", { status: 404 });
    }

    // create user and associate with station

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
        staffId,
        rank,
        role,
        gender,
        stationId: stationExists.id,
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
    const session = await getAuthSession();

    if (session?.user.role !== "Admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        staffId: true,
        rank: true,
        role: true,
        gender: true,
        station: {
          select: {
            name: true,
          },
        },
      },
    });

    const usersWithStation = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      staffId: user.staffId,
      rank: user.rank,
      role: user.role,
      gender: user.gender,
      station: user.station?.name || "No station",
    }));

    return new Response(JSON.stringify(usersWithStation), { status: 200 });
  } catch (error) {
    return new Response("Could not fetch users", { status: 500 });
  }
}
