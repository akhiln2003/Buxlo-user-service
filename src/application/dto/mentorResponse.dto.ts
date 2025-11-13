import { z } from "zod";
import { Mentor } from "../../domain/entities/mentor.entity";

export const MentorResponseDto = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  isGoogle: z.boolean(),
  role: z.enum(["mentor", "admin"]),
  bio: z.string().optional(),
  expertise: z.string().optional(),
  yearsOfExperience: z.number().optional(),
  verified: z.enum(["verified", "applicationPending", "verificationPending"]),
  aadhaarFrontImage: z.string().optional(),
  aadhaarBackImage: z.string().optional(),
  aadhaarName: z.string().optional(),
  aadhaarNumber: z.string().optional(),
});

export type MentorResponseDto = z.infer<typeof MentorResponseDto>;
interface IMentor extends Mentor {
  _id?: string;
}
export class MentorMapper {
  static toDto(mentor: IMentor): MentorResponseDto {
    return MentorResponseDto.parse({
      id: mentor.id ? mentor.id : mentor._id?.toString(),
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
    });
  }
}
