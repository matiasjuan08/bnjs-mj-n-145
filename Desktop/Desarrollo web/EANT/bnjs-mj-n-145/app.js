
const express = require ('express')
const port = 1000
// const port2 = 2000

const app = express()
app.listen(port)

app.use (express.urlencoded({ extended : true}))


app.use(express.static('public'))

// app.get('/contacto', (req,res) => {
//     res.end ('Aca va a estar mi contacto')
// })

app.post('/enviar', (req,res) => {
    res.end ('ALgo muy loco')
})

// const server = (req, res) => {
//     fs.readFile('front/index.html', (error, content) => {
//         if(error){
//             res.writeHead(404, {'content-type' : 'text-plain'} )
//             res.end ('salio mal')
//         } else {
//             res.writeHead(200, {'content-type' : 'text-html'})
//             res.end (content)
//         }
//     })
    
// }

// http.createServer(server).listen(port2)






