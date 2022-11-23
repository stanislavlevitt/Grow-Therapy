const {expect} = require('chai')
const {getStartDate, getEndDate, getMonthName, getWeekFormat} =require('../util/helpers')
const {MONTHNAME} =require('../util/conversions')


describe('Util Helpers', () => {
  const goodYear = '2016'
  const nonLeapYear = '2015'
  const goodMonth = '10'
  const goodWeek = '01'
  const goodMonthSingleDigit = '2'
  const goodWeekSingleDigit = '2'

// start getStartDate
describe('getStartDate', () => {
  it('Can get start date with Year, Month', () =>{
    const result = getStartDate(goodYear,goodMonth)
    expect(result).to.be.eql(`${goodYear}${goodMonth}0100`)
  })
  it('Can get start date with Year, single digit Month', () =>{
    const result = getStartDate(goodYear,goodMonthSingleDigit)
    expect(result).to.be.eql(`${goodYear}0${goodMonthSingleDigit}0100`)
  })

  it('Can get start date with Year, Month, Week', () =>{
    const result = getStartDate(goodYear,goodMonth, goodWeek)
    expect(result).to.be.eql(`${goodYear}${goodMonth}0100`)
  })
  it('Can get start date with Year, Month, Single Digit Week', () =>{
    const result = getStartDate(goodYear,goodMonth, goodWeekSingleDigit)
    expect(result).to.be.eql(`${goodYear}${goodMonth}0800`)
  })
})
// end getStartDate

// start getEndDate
describe('getEndDate', () => {
  it('Can get end date with Year, Month', () =>{
    const result = getEndDate(goodYear,goodMonth)
    expect(result).to.be.eql(`${goodYear}${goodMonth}3100`)
  })
  it('Can get end date with Year, single digit Month', () =>{
    const result = getEndDate(goodYear,goodMonthSingleDigit)
    expect(result).to.be.eql(`${goodYear}0${goodMonthSingleDigit}2900`)
  })
  it('Can get end date with Non Leap Year, single digit Month', () =>{
    const result = getEndDate(nonLeapYear,goodMonthSingleDigit)
    expect(result).to.be.eql(`${nonLeapYear}0${goodMonthSingleDigit}2800`)
  })
  it('Can get end date with Year, Month, Week', () =>{
    const result = getEndDate(goodYear,goodMonth, goodWeek)
    expect(result).to.be.eql(`${goodYear}${goodMonth}0700`)
  })
  it('Can get end date with Year, Month, Single Digit Week', () =>{
    const result = getEndDate(goodYear,goodMonth, goodWeekSingleDigit)
    expect(result).to.be.eql(`${goodYear}${goodMonth}1400`)
  })
  })
// end getEndDate

// start getMonthName
describe('getMonthName', () =>{
  it('Can get month Name with double digit', () =>{
    const result = getMonthName(goodMonth)
    expect(result).to.be.eql(MONTHNAME[+goodMonth])
  })

  it('Can get month Name with single digit', () =>{
    const result = getMonthName(goodMonthSingleDigit)
    expect(result).to.be.eql(MONTHNAME[+`0${goodMonthSingleDigit}`])
  })
})
// end getMonthName

// start getWeekFormat
describe('getWeekFormat', () =>{
  it('Can get month Name with double digit', () =>{
    const result = getWeekFormat(`2016100100`, `2016103100`)
    expect(result).to.be.eql(`10/01 - 10/31`)
  })
})
// end getWeekFormat

})
