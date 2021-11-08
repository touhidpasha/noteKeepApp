const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const s3Const = require('../config/aws-s3.config.json')

//configuring the AWS environment
AWS.config.update({
    accessKeyId: s3Const.accessKeyId,
    secretAccessKey: s3Const.secretAccessKey,
});

var s3 = new AWS.S3();
var filePath = "./fake-data.txt";

//configuring parameters
const uploadParams = {
    Bucket: s3Const.bucketName,
    Body: fs.createReadStream(filePath),
    Key: "folder/" + Date.now() + "_" + path.basename(filePath)
};



s3.upload(uploadParams, function (err, data) {
    console.log(path.basename(filePath) + " and " + path.dirname(filePath));
    //handle error
    if (err) {
        console.log("Error", err);
    }
    //success
    if (data) {
        console.log("Uploaded in:", data.Location);
    }
});


var downloadParams = {
    Bucket: s3Const.bucketName,
    Key: 'folder/1636255717939_fake-data.txt'
};
s3.getObject(downloadParams, (err, res) => {
    if (err === null) {
        // res.attachment('file.ext'); // or whatever your logic needs
        // res.send(data.Body);
        console.log("downloaded");
        console.log(res);
        // fs.createWriteStream('../app/downloaded-s3-files', res.Body)
        fs.writeFileSync('../app/downloaded-s3-files/data.txt', res.Body.toString());
        // fs.writeFileSync('../app/downloaded-s3-files', res.Body);

        // console.log('../app/downloaded-s3-files/ has been created!')
        // res.createReadStream().pipe('../app/downloaded-s3-files');
    } else {
        console.log(err);
    }
});

