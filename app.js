const express = require("express")
var bodyParser = require("body-parser")
const config = require("config")
const fs = require("fs")
const app = express();

const port = process.env.PORT||config.get("PORT");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("viewme"))

app.post("/register", (req, res) => {
    res.json({ "Success": "true" });
    if(req.body.hob1==undefined && req.body.hob2==undefined && req.body.hob3==undefined){
        req.body.hobbies="none"
    }
     else if(req.body.hob1==undefined && req.body.hob2!=undefined && req.body.hob3!=undefined){
        req.body.hobbies=`${req.body.hob2} and ${req.body.hob3}`
    }else if(req.body.hob2==undefined && req.body.hob1!=undefined && req.body.hob3!=undefined){
        req.body.hobbies=`${req.body.hob1} and ${req.body.hob3}`
    }else if(req.body.hob3==undefined && req.body.hob1!=undefined && req.body.hob2!=undefined){
        req.body.hobbies=`${req.body.hob1} and ${req.body.hob2}`
    }else if(req.body.hob1==undefined && req.body.hob2==undefined){
        req.body.hobbies=`${req.body.hob3}`
    }else if(req.body.hob2==undefined && req.body.hob3==undefined){
        req.body.hobbies=`${req.body.hob1}`
    }else if(req.body.hob1==undefined && req.body.hob3==undefined){
        req.body.hobbies=`${req.body.hob2}`
    }else{
        req.body.hobbies=`${req.body.hob1} and ${req.body.hob2} and ${req.body.hob3}`
    }
    fs.writeFile("data.txt",
        `First Name: ${req.body.fname}\nLast Name : ${req.body.lname}\nPassword:${req.body.pass}\nemail:${req.body.email}\nmobile:${req.body.mobile}\nAddress:${req.body.address}\nDOB:${req.body.dob}\nGender:${req.body.gender}\nHobbies:${req.body.hobbies}\nCountry:${req.body.country}`
        , (err) => {
            if (err) {
                throw err;
            } else {
                console.log("Saved your file!")
                app.get("/access",(req,res)=>{
                    fs.readFile("data.txt",function(err,data){
                        res.send(data.toString())
                    })
                })
            }
        })
    })
app.listen(port, () => {
    console.log(`Server started at ${port}`);
})