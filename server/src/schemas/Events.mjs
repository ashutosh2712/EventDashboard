import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  type: { type: mongoose.Schema.Types.String, require: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  timestamp: { type: mongoose.Schema.Types.Date, default: Date.now },
});

const Events = mongoose.model("Events", eventSchema);

export default Events;
