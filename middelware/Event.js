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