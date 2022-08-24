const express = require("express");
const router = express.Router();

// different model routers
router.use('/wiki', require('./wiki'));
router.use('/users', require('./users'));

router.use(express.json())
router.use(express.urlencoded({extended:true}))

module.exports = router;
