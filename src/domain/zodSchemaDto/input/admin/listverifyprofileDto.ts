import { z } from "zod";

export const fetchverifyprofileDto = z.object({
  page: z.string({
    required_error: "page number is required",
  }),

  searchData: z
    .string({
      required_error: "searchData must be string",
    })
    .optional(),
    verified: z.enum(["verified", "applicationPending", "verificationPending" , "all"], {
      required_error: "Verification status is required",
  }),
});
