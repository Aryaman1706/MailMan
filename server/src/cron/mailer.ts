import nodemailer, { SentMessageInfo } from "nodemailer";
import handlebars from "handlebars";

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: "OAuth2",
    user: "1761ary@gmail.com",
    clientId: "",
    clientSecret: "",
    refreshToken: "",
    accessToken: "",
  },
});

const mailer = async (
  htmlTemplate: string,
  subject: string,
  emailList: Array<{ [key: string]: string }>
) => {
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
          return error;
        })
    );
  });

  return Promise.all(promiseList);
};

export default mailer;
