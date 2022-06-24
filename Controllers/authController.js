const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require('../models/db');
const {isValidUser} = require('../Controllers/Utils')
require('dotenv').config()


const tokenMaxAge = 24 * 60 * 60;

const register = async (req, res)=>{
    try{
        if(isValidUser(req.body)){
            
            const {email} = req.body;
            const {password} = req.body;

            //hashing the password
            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await pool.query(
                "INSERT INTO users (email, password) VALUES($1, $2) RETURNING *",
                [email, hashedPassword]);
            const token = jwt.sign({email}, process.env.SECRET_KEY ,{expiresIn:tokenMaxAge});
            //res.cookie('jwt', token, {httpOnly:true, maxAge: tokenMaxAge * 1000})
            res.json({email, password, token});
        }else{
            res.json('user does not fit the criteria')
        }
    
    }catch (err){
        console.log(err.message)
        res.json('couldn\'t register')
        
    }

}

const login = async (req, res)=>{
    try {
        const {email} = req.body;
        const {password} = req.body;
        const data = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = data.rows;
        if(user.length){
            bcrypt.compare(password, user[0].password, (err,result)=>{
                if(result){
                    const token = jwt.sign({email}, process.env.SECRET_KEY,{expiresIn:tokenMaxAge});
                    //res.cookie('jwt', token, {httpOnly:true, maxAge: tokenMaxAge * 1000})
                    res.json({email, password, token})
                }else if(!result){
                    res.json("incorrect password")
                }else{
                    res.json("there is an error")
                }
            })
    
    
        }else{
            res.json("please register first")
        }
        
    } catch (error) {
        console.log(error)
    }
}

const headerAuth = (req,res)=>{
    try {
        const {token} = req.body
        const jwtVerif = jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err){
                res.json("Header auth: no access token")
            }else{
                res.json({decoded})
            }
        }) 

    } catch (error) {
        console.log(error.message)
        res.json("Header auth: Error")
    }
}

module.exports = {
    register,
    login,
    headerAuth
}