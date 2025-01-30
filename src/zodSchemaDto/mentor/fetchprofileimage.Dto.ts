import { z } from "zod";

export const fetchprofileimageDto = z.object({
  key: z.string({
    required_error: "Key is required",
  }),
});
