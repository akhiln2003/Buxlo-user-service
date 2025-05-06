import { BadRequest, InternalServerError } from "@buxlo/common";
import { Is3Service } from "../../../infrastructure/@types/Is3Service";
import {  IdeleteUserProfileImageUseCase } from "../../interface/common/IdeleteProfileImageUseCase";
import { IuserRepository } from "../../../domain/interfaces/Iuserrepository";
import { User } from "../../../domain/entities/user";

export class DeleteUserProfileImageUseCase
  implements IdeleteUserProfileImageUseCase
{
  constructor(
    private userRepositary: IuserRepository,
    private s3Service: Is3Service
  ) {}
  async execute(key: string, id: string): Promise<User | any> {
    try {
      if (!key || !id) {
        throw new BadRequest();
      }
      await this.s3Service.deleteImageFromBucket( `UserProfiles/${key}`);
      const data = await this.userRepositary.deleteUserProfileData(id, {
        avatar: key,
      });

      return data;
    } catch (error) {
      console.error("Error from deleteUserProfileUseCase : ", error);

      throw new InternalServerError();
    }
  }
}
