import { z } from "zod";

export const verifyProfileDto = z.object({
    id: z.string().refine((id) => {
        return /^[0-9a-f]{24}$/.test(id);
    }, {
        message: "Invalid MongoDB ObjectId",
    }),
    verified: z.enum(["verified", "applicationPending", "verificationPending"], {
        required_error: "Verification status is required",
    }),
    unsetData: z.object({
        aadhaarFrontImage: z.string(),
        aadhaarBackImage: z.string(),
        aadhaarName: z.string(),
        aadhaarNumber: z.string(),
    }).optional()
});
