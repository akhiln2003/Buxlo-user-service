import { TrustedUs } from "../../domain/entities/trustedUs";
import { ItrustedUsRepository } from "../../domain/interfaces/ItrustedUsRepository";
import { TrustedUsSchema } from "../database/mongodb/schema/trustedUs.schema";

export class TrustedUsRepository implements ItrustedUsRepository {
  async create({
    id,
    image,
  }: {
    id: string;
    image: string;
  }): Promise<TrustedUs> {
    try {
      const newAdv = TrustedUsSchema.build({
        _id: id,
        image,
      });
      return await newAdv.save();
    } catch (error: any) {
      throw new Error(`db error: ${error.message}`);
    }
  }

  async getTrustedUsDetails(page:number): Promise<{ trustedUs: TrustedUs[]; totalPages: number } | null> {
    try {
      const limit = 5; // Number of users per page
      const skip = (page - 1) * limit;

      const totalCount = await TrustedUsSchema.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);
      const trustedUs = await TrustedUsSchema.find().sort({_id:-1}).skip(skip).limit(limit);

      return { trustedUs , totalPages };
    } catch (error: any) {
      console.error(error);

      throw new Error(`db error to fetch user: ${error.message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
       await TrustedUsSchema.findByIdAndDelete(id);
    } catch (error: any) {
      console.error(error);

      throw new Error(`db error to fetch user: ${error.message}`);
    }
  }
}
