import nodemailer, { SentMessageInfo } from "nodemailer";
import { bucket } from "../config/firebase";
import handlebars from "handlebars";
import { promises as fs } from "fs";
import path from "path";
import juice from "juice";
import CryptoJS from "crypto-js";

import { types as mailListTypes } from "../mailList";
import { types as templateTypes } from "../template";

import readFile from "../utils/functions/readFile";
import styles from "../utils/styles";

type MailResult = {
  info: SentMessageInfo | null;
  error: string | null;
};

type Smtp = {
  email: string;
  password: string;
};

const mailer = async (
  mailList: mailListTypes.MailListData,
  smtp: Smtp,
  emailList: templateTypes.Format[]
) => {
  const smtpTransport = nodemailer.createTransport({
    pool: true,
    port: 465,
    name: "mail.absoluteveritas.com",
    host: "mail.absoluteveritas.com",
    auth: {
      user: smtp.email.trim(),
      pass: CryptoJS.AES.decrypt(smtp.password, "69c48f6acb3a752f6935")
        .toString(CryptoJS.enc.Utf8)
        .trim(),
    },
    secure: true,
    logger: true,
  });

  const verified = await smtpTransport
    .verify()
    .catch((err: Error) => err.message);
  if (typeof verified === "string") {
    console.log("SMTP connection failed");
    return;
  }

  const htmlTemplate = await readFile(
    bucket.file(mailList.template.html).createReadStream()
  );
  const attachments = mailList.template.attachements.map((fileName) => ({
    content: bucket.file(fileName).createReadStream(),
  }));

  const template = handlebars.compile(htmlTemplate);

  const promiseList: Promise<MailResult>[] = [];

  emailList.forEach((value) => {
    const htmlToSend = juice.inlineContent(template({ ...value }), styles);
    promiseList.push(
      smtpTransport
        .sendMail({
          from: `"Absolute Veritas" < ${smtp.email} >`,
          to: value.email,
          subject: mailList.template.subject,
          html: htmlToSend,
          attachments,
          bcc: [smtp.email],
        })
        .then((msgInfo: SentMessageInfo) => ({
          info: msgInfo || "Mail sent successfully.",
          error: null,
        }))
        .catch((error: Error) => {
          console.error(error);
          return {
            info: null,
            error: error.message || "Error in sending mail.",
          };
        })
    );
  });

  const mailResults: MailResult[] = await Promise.all(promiseList);
  smtpTransport.close();
  const successfulMails = mailResults.filter((i) => !Boolean(i.error));
  const erroredMails = mailResults.filter((i) => Boolean(i.error));

  await fs.writeFile(
    path.resolve(__dirname, "./", "result.json"),
    JSON.stringify({ successfulMails, erroredMails })
  );
  console.log("result.json filled.");
};

export default mailer;
