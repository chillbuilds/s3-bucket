module.exports =  function bucketPull(keyDataObj, pullObj){
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

//configuring the AWS environment
AWS.config.update({
    accessKeyId: keyDataObj.accessKeyId,
    secretAccessKey: keyDataObj.secretAccessKey
  });

var s3 = new AWS.S3();

async function getFile(){
      const data =  s3.getObject(
        {Bucket: 'data-store-213',
        Key: pullObj}
      ).promise();
      return data;
    }
    getFile()
    // .then( function(data){
    //   let buf = Buffer.from(data.Body)
    //   let base64 = buf.toString()
    //   // let parseTest = MP4Parser.parse(buf)
    //   // console.log(parseTest)
    // })
    .then(
      function encode(data){
        let buf = Buffer.from(data.Body);
        let base64 = buf.toString('base64');
        let htmlFile = `<img src='data:image/jpeg;base64,${base64}'>`
        fs.writeFileSync('./test.html', htmlFile)
        console.log('\n\nWrite Success')
    }
    )
}