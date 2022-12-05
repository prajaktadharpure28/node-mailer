import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
const __dirname = path.resolve();

dotenv.config();

const app = express();
app.use(express.json());

app.post('/send', (req, res) => {
  const { to, subject, text } = req.body;
  console.log(req.body);

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: text
  };

  smtpTransport.sendMail(mailOptions, () => {
    smtpTransport.close();
  });

  res.json({
    status: true,
    message: 'Email sent successfully'
  })
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// const nodemailer = require("nodemailer");

// async function main(){

//   const smtpTransport = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: "dharpurepraju8@gmail.com",
//       pass: "csvbjxbeqkiikazx"
//     }});

//     const mail_options = {
//       from: "dharpurepraju8@gmail.com",
//       to: 'anandshirbhaiyye@gmail.com, prajaktadharpure28@gmail.com',
//       subject: 'Test Email to Team',
//       text: 'Hello Anand'
//     };

//     smtpTransport.sendMail(mail_options, (error, response)=>{
//       if(error){
//         console.log(error);
//       }else{
//         console.log('Email sent');
//       }
//       smtpTransport.close();
//     });
// }

// main().catch(console.error);