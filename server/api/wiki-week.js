const router = require('express').Router()
module.exports = router
const axios = require("axios");
const util = require('util');
const {TOPDAILYVIEWS, ARTICLEDAILYVIEWS} =require('../util/path')
const {ValidationError, getStartDate, getEndDate, getWeekFormat, handleError} =require('../util/helpers')

const getSortedArticlesForWeek = async (year, month, start,end) => {
  const map= new Map()

    while(start <= end){
      let strDay
      if(start<10) strDay = `0${start}`
      else strDay = start.toString()
      let url = util.format(TOPDAILYVIEWS, `${year}`, `${month}`, `${strDay}`);

      const {data} = await axios.get(url)
      data.items[0].articles.forEach(obj=>{
        map.set(obj.article, (map.get(obj.article) || 0) + obj.views)
      })

      start++
    }
    const sorted = new Map([...map.entries()].sort((a,b) => b[1] - a[1]))
    return Array.from(sorted).map(([article, views]) => ({article, views}))
}

router.get("/article-view/:year/:month/:week", async (req,res)=>{

  try {
    const {year, month, week} = req.params

    const startDate = getStartDate(year, month, week)
    const endDate = getEndDate(year, month, week)
    const strMonth = startDate.slice(4,6)
    const startDay = +startDate.slice(6,8)
    const endDay = +endDate.slice(6,8)
    if(isNaN(startDay) || isNaN(endDay)|| +month> 12 ) throw new ValidationError("'invalid week input'");
    const articles = await getSortedArticlesForWeek(year, strMonth, startDay, endDay)

    res.send({
      'year': year,
      'week': getWeekFormat(startDate, endDate),
      'article': articles,
    })
  } catch (error) {
    handleError(error, res)
  }
})

router.get("/article-views/:article/:year/:month/:week", async (req,res, next)=>{
  try {
    const {article, year, month, week} = req.params
    const startDate = getStartDate(year, month, week)
    const endDate = getEndDate(year, month, week)
    const url = util.format(ARTICLEDAILYVIEWS, `${article}`, `${startDate}`, `${endDate}`);
    const {data} = await axios.get(url)
    const totalViews = data.items.reduce(
      (accumulator, object) => accumulator + object.views,0)

    res.send({
      'articles': data.items[0].article,
      'source': data.items[0].project,
      'granularity': 'weekly',
      'week': getWeekFormat(startDate, endDate),
      'views': totalViews,
    })
  } catch (error) {
    handleError(error, res)
  }
})
