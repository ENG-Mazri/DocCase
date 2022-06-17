const express = require('express');
const cors = require('cors');
const routes = require('./Routes/routes')

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

console.log(process.env.PORT)

app.listen(port, ()=> console.log(`Hey! I'm listening on ${port}`));


const corsOptions = {Credential: true}; 
app.use(cors());
app.use(express.json());
app.use(routes)

app.get('/', (req,res)=>{
    res.send('<h1>You are in the server side</h1>')
});