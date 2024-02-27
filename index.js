import { Console } from "console";
import express  from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

// array to store data
var blog = [];

// Constructor funtion  
var idCounter = 0;
function BlogMain(title,content){
    this.postId= idCounter++;
    this.title = title;
    this.content=content;    
}
// function that handles the input and stringify from so as to remove the object name that is inserted
function theMaker(req,res){
    var title =  req.body['title'];
    var content =  req.body['content'];
    var newPush =  JSON.stringify(new BlogMain(title,content));                     //returns the object and turned to string
    var newPush=JSON.parse(newPush);                                                //converts to text 
    blog.push(newPush);
    return blog;                                                                    // returns the array  
}

const app = express(); 
// app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));

// First response
app.get("/",(req,res)=>{
    if(blog.length === 0){
    res.render("index.ejs",{blog : [{title : "none", content : "none"}]});
    }
    else{
        res.render("index.ejs",{blog : blog});
    }
    // blog = [];
});

// activated when create new post option is clicked
app.get("/redirect",(req,res)=>{
    res.render("insertblog.ejs");
});

//invokes Maker and renders the object to  

app.post("/edit:pId" , (req,res)=>{
    var id = req.params.pId;
    var index = blog.findIndex((items)=> items.postId == id )
    console.log("index is "+index);
    res.render("edit.ejs",{post : blog, index : index });
});
app.post("/update:pId" ,(req,res)=>{
    var id =  req.params.pId;
    var index = blog.findIndex((items)=> items.postId == id );
    var newtitle = req.body["title"];
    var newcontent = req.body["content"]
    blog[index].title = newtitle;
    blog[index].content = newcontent;
    console.log(`Working ${newtitle}`);
    res.redirect(`/${id}`);
});
app.post("/delete:pId" ,(req,res)=>{
    var id = req.params.pId;
    var index = blog.findIndex((items)=> items.postId == id );
    blog.splice(index,1);
    res.redirect("/");
});


app.get("/:pId",(req,res)=>{
    //takes the id
    var id = req.params.pId;
    console.log( `${id} ok 1` );
    var index = blog.findIndex((items)=> items.postId == id )
    // console.log(`${index} ok 2`);
    // console.log(blog);
    console.log("  ")
    res.render("blog.ejs",{post : blog , index : index})
});
//activates upon interaction with post

app.post("/",(req,res)=>{
    if (Object.keys(req.body).length !== 0 ){
        console.log("above");
        var obj = theMaker(req,res);
        res.render("index.ejs",{blog : obj});
    }
    else{
        res.render("index.ejs",{blog : blog});
    }
    console.log(blog);
});
app.use((req, res) => {
    res.status(404).send("404 - Not Found");
});


app.listen(port,()=>{
    console.log(`Server open at port ${port}`);
});
