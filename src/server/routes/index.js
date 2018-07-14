const express = require('express');
//
const authRouter = require('./auth');
const postsRouter = require('./posts');
const otherRoutesRouter = require('./otherRoutes');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/posts', postsRouter);
router.use('/', otherRoutesRouter);

module.exports = router;
