import { z } from "zod";
import { BadRequest } from "@buxlo/common";
import { TrustedUs } from "../../domain/entities/trustedUs.entity";

export const TrustedUsResponseDto = z.object({
  id: z.string(),
  image: z.string(),
});

export type TrustedUsResponseDto = z.infer<typeof TrustedUsResponseDto>;
interface ITrustedUs extends TrustedUs {
  _id?: string;
}
export class TrustedUsMapper {
  static toDto(adv: ITrustedUs): TrustedUsResponseDto {
    if (!adv) {
      throw new BadRequest("User not found");
    }
    return TrustedUsResponseDto.parse({
      id: adv._id ? adv._id.toString() : adv.id?.toString(),
      image: adv.image,
    });
  }
}
