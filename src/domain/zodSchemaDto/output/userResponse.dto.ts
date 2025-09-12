import { BadRequest } from "@buxlo/common";
import { z } from "zod";

export const UserResponseDto = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  isGoogle: z.boolean(),
  role: z.enum(["user", "admin"]),
  premiumId: z.string().optional(),
  premiumEndDate: z.date().optional(),
});

export type UserResponseDto = z.infer<typeof UserResponseDto>;

export class UserMapper {
  static toDto(user: any): UserResponseDto {
    if (!user) {
      throw new BadRequest("User not found");
    }
    return UserResponseDto.parse({
      id: user._id ? user._id.toString() : user.id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isGoogle: user.isGoogle,
      role: user.role,
      premiumId: user.premiumId ?? undefined,
      premiumEndDate: user.premiumEndDate
        ? new Date(user.premiumEndDate)
        : undefined,
    });
  }
}
