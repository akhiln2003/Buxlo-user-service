import { z } from "zod";

export const deleteAdvAndTrustedUsimageDto = z.object({
    id: z.string().refine((id) => {
        return /^[0-9a-f]{24}$/.test(id);
    }, {
        message: "Invalid MongoDB ObjectId",
    }),
    key: z.string({
        required_error: "Key is required",
      }),
  });