const express=require('express')
const db=require('../connect/connection')
exports.AddEvent=async(req,res,next)=>{
    const {Name}=req.body
    const sql=`select count(*) as count from Event where evName='${Name}'`
    const result=await db.query(sql)
    const {count}=result[0][0]
    console.log(count)
    if(count===0)
    next()
else
res.send({event:'This Event already exists'})
}
exports.isParticipate=async(req,res,next)=>{
    const {Name,Email}=req.body
    const sql=`select count(*) as count from participate where EventName='${Name}' and playerEmail='${Email}'`
    const result=await db.query(sql)
    const {count}=result[0][0]
    if(count===0)
    next()
else
res.send({event:'You already participate in this event before'})
}
exports.unreachmax=async(req,res,next)=>{
    const {Name,Email}=req.body
    const sql=`select maxpart,NO_PART FROM EVENT WHERE EVNAME='${Name}'`
    const result=await db.query(sql)
    console.log(result[0][0])

  if( result[0][0]==null)
    next()
   else{const {maxpart,NO_PART}=result[0][0]
   
    if(maxpart>NO_PART)
    next()
else
res.send({event:'This event reach it`s max number'})}
}