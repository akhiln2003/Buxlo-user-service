import { z } from "zod";

export const fetchAadhaarImagesDto = z.array(
    z.string().refine((key) => /^Kyc\/\d+\.\d+$/.test(key), {
        message: "Each key must start with 'Kyc/' followed by a numeric string with a decimal",
    })
).nonempty({
    message: "Keys array cannot be empty",
});
