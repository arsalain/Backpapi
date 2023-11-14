import Member from '../Model/Member.js';
import crypto from 'crypto'
import razorpay from '../Middleware/razorpay.js'
import nodemailer from "nodemailer"

export const initiatememberpayment = async (req,res,next)=>{
  if (req.method !== 'POST') return res.status(405).end();
  console.log(req.body.totalamount,"hey")
  const options = {
    amount: req.body.totalamount * 100,
    currency: "INR",
    receipt: "receipt#1",
    payment_capture: '0'
  };
console.log(req.body.totalamount,"hey")
  try {
    const response = await razorpay.orders.create(options);
    res.status(200).json({ orderId: response.id });
  } catch (error) {
    res.status(500).send(error);
  }
}

export const verifymemberpayment = async (req,res,next)=>{
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

export const savemember = async (req, res, next) => {
    try {
      const memberCount = await Member.countDocuments();
  
      // Generate a unique member ID
      const memberId = `bpuMember${Date.now()}${memberCount + 1}`;
  
      const newMember = new Member({
        memberId,
        title: req.body.title,
        passtype: req.body.passtype,
        activationdate: req.body.activationdate,
        expiringdate: req.body.expiringdate,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        amount: req.body.amount,
        gst: req.body.gst,
        totalamount: req.body.totalamount,
        razorpayOrderId: req.body.razorpayOrderId,
        razorpayPaymentId: req.body.razorpayPaymentId,
        // Add any other fields you need to save
      });
  
      await newMember.save();

      const userConfirmationEmail = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Processed Notification</title>
        <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #000000 !important;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
  
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        color: #000000 !important;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      h1 {
        color: #3498db;
      }
  
      p {
        color: #000000 !important;
        margin-bottom: 10px;
      }
  
      ul {
        color: #000000 !important;
        list-style-type: none;
        padding: 0;
      }
  
      li {
        margin-bottom: 5px;
        color: #000000 !important;
      }
  
      .footer {
        margin-top: 20px;
        padding-top: 10px;
        border-top: 1px solid #ddd;
      }
  
      .social-icons {
        margin-top: 10px;
      }
  
      .social-icons a {
        margin-right: 10px;
        text-decoration: none;
      }
  
      .social-icons img {
        width: 30px;
        border-radius: 50%;
      }

      </style>
      </head>
      <body>
      <div class="container">
      <h1>Welcome to Our Membership Program!</h1>
      <p>Dear ${req.body.firstname} ${req.body.lastname},</p>
      <p>Thank you for choosing Backpackers United for your travel adventures! We're thrilled to confirm that your Travel Pass has been successfully unlocked. This is the first step towards unlocking a world of incredible experiences, and we can't wait for you to embark on this journey with us.</p>
      <h2>Pass Details:</h2>
      <ul>
        <li><strong>Pass Type:</strong> ${req.body.passtype}</li>
        <li><strong>Validity:</strong> 6 months from the date of activation</li>
        <li><strong>Price:</strong> ₹${req.body.amount}</li>
      </ul>
      <h2>Payment Details:</h2>
      <ul>
        <li><strong>Total Price:</strong> ₹${req.body.amount}</li>
        <li><strong>GST (18%):</strong> ₹${req.body.gst}</li>
        <li><strong>Grand Total:</strong> ₹${req.body.totalamount}</li>
      </ul>
      <h2>Payment Confirmation:</h2>
      <p>Your payment has been processed, and you will receive a separate invoice for your records. If you have any questions regarding the payment or notice any discrepancies, please don't hesitate to contact our customer support team at <a href="mailto:info@bacpackersunited.in">info@bacpackersunited.in</a>.</p>
      <h2>Next Steps:</h2>
      <ol>
        <li><strong>Membership Activation:</strong> Your Travel Pass is now active and valid for 6 months from today.</li>
        <li><strong>Explore the Community:</strong> Join our exclusive community of fellow travelers on [social media links]. Share your experiences, get travel tips, and connect with like-minded adventurers.</li>
      </ol>
      <h2>Important Dates:</h2>
      <ul>
        <li><strong>Pass Activation Date:</strong> ${req.body.activationdate}</li>
        <li><strong>Pass Expiry Date:</strong> ${req.body.expiringdate}</li>
      </ul>
      <h2>Contact Information:</h2>
      <p>If you need any assistance, have questions, or require further information, feel free to reach out to us at <a href="mailto:info@bacpackersunited.in">info@bacpackersunited.in</a> or 8310180586.</p>
      <p>We hope you have thoroughly read and understood our Membership Enrollment Policies, Terms & Conditions, and Cancellation Policies. It's essential to ensure a smooth and enjoyable travel experience. If you have any questions or need clarification on any points, please refer to the policies on our website or contact our support team.</p>
      <p>Thank you once again for choosing Backpackers United. We look forward to being a part of your unforgettable travel experiences!</p>
      <p>Safe travels,</p>
      <p>The Backpackers United Team</p>
    </div>
      </body>
      </html>
      `;


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
        subject: 'star2: Your Backpackers United Travel Pass is Confirmed! :tada: Its Time to Travel! :earth_africa::airplane:',
        html: userConfirmationEmail,
      };
    
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Error sending user confirmation email:', error);
        } else {
          console.log('User confirmation email sent');
        }
      });
      const recipients = ['info@backpackersunited.in', 'ateeq@backpackersunited.in', 'habeeb@backpackersunited.in'];
      const staffNotificationEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Processed Notification</title>
  <style>
    /* CSS styles */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #000000 !important;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      color: #000000 !important;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1, h2 {
      color: #3498db;
    }
    p, ul, li {
      margin-bottom: 10px;
      color: #000000 !important;
    }
    /* Additional styles */
  </style>
</head>
<body>
  <div class="container">
    <h1>Payment Processed Successfully</h1>
    <p>A new payment has been successfully processed. Below are the details of the transaction for your records.</p>
    
    <h2>User Details:</h2>
    <ul> 
    <li><strong>Member Id:</strong> ${memberId}</li>
    <li><strong>Title:</strong> ${req.body.title}</li>
      <li><strong>Name:</strong> ${req.body.firstname} ${req.body.lastname}</li>
      <li><strong>Email:</strong> ${req.body.email}</li>
      <li><strong>Phone Number:</strong> ${req.body.phonenumber}</li>
      <li><strong>Pass Activation Date:</strong> ${req.body.activationdate}</li>
      <li><strong>Pass Expiry Date:</strong> ${req.body.expiringdate}</li>
      <!-- Add more user details as needed -->
    </ul>
    
    <h2>Payment Details:</h2>
    <ul>
      <li><strong>Razorpay Order ID:</strong> ${req.body.razorpayOrderId}</li>
      <li><strong>Razorpay Payment ID:</strong> ${req.body.razorpayPaymentId}</li>
      <li><strong>Amount:</strong> ₹${req.body.amount}</li>
      <li><strong>GST:</strong> ₹${req.body.gst}</li>
      <li><strong>Total Amount:</strong> ₹${req.body.totalamount}</li>
      <!-- Add more payment details as needed -->
    </ul>
    
    <p>If there are any issues or further actions required, please contact the finance team immediately.</p>
    <p>Thank you,</p>
    <p>Backpackers United System Notification</p>
  </div>
</body>
</html>
`;
    const adminMailOptions = {
        from: 'info@backpackersunited.in',
        to: recipients,
        subject: 'New Payment Received',
        html: staffNotificationEmail,
    };
    

    transporter.sendMail(adminMailOptions, (error) => {
      if (error) {
        console.error('Error sending admin notification email:', error);
      } else {
        console.log('Admin notification email sent');
      }
    });
  
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }