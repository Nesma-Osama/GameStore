const db=require('../connect/connection');
exports.get_all=async (req, res, next) => {
    const sql = `select Name, game.description as description, price, MIN_AGE , rdate ,AVELIABLEDELET , totalNumberSales,AVGRating,game.image as image,fname,lname ,email from game,creator where Cemail=email and AVELIABLEDELET=1  `;
    const result = await db.query(sql)
    res.send(result[0])
}
exports.create_game=async(req,res,next)=>{
    const {name,description,price,min_age,rdate,c_email,image}=req.body;
    let sql=`insert into game(Name,description,Price,MIN_AGE,RDATE,image,cemail) values ('${name}','${description}',${price},${min_age},'${rdate}','${image}','${c_email}')`;
    console.log(sql);
    const resul=await db.query(sql)
    const altered=resul[0];
    if(altered)
    {
    res.send({
        status:"added",
        added:"Game added successfully"});
    }
    else
    res.send({
        status:"failed",
added:"Failed to add game"});
}
exports.get_game_info=async(req,res,next)=>{
    const{name}=req.body;
    let query=`Select Name, description, price, MIN_AGE , rdate ,AVELIABLEDELET ,totalNumberSales,AVGRating,image,cemail from game where game.Name='${name}'`;
    console.log(query);
    const data=await db.query(query);
    res.send(data[0]);
}
exports.top_sold=async(req,res,next)=>{
    let query=`SELECT * FROM game
    ORDER BY totalNumberSales DESC
    LIMIT 6;`;
    const data=await db.query(query);
    res.send(data[0]);
}
exports.top_rated=async(req,res,next)=>{
    let query=`SELECT * FROM game
    ORDER BY AVGRating DESC
    LIMIT 15;`;
    const data=await db.query(query);
    res.send(data[0]);
}
exports.game_search=async(req,res,next)=>{
    const searchTerm = req.query.s_term;
    let q=`select * from game where description  LIKE '%${searchTerm}%'
    union 
    select * from game where name LIKE '%${searchTerm}%' and AVELIABLEDELET=1;`;
    const data=await db.query(q);
    res.send(data[0]);
}
exports.getReviews=async(req,res,next)=>{
    const {name}=req.body;
    const sql=`select fname,Lname,Image,Rating,Reviewcomment,Revdate 
    from reviewgame,player
    where playerEmail=email and GameName='${name}';`
    console.log(sql);
    const data=await db.query(sql);
    res.send(data);
}

