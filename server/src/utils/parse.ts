import ExcelJS from "exceljs";
import { bucket } from "../config/firebase";
import chunk from "lodash.chunk";

type RemoveNullKey<T> = {
  [Property in keyof T]: NonNullable<T[Property]>;
};

type TrashListItem = {
  [key: string]: string | null;
};

type EmailListItem = RemoveNullKey<TrashListItem>;

export type ReturnData = {
  emailList: Array<Array<EmailListItem>> | [];
  trashList: Array<TrashListItem> | [];
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

    const emailList: EmailListItem[] = [];
    const trashList: TrashListItem[] = [];

    workbook.eachSheet((worksheet) => {
      if (worksheet.actualRowCount > 1) {
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1) {
            const data: { [key: string]: string | null } = {};

            Object.keys(index).forEach((key) => {
              data[key] = row.getCell(index[key]).text.trim() || null;
            });

            let hasNull = false;
            for (const key in data) {
              if (!data[key] && key !== "lastName") {
                hasNull = true;
                return;
              }
            }

            if (hasNull) {
              trashList.push(data);
            } else {
              emailList.push(data as { [key: string]: string });
            }
          }
        });
      }
    });

    // ! MAKE CHANGES HERE
    const chunkedEmailList = chunk(emailList, 5);

    console.log(chunkedEmailList);
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
