const express = require('express');
//
const authRouter = require('./auth');
const postsRouter = require('./posts');
const otherRoutesRouter = require('./otherRoutes');

const router = express.Router();

router.use('/api/auth', authRouter);
router.use('/api/posts', postsRouter);
router.use('/api', otherRoutesRouter);

module.exports = router;
