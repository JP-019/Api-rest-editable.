const nodemailer = require('nodemailer');

//face de pruebas de envio de correos.
EnviarMail=()=>{
     const confing={
        host:'step.@gmail.com',
        port:587,
        auth:{
            user:'correopruebahn6@gmail.com',
            pass:''
        }

     }


    const tranport=nodemailer.createTransport(confing);
}