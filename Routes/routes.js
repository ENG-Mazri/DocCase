const { register, login, headerAuth } = require('../Controllers/authController');
const { getDocs, getDoc, postDoc, editDoc, deleteDoc } = require('../Controllers/docsController');
const { tokenValidator } = require('../Controllers/Utils');
const express = require('express');
const path = require('path')
const router = express.Router();


router.post('/register' , register);
router.post('/login' , login);
router.post('/headerAuth', headerAuth)

router.get('/docs',tokenValidator, getDocs);
router.get('/docs/:id', getDoc);
router.post('/docs', postDoc);
router.put('/docs/:id', editDoc);
router.delete('/docs/:id', deleteDoc);

router.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,"../client/build/index.html"))
});

module.exports = router;