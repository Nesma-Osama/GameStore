const express=require('express')
const creatorcontroller=require('../controller/creator')
const playerMiddelWare=require('../middelware/player')
const adminMiddelWare=require('../middelware/Admin')
const creatorMiddelWare=require('../middelware/creator')

const router=express.Router()
router.route('/').get(creatorcontroller.getAll)
router.route('/SignUp').post(adminMiddelWare.CheckEmail,adminMiddelWare.CheckPassword,adminMiddelWare.CheckOther,adminMiddelWare.isAdminExistWhenInsert,creatorMiddelWare.isCreatorExistWhenInsert,playerMiddelWare.isPlayerExistWhenInsert,creatorcontroller.createCreator)
router.route('/Login').post(creatorcontroller.LoginCreator)
router.route('/Ban').post(creatorcontroller.BanCreator)
router.route('/CreatorPage').post(creatorcontroller.getCreatedGames)
module.exports=router