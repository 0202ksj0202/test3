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
        var BSDstudents = [];
        for(var i=0; i<students.length; i++){
            if(students.program == "BSD")
            BSDstudents.push(students[i]);
        }
        if(BSDstudents.length == 0){
            reject("no results returned");
        }
        resolve(BSDstudents);

    });
};

function allStudents(){
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
    var highGPA = 0;
    var highGPA_student;
    return new Promise(function(resolve, reject){
        for(var i=0; i<students.length; i++){
            if(students[i].gpa > highGPA){
                highGPA = students[i].gpa;
                highGPA_student = students[i];
            }
        }

        if(highGPA_student == null){
            reject("Failed finding the student with the highest GPA")
        }

        resolve(highGPA_student);
    });

};

module.exports = {
    init,
    getBSD,
    highGPA,
    allStudents
};