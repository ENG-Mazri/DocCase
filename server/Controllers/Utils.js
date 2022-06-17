const express = require('express');
const  jwt  =  require("jsonwebtoken");

// A function that checks emails and passwords for some specified criteria  
function isValidUser(user){
    const isValidEmail = typeof user.email == 'string' &&
                                user.email.trim() != '';
    const isValidPassword = typeof user.password == 'string' &&
                                user.password.trim() != '' &&
                                user.password.trim().length >=6;
    return isValidEmail && isValidPassword;
}

// Middleware function to check token's validity
const tokenValidator = (req,res, next) => {
    try {
        const token = req.header("token");
        if(token){
            jwt.verify(token, 'helloodokojefe', (err, decodedToken)=>{
                if(err){
                    console.log(err.message)
                    res.json({isValidToken:false})
                }else{
                    //res.json("welcome home")
                    next()
                }
            })
    
        }else{
            res.json("can not find JWT")
      
        }
        
    } catch (error) {
        console.log(error.message)
        res.json("Try to login first")
    }
}

module.exports = {tokenValidator, isValidUser}