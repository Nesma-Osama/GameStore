const db = require('../connect/connection')
exports.CreateAd = async (req, res) => {
  const { Name, Image, CompanyName, Description, AdminE } = req.body
  let sql;
  let admin=AdminE.toLowerCase()

  sql = `insert into ad  values('${Name}','${Description}','${Image}','${CompanyName}','${admin}')`;

  const result = await db.query(sql);
  const { affectedRows } = result[0];//decomposite the returned result
  if (affectedRows === 1)
    res.send({ iscreated: 'created' })
  else
    res.send({ iscreated: 'Error when try to insert this ad' })
}

exports.GetAll = async (req, res) => {
  const sql = `select Name,Description,Image,CompanyName from Ad`
  const result = await db.query(sql)
  res.send(result[0]);
}
exports.GetAd = async (req, res, next) => {
  const { Name } = req.body
  const sql = `select ad.Name,ad.Description,Image,CompanyName,Logo,Company.Description as CDescription from ad,company where company.name=companyname and ad.name='${Name}'`
  const result = await db.query(sql);

  res.send(result[0]);
}

exports.Watch = async (req, res, next) => {
  const { Name, Email } = req.body
  const sql = `insert into playerwatch values('${Email}','${Name}')`
  const result = await db.query(sql)
  const sql2 = `select count(* ) as count from player where (select watched from player where email='${Email}')%6=0;`
  const result2 = await db.query(sql2);
  const { count } = result2[0][0];
  if (count === 1) {
    const sql3 = `
        SELECT coupid FROM coupon
        where coupid not in (select couponid from hascoupon as coupon) and redeemed !=1
        ORDER BY RAND()
        LIMIT 1; `
    const result3 = await db.query(sql3);
    const ishascoupon = result3[0][0]
    console.log(ishascoupon)
    if (ishascoupon == null)
      res.send({hascoupon:'Thanks for your time I hope you liked our ad'})

    else {
      const insert = `insert into hascoupon values('${Email}',${ishascoupon.coupid})`
      const inserted = await db.query(insert)
      const affect = inserted[0].affectedRows
      console.log(affect)
      if (affect === 1)
        res.send({hascoupon:'Congratulates You won a coupon please check your coupons'})
      else
        res.send({hascoupon:'Thanks for your time I hope you liked our ad'})

    }
  }
  else
    res.send({hascoupon:'Thanks for your time I hope you liked our ad'})






}