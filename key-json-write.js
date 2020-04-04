const fs = require('fs')
const keyData = {'AWSAccessKeyId': 'AKIAJNW2Q4C5RCVMJYHQ', 
'AWSSecretKey': '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'}

const keyDataJSON = JSON.stringify(keyData)

console.log(keyData+'\n'+keyDataJSON)

fs.writeFileSync('../../')