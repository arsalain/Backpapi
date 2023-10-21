import Book from '../Model/Book.js';
import crypto from 'crypto'
import razorpay from '../Middleware/razorpay.js'

export const initiatepayment = async (req,res,next)=>{
  if (req.method !== 'POST') return res.status(405).end();

  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "receipt#1",
    payment_capture: '0'
  };

  try {
    const response = await razorpay.orders.create(options);
    res.status(200).json({ orderId: response.id });
  } catch (error) {
    res.status(500).send(error);
  }
}

export const verifypayment = async (req,res,next)=>{
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  if (generatedSignature === razorpaySignature) {
    res.status(200).json({ verified: true });
  } else {
    res.status(400).json({ verified: false });
  }
}
// pages/api/savePayment.js


export const savepayment = async (req,res,next)=>{

  try {
    const newPayment = new Book({
      selecteddate: req.body.selecteddate,
      username: req.body.username,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      source:req.body.source,
      amount:req.body.amount,
      razorpayOrderId:req.body.razorpayOrderId,
      razorpayPaymentId: req.body.razorpayPaymentId
    });

    await newPayment.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
