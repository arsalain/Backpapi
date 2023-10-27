import Book from '../Model/Book.js';
import crypto from 'crypto'
import razorpay from '../Middleware/razorpay.js'
import nodemailer from "nodemailer"

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
      eventName: req.body.eventName,
      selecteddate: req.body.selecteddate,
      username: req.body.username,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      source:req.body.source,
      gst: req.body.gst,
      amount:req.body.amount,
      withtransport: req.body.withtransport,
      withouttransport: req.body.withouttransport,
      razorpayOrderId:req.body.razorpayOrderId,
      razorpayPaymentId: req.body.razorpayPaymentId
    });

    await newPayment.save();

    const userConfirmationEmail = `
    Thank you for your payment. Your payment of $${req.body.amount} has been successfully processed. Be ready at ${req.body.selecteddate}.
  `;

  // Replace the following with your email configuration
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'info@backpackersunited.in',
      pass: 'A53Eo-!*',
    },
  });

  const mailOptions = {
    from: 'info@backpackersunited.in',
    to: req.body.email, // User's email address
    subject: 'Payment Confirmation',
    text: userConfirmationEmail,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error sending user confirmation email:', error);
    } else {
      console.log('User confirmation email sent');
    }
  });

  // Send emails to three different email addresses
  const recipients = ['info@backpackersunited.in', 'ateeq@backpackersunited.in', 'habeeb@backpackersunited.in'];

  recipients.forEach((recipient) => {
    const adminNotificationEmail = `
      Payment received from ${req.body.username}.
      Amount: $${req.body.amount}
    `;

    const adminMailOptions = {
      from: 'info@backpackersunited.in',
      to: recipient,
      subject: 'New Payment Received',
      text: adminNotificationEmail,
    };

    transporter.sendMail(adminMailOptions, (error) => {
      if (error) {
        console.error('Error sending admin notification email:', error);
      } else {
        console.log('Admin notification email sent');
      }
    });
  });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
