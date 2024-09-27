import nodemailer from "nodemailer";

export const sendMail = async (mailOptions) => {
  console.log(process.env.SMTP_FROM, process.env.SMTP_PASS)
  
    const transporter = nodemailer.createTransport({
      host: "smtp.mailersend.net",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_FROM,
        pass: process.env.SMTP_PASS,
      }
    });

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (!err) {
          console.log("success", info.response);
          resolve(info)
        }
        console.log("failed", err);
        reject(err)
      });
    })
};

