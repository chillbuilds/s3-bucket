const bucketPush = require('./modules/bucketPush')
const bucketPull = require('./modules/bucketPull')
const inquirer = require('inquirer')
const fs  = require('fs')
const keyData = fs.readFileSync('.env', 'utf8')
const keyDataObj = JSON.parse(keyData)

function startPrompt(){
    inquirer.prompt (
        {type: 'list',
        name: 'choice',
        choices: ['Push to Bucket', 'Pull From Bucket', 'Delete From Bucket'],
        message: 'What would you like to do?'}
    ).then(function(data){
        switch(data.choice) {
            case 'Push to Bucket':
                pushPrompt()
                break;
            case 'Pull from Bucket':
                pullPrompt()
                break;
            case 'Delete from Bucket':
                break;
            }})
}
function pushPrompt(){
    inquirer.prompt (
        {type: 'input',
        name: 'dir',
        message: 'Enter File Directory'}
    ).then(function(data){
        bucketPush(keyDataObj, data.dir)
    })
}


startPrompt()