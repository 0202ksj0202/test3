var express = require("express");
var app = express();
var path = require("path");
var test_module = require("./test2_moduleA.js")

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", (req, res) => {
    var text = "<h2> Declaration </h2> <br> I acknowldege the College's academic integrity policy - and my own integrity - remain in effect whether my work is done remotely or on site. Any test and assignment is an act of trust between me and my instructor ... even no one is watching. I declare I will not break that trust. <br> Name: <mark>Seongjun Kim </mark> <br>Student Number: <mark>157681206</mark> <br> <a href='/BSD'>Click to visit BSD students </a> <br> <a href='/highGPA'>Click to see who has the highest GPA</a>"
    res.send(text);
});

app.get("/BSD", (req, res) => {
    test_module.getBSD().then((data)=>{
        res.json(data);
    });
});


app.get("/highGPA", (req, res) => {
    test_module.highGPA().then((data)=>{
        res.json(data);
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
