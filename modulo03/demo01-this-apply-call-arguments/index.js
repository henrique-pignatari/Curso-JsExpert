"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("this", this);
    console.log("arguments", Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

// watch(__filename, async (event, filename) => {
//   console.log((await readFile(filename)).toString());
// });

const file = new File();

//Desta forma o 'this' passado para funcao é o contexto do watch importado do fs
//watch(__filename, file.watch);

// Um modo de herdar o this do context correto é utilizar arrow function
//watch(__filename, (event, filename) => file.watch(event, filename));paci

// Utilizando o metodo bind, ele retornará uma cópia da função, porém
//utilizando o contexto da classe passada como argumento
//watch(__filename, file.watch.bind(file));

file.watch.call(
  { showContent: () => console.log("call: hey sinon!") },
  null,
  __filename
);

file.watch.apply({ showContent: () => console.log("call: hey sinon!") }, [
  null,
  __filename,
]);
