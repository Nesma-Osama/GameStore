const express=require('express')
const companyController=require('../controller/company')
const companyMiddelWare=require('../middelware/company')
const rounter=express.Router()
rounter.route('/Add').post(companyMiddelWare.IsCompanyExist,companyMiddelWare.IsLinkExist,companyController.CreateCompany)
rounter.route('/Get').get(companyController.GetAll)
module.exports=rounter
