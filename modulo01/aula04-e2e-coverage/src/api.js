const http = require('http');
const {once} = require('events');

const DEFAULT_USER = {
  userName: 'HenriquePignatari',
  password: '123',
}

const toLower = (text) => text.toLowerCase();

const routes = {
  '/contact:get':  (request, response)=>{
    response.write('contact us page');
    return response.end();
  },

  //curl -X POST --data '{"username": "HenriquePignatari", "password": "123"}' localhost:3000/login  
  '/login:post': async (request, response) => {
    const user = JSON.parse(await once(request, "data"));

    if(
      toLower(user.userName) !== toLower(DEFAULT_USER.userName) ||
      user.password !== DEFAULT_USER.password
    ){
      response.writeHead(401);
      response.end("Log in failed!");
      return
    }

    return response.end("Log in succeeded!")
  },

  default(reques, response){
    response.writeHead(404);
    return response.end('not found!');
  }
}

function handler(request, response){
  const {url, method} = request;

  const routeKey = `${toLower(url)}:${toLower(method)}`;
  const chosen = routes[routeKey] || routes.default;

  return chosen(request, response)
}

const app = http.createServer(handler)
.listen(3000, ()=> console.log('running at 3000'))

module.exports = app