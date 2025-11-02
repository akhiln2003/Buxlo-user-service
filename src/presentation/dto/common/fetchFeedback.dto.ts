import { z } from "zod";

export const fetchFeedbackDto = z.object({
  page: z.string({
    required_error: "page number is required",
  }),
   mentorId: z
    .string({
      required_error: "Mentor ID is required",
    }),
  searchData: z
    .string({
      required_error: "searchData must be string",
    })
    .optional(),
});
