import program from 'commander'

program
  .version('0.1.0')
  .option('-r, --reference', 'See to memo texts')
  .option('-l, --list', 'List memo titles')
  .option('-d --delete', 'Delete to select memo')

program.parse(process.argv)

if (program.reference) console.log('りふぁれんす')
if (program.list) console.log('りすと')
if (program.delete) console.log('さくじょ')

console.log('args')
console.log(program.args)
