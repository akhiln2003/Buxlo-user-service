import { z } from "zod";

export const fetchTrustedUsAndAdvImageDto = z.object({
    keys: z.array(z.string()),
});
