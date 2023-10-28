import { Schema } from "mongoose";

const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }  
);
export default schema;