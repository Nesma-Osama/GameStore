const express=require('express')
const playercontroller=require('../controller/player')
const playerMiddelWare=require('../middelware/player')
const adminMiddelWare=require('../middelware/Admin')
const creatorMiddelWare=require('../middelware/creator')

const router=express.Router()
router.route('/').get(playercontroller.getAll)
router.route('/SignUp').post(playerMiddelWare.CheckEmail,playerMiddelWare.CheckPassword,playerMiddelWare.CheckOther,adminMiddelWare.isAdminExistWhenInsert,creatorMiddelWare.isCreatorExistWhenInsert,playerMiddelWare.isPlayerExistWhenInsert,playercontroller.createPlayer)
router.route('/Login').get(playerMiddelWare.CheckEmail,playerMiddelWare.CheckPassword,playerMiddelWare.CheckOther,playercontroller.LoginPlayer)


module.exports=router