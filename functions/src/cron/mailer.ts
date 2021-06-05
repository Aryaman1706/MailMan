import nodemailer, { SentMessageInfo } from "nodemailer";
import handlebars from "handlebars";
import { promises as fs } from "fs";
import path from "path";
import { google } from "googleapis";
import { types as mailListTypes } from "../mailList";
import { EmailListItem } from "../utils/functions/parse";
import { bucket } from "../config/firebase";
import readFile from "../utils/functions/readFile";

type MailResult = {
  info: SentMessageInfo | null;
  error: string | null;
};

const mailer = async (
  mailList: mailListTypes.MailListData,
  emailList: EmailListItem[]
) => {
  const OAuth2 = google.auth.OAuth2;
  const oauth2Client = new OAuth2(
    "76344468913-5i065hfpt4p8fkhe60ce5goftadh1h6m.apps.googleusercontent.com",
    "XhjpXy3KeN6UiLyl7NmcPFkw",
    "https://developers.google.com/oauthplayground"
  );
  oauth2Client.setCredentials({
    refresh_token:
      "1//04ARu6D0CZ7YRCgYIARAAGAQSNwF-L9IrOWoXzwYkHJQ3_zii2Dc7oaQVhTLGJZTVaA3c068Uz-LSQj4wnm4EUqguGvp-DPf34FM",
  });

  const accessToken = oauth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    // @ts-ignore
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "1761ary@gmail.com",
      clientId:
        "76344468913-5i065hfpt4p8fkhe60ce5goftadh1h6m.apps.googleusercontent.com",
      clientSecret: "XhjpXy3KeN6UiLyl7NmcPFkw",
      refreshToken:
        "1//04ARu6D0CZ7YRCgYIARAAGAQSNwF-L9IrOWoXzwYkHJQ3_zii2Dc7oaQVhTLGJZTVaA3c068Uz-LSQj4wnm4EUqguGvp-DPf34FM",
      accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const htmlTemplate = await readFile(
    bucket.file(mailList.template.html).createReadStream()
  );
  const template = handlebars.compile(htmlTemplate);

  const promiseList: Promise<MailResult>[] = [];

  emailList.forEach((value) => {
    const htmlToSend = template({ ...value });
    promiseList.push(
      smtpTransport
        .sendMail({
          from: '"Aryaman Grover" <1761ary@gmail.com>',
          to: value.email,
          subject: mailList.template.subject,
          html: htmlToSend,
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
  const successfulMails = mailResults.filter((i) => !Boolean(i.error));
  const erroredMails = mailResults.filter((i) => Boolean(i.error));

  await fs.writeFile(
    path.resolve(__dirname, "./", "result.json"),
    JSON.stringify({ successfulMails, erroredMails })
  );
  console.log("result.json filled.");
};

export default mailer;
