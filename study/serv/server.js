// содежимое index.js
const querystring = require('querystring');
const {TodoService} = require('./todo')
const http = require('http')
const port = 3000
const services = {'todo_service': new TodoService()}
console.log(services)
const requestHandler = (request, response) => {
    try{
        
        const[path, props] = request.url.split('?')
        let pathSpl = path.split('/');
        
        let serviceName = pathSpl[1]
        let requestName = pathSpl[2]
        console.log(serviceName)
        let result = services[serviceName].requests[requestName](querystring.parse(props))
        console.log('result', result)
    console.log(path.split('/'), querystring.parse(props))
    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
      });
    response.end(JSON.stringify(result))
    }
    catch(e){
        response.end('Error', e);

    }
    }
    
const server = http.createServer(requestHandler)
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})