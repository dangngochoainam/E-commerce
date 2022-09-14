const fs = require("fs").promises;
const { format } = require("date-fns");
const path = require("path");

const fileName = path.join(__dirname, "../logs", "logs.log");

const logEvents = async (msg) => {
  const datetime = `${format(new Date(), "dd-MM-yyyy\tss:mm:HH")}`;
  const content = `${datetime}  ${msg}\n`;
  try {
    fs.appendFile(fileName, content);
  } catch (error) {
    console.log(error);
  }
};

module.exports = logEvents;
