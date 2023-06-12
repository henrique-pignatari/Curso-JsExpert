const { error } = require("./src/contants");
const File = require("./src/file")
const assert = require('assert')

;(async () =>{

  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const result = File.csvToJSON(filePath);
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/invalid-header.csv';
    const result = File.csvToJSON(filePath);
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);

    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/fiveItems-invalid.csv';
    const result = File.csvToJSON(filePath);
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJSON(filePath);
    const expected = [
      {
        id: 1,
        name: "xuxa da silva",
        profession: "developer",
        age: 120
      },
      {
        id: 2,
        name: "Roberta pereira",
        profession: "caquinha",
        age: 10
      },
      {
        id: 3,
        name: "jose da silva",
        profession: "manager",
        age: 40
      },
    ]

    await assert.deepEqual(result, expected)
  }
  

})()