const { evalueteRegex } = require('./util.js')

class TextProcessorFluentAPI{
  #content
  constructor(content){
    this.#content = content
  }

  extractPeopleData(){
    const matchPerson = evalueteRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
    const onlyPerson = this.#content.match(matchPerson)
    this.#content = onlyPerson
    return this
  }

  divideTextInColums(){
    const splitRegex = evalueteRegex(/,/)
    this.#content = this.#content.map(line => line.split(splitRegex))
    return this
  }

  removeEmptyCharacters(){
    const trimSpaces = evalueteRegex(/^\s+|\s+$|\n/g)
    this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, '')))
    return this
  }

  build(){
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI