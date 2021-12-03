const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const s3Const = require('./aws-s3-config.json')

//configuring the AWS environment
AWS.config.update({
    accessKeyId: s3Const.accessKeyId,
    secretAccessKey: s3Const.secretAccessKey,
});

var s3 = new AWS.S3();
class awsS3 {
    uploadFile = (fileName, callback) => {
        const uploadParams = {
            Bucket: s3Const.bucketName,
            Body: fs.readFileSync(path.join(__dirname, ("../../uploads/" + fileName))),
            Key: "fundooImages/" + Date.now() + "_" + fileName
        };

        try {
            s3.upload(uploadParams, function (err, data) {
                //handle error
                if (err) {
                    callback(err, null);
                }
                //success
                if (data) {
                    try {
                        fs.unlinkSync(path.join(__dirname, ("../../uploads/" + fileName)))
                    }
                    catch (e) {
                        console.log("file deletion is not successfull " + fileName);
                    }
                    callback(null, data.key);
                }
            });
        }
        catch (e) {
            return (null)
        }
    }

    downloadFile = async (key) => {

        var downloadParams = {
            Bucket: s3Const.bucketName,
            Key: key
        };
        s3.getObject(downloadParams, (err, res) => {
            if (err === null) {
                console.log("downloaded");
                console.log(res);
                return res.Body
            } else {
                console.log(err);
                return null;
            }
        });
    }
    // uploadFile = async (fileName) => {
    //     console.log("file name " + fileName);
    //     const uploadParams = {
    //         Bucket: s3Const.bucketName,
    //         Body: fs.readFileSync(path.join(__dirname, ("../../uploads/" + fileName))),
    //         // Key: "fundooImages/" + Date.now() + "_" + path.basename(filePath)
    //         Key: "fundooImages/" + Date.now() + "_" + fileName
    //     };

    //     try {
    //         await s3.upload(uploadParams, function (err, data) {
    //             // console.log(path.basename(filePath) + " and " + path.dirname(filePath));
    //             //handle error
    //             if (err) {
    //                 console.log("Error", err);
    //             }
    //             //success
    //             if (data) {
    //                 console.log("data " + data);
    //                 console.log("Uploaded in:", data.Key);
    //                 try {
    //                     fs.unlinkSync(path.join(__dirname, ("../../uploads/" + fileName)))
    //                 }
    //                 catch (e) {
    //                     console.log("file deletion is not successfull " + fileName);
    //                 }
    //                 return (JSON.stringify(data.Key))
    //             }
    //         });

    //     }
    //     catch (e) {
    //         return (null)
    //     }
    // }

}
module.exports = new awsS3();
