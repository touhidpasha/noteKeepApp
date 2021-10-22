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