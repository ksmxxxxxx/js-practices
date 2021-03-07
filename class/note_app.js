import fs from 'fs'
import readline from 'readline'
import crypto from 'crypto'

// const title = 'Using fs.writeFile() with file descriptors'
// const body = 'When file is a file descriptor, the behavior is almost identical to directly calling fs.write() like:'
const uuid = crypto.randomBytes(16).toString('hex')
const file = `data/${uuid}.json`
const charset = 'utf-8'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let tempStrageStdinText = ''

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
  fs.open(file, 'a', err => {
    if (err) throw err
    fs.writeFile(file, data, charset, err => {
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

function filterJsonFiles (files) {
  return files.filter(file => { return /.*\.json$/.test(file) })
}

function pickFirstLineNote (files) {
  return files.map(file => {
    return JSON.parse(fs.readFileSync(`data/${file}`, charset)).body.split('\n')[0]
  })
}

function displayNoteList () {
  fs.readdir('data', (err, files) => {
    if (err) throw err
    const jsonFiles = filterJsonFiles(files)
    const firstLineNote = pickFirstLineNote(jsonFiles).join('\n')
    console.log(firstLineNote)
    process.exit(0)
  })
}

displayNoteList()
// addNewNote()

// 標準入力したテキストをオブジェクトに登録

// rl.question('please input text for title of new note: ', (answer) => {
//   console.log(`title: ${answer}`)
// })
// ディレクトリの中のファイルを取得する
// fs.readdir('data', (err, file) => {
//   if (err) throw err
//   console.log(file)
// })
