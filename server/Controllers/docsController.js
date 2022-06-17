const pool = require('../models/db');


const getDocs = async (req,res)=>{
    try{
        const allDocs = await pool.query("SELECT * FROM doc");
        res.json(allDocs.rows);
    }catch (err){
        console.log(err.message)
    }
}

const getDoc = async (req,res)=>{
    try{
        const {id} = req.params;
        const doc = await pool.query("SELECT * FROM doc WHERE doc_id = $1", [id]);
        res.json(doc.rows[0]);
    }catch (err){
        console.log(err.message)
    }
}

const postDoc = async (req,res)=>{
    try{
        const {docName} = req.body;
        const {projectName} = req.body;
        const {discipline} = req.body;
        const {author} = req.body;
        const {status} = req.body;
        const {description} = req.body;
        const {uuid} = req.body;
        const newDoc = await pool.query(
            "INSERT INTO doc (docName, projectName, discipline, author, status, description, uuid) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [docName, projectName, discipline, author, status, description, uuid]
        );
        res.json(newDoc.rows[0]);
    }catch (err){
        console.log(err.message)
    }
}

const editDoc = async (req,res)=>{
    try{
        const {id} = req.params;
        const {docName} = req.body;
        const {projectName} = req.body;
        const {discipline} = req.body;
        const {author} = req.body;
        const {status} = req.body;
        const {description} = req.body;
        const updateDoc = await pool.query("UPDATE doc SET docName = $1, projectName = $2, discipline = $3, author = $4, status = $5, description = $6 WHERE doc_id = $7", [docName, projectName, discipline, author, status, description, id]);
        res.json("Document was updated");
    }catch (err){
        console.log(err.message)
    }
}

const deleteDoc = async (req,res)=>{
    try{
        const {id} = req.params;
        const deleteDoc = await pool.query("DELETE FROM doc WHERE doc_id = $1", [id]);
        res.json("Document was deleted");
    }catch (err){
        console.log(err.message)
    }
}

module.exports = {
    getDocs,
    getDoc,
    postDoc,
    editDoc,
    deleteDoc
}