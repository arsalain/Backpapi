import mongoose from "mongoose";
const TrekSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    state: {
      type: String
    },
    date: {
      type: String
    },
    daynight: {
      type: String
    },
    day: {
      type: String
    },
    type: {
      type: String
    },
    testimage:
    {
        type: String
    },
    person: {
      type: String
    },
    amount: {
      type: Number
    },
    filtertype: {
        type: String
      },
  },
  { timestamps: true }
);

export default mongoose.model("Trek", TrekSchema);