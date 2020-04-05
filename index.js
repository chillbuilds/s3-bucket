const bucketPush = require('./modules/bucketPush')
const bucketPull = require('./modules/bucketPull')
const listObj = require('./modules/listObj')
const inquirer = require('inquirer')
const fs  = require('fs')
const keyData = fs.readFileSync('.env', 'utf8')
const keyDataObj = JSON.parse(keyData)
var bucketList = listObj(keyDataObj)

async function startPrompt(){
    inquirer.prompt (
        {type: 'list',
        name: 'choice',
        choices: ['Push to Bucket', 'Pull From Bucket', 'Delete From Bucket', 'List Objects'],
        message: 'What would you like to do?'}
    ).then(function(data){
        switch(data.choice) {
            case 'Push to Bucket':
                pushPrompt()
                break;
            case 'Pull From Bucket':
                pullPrompt()
                break;
            case 'Delete from Bucket':
                break;
            case 'List Objects':
                listObjects()
                break;
            default:
                console.log('Funky Switch')
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
function pullPrompt(){
    let keyArr = []
    for(var i = 0; i < bucketList.length;i++){
        keyArr.push(bucketList[i].Key)
    }
    inquirer.prompt (
        {type: 'list',
        name: 'file',
        choices: keyArr,
        message: 'Select File'}
    ).then(function(data){
        switch(data.file) {
            case 'Image/':
                startPrompt()
                break;
            case 'Misc/':
                startPrompt()
                break;
            case 'Text/':
                startPrompt()
                break;
            case 'Video/':
                startPrompt()
                break;
            default:
        bucketPull(keyDataObj, data.file)
        startPrompt()
    }})
}
function listObjects(){
    let keyArr = []
    for(var i = 0; i < bucketList.length; i++){
        keyArr.push(bucketList[i].Key)
    }
    console.log(keyArr)
    startPrompt()
}

startPrompt()