const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs").promises;
const { promisify } = require("util");

const init = async () => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path.resolve(__dirname, "./", "file.xlsx"));

  const index = {
    ref: "A",
    companyName: "B",
    firstName: "C",
    lastName: "D",
    email: "E",
    country: "F",
  };

  const emailList = [];
  const trashList = [];

  workbook.eachSheet((worksheet) => {
    if (worksheet.actualRowCount > 1) {
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          const data = {};

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

  await Promise.all([
    fs.writeFile(
      path.resolve(__dirname, "./", "result.json"),
      JSON.stringify(emailList)
    ),
    fs.writeFile(
      path.resolve(__dirname, "./", "trash.json"),
      JSON.stringify(trashList)
    ),
  ]);

  console.log("Done");
};

init();
