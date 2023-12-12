
const db=require('../connect/connection')

exports.isAdminExistWhenInsert=async(req,res,next)=>{
const{Email}=req.body
const sql=`select *from admins where Email='${Email}'`
const result=await db.query(sql)
if(result[0].length==0)
    next()
else 
res.send('this user is already exist')
}
////////////////////for check the data constriants
exports.CheckEmail=async(req,res,next)=>{
    const {Email}=req.body
    if(Email.length>50)
    res.send('Email must be less than or equl 50 letter')
else
next()
}
exports.CheckPassword=async(req,res,next)=>{
    const {Password}=req.body
    if(Password.length>20)
    res.send('Password must be less than or equal 20 letter')
else
next()
}
exports.CheckOther=async(req,res,next)=>{
    const {Fname,Lname,Image}=req.body
    if(Fname.length>20)
    res.send('Fname must be less than or equal 20 letter')
else if(Lname.length>20)
res.send('Lname must be less than or equal 20 letter')

else
next()
}