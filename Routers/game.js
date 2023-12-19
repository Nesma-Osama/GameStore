const express=require('express')
const gamecontroller=require('../controller/game')
const gameMiddelWare=require('../middelware/game')
const router=express.Router()
router.route('/').get(gamecontroller.get_all)
router.route('/AddGame').post(gameMiddelWare.check_others_adding,gameMiddelWare.is_creator_exist,gameMiddelWare.is_game_added,gamecontroller.create_game)
router.route('/GameInfo').get(gameMiddelWare.check_others_search,gamecontroller.get_game_info)
module.exports=router