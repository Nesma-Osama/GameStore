const db = require('../connect/connection')
////////////////get all admin/////////
exports.getAll = async (req, res, next) => {
    const sql = `select Fname, Lname,Email,Description,NumberOfGame,Image from Creator `
    const result = await db.query(sql)
    res.send(result[0])
}
///create new creator
exports.createCreator = async (req, res, next) => {
    const { Fname, Lname, Email, Description, Image, Password } = req.body
    let sql
    let email=Email.toLowerCase();
    if (Image === '' && Description === '')
        sql = `insert into creator(Fname,Lname,Email,Password) values ('${Fname}','${Lname}','${email}','${Password}')`
    else if (Image === '')
        sql = `insert into creator(Fname,Lname,Email,Description,Password) values ('${Fname}','${Lname}','${email}','${Description}','${Password}')`
    else if (Description === '')
        sql = `insert into creator(Fname,Lname,Email,Image,Password) values ('${Fname}','${Lname}','${email}','${Image}','${Password}')`
    else
        sql = `insert into creator(Fname,Lname,Email,Description,Image,Password) values ('${Fname}','${Lname}','${email}','${Description}','${Image}','${Password}')`
    const resul = await db.query(sql)
    res.send({iscreated:`Created`})
}
/////login in
exports.LoginCreator = async (req, res, next) => {
    const { Email, Password } = req.body
    let email=Email.toLowerCase();
    const sql = `select Fname,Lname,Description,NumberOfGame,Image from Creator where email='${email}' and password='${Password}';`
    const resul = await db.query(sql)
    res.send(resul[0])
}
//////////////////////////////
exports.BanCreator=async(req,res,next)=>{
    const {Email}=req.body;
    let email=Email.toLowerCase();
    const sql=`select count(*)as count from banCreator where cemail='${email}'`;
    const result=await db.query(sql);
    const {count}=result[0][0]//to get the falue of count 
     res.send(JSON.stringify(count));
    }