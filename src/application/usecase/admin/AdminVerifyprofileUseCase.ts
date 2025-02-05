import { BadRequest } from "@buxlo/common";
import { Mentor } from "../../../domain/entities/mentor";
import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import { IadminVerifyprofileUseCase } from "../../interface/admin/IadminVerifyprofileUseCase";

export class AdminVerifyprofileUseCase implements IadminVerifyprofileUseCase {
  constructor(
    private mentorRepository: ImentorRepository,
    private s3Service: Is3Service
  ) {}

  async execute(
    id: string,
    verified: "verified" | "applicationPending",
    unsetData?: {
      aadhaarFrontImage: string;
      aadhaarBackImage: string;
      aadhaarName: string;
      aadhaarNumber: string;
    }
  ): Promise<Mentor | null> {
    try {
      if (verified === "applicationPending") {
        if (!unsetData) {
          throw new BadRequest("Images are missing, please try again later.");
        }

        const deletePromises = [
          this.s3Service.deleteImageFromBucket(unsetData.aadhaarFrontImage),
          this.s3Service.deleteImageFromBucket(unsetData.aadhaarBackImage),
        ];

        await Promise.all(deletePromises);
      }

      return await this.mentorRepository.verifyProfile(
        id,
        verified,
        unsetData || undefined
      );
    } catch (error) {
      console.error("Error during profile verification:", error);
      throw new BadRequest("Something went wrong, please try again later.");
    }
  }
}
