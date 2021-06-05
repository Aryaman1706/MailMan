import { Writable } from "stream";

const writeToFile = (stream: Writable, data: string): Promise<string> =>
  new Promise((resolve, reject) => {
    stream.write(data);
    stream.end();

    stream.on("error", () => {
      reject("error");
    });

    stream.on("finish", () => {
      resolve("done");
    });
  });

export default writeToFile;
