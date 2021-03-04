#!/usr/bin/env node
import minimist from 'minimist'

const weeks = ['日', '月', '火', '水', '木', '金', '土']
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()

const defaultOpt = {
  default: {
    y: year,
    m: month + 1
  }
}

const argv = minimist(process.argv.slice(2), defaultOpt)
const startDate = new Date(argv.y, argv.m - 1, 1)
const endDate = new Date(argv.y, argv.m, 0)
const startDay = startDate.getDay()
const dateOfMonthly = [...Array(endDate.getDate()).keys()].map(d => ++d)
const w = 0
const d = 0

const eachSlice = (arr, num, result = []) => {
  if (arr.length === 0) return result
  return eachSlice(arr, num, [...result, arr.splice(0, num)])
}

for (let start = 0; start < startDay; start++) {
  if (w === 0 && d < startDay) {
    dateOfMonthly.unshift('  ')
  }
}
const rowDate = eachSlice(dateOfMonthly, 7)

process.stdout.write(`${argv.m}月 ${argv.y}`.padStart(14, ' ') + '\n')
process.stdout.write(weeks.join(' ') + '\n')

rowDate.forEach(row => {
  row.forEach(date => {
    if (date.toString().length === 1) {
      process.stdout.write(' ' + date.toString() + ' ')
    } else {
      process.stdout.write(date.toString() + ' ')
    }
  })
  process.stdout.write('\n')
})
