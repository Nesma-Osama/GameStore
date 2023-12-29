//const db=require('../connect/connection')
exports.is_game_added=async(req,res,next)=>{
    let{name}=req.body;
    let sql=`select * from game where game.name='${name}'`;
    const data=await db.query(sql);
    if(data[0].length==0)
    next()
else
res.send({
    status:"failed",
    added:"This game has already been added"});
}
const db=require('../connect/connection')
exports.is_creator_exist=async(req,res,next)=>{
    let{c_email}=req.body;
    let sql=`select * from creator where email='${c_email}'`;
    const data=await db.query(sql);
    if(data[0].length!=0)
    next()
else
res.send({added:"this creator does not exist"});
}
exports.check_others_adding=async(req,res,next)=>{
    let{name,description,price,min_age,c_email}=req.body;
    if(name==undefined||price==undefined||c_email==undefined)
    res.send("missing inputs");
    else
    next()
}
exports.check_others_search=async(req,res,next)=>{
    let{name}=req.body;
    if(name==undefined)
    res.send("missing inputs");
    else
    next()
}

