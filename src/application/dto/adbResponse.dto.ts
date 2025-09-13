import { BadRequest } from "@buxlo/common";
import { z } from "zod";
import { Adv } from "../../domain/entities/adv.entites";

export const AdvResponseDto = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
});

export type AdvResponseDto = z.infer<typeof AdvResponseDto>;
interface IAdv extends Adv {
  _id?: string;
}
export class AdvMapper {
  static toDto(adv: IAdv): AdvResponseDto {
    if (!adv) {
      throw new BadRequest("User not found");
    }
    return AdvResponseDto.parse({
      id: adv._id ? adv._id.toString() : adv.id?.toString(),
      image: adv.image,
      title: adv.title,
      description: adv.description,
    });
  }
}
