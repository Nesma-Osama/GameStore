const express=require('express')
const creatorcontroller=require('../controller/creator')
const playerMiddelWare=require('../middelware/player')
const adminMiddelWare=require('../middelware/Admin')
const creatorMiddelWare=require('../middelware/creator')

const router=express.Router()
router.route('/').get(creatorcontroller.getAll)
router.route('/SignUp').post(creatorMiddelWare.CheckEmail,creatorMiddelWare.CheckPassword,creatorMiddelWare.CheckOther,adminMiddelWare.isAdminExistWhenInsert,creatorMiddelWare.isCreatorExistWhenInsert,playerMiddelWare.isPlayerExistWhenInsert,creatorcontroller.createCreator)
router.route('/Login').get(creatorMiddelWare.CheckEmail,creatorMiddelWare.CheckPassword,creatorMiddelWare.CheckOther,creatorcontroller.LoginCreator)
module.exports=router