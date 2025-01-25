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

  async getTrustedUsDetails(): Promise<TrustedUs[] | null> {
    try {
      const userDetails = await TrustedUsSchema.find();
      return userDetails;
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
