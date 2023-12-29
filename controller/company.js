const db=require('../connect/connection')
exports.CreateCompany=async(req,res)=>{
const {Name,Link,Logo,Description,AdminE}=req.body
let admin=AdminE.toLowerCase()
let sql;

  sql=`insert into company  values('${Name}','${Logo}','${Link}','${Description}','${admin}')`;

const result=await db.query(sql);
const {affectedRows}=result[0];//decomposite the returned result
if(affectedRows===1)
res.send({iscreated:'created'})
else
res.send({iscreated:'Error when try to insert this company'})
}

exports.GetAll=async(req,res)=>{
const sql=`select Name,Logo,Link,Description from company`
const result=await db.query(sql)
res.send(result[0]);
}