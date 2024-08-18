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

export const authSchema = z.object({
  email: z
    .string()
    .max(100, "Email must be at most 100 characters long")
    .email("Invalid email address"),
  password: z
    .string()
    .max(100, "Password must be at most 100 characters long")
    .min(3, "Password must be at least 8 characters long"),
});
export type TAuthFormData = z.infer<typeof authSchema>;

export const notesSchema = z.object({
  notes: z.union([
    z.literal(""),
    z
      .string()
      .min(100, "Notes must be at least 1000 characters")
      .max(500, "Notes must be at most 500 characters"),
  ]),
});

export type NotesSchemaT = z.infer<typeof notesSchema>;
