import mongoose from "mongoose";
const { model, Schema } = mongoose;

const ResourceSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    title: {
      type: "string",
      maxLength: 25,
    },
    description: {
      type: "string",
      maxLength: 60,
    },
    url: {
      type: "string",
    },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
  },
  { timestamps: true }
);

export interface IResource extends Document {
  _id: number;
  title: string;
  description: string;
  url: string;
  group: number;
}

export default model<IResource>("Resource", ResourceSchema);
