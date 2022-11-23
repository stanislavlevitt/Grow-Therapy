const router = require('express').Router()
module.exports = router
const axios = require("axios");
const util = require('util');
const {TOPMONTLYVIEWS, ARTICLEMONTLYVIEWS, ARTICLEDAILYVIEWS} =require('../util/path')
const {ValidationError, getStartDate, getEndDate, getMonthName, handleError} =require('../util/helpers')


router.get("/best-view/:article/:year/:month", async (req,res)=>{
  try {
    const {article, year, month} = req.params
    const startDate = getStartDate(year, month)
    const endDate = getEndDate(year, month)
    let url = util.format(ARTICLEDAILYVIEWS, `${article}`, `${startDate}`, `${endDate}`);
    const {data} = await axios.get(url)
    const best = data.items.sort((a,b)=> b.views-a.views)[0]

    res.send({
      'article': best.article,
      'source': best.project,
      'views': best.views,
      'year': year,
      'month': getMonthName(month),
      'day': best.timestamp.slice(6,8)
    })
  } catch (error) {
    handleError(error, res)
  }
})

router.get("/article-view/:year/:month", async (req,res)=>{
  try {
    const {year, month} = req.params
    const formatMonth = month.length===2 ? month : `0${month}`
    let url = util.format(TOPMONTLYVIEWS, `${year}`, `${formatMonth}`);
    const {data} = await axios.get(url)
    res.send({
      'year': data.items[0].year,
      'month': getMonthName(data.items[0].month),
      'articles': data.items[0].articles
    })
  } catch (error) {
    handleError(error, res)
  }
})

router.get("/article-views/:article/:year/:month", async (req,res, next)=>{
  try {
    const {article, year, month} = req.params
    if(isNaN(+month) || +month<1 || +month> 12 ) throw new ValidationError("'invalid string'");
    const url = util.format(ARTICLEMONTLYVIEWS, `${article}`, `${year}`, `${year}`);
    const {data} = await axios.get(url)
    res.send({
      'articles': data.items[+month-1].article,
      'source': data.items[+month-1].project,
      'granularity': 'monthly',
      'month': getMonthName(month),
      'views': data.items[+month-1].views,
    })
  } catch (error) {
    handleError(error, res)
  }
})
