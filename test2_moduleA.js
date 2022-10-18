const fs = require("fs");

var students = [];


function init(){
    return new Promise(function(resolve, reject){
        fs.readFile("./students.json", function(err,data){
            if(err){
                reject("unable to read file");
            } 
            else{
                students = JSON.parse(data);
                resolve();
            }
        });
    });
};


function getBSD(){
    return new Promise(function(resolve, reject){
        var allstudents = [];
        for(var i=0; i<students.length; i++){
            allstudents.push(students[i]);
        }
        if(allstudents.length == 0){
            reject("no results returned");
        }
        resolve(allstudents);

    });
};


function highGPA(){
    var gpa_student = [];
    return new Promise(function(resolve, reject){
        for(var i=0; i<students.length; i++){

            gpa_student.push(Math.max(students[i].gpa));
            
            
        }
        resolve();
        
    });

};

module.exports = {
    init,
    getBSD,
    highGPA
};