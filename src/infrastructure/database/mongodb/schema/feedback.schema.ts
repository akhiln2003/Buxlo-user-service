import mongoose from "mongoose";

interface FeedBackAttr {
  mentorId: string;
  userId: string;
  message: string;
  star: number;
  like?: string[];
  dislike?: string[];
}

interface FeedBackDoc extends mongoose.Document {
  mentorId: string;
  userId: string;
  message: string;
  star: number;
  like: string[];
  dislike: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface FeedBackModel extends mongoose.Model<FeedBackDoc> {
  build(attrs: FeedBackAttr): FeedBackDoc;
}

const feedBackSchema = new mongoose.Schema(
  {
    mentorId: {
      type: String,
      ref: "Mentor",
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    like: {
      type: [String],
      default: [],
    },
    dislike: {
      type: [String],
      default: [],
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

feedBackSchema.statics.build = (attrs: FeedBackAttr) => {
  return new FeedBackSchema(attrs);
};

const FeedBackSchema = mongoose.model<FeedBackDoc, FeedBackModel>(
  "FeedBack",
  feedBackSchema
);


export { FeedBackSchema };
