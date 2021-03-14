import fs from 'fs'
import readline from 'readline'
import inquirer from 'inquirer'
import minimist from 'minimist'
import crypto from 'crypto'

class Note {
  constructor () {
    this.uuid = crypto.randomBytes(16).toString('hex')
    this.body = ''
    this.charset = 'utf-8'
    this.dir = 'data'
  }

  add () {
    let tempStrageStdinText = ''
    this.rl().on('line', (input) => {
      tempStrageStdinText += `${input}\n`
    }).on('close', () => {
      this.write(tempStrageStdinText)
    })
  }

  displayList () {
    const firstLineOfNote = this.pickFirstLineOfNote()
    console.log(firstLineOfNote.join('\n'))
    process.exit(0)
  }

  chooseDeleteNote () {
    const targetList = this.createSelectNoteList()
    inquirer.prompt([
      {
        type: 'list',
        name: 'uuid',
        message: 'Choose delete note to ...',
        choices: [...targetList]
      }
    ]).then(answers => {
      this.delete(answers.uuid)
      console.log(`data/${answers.uuid}.json` + ' was deleted')
      process.exit(0)
    }).catch(err => {
      console.log(err)
      process.exit(0)
    })
  }

  chooseReferenceNote () {
    const targetList = this.createSelectNoteList()
    inquirer.prompt([
      {
        type: 'list',
        name: 'uuid',
        message: 'Choose reference note to ...',
        choices: [...targetList]
      }
    ]).then(answers => {
      console.log(this.displayBodyOfNote(answers.uuid))
      process.exit(0)
    }).catch(err => {
      console.log(err)
      process.exit(0)
    })
  }

  rl () {
    return readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  delete (id) {
    return fs.unlinkSync(`${this.dir}/${id}.json`)
  }

  write (text) {
    const newFile = `${this.dir}/${this.uuid}.json`
    const newNote = {}
    newNote.uuid = this.uuid
    newNote.body = text
    const data = JSON.stringify(newNote, null, 2)
    fs.open(newFile, 'a', err => {
      if (err) throw err
      fs.writeFile(newFile, data, this.charset, err => {
        if (err) throw err
      })
    })
  }

  displayBodyOfNote (id) {
    return JSON.parse(fs.readFileSync(`${this.dir}/${id}.json`, this.charset)).body
  }

  pickFirstLineOfNote () {
    const files = this.createAllNoteData()
    return files.map(file => {
      return file.body.split('\n')[0]
    })
  }

  createSelectNoteList () {
    const data = this.createAllNoteData()
    return data.map(hash => {
      const newHash = {}
      newHash.name = hash.body.split('\n')[0]
      newHash.value = `${hash.uuid}`
      return newHash
    })
  }

  createAllNoteData () {
    const files = this.filterJsonFiles()
    return files.map(file => {
      return this.parseJsonFile(file)
    })
  }

  parseJsonFile (file) {
    return JSON.parse(this.readFile(file))
  }

  readFile (file) {
    return fs.readFileSync(`${this.dir}/${file}`, this.charset)
  }

  filterJsonFiles () {
    const files = this.readDir()
    return files.filter(file => { return /.*\.json$/.test(file) })
  }

  readDir () {
    return fs.readdirSync(this.dir)
  }
}

const argv = minimist(process.argv.slice(2))
const note = new Note()

if (argv.r) {
  note.chooseReferenceNote()
} else if (argv.d) {
  note.chooseDeleteNote()
} else if (argv.l) {
  note.displayList()
} else {
  note.add()
}
