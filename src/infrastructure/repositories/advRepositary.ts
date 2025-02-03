import { BadRequest } from "@buxlo/common";
import { Adv } from "../../domain/entities/adv";
import { IadvRepository } from "../../domain/interfaces/IadvRepository";
import { AdvSchema } from "../database/mongodb/schema/adv.schema";

export class AdvRepository implements IadvRepository {
  async create(adv: Adv): Promise<Adv> {
    try {
      const newAdv = AdvSchema.build({
        _id: adv.id as string,
        image: adv.image,
        title: adv.title,
        description: adv.description,
      });
      return await newAdv.save();
    } catch (error: any) {
      throw new BadRequest(`${error.message}`);
    }
  }

  async getAdvDetails(page: number): Promise<{ advs: Adv[]; totalPages: number } | null> {
    try {
      const limit = 5; // Number of users per page
      const skip = (page - 1) * limit;

      const totalCount = await AdvSchema.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);
      const advs = await AdvSchema.find().sort({_id:-1}).skip(skip).limit(limit);

      return { advs, totalPages };
    } catch (error: any) {
      console.error(error);

      throw new Error(`db error to fetch user: ${error.message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await AdvSchema.findByIdAndDelete(id);
    } catch (error: any) {
      console.error(error);

      throw new Error(`db error to delete user: ${error.message}`);
    }
  }
  async update(
    id: string,
    data: { title?: string; description?: string; image?: string }
  ): Promise<Adv | any> {
    try {
      const updatedData = await AdvSchema.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      return updatedData;
    } catch (error: any) {
      console.error(error);

      throw new Error(`db error to edit user: ${error.message}`);
    }
  }
}
