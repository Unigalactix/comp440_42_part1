const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { response } = require('express');


// app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());
const port = 3000;

const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Harshit@2001",
    database : "server"
});

con.connect((err)=>{
    if(err) {
        console.log(err);
    }
    else {
        console.log("connected to database");
    }
})

app.post('/send',(req,res)=>{
console.log('hi');
// var username = req.body.username;
const { username, password } = req.body;

let query_verify = "select username,password from user where username = ?";
con .query(query_verify,[username],(err,result)=>{
    console.log(result);
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    if (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
    if (result[0] == null|| "") {
        return res.status(401).json({ error: 'Not a user' });
    }
    else{
        if(password!=result[0].password){
            return res.status(401).json({error: 'Incorrect password'});
        }
        else{
            return res.json({'user':'welcome user'});
        }
    }

})
    // Generate a JWT token or set a session for the authenticated user
    // const token = generateAuthToken(user);

    // Return the token to the client or set a session cookie
    // res.status(200).json({ token });

// console.log(username)

// res.setHeader("Access-Control-Allow-Origin", "*");
// res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500');

});

app.post('/NewUser',(req,res)=>{
    console.log('new user');
    const {UserID ,UserPassword,UserFirstName,UserLastName,UserEmail,UserMobileNumber}=req.body;
    let query_newuser="insert into user(username,password,firstName,lastName,email,phoneNumber) values(?,?,?,?,?,?)";
    con.query(query_newuser,[UserID ,UserPassword,UserFirstName,UserLastName,UserEmail,UserMobileNumber],(err,response)=>{
        if(err){
            console.log(err);
          res.status(500).json({'message':'error'});
        }
        else{
            res.json({'message':'sucess'});
        }
    })
})
app.listen(port,() =>{
    console.log('server running is running',port);
});