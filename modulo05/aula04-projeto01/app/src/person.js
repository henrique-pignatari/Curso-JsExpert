const {evalueteRegex} = require('./util.js')

class Person{
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
  ]){
    const firstLetterExp = evalueteRegex(/^(\w{1})([a-zA-Z]+$)/)

    const formatFirstLetter = (prop) => {
      return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`
      })
    }

    this.nome = nome
    this.nacionalidade = formatFirstLetter(nacionalidade)
    this.estadoCivil = formatFirstLetter(estadoCivil)
    this.documento = documento.replace(evalueteRegex(/\D/g), "")
    this.rua = rua.match(evalueteRegex(/(?<=\sa\s).*$/),'').join()
    this.numero = numero
    this.bairro = bairro.match(evalueteRegex(/(?<=\s).*$/),'').join()
    this.estado = estado.replace(evalueteRegex(/\.$/), "")
  }
}

module.exports = Person