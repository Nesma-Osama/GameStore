const db=require('../connect/connection')
exports.IsCompanyExist=async(req,res,next)=>{
const {Name}=req.body
const sql =`select count(*) as count from company where Name='${Name}'`
const result=await db.query(sql)
const {count}=result[0][0]
if(count===0)
next()
else{
res.send({iscreated:'This company exists'})
}}
exports.IsLinkExist=async(req,res,next)=>{
    const {Link}=req.body
    const sql =`select count(*) as count from company where link='${Link}'`
    const result=await db.query(sql)
    const {count}=result[0][0]
    if(count===0)
    next()
    else{
    res.send({iscreated:'This Link exists'})
    }}
    