import fs from 'fs'
import readline from 'readline'
// import minimist from 'minimist'
import inquirer from 'inquirer'
import program from 'commander'

const file = 'memo.json'
const charset = 'utf8'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const jsonArray = []
const memoBodyArray = []
const memoTitleArray = []
const referenceList = []
// const argv = minimist(process.argv.slice(2))

program
  .version('0.1.0')
  .description('Create and manage notes')
  .option('-l, --list', 'Show note list')
  .option('-r --reference', 'Refer note')
  .option('-d --delete', 'Delete note')

program.parse(process.argv)

if (program.list) {
  displayList()
} else if (program.reference) {
  referenceMemo()
} else if (program.delete) {
  deleteMemo()
} else {
  readJsonFile()
  addMemoObj()
}

function MemoObj () {
  return {
    index: '',
    name: '',
    value: ''
  }
}

function addMemoObj (text) {
  rl.on('line', text => {
    const memoTitle = `${text}`
    const memoBody = `${text}` + '\n'
    memoTitleArray.push(memoTitle)
    memoBodyArray.push(memoBody)
  }).on('close', () => {
    const memoTitle = memoTitleArray.slice(0, 1)
    const memoBodyArrayJoin = memoBodyArray.join('')
    const newMemoObj = new MemoObj()
    newMemoObj.name = memoTitle[0]
    newMemoObj.value = memoBodyArrayJoin
    jsonArray.push(newMemoObj)
    console.log(jsonArray)
    saveMemo()
  })
}

function titleTolistArray () {
  const data = JSON.parse(fs.readFileSync(file, charset))
  data.forEach(i => {
    const item = `${i.name}`
    referenceList.push(item)
  })
}

function readJsonFile () {
  const data = JSON.parse(fs.readFileSync(file, charset))
  data.forEach(i => {
    const item = new MemoObj()
    const title = `${i.name}`
    const body = `${i.value}`
    item.name = title
    item.value = body
    jsonArray.push(item)
  })
}

function displayList () {
  titleTolistArray()
  referenceList.forEach(title => {
    console.log(title)
  })
  process.exit(0)
}

function referenceMemo () {
  readJsonFile()
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'body',
        message: 'Choose a note you want to see',
        choices: [...jsonArray]
      }
    ])
    .then(answers => {
      console.log(answers.body)
    })
}

function saveMemo () {
  const memoObj = JSON.stringify(jsonArray, null, 2)
  fs.open(file, 'a', err => {
    if (err) throw err
    fs.writeFile(file, memoObj, charset, err => {
      if (err) throw err
    })
  })
}

async function deleteMemo () {
  await readJsonFile()
  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'memo',
        message: 'Choose a note you want to delete',
        choices: [...jsonArray]
      }
    ])
    .then(answers => {
      console.log(answers.memo)
    })
}
