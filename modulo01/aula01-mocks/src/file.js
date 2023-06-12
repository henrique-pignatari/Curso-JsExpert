const {readFile} = require('fs/promises');
const { error } = require('./contants');

const DEFAULT_OPTION ={
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
}

class File{
  static async csvToJSON(filePath){
    const content = await readFile(filePath, "utf8");
    const validation = this.isValid(content);

    if(!validation.valid) throw new Error(validation.error);

    const result = this.parseCSVToJson(content);
    return result
  }

  static isValid(csvString, options = DEFAULT_OPTION){
    const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/);
    const isHeaderValid = header === options.fields.join(',');

    if(!isHeaderValid){
      return{
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    if(!fileWithoutHeader.length ||
      fileWithoutHeader.length > options.maxLines
    ){
      return{
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      }
    }

    return { valid: true }
  }

  static parseCSVToJson(csvString){
    const lines = csvString.split(/\r?\n/);

    const firstLine = lines.shift();
    const header = firstLine.split(',');

    const users = lines.map(line => {
      const colums = line.split(',');
      let user = {}

      for(const index in colums){
        user[header[index]] = colums[index].trim()
      }
      return user;

    });

    return users
  }
}

module.exports = File