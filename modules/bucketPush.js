module.exports =  function bucketPush(keyDataObj, filePath){
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

//configuring the AWS environment
AWS.config.update({
    accessKeyId: keyDataObj.accessKeyId,
    secretAccessKey: keyDataObj.secretAccessKey
  });

var s3 = new AWS.S3();

//configuring parameters
var params = {
  Bucket: keyDataObj.bucket,
  Body : fs.createReadStream(filePath),
  Key : "folder/"+Date.now()+"_"+path.basename(filePath)
};

s3.upload(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  }
  if (data) {
    console.log("Uploaded @", data.Location);
  }
});
}