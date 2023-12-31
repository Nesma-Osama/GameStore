const { json } = require("stream/consumers");
const db = require("../connect/connection");

exports.isPlayerExistWhenInsert = async (req, res, next) => {
  const { Email } = req.body;
  const email=Email.toLowerCase();
  const sql = `select *from player where Email='${email}'`;
  const result = await db.query(sql);
  if (result[0].length == 0) next();
  else res.send(({iscreated:"this user is already exist"}));
};
////////////////////for check the data constriants
exports.CheckEmail = async (req, res, next) => {
  const { Email } = req.body;
  if (Email.length > 50) res.send({iscreated:"Email must be less than or equl 50 letter"});
  else next();
};
exports.CheckPassword = async (req, res, next) => {
  const { Password } = req.body;
  if (Password.length > 20)
    res.send({iscreated:"Password must be less than or equal 20 letter"});
  else next();
};
exports.CheckOther = async (req, res, next) => {
  const { Fname, Lname, Image, Description } = req.body;
  if (Fname.length > 20) res.send({iscreated:"Fname must be less than or equal 20 letter"});
  else if (Lname.length > 20)
    res.send("Lname must be less than or equal 20 letter");
  else if (Image > 200) res.send({iscreated:"Image must be less than or equal 200 letter"});
  else next();
};
exports.in_cart=async(req,res,next)=>{
  const{player_email,game_name}=req.body;
  const sql=`select * from cart where PlayerEmail="${player_email}" and GameName="${game_name}"`;
  const result = await db.query(sql);
  if(result[0].length==0)
    next();
  else
    res.send({msg:"This game is already in your Cart"});
}
exports.in_fav=async(req,res,next)=>{
  const{player_email,game_name}=req.body;
  const sql=`select * from favorites where PlayerEmail="${player_email}" and GameName="${game_name}"`;
  const result = await db.query(sql);
  if(result[0].length==0)
    next();
  else
    res.send({msg:"This game is already in your Wishlist"});
}
