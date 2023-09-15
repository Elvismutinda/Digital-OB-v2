import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
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
    // Parse the user ID from the request parameters
    // const params = z.object({
    //   userId: z.string(),
    // });

    // const { userId } = params.parse(req.params);

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
