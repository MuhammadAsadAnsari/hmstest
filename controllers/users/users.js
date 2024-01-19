const promisePool = require('../../connection/connect');


const getuserbyemail = async(req,res)=>{
const email = req.query.email
 try {
     const query =  `SELECT  name ,email,phoneNo FROM users WHERE email = '${email}'`;
     const [result] =await promisePool.execute(query)
     console.log(result);
     return res.status(200).json({
        success: true,
        data : {
             name : result[0]["name"],
            email: result[0]["name"],
            phone: result[0]["phoneNo"],
        },
        error :null,
        message : "ok"
     })
    
 } catch (error) {
     res.status(500).json({
         success: false,
         data: null,
         code: error.code,
         message: "Internal server error. try again latter."
     });
 }
}
const updateProfile = async(req,res)=>{
const {name,email,phoneNo} = req.body
try {
    if (!name || !phoneNo) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "All fields are required."
        });
    }
    const query = `UPDATE users SET name='${name}' ,phoneNo='${phoneNo}' WHERE email = '${email}'`;
    const [result] = await promisePool.execute(query);
    return res.status(200).json({
        success: true,
        data : {
            
            email : email,

        },
        message : "Data Successfully updated"
        
    })
} catch (error) {
    res.status(500).json({
        success: false,
        data: null,
        code: error.code,
        message: "Internal server error. try again latter."
    });
}

}

module.exports = {
    getuserbyemail,
    updateProfile
}