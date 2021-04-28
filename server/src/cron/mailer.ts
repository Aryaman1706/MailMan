import nodemailer, { SentMessageInfo } from "nodemailer";
import handlebars from "handlebars";
import { promises as fs } from "fs";
import path from "path";
import { google } from "googleapis";

type responseData = {
  info?: {
    [key: string]: string;
  };
  error?: string;
};

const mailer = async (
  htmlTemplate: string,
  subject: string,
  emailList: Array<{ [key: string]: string }>
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

  const template = handlebars.compile(htmlTemplate);
  const promiseList: SentMessageInfo[] = [];

  emailList.forEach((value) => {
    const htmlToSend = template({ ...value });
    promiseList.push(
      smtpTransport
        .sendMail({
          from: '"Aryaman Grover" <1761ary@gmail.com>',
          to: value.email,
          subject: subject,
          html: htmlToSend,
        })
        .catch((error) => {
          console.log(error);
          return { error: error.message || "Error in sending mail." };
        })
    );
  });

  const mailInfo: responseData[] = await Promise.all(promiseList);
  const erroredMails = mailInfo.filter((obj) => obj.error);

  await fs.writeFile(
    path.resolve(__dirname, "./", "result.json"),
    JSON.stringify({ mailInfo, erroredMails })
  );
  console.log("result.json filled.");
};

export default mailer;
