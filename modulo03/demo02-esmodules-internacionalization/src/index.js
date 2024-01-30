import database from "./../database.json";
import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import readline from "readline";
import Person from "./person.js";

DraftLog(console).addLineListener(process.stdin);
const DEFAULT_LANG = "pt-BR";

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.magenta("Vehicles") },
    { field: "kmTraveled", name: chalk.blue("Km Traveled") },
    { field: "from", name: chalk.yellow("From") },
    { field: "to", name: chalk.red("TO") },
  ],
};

const table = chalkTable(
  options,
  database.map((item) => new Person(item).formatted(DEFAULT_LANG))
);

const print = console.draft(table);
print();

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

terminal.question("Qual é o seu nome?", (msg) => {
  console.log("msg", msg.toString());
});
