const db = require('../connect/connection')

exports.createpost = async (req,res,next) => {
    const { PostID,Content,DateTime,Email,Img } = req.body;
    let sql
    if(Img === null)
    {
        sql = `Insert into post (PostID,Content,Date,CreatorEmail) values (${PostID},'${Content}','${DateTime}',${Email});`

    }
    else{
        sql = `Insert into post (PostID,Content,Date,CreatorEmail,Image) values (${PostID},'${Content}','${DateTime}',${Email},'${Img}');`
    }
    const result = await db.query(sql)
    res.send(result[0])
}

exports.getPosts = async (req,res,next) => {
    sql = "Select PostID,NoLikes,Content,Date,CreatorEmail,Image from post"
    const result = await db.query(sql)
    res.send(result[0])
}

exports.checkID = async (req,res,next) => {
    const {id} = req.body;
    sql =`Select count(PostID) as x from post where PostID=${id};`
    const result = await db.query(sql)
    res.send(result[0][0])
}
