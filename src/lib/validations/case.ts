import * as z from "zod";

export const registerCaseSchema = z.object({
  ob_number: z
    .string({ required_error: "OB Number is required" })
    .min(1, "OB Number is required"),
  crime: z.string({ required_error: "Crime is required" }),
  statement: z
    .string({ required_error: "Statement is required" })
    .min(1, "Statement is required"),
  complainantId: z.string({ required_error: "Complainant ID is required" }),
});
