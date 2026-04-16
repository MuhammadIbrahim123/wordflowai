import { Model, Schema, Types, model, models } from "mongoose";

export interface IGeneration {
  userId: Types.ObjectId;
  toolId: string;
  toolName: string;
  input: Record<string, unknown>;
  output: string;
  wordCount: number;
  createdAt: Date;
}

const generationSchema = new Schema<IGeneration>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  toolId: { type: String, required: true },
  toolName: { type: String, required: true },
  input: { type: Schema.Types.Mixed, required: true },
  output: { type: String, required: true },
  wordCount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Generation =
  (models.Generation as Model<IGeneration>) ||
  model<IGeneration>("Generation", generationSchema);

export default Generation;
