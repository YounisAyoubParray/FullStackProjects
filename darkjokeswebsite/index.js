import express from "express";
import axios from "axios";

const app=express();
const port=3000;
app.use(express.static("public"));

app.get("/", async (req, res)=>{
    try{
    const result=await axios.get("https://v2.jokeapi.dev/joke/Dark?blacklistFlags=religious");
    if(result.data.type==='single'){
        res.render("index.ejs",{joke:result.data.joke});
    }else{
        res.render("index.ejs", {setup:result.data.setup, delivery:result.data.delivery});
    }
    console.log(result.data);
    }catch{
        res.status(500);
    }
});


app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});