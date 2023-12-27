const express=require('express')
const AdController=require('../controller/Ad')
const AdMiddelWare=require('../middelware/Ad')
const rounter=express.Router()
rounter.route('/Add').post(AdMiddelWare.IsAdExist,AdController.CreateAd)
rounter.route('/Get').get(AdController.GetAll)
rounter.route('/GetAd').post(AdController.GetAd)
rounter.route('/Watch').post(AdMiddelWare.Watch,AdController.Watch)
module.exports=rounter
