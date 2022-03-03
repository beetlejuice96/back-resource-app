import mongoose from "mongoose";
const { model, Schema } = mongoose;

const ResourceSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    url: {
      type: "string",
    },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
  }
  // {
  //   timestamps: {
  //     createdAt: "createdAt",
  //     updatedAt: "updatedAt",
  //   },
  // }
);

export interface IResource extends Document {
  title: string;
  description: string;
  url: string;
  group: number;
}

export default model<IResource>("Resource", ResourceSchema);
