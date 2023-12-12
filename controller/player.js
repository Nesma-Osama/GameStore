const db = require('../connect/connection')
////////////////get all admin/////////
exports.getAll = async (req, res, next) => {
    const sql = `select Fname, Lname,Email,RankPlayer,Image from player `
    const result = await db.query(sql)
    res.send(result[0])
}
///create new creator
exports.createPlayer = async (req, res, next) => {
    const { Fname, Lname, Email, Image, Password } = req.body
    let sql
   
     if (Image == null)
        sql = `insert into player(Fname,Lname,Email,Password) values ('${Fname}','${Lname}','${Email}','${Password}')`
    else
        sql = `insert into player(Fname,Lname,Email,Image,Password) values ('${Fname}','${Lname}','${Email}','${Image}','${Password}')`
    const resul = await db.query(sql)
    res.send(`Created`)
}
/////login in
exports.LoginPlayer= async (req, res, next) => {
    const { Email, Password } = req.body
    const sql = `select Fname,Lname,Image,RankPlayer from player where email='${Email}' and password='${Password}';`
    const resul = await db.query(sql)
    res.send(resul[0])
}

//////////////////////////////