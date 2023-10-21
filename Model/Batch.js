import mongoose from "mongoose";
const BatchSchema = new mongoose.Schema(
  {
    startdate: {
      type: String,
    },
    enddate: {
      type: String,
    },
    starttime: {
        type: String, 
    },
    endtime: {
        type: String, 
    },
  whowillgo: {
    type: String, 
  },
    comment: {
        type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Batch", BatchSchema);