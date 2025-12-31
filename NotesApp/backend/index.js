import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import env from "dotenv";

env.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db= new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,});
db.connect();
const app=express();
const port=3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/api/home", async(req,res)=>{
  const result=await db.query("SELECT * from tnote");
  const Note=result.rows;
  res.json(Note);
})

app.post('/api/home', async (req, res) => {
    console.log('Received data:', req.body);
    const {nid, title, content } = req.body;
    try{await db.query("INSERT INTO tnote (nid,title,content) VALUES ($1,$2,$3)",[nid,title,content]);
    }catch{ 
      console.log("err0r");
    }res.json({ message: 'Data received successfully' });
});



app.post('/api/homee', async (req, res) => {
    console.log('Received data:', req.body);
    const { nid } = req.body;
    try{await db.query("DELETE FROM tnote WHERE nid=$1",[nid]);
    }catch{ 
      console.log("Error");
    }res.json({ message: 'Data received successfully' });
});






app.listen(port, () => {
  console.log(`Server running on ${port}`);
});