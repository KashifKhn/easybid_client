import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constans/constants";
import * as z from "zod";

export const createItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  startingBid: z.number().min(0, "Starting bid must be a positive number."),
  buyNowPrice: z.number().min(0, "Buy now price must be a positive number."),
  categoryId: z.string().min(1, "Please select a category."),
  userId: z.string().min(1, "User ID is required."),
  files: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required.")
    .max(10, "You can only add up to 10 images.")
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `Each file size should be less than 10MB.`,
    )
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export const editItemSchema = createItemSchema.partial().extend({
  files: z
    .array(z.instanceof(File))
    .max(10, "You can only add up to 10 images.")
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `Each file size should be less than 10MB.`,
    )
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .optional(),
});
