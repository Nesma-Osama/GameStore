const express=require('express')
const creatorcontroller=require('../controller/creator')
const playerMiddelWare=require('../middelware/player')
const adminMiddelWare=require('../middelware/Admin')
const creatorMiddelWare=require('../middelware/creator')

const router=express.Router()
router.route('/').get(creatorcontroller.getAll)
router.route('/SignUp').post(creatorcontroller.createCreator)
router.route('/Login').post(creatorcontroller.LoginCreator)
module.exports=router