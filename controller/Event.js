const db=require('../connect/connection')
exports.Event=async(req,res,next)=>{
    console.log((new Date()).toISOString().substring(0,10))
    const {Name,Description,Image,End,Max,AdminE,GName}=req.body
    let admin=AdminE.toLowerCase()
    const sql=`insert into event (evName,Description,Image,EndDate,stDate,MaxPart,GameName,AdminEmail)values('${Name}','${Description}','${Image}','${End}','${(new Date()).toISOString().substring(0,10)}',${Max},'${GName}','${admin}')`
    const result=await db.query(sql)
    const {affectedRows}=result[0]
    console.log(affectedRows)
    if(affectedRows===1)
res.send({event:'Created Successfully'})
else
res.send({event:'Not Created Successfully'})

}

exports.GetAll=async(req,res,next)=>{
    let date=(new Date()).toISOString().substring(0,10)
    const sql=`select EvName,Image,Description,No_Part as Number,GameName ,EndDate from event where enddate>='${date}'`
    const result=await db.query(sql)
   res.send(result[0])



}
exports.Participate=async(req,res,next)=>{
    const {Name,Email}=req.body
    const sql=`insert into participate values('${Email}','${Name}')`
    const result=await db.query(sql)
    console.log(result)
  if(result[0]?.affectedRows===
    1)
  res.send({event:'you participate in this event'})
else
res.send({event:'cannot participate'})


}