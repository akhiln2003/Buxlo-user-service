import { z } from "zod";

export const disLikeAndLikeDto = z.object({
  id: z
    .string({
      required_error: "Feedback ID is required",
    })
    .min(1, "Feedback ID cannot be empty"),

  userId: z
    .string({
      required_error: "User ID is required",
    })
    .min(1, "User ID cannot be empty"),

  option: z.enum(["like", "disLike"], {
    required_error: "Option must be either 'like' or 'disLike'",
  }),

  remove: z.boolean({
    required_error: "Remove must be a boolean value",
  }),
});
