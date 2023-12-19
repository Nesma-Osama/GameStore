const express=require('express')
const admincontroller=require('../controller/admin')
const adminMiddelWare=require('../middelware/Admin')
const playerMiddelWare=require('../middelware/player')
const creatorMiddelWare=require('../middelware/creator')

const router=express.Router()
router.route('/').get(admincontroller.getAll)
router.route('/SignUp').post(adminMiddelWare.CheckEmail,adminMiddelWare.CheckPassword,adminMiddelWare.CheckOther,adminMiddelWare.isAdminExistWhenInsert,creatorMiddelWare.isCreatorExistWhenInsert,playerMiddelWare.isPlayerExistWhenInsert,admincontroller.createAdmin)
router.route('/Login').post(adminMiddelWare.CheckEmail,adminMiddelWare.CheckPassword,admincontroller.LoginAdmin)


module.exports=router