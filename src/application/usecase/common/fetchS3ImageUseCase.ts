import { BadRequest } from "@buxlo/common";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import { IfetchS3ImageUseCase } from "../../interface/common/IfetchS3ImageUseCase";

export class FetchS3ImageUseCase implements IfetchS3ImageUseCase {
  constructor(private s3Service: Is3Service) {}

  async execute(keys: string[]): Promise<string[]> {
    try {
      const imageUrls = await Promise.all(
        keys.map((key) => this.s3Service.getImageFromBucket(key))
      );

      return imageUrls;
    } catch (error) {
      console.error("Error fetching images:", error);

      throw new BadRequest("Failed to get images");
    }
  }
}
