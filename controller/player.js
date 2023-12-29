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
exports.getActive = async (req,res,next) => {
    const sql ="Select fname,Lname,email,PASSWORD from player where email not in (Select PEmail from banplayer);"
    const result = await db.query(sql)
    res.send(result[0])
}

exports.getBanned = async (req,res,next) => {
    const sql ="Select fname,Lname,email,PASSWORD from player,banplayer where PEmail=email;"
    const result = await db.query(sql)
    res.send(result[0])
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
exports.AdmBanPlayer=async(req,res,next)=>{
    const {email,AEmail}=req.body;

    const sql = `Insert into banplayer (PEmail,AEmail) Values ('${email}',${AEmail});`
    const result = await db.query(sql)
    res.send(result[0])
}
exports.unBanPlayer=async(req,res,next)=>{
    const{email}=req.body;

    const sql = `Delete from banplayer where PEmail='${email}';`
    const result = await db.query(sql)
    res.send(result[0])
}
//////////////////////////////
exports.Player_info= async (req, res, next) => {
    const { Email} = req.body
    let email=Email.toLowerCase();
    const sql = `select Fname,Lname,Image,RankPlayer from player where email="${email}";`
    const resul = await db.query(sql)
    res.send(resul[0])
}
exports.add_to_cart=async(req,res,next)=>{
    const{player_email,game_name}=req.body;
    let query=`insert into cart values("${player_email}","${game_name}")`;
    const data=await db.query(query);
    res.send({msg:"The Game was added to your cart"});
}
exports.add_to_fav=async(req,res,next)=>{
    const{player_email,game_name}=req.body;
    let query=`insert into favorites values("${player_email}","${game_name}")`;
    const data=await db.query(query);
    res.send({msg:"The Game was added to your Wishlist"});
}