import mongoose from "mongoose";

interface AdvAttr {
  _id: string;
  image: string;
  title: string;
  description: string;
}

interface AdvDoc extends mongoose.Document {
  _id: string;
  image: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Model with a custom build method
interface MentorModel extends mongoose.Model<AdvDoc> {
  build(attributes: AdvAttr): AdvDoc;
}

const advSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

// Attach the `build` adv to the schema's static methods
advSchema.statics.build = (attrs: AdvAttr) => {
  return new AdvSchema(attrs); // Return a new adv instance
};

const AdvSchema = mongoose.model<AdvDoc, MentorModel>("Adv", advSchema);

export { AdvSchema };
