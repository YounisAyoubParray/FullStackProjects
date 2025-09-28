import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;
var blog=[];
var currentup;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs");
});


app.get("/view", (req, res)=>{
  if(blog.length<1){
    res.render("index.ejs",{result:"First write a blog!"}); 
  }else{
    res.render("view.ejs",{"data":blog});
  }
});
app.get("/update", (req, res)=>{
  if(blog.length<1){
    res.render("index.ejs",{result:"First write a blog!"}); 
  }else{
    res.render("update.ejs",{"data":blog});
  }
  
});

app.get("/delete", (req, res)=>{
  if(blog.length<1){
    res.render("index.ejs",{result:"First write a blog!"}); 
  }else{
    res.render("delete.ejs",{"data":blog});
  }
});



app.post("/dsubmit", (req, res)=>{
    console.log(req.body.deleteinp);
    if (req.body.deleteinp-1 in blog) {
    console.log("Index exists");
    blog.splice(req.body.deleteinp-1,1);
    console.log(blog);
    res.render("delete.ejs",{dresult:"Blog deleted successfully!"});
  } else {
    console.log("Index does not exist");
    res.render("delete.ejs",{dresult:"Blog number invalid"}); 
    }
    
    
});

app.post("/usubmit", (req, res)=>{
    console.log(req.body.updinp);
    if (req.body.updinp-1 in blog) {
    console.log("Index exists update");
    var dis= blog[req.body.updinp-1];
    var m=req.body.updinp-1;
    console.log(blog);
    currentup=m;
    res.render("updaten.ejs",{data:`${dis}`,num:`${m+1}`});
  } else {
    console.log("Index does not exist");
    res.render("update.ejs",{uresult:"Blog number invalid"}); 
    } 
});

app.post("/upsubmit", (req, res)=>{
    console.log(req.body.blogdescriptionu);
    blog[currentup]=req.body.blogdescriptionu;
    res.render("index.ejs",{result:"Blog updated successfully!"}); 
});


app.post("/wsubmit", (req, res)=>{
    console.log(req.body.blogdescription);
    blog.push(req.body.blogdescription);
    res.render("index.ejs",{result:"Blog saved successfully!"}); 
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
