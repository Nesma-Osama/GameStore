const db = require('../connect/connection')
exports.update_coupons=async(req,res,next)=>{
    const{coupons}=req.body;
    try {
    
        for (const c of coupons) {
            const query = `update coupon set redeemed=1 where CoupID=${c.coupid}`;
            const data = await db.query(query);
        }

        res.send({ success: true });
    } catch (error) {
        console.error("Error", error);
        res.status(500).send({ success: false, error: "Internal Server Error" });
    }
}