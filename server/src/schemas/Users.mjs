import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: Schema.Types.String, require: true },
  email: { type: Schema.Types.String, require: true },
  password: { type: Schema.Types.String, require: true },
});

export const Users = mongoose.model("Users", userSchema);
