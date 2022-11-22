var express = require("express");
var app = express();
var path = require("path");
var test_module = require("./test2_moduleA.js")
var exphbs = require("express-handlebars");

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.urlencoded({extended: true}));

app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayer: "main",
  }));
  

app.set("view engine", ".hbs");

app.get("/", function(req,res){
    res.redirect("/home");
});

app.get("/home", function(req,res){
    res.render("home");
  });

/*
app.get("/BSD", (req, res) => {
    test_module.getBSD().then((data)=>{
        res.render("students", {students: data});
    }).catch(()=>{
        res.render({message: "no results"});
    });
});
*/

app.get("/allStudents", (req, res) => {
    test_module.allStudents().then((data)=>{
        res.render("students", {students: data});
    }).catch(()=>{
        res.render({message: "no results"});
    });
});


app.get("/highGPA", (req, res) => {
    test_module.highGPA().then((data)=>{
        res.render("student", {student: data});
    }).catch((err)=>{
        res.render({message: "no results"});
    });
});


app.use((req, res)=>{
    res.status(404).send("Error 404: Page Not Found");
});

//app.listen(HTTP_PORT, onHttpStart);


test_module.init().then(() => { 
    app.listen(HTTP_PORT, onHttpStart);
  }).catch(()=>{ 
    console.log("error message");
  });
