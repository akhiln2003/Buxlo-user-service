import { BadRequest } from "@buxlo/common";
import { IMentorRepository } from "../../../domain/interfaces/IMentorRepository";
import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import { IAdminVerifyprofileUseCase } from "../../interface/admin/IAdminVerifyprofileUseCase";
import {
  MentorMapper,
  MentorResponseDto,
} from "../../dto/mentorResponse.dto";

export class AdminVerifyprofileUseCase implements IAdminVerifyprofileUseCase {
  constructor(
    private _mentorRepository: IMentorRepository,
    private _s3Service: IS3Service
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

      const updatedMentor = await this._mentorRepository.verifyProfile(
        id,
        verified,
        unsetData || undefined
      );

      return MentorMapper.toDto(updatedMentor);
    } catch (error) {
      console.error("Error during profile verification:", error);
      throw new BadRequest("Something went wrong, please try again later.");
    }
  }
}
