// import nodemailer, { SentMessageInfo } from "nodemailer";
import handlebars from "handlebars";
import { promises as fs } from "fs";
import path from "path";

// const smtpTransport = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     type: "OAuth2",
//     user: "1761ary@gmail.com",
//     clientId: "",
//     clientSecret: "",
//     refreshToken: "",
//     accessToken: "",
//   },
// });

const mailer = async (
  htmlTemplate: string,
  subject: string,
  emailList: Array<{ [key: string]: string }>
) => {
  const template = handlebars.compile(htmlTemplate);
  // const promiseList: SentMessageInfo[] = [];
  const list: any[] = [];

  emailList.forEach((value) => {
    const htmlToSend = template({ ...value });
    // promiseList.push(
    //   smtpTransport
    //     .sendMail({
    //       from: '"Aryaman Grover" <1761ary@gmail.com>',
    //       to: value.email,
    //       subject: subject,
    //       html: htmlToSend,
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       return {error};
    //     });
    // );
    list.push({
      html: htmlToSend,
      subject,
      email: value.email,
    });
  });

  // return Promise.all(promiseList);
  await fs.writeFile(
    path.resolve(__dirname, "./", "result.json"),
    JSON.stringify(list)
  );

  console.log("result.json filled");
};

export default mailer;
