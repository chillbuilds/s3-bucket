module.exports = function listObj(keyDataObj){
    const AWS = require('aws-sdk')
    var objArr = []
    
    //configuring the AWS environment
    AWS.config.update({
        accessKeyId: keyDataObj.accessKeyId,
        secretAccessKey: keyDataObj.secretAccessKey
      });
    
    var s3 = new AWS.S3();
    var params = {
    Bucket: keyDataObj.bucket,
    // Delimiter: 'STRING_VALUE',
    // EncodingType: url,
    // Marker: 'STRING_VALUE',
    // MaxKeys: 'NUMBER_VALUE',
    // Prefix: 'STRING_VALUE',
    // RequestPayer: requester
    };
    
    s3.listObjects(params, function(err, data) {
        if (err) return err
        else
        for(var i = 0;i < data.Contents.length;i++){
            objArr.push(data.Contents[i])
        }
        console.log('\nBucket List Updated')
    })
      return objArr
}