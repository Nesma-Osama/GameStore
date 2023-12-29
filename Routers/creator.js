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
router.route('/Active').get(creatorcontroller.getActive)
router.route('/Banned').get(creatorcontroller.getBanned)
router.route('/AdmBanCreator').post(creatorcontroller.AdmBanCreator)
router.route('/Unban').post(creatorcontroller.unBanCreator)
router.route('/CreatorPage').post(creatorcontroller.getCreatedGames)
module.exports=router