import * as z from "zod";

export const registerComplainantSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Full name is required"),
  contact: z
    .string({ required_error: "Contact is required" })
    .min(1, "Contact is required")
    .max(13, "Enter a valid phone number"),
  occupation: z
    .string({ required_error: "Occupation is required" })
    .min(1, "Occupation is required"),
  age: z
    .number({ required_error: "Age is required" })
    .min(1, "Age is required"),
  address: z
    .string({ required_error: "Address is required" })
    .min(1, "Address is required"),
  gender: z.string({ required_error: "Gender is required" }),
});
