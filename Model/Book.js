import mongoose from "mongoose";
const BookSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
    },
    eventName: {
      type: String,
    },
    batchname: {
        type: String, 
    },
    batchDate: {
        type: Date,
        default: function () {
          const currentTime = new Date();
          const year = currentTime.getFullYear();
          const month = (currentTime.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, so we add 1
          const day = currentTime.getDate().toString().padStart(2, '0');
          
          return `${year}-${month}-${day}`;
        },
    },
  batchTime: {
    type: String, 
    default: function () {
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
  },
  slecteddate: {
    type: String,
  },
    username: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    email:{
      type: String,
  },
    source: {
        type: String,
    },
    discount: {
        type: String,
    },
    amount: {
        type: Number,
    },
    amountrefunded: {
        type: Number,
    },
    pendingamount: {
        type: Number,
    },
    gst: {
        type: String, 
    },
    razorpayOrderId: {
        type: String, 
    },
    razorpayPaymentId: {
        type: String, 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);