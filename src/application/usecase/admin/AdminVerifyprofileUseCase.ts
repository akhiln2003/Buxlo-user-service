import { BadRequest } from "@buxlo/common";
import { ImentorRepository } from "../../../domain/interfaces/ImentorRepository";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import { IadminVerifyprofileUseCase } from "../../interface/admin/IadminVerifyprofileUseCase";
import { MentorResponseDto } from "../../../zodSchemaDto/output/mentorResponse.dto";

export class AdminVerifyprofileUseCase implements IadminVerifyprofileUseCase {
  constructor(
    private _mentorRepository: ImentorRepository,
    private _s3Service: Is3Service
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
  ): Promise<MentorResponseDto> {
    try {
      if (verified === "applicationPending") {
        if (!unsetData) {
          throw new BadRequest("Images are missing, please try again later.");
        }

        const deletePromises = [
          this._s3Service.deleteImageFromBucket(
            `Kyc/${unsetData.aadhaarFrontImage}`
          ),
          this._s3Service.deleteImageFromBucket(
            `Kyc/${unsetData.aadhaarBackImage}`
          ),
        ];

        await Promise.all(deletePromises);
      }

      return await this._mentorRepository.verifyProfile(
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
