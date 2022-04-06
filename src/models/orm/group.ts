import mongoose from "mongoose";
const { model, Schema } = mongoose;

const GroupSchema = new Schema(
  {
    title: {
      type: "string",
      maxLength: 20,
    },
    resources: [
      { type: Schema.Types.ObjectId, ref: "Resource", required: false },
    ],
  },
  { timestamps: true }
);

export interface IGroup extends Document {
  title: string;
  resources: any[];
}

export default model<IGroup>("Group", GroupSchema);
