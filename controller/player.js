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
exports.games_in_cart=async(req,res,next)=>{
    const{Email}=req.body;
    let query=`select * from cart , game where name=gamename and PlayerEmail='${Email}'`;
    const data=await db.query(query);
    res.send(data[0]);
}
exports.remove_from_cart=async(req,res,next)=>{
    const{game_name,email}=req.body;
    let query=`delete from cart where playeremail="${email}" and gamename="${game_name}"`;
    const data=await db.query(query);
    res.send({msg:"The Game was deleted from Your Cart"});
}
exports.use_coupon=async(req,res,next)=>{
    const{code,email}=req.body;
    let query=`select price , redeemed , coupid from coupon , hascoupon where CouponID=CoupID and CouponID=${code} and playeremail="${email}"`;
    const data=await db.query(query);
    res.send(data[0]);
}
exports.is_sub=async(req,res,next)=>{
    const{email}=req.body;
    let query=`select percentage , Enddate from playersubs , subscription where subname=SubscriptionName and playeremail="${email}";`;
    const data=await db.query(query);
    res.send(data[0]);
}
exports.add_order=async(req,res,next)=>{
    const{email,tot_price,date}=req.body;
    let query=`insert into ordertable (date,playeremail,price)values(STR_TO_DATE('${date}', '%d-%m-%Y'),"${email}",${tot_price});`;
    let query2=`SELECT * FROM ordertable WHERE id = LAST_INSERT_ID();`
    const data=await db.query(query);
    const data2=await db.query(query2);
    res.send(data2[0]);
}

exports.add_game_order = async (req, res, next) => {
    try {
        const { id, games,email } = req.body;

        for (const game of games) {
            const query = `INSERT INTO ordergame VALUES (${id}, "${game.Name}")`;
            const data = await db.query(query);
        }
        const query=`delete from cart where playeremail="${email}"`
        const data = await db.query(query);
        res.send({success:"true"})
    } catch (error) {
        console.error("Error adding game order:", error);
       
    }
};
exports.games_in_fav=async(req,res,next)=>{
    const{Email}=req.body;
    let query=`select * from favorites , game where name=gamename and PlayerEmail='${Email}'`;
    const data=await db.query(query);
    res.send(data[0]);
}
exports.remove_from_fav=async(req,res,next)=>{
    const{game_name,email}=req.body;
    let query=`delete from favorites where playeremail="${email}" and gamename="${game_name}"`;
    const data=await db.query(query);
    res.send({msg:"The Game was deleted from Your Cart"});
}






