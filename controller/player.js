const db = require('../connect/connection')
////////////////get all admin/////////
exports.getAll = async (req, res, next) => {
    const sql = `select Fname, Lname,Email,RankPlayer,Image from player `;
    const result = await db.query(sql);
    res.send(result[0]);
}
///create new creator
exports.createPlayer = async (req, res, next) => {
    const { Fname, Lname, Email, Image, Password,Bdate } = req.body;
    let sql;
    let email=Email.toLowerCase();
     if (Image === '')
        sql = `insert into player(Fname,Lname,Email,Password,Bdate) values ('${Fname}','${Lname}','${email}','${Password}','${Bdate}')`
    else
        sql = `insert into player(Fname,Lname,Email,Image,Password,Bdate) values ('${Fname}','${Lname}','${email}','${Image}','${Password}','${Bdate}')`
    const resul = await db.query(sql)
    res.send({iscreated:`Created`})
}
/////login in
exports.LoginPlayer= async (req, res, next) => {
    const { Email, Password } = req.body
    let email=Email.toLowerCase();
    const sql = `select Fname,Lname,Image,RankPlayer from player where email='${email}' and password='${Password}';`
    const resul = await db.query(sql)
    res.send(resul[0])
}

exports.BanPlayer=async(req,res,next)=>{
    const {Email}=req.body;
    let email=Email.toLowerCase();
    console.log(email)
    const sql=`select count(*)as count from banplayer where pemail='${email}'`;
    const result=await db.query(sql);
    const {count}=result[0][0]//to get the falue of count 
   res.send(JSON.stringify(count));
    }
//////////////////////////////