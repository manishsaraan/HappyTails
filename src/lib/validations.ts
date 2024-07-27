import { z } from "zod";

export const petSchema = z.object({
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
  imageUrl: z.union([
    z.literal(""),
    z.string().trim().url("Image URL must be a valid URL"),
  ]),
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
// .transform((data) => {
//   return {
//     ...data,
//     age: Number(data.age),
//     imageUrl:
//       data.imageUrl ||
//       "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
//   };
// });

export type TPetFormData = z.infer<typeof petSchema>;
export const petIdSchema = z.string().cuid();
