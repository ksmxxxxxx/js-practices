import fs from 'fs'
import crypto from 'crypto'

const title = 'Using fs.writeFile() with file descriptors'
const body = 'When file is a file descriptor, the behavior is almost identical to directly calling fs.write() like:'
const uuid = crypto.randomBytes(16).toString('hex')
const file = `${uuid}.json`
const charset = 'utf-8'

const note = {
  uuid: uuid,
  title: title,
  body: body
}

const data = JSON.stringify(note, null, 2)

fs.open(file, 'a', err => {
  if (err) throw err
  fs.writeFile(file, data, charset, err => {
    if (err) throw err
  })
})
