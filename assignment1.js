const fs = require("fs");
const { Command } = require("commander");

const program = new Command();

program
  .name("counter")
  .description("CLI to do file based task.")
  .version("0.8.0");

program
  .command("count")
  .description("program to count number of words in a file")
  .argument("<file>", "file to count")
  .action((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const words = data.split(" ").length;
        console.log(`ther are ${words} words in the ${file}.`);
      }
    });
  });

program.parse();

// node assignment1.js count "\Users\NESCHAL\OneDrive\Desktop\cohort 3.0\week 4\a.txt"
