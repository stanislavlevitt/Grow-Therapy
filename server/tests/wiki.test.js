const {expect} = require('chai')
const request = require('supertest')
const app = require('../server')

describe('Api routes', () => {
  const goodArticle = 'Albert_Einstein'
  const goodYear = '2016'
  const goodMonth = '10'
  const goodWeek = '01'
  const goodMonthSingleDigit = '2'
  const goodWeekSingleDigit = '2'
  const badMonth = badYear = badWeek = 'ba'
  const badArticle = 'Albert_Einstein222'

  // start /api/wiki/monthly')
  describe('/api/wiki/monthly', () => {
    // start /api/wiki/monthly/best-view'
    describe('best-view', () => {

      it('month with 2 digits', async () => {
        const res = await request(app)
          .get(`/api/wiki/monthly/best-view/${goodArticle}/${goodYear}/${goodMonth}`)
          .expect(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('article');
          expect(res.body).to.have.property('source');
          expect(res.body).to.have.property('views');
          expect(res.body).to.have.property('day');
      })

      it('month with 1 digits', async () => {
        const res =  await request(app)
        .get(`/api/wiki/monthly/best-view/${goodArticle}/${goodYear}/${goodMonthSingleDigit}`)
          .expect(200)

          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('article');
          expect(res.body).to.have.property('source');
          expect(res.body).to.have.property('views');
          expect(res.body).to.have.property('day');
      })


      it('invalid month value', async () => {
        await request(app)
        .get(`/api/wiki/monthly/best-view/${goodArticle}/${goodYear}/${badMonth}`)
          .expect(400)
      })

      it('invalid year value', async () => {
        await request(app)
        .get(`/api/wiki/monthly/best-view/${goodArticle}/${badYear}/${goodMonth}`)
          .expect(400)
      })

      it('invalid article value', async () => {
        await request(app)
        .get(`/api/wiki/monthly/best-view/${badArticle}/${goodYear}/${goodMonth}`)
          .expect(404)
      })
    })
    // end /api/wiki/monthly/best-view'

    // start /api/wiki/monthly/article-view'
    describe('article-view', () => {

      it('month with 2 digits', async () => {
        const res = await request(app)
          .get(`/api/wiki/monthly/article-view/${goodYear}/${goodMonth}`)
          .expect(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('year');
          expect(res.body).to.have.property('month');
          expect(res.body).to.have.property('articles');
      })

      it('month with 1 digits', async () => {
        const res =  await request(app)
        .get(`/api/wiki/monthly/article-view/${goodYear}/${goodMonthSingleDigit}`)
        .expect(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('year');
        expect(res.body).to.have.property('month');
        expect(res.body).to.have.property('articles');
      })

      it('invalid month value', async () => {
        await request(app)
        .get(`/api/wiki/monthly/article-view/${goodYear}/${badMonth}`)
        .expect(400)
      })

      it('invalid year value', async () => {
        await request(app)
        .get(`/api/wiki/monthly/article-view/${badYear}/${goodMonth}`)
        .expect(400)
      })
    })
    // end /api/wiki/monthly/article-view'

    // start /api/wiki/monthly/article-views
    describe('article-views', () => {

      it('month with 2 digits', async () => {
        const res = await request(app)
        .get(`/api/wiki/monthly/article-views/${goodArticle}/${goodYear}/${goodMonth}`)
          .expect(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('articles');
          expect(res.body).to.have.property('source');
          expect(res.body).to.have.property('granularity');
          expect(res.body).to.have.property('views');
          expect(res.body).to.have.property('month');
      })

      it('month with 1 digits', async () => {
        const res =  await request(app)
        .get(`/api/wiki/monthly/article-views/${goodArticle}/${goodYear}/${goodMonthSingleDigit}`)
          .expect(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('articles');
          expect(res.body).to.have.property('source');
          expect(res.body).to.have.property('granularity');
          expect(res.body).to.have.property('views');
          expect(res.body).to.have.property('month');
      })

      it('invalid month value', async () => {
        await request(app)
        .get(`/api/wiki/monthly/article-views/${goodArticle}/${goodYear}/${badMonth}`)
          .expect(400)
      })

      it('invalid year value', async () => {
        await request(app)
        .get(`/api/wiki/monthly/article-views/${goodArticle}/${badYear}/${goodMonth}`)
          .expect(400)
      })

      it('invalid article value', async () => {
        await request(app)
          .get(`/api/wiki/monthly/article-views/${badArticle}/${goodYear}/${goodMonth}`)
          .expect(404)
      })
    })
    // end /api/wiki/monthly/article-views

    })
  // end /api/wiki/monthly')

  //start /api/wiki/weekly')
  describe('/api/wiki/weekly', () => {

    // start /api/wiki/weekly/article-views
    describe('article-views', () => {

      it('month with 2 digits', async () => {
        const res = await request(app)
        .get(`/api/wiki/weekly/article-views/${goodArticle}/${goodYear}/${goodMonth}/${goodWeek}`)
          .expect(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('articles');
          expect(res.body).to.have.property('source');
          expect(res.body).to.have.property('granularity');
          expect(res.body).to.have.property('week');
          expect(res.body).to.have.property('views');
      })


      it('month with 1 digits', async () => {
        const res =  await request(app)
        .get(`/api/wiki/weekly/article-views/${goodArticle}/${goodYear}/${goodMonth}/${goodWeekSingleDigit}`)
          .expect(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('articles');
          expect(res.body).to.have.property('source');
          expect(res.body).to.have.property('granularity');
          expect(res.body).to.have.property('week');
          expect(res.body).to.have.property('views');
      })

      it('invalid week value', async () => {
        await request(app)
        .get(`/api/wiki/weekly/article-views/${goodArticle}/${goodYear}/${goodMonth}/${badWeek}`)
          .expect(400)
      })

      it('invalid month value', async () => {
        await request(app)
        .get(`/api/wiki/weekly/article-views/${goodArticle}/${goodYear}/${badMonth}/${goodWeek}`)
          .expect(400)
      })

      it('invalid year value', async () => {
        await request(app)
        .get(`/api/wiki/weekly/article-views/${goodArticle}/${badYear}/${goodMonth}/${goodWeek}`)
          .expect(400)
      })

      it('invalid article value', async () => {
        await request(app)
        .get(`/api/wiki/weekly/article-views/${badArticle}/${goodYear}/${goodMonth}/${goodWeek}`)
          .expect(404)
      })
    })
    // end /api/wiki/weekly/article-views

    // start /api/wiki/weekly/article-view
    describe('article-view', () => {

      it('month with 2 digits', async () => {
        const res = await request(app)
        .get(`/api/wiki/weekly/article-view/${goodYear}/${goodMonth}/${goodWeek}`)
          .expect(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('year');
          expect(res.body).to.have.property('week');
          expect(res.body).to.have.property('article');
      })

      it('month with 1 digits', async () => {
        const res =  await request(app)
        .get(`/api/wiki/weekly/article-view/${goodYear}/${goodMonth}/${goodWeekSingleDigit}`)
          .expect(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('year');
          expect(res.body).to.have.property('week');
          expect(res.body).to.have.property('article');
      })

      it('invalid week value', async () => {
        await request(app)
        .get(`/api/wiki/weekly/article-view/${goodYear}/${goodMonth}/${badWeek}`)
          .expect(400)
      })

      it('invalid month value', async () => {
        await request(app)
        .get(`/api/wiki/weekly/article-view/${goodYear}/${badMonth}/${goodWeek}`)
          .expect(400)
      })

      it('invalid year value', async () => {
        await request(app)
        .get(`/api/wiki/weekly/article-view/${badYear}/${goodMonth}/${goodWeek}`)
          .expect(400)
      })
    })
    // end /api/wiki/weekly/article-view

  })
  // end /api/wiki/weekly')

}) // end describe('Api routes')
