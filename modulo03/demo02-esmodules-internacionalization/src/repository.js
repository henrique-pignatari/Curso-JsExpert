import { writeFileSync, readFileSync } from "fs";

export const save = async (data) => {
  const { pathname: databaseFile } = new URL("./../database.json", import.meta.url);
  const fileData = await readFileSync(databaseFile);
  const currentData = JSON.parse(fileData);
  currentData.push(data);

  await writeFileSync(databaseFile, JSON.stringify(currentData));
};
