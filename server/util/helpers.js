const {MONTHDAYS, MONTHNAME, STARTWEEK, ENDWEEK} =require('./conversions')

const LASTWEEK = '05'

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.response ={
      'status' : 400
    }
  }
}

const getMonthName = (month) =>{
  if(month.length<2) month = `0${month}`
  return MONTHNAME[+month]
}

const getWeekFormat = (start, end) =>{
  start = `${start.slice(4,6)}/${start.slice(6,8)}`
  end = `${end.slice(4,6)}/${end.slice(6,8)}`
  return `${start} - ${end}`
}

const getStartDate = (year,month, week = null) =>{
  let day

  if(month.length<2) month = `0${month}`

  if(!week) day = "01"
  else day = getDay(week, start = true)


  return `${year}${month}${day}00`
}

const getEndDate = (year,month, week = null) =>{
  let day

  if(month.length<2) month = `0${month}`

  if(week){
    if(isLastWeek(week,month,year)) day = MONTHDAYS[+month]
    else day = getDay(week, start = false)
  }
  else if(month =="02") day =  getLeapYearDay(checkLeapYear(year))
  else day = MONTHDAYS[+month]


  return `${year}${month}${day}00`
}

const getDay = (week, isStart)=>{
  if(week.length<2) week = `0${week}`
  if(isStart) return STARTWEEK[+week]

  return ENDWEEK[+week]
}

const isLastWeek = (week, month, year) =>{
  if (week === LASTWEEK) return true
  if (month =="02" && week==="04" && checkLeapYear(year)) return true
  return false
}

const getLeapYearDay = (isLeapYear) => isLeapYear ? '29' :'28'

const checkLeapYear = (year) => new Date(year, 1, 29).getDate() === 29

const handleError = (error, res) =>{
  let status
  if(error.response && error.response.status) status = error.response.status
  else status = 505

  let message = "You have enter an invalid year, month or week value. Please make sure your inputs are whole number values."
  if(status === 404) message = error.response.data.detail

    res.status(status).send({
      'error_message': message
    })
}


module.exports = {
  ValidationError,
  getStartDate,
  getEndDate,
  getMonthName,
  getWeekFormat,
  handleError
}
