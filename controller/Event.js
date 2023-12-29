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

exports.Win = async (req, res, next) => {
  const { Name } = req.body
  const sql = `select PlayerEmail from participate where not exists ( select pemail from banplayer) and eventname='${Name}'`
  const result = await db.query(sql)
  if(result[0][0]==null)
  res.send({win:'There is No Winner'})
else{
console.log(result[0])
const {PlayerEmail}=result[0][0]
const sql3 = `
        SELECT coupid FROM coupon
        where coupid not in (select couponid from hascoupon as coupon) and redeemed !=1
        ORDER BY RAND()
        LIMIT 1; `
    const result3 = await db.query(sql3);
    const ishascoupon = result3[0][0]
    if (ishascoupon == null)
      res.send({win:'There is No Winner'})

    else {
      const winner=`insert into win values('${PlayerEmail}','${Name}')`
      const iswin = await db.query(winner)
      const insert = `insert into hascoupon values('${PlayerEmail}',${ishascoupon.coupid})`

      const inserted = await db.query(insert)
      const affect = inserted[0].affectedRows
      if (affect === 1)
        res.send({win:`The Winner is ${PlayerEmail} won coupon id : ${ishascoupon.coupid} `})
      else
        res.send({win:'There is no winner'})

    }

  }



}