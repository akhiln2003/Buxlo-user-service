import { z } from "zod";

export const verifyProfileDto = z.object({
  data: z.object({
    aadhaarName: z.string({
      required_error: "Aadhaar Name is required",
    })
    .min(3, "Aadhaar Name cannot minimum 3 character")
    .regex(/^[a-zA-Z\s]+$/, "Aadhaar Name must contain only alphabets and spaces"),
    
    aadhaarNumber: z.string({
      required_error: "Aadhaar Number is required",
    })
    .regex(/^\d{12}$/, "Aadhaar Number must be a 12-digit numeric value"),

    id: z.string({
      required_error: "ID is required",
    }).regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID format"), 
  }),
  
  frontImage: z.any().optional(), // Accepts any type (e.g., Buffer, File, Blob)
  backImage: z.any().optional(),  // Accepts any type (e.g., Buffer, File, Blob)
});
