import ExcelJS from "exceljs";
import { bucket } from "../../config/firebase";
import chunk from "lodash.chunk";

export type EmailListItem = {
  [key: string]: string;
};

type ReturnData = {
  emailList: Array<Array<EmailListItem>> | [];
  error: string | null;
};

type Format = {
  email: string;
  [k: string]: string;
};

const parse = async (name: string, format: Format): Promise<ReturnData> => {
  try {
    // Creating a workbook
    const workbook = new ExcelJS.Workbook();

    // Validating file
    const file = bucket.file(name);
    const fileExists = (await file.exists())[0];
    if (!fileExists) {
      return {
        emailList: [],
        error: "File does not exists",
      };
    }

    // Reading file
    const fileReadStream = file.createReadStream();
    await workbook.xlsx.read(fileReadStream);

    const emailList: EmailListItem[] = [];

    // Iterating on all worksheets in a workbook
    workbook.eachSheet((worksheet) => {
      if (worksheet.actualRowCount > 1) {
        // Iterating on all rows of a worksheet
        worksheet.eachRow((row, rowNumber) => {
          // Ignoring header
          if (rowNumber > 1) {
            const data: EmailListItem = {};

            Object.keys(format).forEach((key) => {
              data[key] = row.getCell(format[key]).text.trim() || "";
            });

            if (Boolean(data.email)) {
              emailList.push(data);
            }
          }
        });
      }
    });

    // ! MAKE CHANGES HERE
    const chunkedEmailList = chunk(emailList, 5);
    return {
      emailList: chunkedEmailList,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      emailList: [],
      error: "Something failed. Try again",
    };
  }
};

export default parse;
