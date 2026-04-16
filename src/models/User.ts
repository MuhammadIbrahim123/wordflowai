import { Model, Schema, model, models } from "mongoose";

export type UserPlan = "free" | "starter" | "pro";

export interface IUser {
  name: string;
  email: string;
  password: string;
  plan: UserPlan;
  credits: {
    used: number;
    total: number;
  };
  stripeCustomerId?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  plan: { type: String, enum: ["free", "starter", "pro"], default: "free" },
  credits: {
    used: { type: Number, default: 0 },
    total: { type: Number, default: 5000 },
  },
  stripeCustomerId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);

export default User;
