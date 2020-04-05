const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const keyData = fs.readFileSync('.env', 'utf8')
const keyDataObj = JSON.parse(keyData)

//configuring the AWS environment
AWS.config.update({
    accessKeyId: keyDataObj.accessKeyId,
    secretAccessKey: keyDataObj.secretAccessKey
  });

var s3 = new AWS.S3();
var filePath = "./data/vid-test.mp4";

//configuring parameters
var params = {
  Bucket: 'data-store-213',
  Body : fs.createReadStream(filePath),
  Key : "folder/"+Date.now()+"_"+path.basename(filePath)
};

// async function getImage(){
//   const data =  s3.getObject(
//     {
//         Bucket: 'data-store-213',
//         Key: 'folder/1586040303306_pi-housing.png'
//       }
    
//   ).promise();
//   return data;
// }
// getImage()
// .then(
//   function encode(data){
//     let buf = Buffer.from(data.Body);
//     let base64 = buf.toString('base64');
//     let htmlFile = `<img src='data:image/jpeg;base64,${base64}'>`
//     fs.writeFileSync('./test.html', htmlFile)
// }
// )
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