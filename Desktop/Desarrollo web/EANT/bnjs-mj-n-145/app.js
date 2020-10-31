
const express = require ('express')
const port = 1000
const nodemailer = require("nodemailer");
const joi = require('joi');
const fileUpload = require('express-fileupload');
const expressFileUpload = require (express-fileUpload)
// const port2 = 2000

const app = express()
// Variables de entorno, son variables que se guardan en la memoria del sistema. Con Node se accede a esas variables con el comando process.env
//Proces es el equivalente del objeto windows. Es un objeto que tiene una propiedad llamada env la cual giene todas las variables que estan seteadas en nuestra
//variable de entonrno.
const miniOutlook = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: process.env.PUERTO_MAIL,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.CASILLA_MAIL, // generated ethereal user
      pass: process.env.CLAVE_MAIL, // generated ethereal password
    },
  });

const schema = joi.object ({
      nombre : joi.string().required(),
      email :joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}}).required(),
      asunto : joi.number().integer().required(),
      mensaje : joi.string().required()
 })

app.listen(port)
app.use (express.urlencoded({ extended : true}))
app.use (express.json())
app.use(express.static('public'))
app.use (expressFileUpload())


app.post('/enviar', (req,res) => {
    const contacto = req.body
    //console.log (req.files)
    //const validate = schema.validate(contacto)
    const {error, value} = schema.validate(contacto)

    if(validate.error){
        console.log(error)
        res.end (error.detail[0].message)
    } else {
        miniOutlook.sendMail({
            from: contacto.correo, // sender address
            to: "matiasmigueljuan@gmail.com", // list of receivers
            subject: `Asunto #${contacto.asunto}`, // Subject line
            html: `<blockquote>Asunto : #${contacto.mensaje}</blockquote>`, // html body
          });
        res.end ('Desde aqui vamos a enviar un email automatico')
    }
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






