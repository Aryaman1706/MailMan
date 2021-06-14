import ExcelJS from "exceljs";
import { bucket } from "../../config/firebase";
import chunk from "lodash.chunk";

// Types
import { types as TemplateTypes } from "../../template";

type ReturnData = {
  emailList: Array<Array<TemplateTypes.Format>> | [];
  error: string | null;
};

const parse = async (
  name: string,
  format: TemplateTypes.Format
): Promise<ReturnData> => {
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

    const emailList: TemplateTypes.Format[] = [];

    // Iterating on all worksheets in a workbook
    workbook.eachSheet((worksheet) => {
      if (worksheet.actualRowCount > 1) {
        // Iterating on all rows of a worksheet
        worksheet.eachRow((row, rowNumber) => {
          // Ignoring header
          if (rowNumber > 1) {
            const data: TemplateTypes.Format = {
              email: format.email,
            };

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

    const chunkedEmailList = chunk(emailList, 50);
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
