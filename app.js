const express=require('express')
const app=express()
const db=require('./connect/connection')
const adminRouter=require('./Routers/admin')
const creatorRouter=require('./Routers/creator')
const PlayerRouter=require('./Routers/player')
const game_router=require('./Routers/game')
var bodyParser = require('body-parser')
///connection part
///////////////////////////
const cors=require("cors");
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json())
//////////////////////////////////
app.use('/admin',adminRouter)
app.use('/creator',creatorRouter)
app.use('/player',PlayerRouter)
app.use('/game',game_router)
app.listen(3000,()=>{
    console.log('your port is 3000')
})