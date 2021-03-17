import fs from 'fs'
import minimist from 'minimist'
import inquirer from 'inquirer'

const file = 'memo.json'
const charset = 'utf8'

const referenceList = []
const jsonArray = []
const argv = minimist(process.argv.slice(2))

if (argv.l === true) {
  displayList()
} else if (argv.r === true) {
  referenceMemo()
} else {
  console.log('Please type argument. You can get help typing `-help`')
}

function titleTolistArray () {
  const data = JSON.parse(fs.readFileSync(file, charset))
  data.forEach(i => {
    const item = `${i.title}`
    referenceList.push(item)
  })
}

function jsonConvert () {
  const data = JSON.parse(fs.readFileSync(file, charset))
  data.forEach(i => {
    const item = {}
    const title = `${i.title}`
    const body = `${i.body}`
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
}

function referenceMemo () {
  jsonConvert()
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
