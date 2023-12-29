const express=require('express')
const router=express.Router()
const EventMiddelwares=require('../middelware/Event')
const EventController=require('../controller/Event')

router.route('/Add').post(EventMiddelwares.AddEvent,EventController.Event)
router.route('/Get').get(EventController.GetAll)
router.route('/Part').post(EventMiddelwares.isParticipate,EventMiddelwares.unreachmax,EventController.Participate)

module.exports=router