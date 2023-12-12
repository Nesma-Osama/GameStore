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
    if (Image == null && Description == null)
        sql = `insert into creator(Fname,Lname,Email,Password) values ('${Fname}','${Lname}','${Email}','${Password}')`
    else if (Image == null)
        sql = `insert into creator(Fname,Lname,Email,Description,Password) values ('${Fname}','${Lname}','${Email}','${Description}','${Password}')`
    else if (Description == null)
        sql = `insert into creator(Fname,Lname,Email,Image,Password) values ('${Fname}','${Lname}','${Email}','${Image}','${Password}')`
    else
        sql = `insert into creator(Fname,Lname,Email,Description,Image,Password) values ('${Fname}','${Lname}','${Email}','${Description}','${Image}','${Password}')`
    const resul = await db.query(sql)
    res.send(`Created`)
}
/////login in
exports.LoginCreator = async (req, res, next) => {
    const { Email, Password } = req.body
    const sql = `select Fname,Lname,Description,NumberOfGame,Image from Creator where email='${Email}' and password='${Password}';`
    const resul = await db.query(sql)
    res.send(resul[0])
}
//////////////////////////////