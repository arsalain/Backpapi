import mongoose from "mongoose";
const TrekSchema = new mongoose.Schema(
  {
    name: { type: String },
    state: { type: String },
    for: {type: String },
    fromamount: { type: String },
    day: { type: String },
    trektype: { type: String },
    trektypename: { type: String },
    level: { type: String },
    levelname: { type: String },
    service: { type: String },
    servicename: { type: String },
    statename: { type: String },
    expertpara: { type: String },
    lead1name: { type: String },
    lead1oc: { type: String },
    lead1pimg: { type: String },
    lead2name: { type: String },
    lead2oc: { type: String },
    lead2pimg: { type: String },
    days: [{
      day: {
          type: String,
      },
      cityName: {
          type: String,
      },
      description: [String],
      meals: {
          type: String,
      },
      image: {
          type: String,
      },
  }],
  over: [String],
    batches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }],
  },
  { timestamps: true }
);

export default mongoose.model("Trek", TrekSchema);