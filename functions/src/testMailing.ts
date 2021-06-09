import nodemailer from "nodemailer";

const main = async () => {
  try {
    const smtpTransport = nodemailer.createTransport({
      port: 465,
      name: "mail.absoluteveritas.com",
      host: "mail.absoluteveritas.com",
      auth: {
        user: "cs6@absoluteveritas.com",
        pass: "testPassword123",
      },
      secure: true,
      logger: true,
      // ignoreTLS: true,
    });

    const verified = await smtpTransport
      .verify()
      .catch((err: Error) => err.message);
    if (typeof verified === "string") {
      console.log("SMTP connection failed");
      return;
    }

    await smtpTransport.sendMail({
      from: "cs6@absoluteveritas.com",
      to: "1761ary@gmail.com",
      subject: "Test",
      text: "test",
    });

    console.log("mail sent.");
  } catch (error) {
    console.error(error);
  }
};

main();
