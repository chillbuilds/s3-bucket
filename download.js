var s3 = require('s3');
const fs = require('fs');
const keyData = fs.readFileSync('keyID.env', 'utf8')
const keyDataObj = JSON.parse(keyData)

var client = s3.createClient({
    maxAsyncS3: 20,     // this is the default
    s3RetryCount: 3,    // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
        accessKeyId: keyDataObj.accessKeyId,
        secretAccessKey: keyDataObj.secretAccessKey
      // any other options are passed to new AWS.S3()
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
    },
  });

  var params = {
    localFile: "./folder",
   
    s3Params: {
      Bucket: "data-store-213",
      Key: "folder/1586040303306_pi-housing.png",
      // other options supported by getObject
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
    },
  };
  var downloader = client.downloadFile(params);
  downloader.on('error', function(err) {
    console.error("unable to download:", err.stack);
  });
  downloader.on('progress', function() {
    console.log("progress", downloader.progressAmount, downloader.progressTotal);
  });
  downloader.on('end', function() {
    console.log("done downloading");
  });