import ExcelJS from "exceljs";
import { bucket } from "../config/firebase";
import chunk from "lodash.chunk";

export type ResultData = {
  [key: string]: string | null;
};

export type ReturnData = {
  emailList: Array<Array<ResultData>> | [];
  trashList: Array<ResultData> | [];
  error: string | null;
};

const parse = async (name: string): Promise<ReturnData> => {
  try {
    const workbook = new ExcelJS.Workbook();
    const file = bucket.file(name);
    const fileExists = (await file.exists())[0];

    if (!fileExists) {
      return {
        emailList: [],
        trashList: [],
        error: "File does not exists",
      };
    }

    const fileReadStream = file.createReadStream();
    await workbook.xlsx.read(fileReadStream);

    const index: {
      [key: string]: string;
    } = {
      ref: "A",
      companyName: "B",
      firstName: "C",
      lastName: "D",
      email: "E",
      country: "F",
    };

    const emailList: ResultData[] = [];
    const trashList: ResultData[] = [];

    workbook.eachSheet((worksheet) => {
      if (worksheet.actualRowCount > 1) {
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1) {
            const data: ResultData = {};

            Object.keys(index).forEach((key) => {
              data[key] = row.getCell(index[key]).text.trim() || null;
            });

            if (Object.values(data).includes(null)) {
              trashList.push(data);
            } else {
              emailList.push(data);
            }
          }
        });
      }
    });

    const chunkedEmailList = chunk(emailList, 10);

    return {
      emailList: chunkedEmailList,
      trashList: trashList,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      emailList: [],
      trashList: [],
      error: "Something failed. Try again",
    };
  }
};

export default parse;
