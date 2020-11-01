
const express = require ('express')
const port = 1000
const nodemailer = require("nodemailer");
const joi = require('joi');
const expressFileUpload = require ('express-fileUpload');
const { dirname } = require('path');

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
      nombre : joi.required(),
      apellido : joi.string().required(),
      email :joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']}}).required(),
      asunto : joi.number().integer().required(),
      mensaje : joi.string().required()
 })

app.listen(port)
app.use (express.urlencoded({ extended : true}))// <--esto convierte de "application/x-www-form-urlencoded" a object
app.use (express.json())// <-- Transformara de "application/json" a Object
app.use(express.static('public'))
app.use (expressFileUpload()) //<-- transforma de "multipart/form-data" a archivo


app.post('/enviar', (req,res) => {
    const contacto = req.body
    const {archivo} = req.files 

    console.log(req.files)

    const ubicacion = __dirname + "/public/uploads/" + archivo.name
    
    console.log ("Se va a guardar en :")
    console.log (ubicacion)

    archivo.mv(ubicacion, error => {
        if (error){
            console.log ("No se movio")
        }
    })

    return res.end ("mira la consola")

    const {error, value} = schema.validate(contacto)

    if(error){
        console.log(error)

        const msg = {
            error : error.details.map( e => {
                console.log (e.mensaje)
            })
        }

        res.end (error.details[0].message)
    } else {
        miniOutlook.sendMail({
            from: contacto.correo, // sender address
            to: "arlene71@ethereal.email", //lista de los que reciben el mail
            replyTo: contacto.correo,
            subject: `Asunto #${contacto.asunto}`, // Subject line
            html: `<blockquote>Asunto : #${contacto.mensaje}</blockquote>`, // html body
          });
        res.end ('Desde aqui vamos a enviar un email automatico')
    }
})




