import DateUtil from '@henrique-pignatari/date-util'

console.log(DateUtil.formatDate(new Date('2021-06-01'), 'dd/mm/yyyy'))
console.log(DateUtil.formatString('2021-06-01', 'yyyy/mm/dd', 'dd-mm-yyyy'))
