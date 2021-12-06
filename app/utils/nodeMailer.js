/* ************************************************************************
 * Purpose          : get the values from the controller and process them for the notes in fundo  notes                
 * 
 * @file            : note.contoller.js
 * @author          : Touhid pasha
 * @version         : 1.0
 * @since           : 9-8-2021
 * 
 **************************************************************************/
var nodemailer = require('nodemailer');
class nodeMailer{
triggerMail=(receiverMailId,subject,text)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tpchancham05@gmail.com',
            pass: 'Qwert@05'
        }
    });
    
    console.log(receiverMailId);
    var mailOptions = {
        from: 'tpchancham05@gmail.com',
        to: receiverMailId,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
}
module.exports=new nodeMailer();