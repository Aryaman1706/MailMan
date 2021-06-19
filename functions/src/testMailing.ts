import nodemailer from "nodemailer";

const main = async () => {
  try {
    const smtpTransport = nodemailer.createTransport({
      port: 465,
      name: "mail.absoluteveritas.com",
      host: "mail.absoluteveritas.com",
      auth: {
        user: "test1@absoluteveritas.com",
        pass: "testPassword#123",
      },
      secure: true,
    });

    const verified = await smtpTransport
      .verify()
      .catch((err: Error) => err.message);
    if (typeof verified === "string") {
      console.log("SMTP connection failed");
      return;
    }

    await smtpTransport.sendMail({
      from: "test1@absoluteveritas.com",
      to: "1761ary@gmail.com",
      subject: "Test",
      html: `test`,
    });

    console.log("mail sent.");
  } catch (error) {
    console.error(error);
  }
};

main();
