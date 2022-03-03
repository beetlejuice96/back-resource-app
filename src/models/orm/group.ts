import mongoose from "mongoose";
const { model, Schema } = mongoose;

const GroupSchema = new Schema({
  title: {
    type: "string",
  },
  resources: [
    { type: Schema.Types.ObjectId, ref: "Resource", required: false },
  ],
});

export interface IGroup extends Document {
  title: string;
  resources: [];
}

export default model<IGroup>("Group", GroupSchema);
