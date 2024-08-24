import { z } from "zod";

export const basePetSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(20, "Name must be at most 20 characters long"),
  ownerName: z
    .string()
    .trim()
    .min(2, "Owner must be at least 2 characters long")
    .max(20, "Owner must be at most 20 characters long"),
  ownerEmail: z.string().email("Invalid email address"),

  age: z.coerce
    .number()
    .int()
    .positive()
    .min(0, "Age must be a positive number")
    .max(100, "Age must be at most 100 years"),
  notes: z.union([
    z.literal(""),
    z.string().trim().min(2, "Notes must be at least 2 characters long"),
  ]),
});

export const petSchemaWithImage = basePetSchema.extend({
  imageUrl: z.union([
    z.literal(""),
    z.string().trim().url("Image URL must be a valid URL"),
  ]),
  ownerPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits long"),
});

export const petSchemaWithoutImage = basePetSchema;
// .transform((data) => {
//   return {
//     ...data,
//     age: Number(data.age),
//     imageUrl:
//       data.imageUrl ||
//       "/images/placeholder.png",
//   };
// });

export type TPetFormData = z.infer<typeof basePetSchema>;
export type TPetFormDataWithImage = z.infer<typeof petSchemaWithImage>;
export const petIdSchema = z.string().cuid();

const passwordField = z
  .string()
  .max(100, "Password must be at most 100 characters long")
  .min(3, "Password must be at least 8 characters long");
export const authSchema = z.object({
  email: z
    .string()
    .max(100, "Email must be at most 100 characters long")
    .email("Invalid email address"),
  password: passwordField,
});
export type TAuthFormData = z.infer<typeof authSchema>;

export const suggestionsSchema = z.object({
  suggestions: z.union([
    z.literal(""),
    z
      .string()
      .min(100, "Suggestions must be at least 100 characters")
      .max(200, "Suggestions must be at most 200 characters"),
  ]),
});

export type SuggestionsSchemaT = z.infer<typeof suggestionsSchema>;

export const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const otpField = z
  .string()
  .length(6, "OTP must be 6 digits")
  .regex(/^\d+$/, "OTP must contain only digits");
const hashField = z.string().uuid("Invalid UUID format");
export const otpSchema = z.object({
  otp: otpField,
});

export const verifyOTPSchema = z.object({
  otp: otpField,
  hash: hashField,
});

export const updatePasswordSchema = z.object({
  password: passwordField,
  hash: hashField,
});

export const updatePasswordFormSchema = z
  .object({
    password: passwordField,
    retypePassword: passwordField,
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords do not match",
    path: ["retypePassword"],
  });
