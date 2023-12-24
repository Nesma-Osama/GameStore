const express=require('express')
const playercontroller=require('../controller/player')
const playerMiddelWare=require('../middelware/player')
const adminMiddelWare=require('../middelware/Admin')
const creatorMiddelWare=require('../middelware/creator')

const router=express.Router()
router.route('/').get(playercontroller.getAll)
router.route('/SignUp').post(playerMiddelWare.CheckEmail,playerMiddelWare.CheckPassword,playerMiddelWare.CheckOther,adminMiddelWare.isAdminExistWhenInsert,creatorMiddelWare.isCreatorExistWhenInsert,playerMiddelWare.isPlayerExistWhenInsert,playercontroller.createPlayer)
router.route('/Login').post(playerMiddelWare.CheckEmail,playerMiddelWare.CheckPassword,playercontroller.LoginPlayer)
router.route('/Ban').post(playercontroller.BanPlayer)
router.route('/player_info').get(playercontroller.Player_info)
router.route('/AddToCart').post(playerMiddelWare.in_cart,playercontroller.add_to_cart)
module.exports=router