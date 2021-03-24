import fs from 'fs'
import crypto from 'crypto'

export class Storage {
  create (text) {
    return this.write(text)
  }

  read () {
    return this.noteList()
  }

  destroy (id) {
    return this.destroyFile(id)
  }
}

export default class Json extends Storage {
  constructor () {
    super()
    this.datadir = 'data'
    this.charset = 'utf-8'
    this.uuid = crypto.randomBytes(16).toString('hex')
  }

  write (text) {
    const newFile = `${this.datadir}/${this.uuid}.json`
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

  destroyFile (id) {
    return fs.unlinkSync(`${this.datadir}/${id}.json`)
  }

  displayBodyOfNote (id) {
    return JSON.parse(fs.readFileSync(`${this.datadir}/${id}.json`, this.charset)).body
  }

  noteList () {
    const data = this.allNoteData()
    return data.map(hash => {
      const newHash = {}
      newHash.name = hash.body.split('\n')[0]
      newHash.value = `${hash.uuid}`
      return newHash
    })
  }

  allNoteData () {
    const files = this.filterFileJson()
    return files.map(file => {
      return this.parseJsonFile(file)
    })
  }

  parseJsonFile (file) {
    return JSON.parse(this.readFile(file))
  }

  readFile (file) {
    return fs.readFileSync(`${this.datadir}/${file}`, this.charset)
  }

  filterFileJson () {
    const files = this.readDir()
    return files.filter(file => { return /.*\.json$/.test(file) })
  }

  readDir () {
    return fs.readdirSync(this.datadir)
  }
}
