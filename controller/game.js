const db=require('../connect/connection');
exports.get_all=async (req, res, next) => {
    const sql = `select Name, description, price, MIN_AGE , rdate ,AVELIABLEDELET , totalNumberSales,AVGRating,image,cemail from game`;
    const result = await db.query(sql)
    res.send(result[0])
}
exports.create_game=async(req,res,next)=>{
    const {name,description,price,min_age,rdate,avail,total_sales,avg_rate,c_email}=req.body;
    let sql=`insert into game values ('${name}','${description}',${price},${min_age},'${rdate}',${avail},${total_sales},${avg_rate},'jhu','${c_email}')`;
    const resul=await db.query(sql)
    res.send(`Game Added`)
}
exports.get_game_info=async(req,res,next)=>{
    const{name}=req.body;
    let query=`Select Name, description, price, MIN_AGE , rdate ,AVELIABLEDELET , totalNumberSales,AVGRating,image,cemail from game where game.Name='${name}'`;
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

