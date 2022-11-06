const nodemailer = require("nodemailer");

async function main(){

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "dharpurepraju8@gmail.com",
      pass: "csvbjxbeqkiikazx"
    }});

    const mail_options = {
      from: "dharpurepraju8@gmail.com",
      to: 'anandshirbhaiyye@gmail.com, prajaktadharpure28@gmail.com',
      subject: 'Test Email to Team',
      text: 'Hello Anand'
    };

    smtpTransport.sendMail(mail_options, (error, response)=>{
      if(error){
        console.log(error);
      }else{
        console.log('Email sent');
      }
      smtpTransport.close();
    });
}

main().catch(console.error);