import { z } from "zod";

export const sendFeedbackDto = z.object({
  mentorId: z
    .string({
      required_error: "Mentor ID is required",
    })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID format"),
  userId: z
    .string({
      required_error: "Mentor ID is required",
    })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID format"),

  star: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),

  message: z
    .string({
      required_error: "Message is required",
    })
    .min(3, "Message must be at least 3 characters long"),
});

export type SendFeedbackDto = z.infer<typeof sendFeedbackDto>;
