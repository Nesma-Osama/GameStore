const db=require('../connect/connection')
////////////////get all admin/////////
exports.getAll=async(req,res,next)=>{
const sql=`select Fname, Lname,Email from admins `
const result=await db.query(sql)
res.send(result[0])
}
///create new admin
exports.createAdmin=async(req,res,next)=>{
    const {Fname,Lname,Email,Password}=req.body
    let sql
   
    sql=`insert into admins(Fname,Lname,Email,Password) values ('${Fname}','${Lname}','${Email}','${Password}')`

    const resul=await db.query(sql)
    res.send(`Created`)
}
/////login in
exports.LoginAdmin=async(req,res,next)=>{
    const {Email, Password}=req.body
    const sql=`select Fname,Lname from admins where email='${Email}' and password='${Password}';`
    const resul=await db.query(sql)
    res.send(resul[0])
}
//////////////////////////////