const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const keyData = fs.readFileSync('.env', 'utf8')
const keyDataObj = JSON.parse(keyData)
const MP4Parser = require('node-video-lib').MP4Parser

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

// async function getFile(){
//   const data =  s3.getObject(
//     {
//         Bucket: 'data-store-213',
//         Key: 'folder/1586056170520_vid-test.mp4'
//       }
    
//   ).promise();
//   return data;
// }
// getFile()
// .then( function(data){
//   let buf = Buffer.from(data.Body)
//   // let base64 = buf.toString()
//   let parseTest = MP4Parser.parse(buf)
//   console.log(parseTest)
// })
// .then(
//   function encode(data){
//     let buf = Buffer.from(data.Body);
//     let base64 = buf.toString('base64');
//     let htmlFile = `<img src='data:image/jpeg;base64,${base64}'>`
//     fs.writeFileSync('./test.html', htmlFile)
// }
// )
// s3.upload(params, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   }
//   if (data) {
//     console.log("Uploaded @", data.Location);
//   }
// });