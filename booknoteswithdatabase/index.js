import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
let dataa=[];
const app=express();
const port=3000;
const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"booksreadproj",
    password:"**********",
    port:5432
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
db.connect();

async function newdata(tit,rat,con) {
    const birthday = new Date();
    const date = birthday.getFullYear() + "-" +
  String(birthday.getMonth() + 1).padStart(2, "0") + "-" +
  String(birthday.getDate()).padStart(2, "0");
    try {
        await db.query("INSERT INTO booksdet (datee,title,dataa,rating) VALUES ($1,$2,$3,$4)",[date,tit,con,rat]);
    } catch (error) {
        console.log(error);
    }
}
async function sort(st) {
    if(st==='rating'){
    try {
        dataa=[];
          console.log("rating");
        const res=await db.query("SELECT * FROM booksdet ORDER BY rating Desc");
        dataa=res.rows;
    } catch (error) {
        console.log(error);
    }}else if(st==='name'){
        try {
        dataa=[];
          console.log("name");
        const res=await db.query("SELECT * FROM booksdet ORDER BY title ASC");
        dataa=res.rows;
    } catch (error) {
        console.log(error);
    }
}else{
 try {
        dataa=[];
        console.log("date");
        const res=await db.query("SELECT * FROM booksdet ORDER BY datee Desc");
        dataa=res.rows;
    } catch (error) {
        console.log(error);
    }
}


}

app.post("/editing", async (req, res) => {
   if(req.body.passwd==='12345678'){
    const ab=await getdataedit(req.body.value);
    console.log(ab);
    res.render('editt.ejs',{ab});
   }
else{
    res.redirect("/");
  }
});


 async function getdataedit(id){
    let edit=[];
    console.log(id);
try {
    const rested= await db.query("SELECT * FROM booksdet WHERE id = $1",[id]);
    edit=rested.rows;
    return edit;
} catch (error) {
    console.log(error);
}


 }

app.post("/editpost", async (req, res) => {
    const id=req.body.idd;
    const tit=req.body.titlee;
    const rat=req.body.ratinge;
    const con=req.body.contente;
    console.log(id);
    await editdata(id,tit,rat,con);
    res.redirect('/');
});

async function editdata(id,tit,rat,con) {
    try {
        await db.query("UPDATE booksdet SET title = $1, dataa = $2, rating = $3 WHERE id = $4",[tit,con,rat,id]);
    } catch (error) {
        console.log(error);
    }
}




async function getdata(){
const res=await db.query("SELECT * FROM booksdet");
dataa=res.rows;
}

app.get('/',async (req,res)=>{
     dataa=[];
    await getdata();
    console.log(dataa);
    res.render("index.ejs",{dataa});
});

app.post('/addnew',async (req,res)=>{
    const pas=req.body.pass;
    if(pas==='12345678'){
    res.render("new.ejs");}else{
        res.redirect('/');
    }
});

app.post('/sort',async(req,res)=>{
const st=req.body.by;
await sort(st);
res.render('index.ejs',{dataa});
});
app.post('/newposthere',async (req,res)=>{
    const tit=req.body.title;
    const rat=req.body.rating
    const con=req.body.content
    await newdata(tit,rat,con);
    res.redirect('/');
});

app.listen(port,()=>{
console.log(`Server running on port ${port}`)
});