import { z } from "zod";

export const fetchProfileImageDto = z.object({
  keys: z.array(z.string(), {
    required_error: "Keys are required",
  }),
});
