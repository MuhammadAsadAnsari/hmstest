const promisePool = require("../connection/connect");

const authenticationToken = async(req,res,next)=>{
  const token = req.headers.authorization.split(" ")[1] 
  try {
    if (!token) {
        return res.status(401).json({
            success : false,
            data : null,
            message: "Unauthorized. Token is missing."
        })

    }
      const checkid = `SELECT user_id FROM user_token WHERE token = '${token}'`;
    
      const [checkidresult]= await promisePool.execute(checkid)
      if(checkidresult.length===0){
        return  res.status(401).json({
            success : false,
            data : null,
            message: "Unauthorized. Invalid token."

        })
      } 
      req.userId = checkidresult[0].user_id; // Attach user ID to the request for further processing
      next();
  } catch (error) {
      res.status(500).json({
          success: false,
          data : null,
          message: "Internal server error. Try again later.",
      });
  }
}
module.exports = {
    authenticationToken
}
