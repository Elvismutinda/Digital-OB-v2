import * as z from "zod";

export const registerUserSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Full name is required"),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  staffId: z
    .string({ required_error: "Staff ID is required" })
    .min(1, "Staff ID is required"),
  rank: z.string({ required_error: "Rank is required" }),
  role: z.string({ required_error: "Role is required" }),
  gender: z.string({ required_error: "Gender is required" }),
  station: z.string({ required_error: "Station is required" }),
});

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

export const updateUserSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required"),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(1, "New password is required"),
    confirmNewPassword: z
      .string({ required_error: "Confirm your new password" })
      .min(1, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export type registerUserForm = z.infer<typeof registerUserSchema>;
export type loginUserForm = z.infer<typeof loginUserSchema>;
export type updateUserForm = z.infer<typeof updateUserSchema>;
