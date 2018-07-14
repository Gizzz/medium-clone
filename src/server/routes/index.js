const express = require('express');
//
const authRouter = require('./auth');
const otherRoutesRouter = require('./otherRoutes');

const router = express.Router();

router.use('/api/auth', authRouter);
router.use('/api', otherRoutesRouter);

module.exports = router;
