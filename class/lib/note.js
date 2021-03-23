import readline from 'readline'
import inquirer from 'inquirer'
import minimist from 'minimist'

import Json from './storage.js'

class Note {
  rl () {
    return readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  create () {
    let tempStrageStdinText = ''
    this.rl().on('line', (input) => {
      tempStrageStdinText += `${input}\n`
    }).on('close', () => {
      storage.create(tempStrageStdinText)
      console.log('Save to note!')
    })
  }

  list () {
    const data = storage.read()
    const list = data.map(d => {
      return d.name
    }).join('\n')
    console.log(list)
  }

  reference () {
    const targetList = storage.read()
    inquirer.prompt([
      {
        type: 'list',
        name: 'uuid',
        message: 'Choose reference note to ...',
        choices: [...targetList]
      }
    ]).then(answers => {
      console.log(storage.displayBodyOfNote(answers.uuid))
      process.exit(0)
    }).catch(err => {
      console.log(err)
      process.exit(0)
    })
  }

  destroy () {
    const targetList = storage.read()
    inquirer.prompt([
      {
        type: 'list',
        name: 'uuid',
        message: 'Choose delete note to ...',
        choices: [...targetList]
      }
    ]).then(answers => {
      storage.destroy(answers.uuid)
      console.log(`data/${answers.uuid}.json` + ' was deleted')
      process.exit(0)
    }).catch(err => {
      console.log(err)
      process.exit(0)
    })
  }
}

const argv = minimist(process.argv.slice(2))
const storage = new Json()
const note = new Note()

if (argv.r) {
  note.reference()
} else if (argv.l) {
  note.list()
} else if (argv.d) {
  note.destroy()
} else {
  note.create()
}
