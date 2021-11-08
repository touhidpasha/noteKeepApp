const AWS = require('aws-sdk')
const config = require('../../config/aws-s3.config.json')

const s3Config = {
    //  apiVersion: '2006-03-01',
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region,
}
const s3 = new AWS.S3(s3Config)

class s3helper {


    createBucket = (bucketName) => {
        s3.createBucket({
            Bucket: bucketName,
            CreateBucketConfiguration: {
                LocationConstraint: config.region
            },
            // ACL: 'private',
            GrantRead: 'IAM_USERID',
            GrantWrite: 'IAM_USERID',
            GrantFullControl: 'IAM_USERID',
            GrantReadACP: 'IAM_USERID',
            GrantWriteACP: 'IAM_USERID',
            ObjectLockEnabledForBucket: false
        }).promise().then(console.log("succesfully created bucket " + bucketName )).catch(error => console.log(error))
    }

    uploadFile = (file, contentType, serverPath, filename) => {
        if (!filename) {
            filename = serverPath.split('/').pop()
        }
        return s3.upload({
            Bucket: BUCKET,
            ACL: 'private',
            Key: serverPath,
            Body: file,
            ContentType: contentType,
            ContentDisposition: `attachment; filename=${filename}`,
        }).promise().then(console.log("succesfully uploaded file " + file)).catch(error => console.log(error))
    }
}

module.exports = new s3helper()