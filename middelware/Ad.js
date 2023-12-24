const db=require('../connect/connection')
exports.IsAdExist=async(req,res,next)=>{
const {Name}=req.body
const sql =`select count(*) as count from Ad where Name='${Name}'`
const result=await db.query(sql)
const {count}=result[0][0]
if(count===0)
next()
else{
res.send({iscreated:'This Ad exists'})
}}
