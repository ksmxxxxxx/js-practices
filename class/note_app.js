import fs from 'fs'
import readline from 'readline'
import minimist from 'minimist'
import inquirer from 'inquirer'
import crypto from 'crypto'

const uuid = crypto.randomBytes(16).toString('hex')
const addNewFile = `data/${uuid}.json`
const charset = 'utf-8'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const argv = minimist(process.argv.slice(2))

let tempStrageStdinText = ''

if (argv.l) {
  displayNoteList()
} else if (argv.r) {
  selectReferenceNote()
} else if (argv.d) {
  selectDeleteNote()
} else {
  addNewNote()
}

function Note () {
  return {
    uuid: '',
    body: ''
  }
}

function writeNote (uuid, body) {
  const note = new Note()
  note.uuid = uuid
  note.body = body
  const data = JSON.stringify(note, null, 2)
  fs.open(addNewFile, 'a', err => {
    if (err) throw err
    fs.writeFile(addNewFile, data, charset, err => {
      if (err) throw err
    })
  })
}

function addNewNote () {
  rl.on('line', (input) => {
    tempStrageStdinText += `${input}\n`
  }).on('close', () => {
    writeNote(uuid, tempStrageStdinText)
  })
}

function readDirectoryOfData (path) {
  return fs.readdirSync(path)
}

function filterJsonFiles () {
  const files = readDirectoryOfData('data')
  return files.filter(file => { return /.*\.json$/.test(file) })
}

function readFile (file) {
  return fs.readFileSync(`data/${file}`, charset)
}

function parseJsonFile (file) {
  return JSON.parse(readFile(file))
}

function createAllNoteData () {
  const files = filterJsonFiles()
  return files.map(file => {
    return parseJsonFile(file)
  })
}

function pickUuidOfNote () {
  const files = createAllNoteData()
  return files.map(file => {
    return parseJsonFile(file).uuid
  })
}

function pickFirstLineOfNote () {
  const files = createAllNoteData()
  return files.map(file => {
    return file.body.split('\n')[0]
  })
}

function displayNoteList () {
  const firstLineOfNote = pickFirstLineOfNote()
  console.log(firstLineOfNote.join('\n'))
  process.exit(0)
}

function createSelectNoteList () {
  const data = createAllNoteData()
  return data.map(hash => {
    const newHash = {}
    newHash.name = hash.body.split('\n')[0]
    newHash.value = `${hash.uuid}`
    return newHash
  })
}

function selectReferenceNote () {
  const targetList = createSelectNoteList()
  inquirer.prompt([
    {
      type: 'list',
      name: 'uuid',
      message: 'Choose reference note to ...',
      choices: [...targetList]
    }
  ]).then(answers => {
    console.log(referenceNoteBody(answers.uuid))
    process.exit(0)
  }).catch(err => {
    console.log(err)
    process.exit(0)
  })
}

function referenceNoteBody (id) {
  return JSON.parse(fs.readFileSync(`data/${id}.json`, charset)).body
}

function selectDeleteNote () {
  const targetList = createSelectNoteList()
  inquirer.prompt([
    {
      type: 'list',
      name: 'uuid',
      message: 'Choose delete note to ...',
      choices: [...targetList]
    }
  ]).then(answers => {
    deleteNote(answers.uuid)
    console.log(`data/${answers.uuid}.json` + ' was deleted')
    process.exit(0)
  }).catch(err => {
    console.log(err)
    process.exit(0)
  })
}

function deleteNote (id) {
  return fs.unlinkSync(`data/${id}.json`)
}
