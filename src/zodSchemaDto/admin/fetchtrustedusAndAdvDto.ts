import { z } from "zod";

export const fetchtrustedusAndAdvDto = z.object({
    page: z.string({
        required_error: "page number is required",
      }),
});
