import mongoose from "mongoose";

interface TrustedUsAttr {
  _id:string,
  image: string;
}

interface TrustedUsDoc extends mongoose.Document {
  _id:string,
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Model with a custom build method
interface MentorModel extends mongoose.Model<TrustedUsDoc> {
  build(attributes: TrustedUsAttr): TrustedUsDoc;
}

const trustedUsSchema = new mongoose.Schema(
  {
    image: {
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

// Attach the `build` trustedUs to the schema's static methods
trustedUsSchema.statics.build = (attrs: TrustedUsAttr) => {
  return new TrustedUsSchema(attrs); // Return a new trustedUs instance
};

const TrustedUsSchema = mongoose.model<TrustedUsDoc, MentorModel>("TrustedUs", trustedUsSchema);

export { TrustedUsSchema };
