const router = require('express').Router()
module.exports = router

router.use('/monthly', require('./wiki-month'))
router.use('/weekly', require('./wiki-week'))
