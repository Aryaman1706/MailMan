import { Readable } from "stream";

const readFile = (stream: Readable): Promise<string> =>
  new Promise((resolve, reject) => {
    let data: string = "";

    stream.setEncoding("utf8");

    stream
      .on("data", (chunk) => {
        data += chunk;
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (err) => {
        reject(err);
      });
  });

export default readFile;
