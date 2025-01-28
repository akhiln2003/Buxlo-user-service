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

  async getAdvDetails(): Promise<Adv[] | null> {
    try {
      const adv = await AdvSchema.find();
      return adv;
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
