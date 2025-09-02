import { z } from "zod";

export const MentorResponseDto = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  isGoogle: z.boolean(),
  role: z.enum(["mentor", "admin"]),
  bio: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  yearsOfExperience: z.number().optional(),
  verified: z.enum(["verified", "applicationPending", "verificationPending"]),
  aadhaarFrontImage: z.string().optional(),
  aadhaarBackImage: z.string().optional(),
  aadhaarName: z.string().optional(),
  aadhaarNumber: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type MentorResponseDto = z.infer<typeof MentorResponseDto>;

export class MentorMapper {
  static toDto(mentor: any): MentorResponseDto {
    return MentorResponseDto.parse({
      id: mentor.id ? mentor.id : mentor._id,
      name: mentor.name,
      email: mentor.email,
      avatar: mentor.avatar,
      isGoogle: mentor.isGoogle,
      role: mentor.role,
      bio: mentor.bio,
      expertise: mentor.expertise,
      yearsOfExperience: mentor.yearsOfExperience,
      verified: mentor.verified,
      aadhaarFrontImage: mentor.aadhaarFrontImage,
      aadhaarBackImage: mentor.aadhaarBackImage,
      aadhaarName: mentor.aadhaarName,
      aadhaarNumber: mentor.aadhaarNumber,
      createdAt: mentor.createdAt,
      updatedAt: mentor.updatedAt,
    });
  }
}
