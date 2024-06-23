import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  type: { type: mongoose.Schema.Types.String, require: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
});

const Events = mongoose.model("Events", eventSchema);

export default Events;
