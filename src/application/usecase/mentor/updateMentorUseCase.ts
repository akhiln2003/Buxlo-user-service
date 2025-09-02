import { BadRequest, InternalServerError } from "@buxlo/common";
import { IMentorRepository } from "../../../domain/interfaces/IMentorRepository";
import {
  IMentorUpdateData,
  IUpdateMentorProfileUseCase,
} from "../../interface/mentor/IUpdateMentorProfileUseCase";
import sharp from "sharp";
import { IS3Service } from "../../../infrastructure/@types/IS3Service";
import { UserUpdatedProducer } from "../../../infrastructure/MessageBroker/kafka/producer/userUpdateProducer";
import {
  MentorMapper,
  MentorResponseDto,
} from "../../../domain/zodSchemaDto/output/mentorResponse.dto";

export class UpdateMentorProfileUseCase implements IUpdateMentorProfileUseCase {
  constructor(
    private _mentorRepositary: IMentorRepository,
    private _s3Service: IS3Service,
    private _userUpdateProducer: UserUpdatedProducer
  ) {}
  async execute(
    id: string,
    updatedData: IMentorUpdateData,
    file: any,
    currentProfileImage: string | undefined
  ): Promise<MentorResponseDto> {
    try {
      if (file) {
        if (currentProfileImage) {
          await this._s3Service.deleteImageFromBucket(
            `mentorProfiles/${currentProfileImage}`
          );
        }
        const randomImageName = Math.random() + Date.now();

        // rezize image
        const buffer = await sharp(file.buffer)
          .resize({ height: 300, width: 300, fit: "cover" })
          .toBuffer();

        const response = await this._s3Service.uploadImageToBucket(
          buffer,
          file.mimetype,
          `MentorProfiles/${randomImageName}`
        );
        if (response.$metadata.httpStatusCode == 200) {
          updatedData = {
            ...updatedData,
            avatar: `${randomImageName}`,
          };
        } else {
          throw new BadRequest("Profile upload faild please try again laiter");
        }
      }
      const data = await this._mentorRepositary.updateMentorProfile(
        id,
        updatedData
      );
      this._userUpdateProducer.produce({ id, query: updatedData });
      return MentorMapper.toDto(data);
    } catch (error) {
      console.error(error);
      throw new InternalServerError();
    }
  }
}
