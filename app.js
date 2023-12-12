const express=require('express')
const app=express()
const db=require('./connect/connection')
const adminRouter=require('./Routers/admin')
const creatorRouter=require('./Routers/creator')
const PlayerRouter=require('./Routers/player')

///connection part
///////////////////////////
app.use(express.json())
//////////////////////////////////
app.use('/admin',adminRouter)
app.use('/creator',creatorRouter)
app.use('/player',PlayerRouter)
app.listen(3000,()=>{
    console.log('your port is 3000')
})