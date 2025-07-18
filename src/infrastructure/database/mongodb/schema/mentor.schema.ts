import mongoose from "mongoose";

interface MentorAttr {
  _id: string;
  name: string;
  email: string;
  role: string;
  salary: number;
  avatar?: string;
  isGoogle: boolean;
  number?: string;
  bio?: string;
  expertise?: string[];
  yearsOfExperience?: number;
  verified?: "verified" | "applicationPending" | "verificationPending";
  aadhaarFrontImage?: string;
  aadhaarBackImage?: string;
  aadhaarName?: string;
  aadhaarNumber?: string;
}

interface MentorDoc extends mongoose.Document {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  isGoogle: boolean;
  role: "mentor" | "admin";
  salary: number;
  bio?: string;
  expertise?: string[];
  yearsOfExperience?: number;
  verified: "verified" | "applicationPending" | "verificationPending";
  aadhaarFrontImage?: string;
  aadhaarBackImage?: string;
  aadhaarName?: string;
  aadhaarNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Model with a custom build method
interface MentorModel extends mongoose.Model<MentorDoc> {
  build(attributes: MentorAttr): MentorDoc;
}

const mentorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
    isGoogle: {
      type: Boolean,
      default: false,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["mentor", "admin"],
    },
    bio: {
      type: String,
    },
    expertise: {
      type: String,
    },
    yearsOfExperience: {
      type: Number,
    },
    salary: {
      type: Number,
      require: true,
      default: 0,
    },
    verified: {
      type: String,
      enum: ["verified", "applicationPending", "verificationPending"],
      default: "applicationPending",
      required: true,
    },
    aadhaarFrontImage: {
      type: String,
    },
    aadhaarBackImage: {
      type: String,
    },
    aadhaarName: {
      type: String,
    },
    aadhaarNumber: {
      type: String,
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

// Attach the `build` method to the schema's static methods
mentorSchema.statics.build = (attrs: MentorAttr) => {
  return new MentorProfile(attrs); // Return a new Mentor instance
};

const MentorProfile = mongoose.model<MentorDoc, MentorModel>(
  "Mentor",
  mentorSchema
);

export { MentorProfile };
