const http = require ('http');
const port = 1000



const server = (req, res) => {
    
    res.end('Matias');
}

http.createServer(server).listen(port)






