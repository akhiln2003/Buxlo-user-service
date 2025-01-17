import { BadRequest } from "@buxlo/common";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import { IfetchProfileImageUseCase } from "../../interface/common/fetchMentorProfileImageUseCase";

export class FetchProfileImageUseCase implements IfetchProfileImageUseCase {
  constructor(private s3Service: Is3Service) {}
  async execute(key: string): Promise<string | any> {
    try {
      const imageUrl = await this.s3Service.getImageFromBucket(key);
      return imageUrl;
    } catch (error) {
      console.error(error);

      throw new BadRequest("Faild to get profile image");
    }
  }
}
