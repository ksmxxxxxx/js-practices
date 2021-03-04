import fs from 'fs'
import crypto from 'crypto'

const title = 'Using fs.writeFile() with file descriptors'
const body = 'When file is a file descriptor, the behavior is almost identical to directly calling fs.write() like:'
const uuid = crypto.randomBytes(16).toString('hex')
const file = `data/${uuid}.json`
const charset = 'utf-8'

function Note () {
  return {
    uuid: '',
    title: '',
    body: ''
  }
}

function writeNote (uuid, title, body) {
  const note = new Note()
  note.uuid = uuid
  note.title = title
  note.body = body
  const data = JSON.stringify(note, null, 2)
  fs.open(file, 'a', err => {
    if (err) throw err
    fs.writeFile(file, data, charset, err => {
      if (err) throw err
    })
  })
}

writeNote(uuid, title, body)
