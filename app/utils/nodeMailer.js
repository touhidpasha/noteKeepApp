var nodemailer = require('nodemailer');


class nodeMailer{
triggerMail=(receiverMailId)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tpchancham05@gmail.com',
            pass: ''
        }
    });
    
    console.log(receiverMailId);
    var mailOptions = {
        from: 'tpchancham05@gmail.com',
        to: receiverMailId,
        subject: 'welcome to noteApp',
        text: 'keep you notes here'
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