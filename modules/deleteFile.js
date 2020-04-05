module.exports =  function deleteFile(keyDataObj, file){
    const AWS = require('aws-sdk');

    //configuring the AWS environment
    AWS.config.update({
        accessKeyId: keyDataObj.accessKeyId,
        secretAccessKey: keyDataObj.secretAccessKey
      });
    var s3 = new AWS.S3();
    var params = {  Bucket: keyDataObj.bucket, Key: file };

    s3.deleteObject(params, function(err, data) {
        if (err) console.log(err, err.stack)  // error
        else console.log("\n\nFile Removed From Bucket")  // deleted
    })
    return
}