const db=require('../connect/connection')
exports.CreateAd=async(req,res)=>{
const {Name,Image,CompanyName,Description,AdminE}=req.body
let sql;

  sql=`insert into ad  values('${Name}','${Description}','${Image}','${CompanyName}','${AdminE}')`;

const result=await db.query(sql);
const {affectedRows}=result[0];//decomposite the returned result
if(affectedRows===1)
res.send({iscreated:'created'})
else
res.send({iscreated:'Error when try to insert this ad'})
}

exports.GetAll=async(req,res)=>{
const sql=`select Name,Description,Image,CompanyName from Ad`
const result=await db.query(sql)
res.send(result[0]);
}