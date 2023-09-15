import * as z from "zod";

export const stationSchema = z.object({
  name: z
    .string({ required_error: "Station name is required" })
    .min(1, "Station name is required"),
  county: z.string({ required_error: "County is required" }),
  sub_county: z.string({ required_error: "Sub-county is required" }),
  contact: z
    .string({ required_error: "Contact is required" })
    .min(1, "Contact is required")
    .max(13, "Enter a valid phone number"),
});

export type updateStationForm = z.infer<typeof stationSchema>;
