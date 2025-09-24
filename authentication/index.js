//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyparser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var ress=false;

app.use(bodyparser.urlencoded({extended: true}));
app.use(rep);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


 function rep(req,res,next){
    if(req.body["password"]==="ILoveProgramming"){
        ress=true;
    }else{
        ress=false; 
    }
    next();
 }

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


app.post("/check",(req, res) => {
    if(ress===true){
        res.sendFile(__dirname + "/public/secret.html");
    }else{
       // res.sendFile(__dirname + "/public/index.html");
        res.redirect("/");
    }
});