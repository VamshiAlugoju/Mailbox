import mongoose, { Model, Schema } from "mongoose";

export type role = "ADMIN" | "CUSTOMER"


export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  gender?: string;
  role: role;
  password: string;
  isActive: boolean;
  bookmarks: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: false,
      enum: ["ADMIN", "CUSTOMER"],
    },
    bookmarks: {
      type: [mongoose.Types.ObjectId],
      ref: "mail",
      default: [],
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userModel: Model<IUser> = mongoose.model<IUser>("user", userSchema);

export default userModel;
