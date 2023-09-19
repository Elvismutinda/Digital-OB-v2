import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { userDetailsSchema } from "@/lib/validations/user";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
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

    // Check if the user exists
    const userExists = await db.user.findUnique({
      where: {
        id: params.userId as string,
      },
    });

    if (!userExists) {
      return new Response("User not found", { status: 404 });
    }

    // Delete the user
    await db.user.delete({
      where: {
        id: params.userId as string,
      },
    });

    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Could not delete user", { status: 500 });
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
    const body = userDetailsSchema.parse(json);

    // update the user
    await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name: body.name,
        email: body.email,
        rank: body.rank,
        role: body.role,
        gender: body.gender,
      },
    });

    return new Response("User updated successfully", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid PATCH request data passed", {
        status: 422,
      });
    }

    return new Response("Could not update station", { status: 500 });
  }
}
