const express=require('express')
const postcontroller = require('../controller/post')
const router=express.Router()

router.route('/create').post(postcontroller.createpost)
router.route('/getall').get(postcontroller.getPosts)
router.route('/checkid').post(postcontroller.checkID)
module.exports=router