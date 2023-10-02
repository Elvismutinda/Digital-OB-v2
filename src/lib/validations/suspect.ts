import * as z from "zod";

export const registerSuspectSchema = z.object({
  obNumber: z
    .string({ required_error: "OB Number is required" })
    .min(1, "OB Number is required"),
  name: z
    .string({ required_error: "Full name is required" })
    .min(1, "Full name is required"),
  description: z.string({ required_error: "Description is required" }),
  national_id: z.string({ required_error: "National ID is required" }),
  age: z.number({ required_error: "Age is required" }),
  contact: z
    .string({ required_error: "Contact is required" })
    .min(1, "Contact is required")
    .max(13, "Enter a valid phone number"),
  gender: z.string({ required_error: "Gender is required" }),
});

export type registerSuspectForm = z.infer<typeof registerSuspectSchema>;
