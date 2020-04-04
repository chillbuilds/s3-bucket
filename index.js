const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const keyData = fs.readFileSync('keyID.env', 'utf8')
const keyDataObj = JSON.parse(keyData)

//configuring the AWS environment
AWS.config.update({
    accessKeyId: keyDataObj.accessKeyId,
    secretAccessKey: keyDataObj.secretAccessKey
  });
var s3 = new AWS.S3();
var filePath = "./data/pi-housing.png";
//configuring parameters
var params = {
  Bucket: 'data-store-213',
  Body : fs.createReadStream(filePath),
  Key : "folder/"+Date.now()+"_"+path.basename(filePath)
};

s3.upload(params, function (err, data) {
  //handle error
  if (err) {
    console.log("Error", err);
  }

  //success
  if (data) {
    console.log("Uploaded in:", data.Location);
  }
});