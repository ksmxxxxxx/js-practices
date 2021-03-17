import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function MemoObj () {
  return {
    body: ''
  }
}

const newobj = new MemoObj()
const arr = []
const promise = new Promise((resolve) => {
  rl.on('line', text => {
    const line = `${text}` + '\n'
    arr.push(line)
    newobj.body = arr.join('')
  })
})
promise.then(rl.on('close', () => {
  console.log(newobj)
}))
