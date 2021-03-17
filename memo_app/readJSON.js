import readline from 'readline'
import fs from 'fs'

const file = 'test_json_nodata.json'
const charset = 'utf8'

const test = fs.readFileSync(file, charset)
// if (test === null) {
//   console.log('nullだよ')
// } else {
//   console.log('中身あるよ')
// }
console.log(test)
