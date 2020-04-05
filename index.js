const bucketPush = require('./modules/bucketPush')
const bucketPull = require('./modules/bucketPull')
const listObj = require('./modules/listObj')
const deleteFile = require('./modules/deleteFile')
const opn = require('opn');
const inquirer = require('inquirer')
const fs  = require('fs')
const keyData = fs.readFileSync('.env', 'utf8')
const keyDataObj = JSON.parse(keyData)
var bucketList = listObj(keyDataObj)

async function startPrompt(){
    inquirer.prompt (
        {type: 'list',
        name: 'choice',
        choices: ['Push To Bucket', 'Pull From Bucket', 'Delete From Bucket', 'Exit Application'],
        message: 'What would you like to do?'}
    ).then(function(data){
        switch(data.choice) {
            case 'Push To Bucket':
                pushPrompt()
                break;
            case 'Pull From Bucket':
                pullPrompt()
                break;
            case 'Delete From Bucket':
                deletePrompt()
                break;
            case 'List Objects':
                listObjects()
                break;
            case 'Exit Application':
                break;
            default:
                console.log('Funky Switch')
                break;
            }})
    bucketList = listObj(keyDataObj)
}
function pushPrompt(){
    inquirer.prompt (
        {type: 'input',
        name: 'dir',
        message: 'Enter File Directory'}
    ).then(function(data){
        filePrompt(data.dir)
    })
}
function filePrompt(dir){
    let fileArr = []
    fs.readdirSync(dir).forEach(file => {
        let stats = fs.statSync(`${dir}${file}`)
        if(stats.isFile()== true){
            fileArr.push(file)
        }
      })
      console.log(fileArr)
      inquirer.prompt (
        {type: 'list',
        name: 'choice',
        choices: fileArr,
        message: 'Which File Would You Like To Add To Bucket?'}
    ).then(function(data){
    bucketPush(keyDataObj, dir+data.choice)
    startPrompt()
})}

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
                console.log('You selected a folder')
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
        opn('https://data-store-213.s3.us-east-2.amazonaws.com/'+data.file);
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
function deletePrompt(){
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
                deleteFile(keyDataObj, data.file)
                startPrompt()
                break;
    }})
}

startPrompt()