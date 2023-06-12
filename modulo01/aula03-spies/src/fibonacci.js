class Fibonacci{
  * execute(input, current = 0, next = 1){
    if(input === 0){
      return
    }

    yield current //"Retorna" o resultado de cada passo

    yield * this.execute(input -1, next, current + next); // Com o asterisco, delega a função

  }
}

module.exports = Fibonacci