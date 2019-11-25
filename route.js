var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();
var knex = require("./conncet_tbl.js") 

app.use(bodyParser.json())

var mysqlconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "navgurukul",
    database: "movie_informaiton"
});

mysqlconnection.connect((err) => {
    if (!err)
        console.log("db connected");
    else
        console.log("not connected");
});

// app.get("/get/:id", function (req,res,){
//     var id = req.params.id
//     knex("movie").where("id",id).then((data)=>{
//         res.send(data)
//     })
// })

app.get("/get", function (req,res,){
    knex.select("*").from("movie").then((data)=>{
        res.send(data)
    })
})

app.post('/post', function (req, res) {
    var movie_data = {
        id: req.body.id,
        movie_name: req.body.movie_name,
        movie_year: req.body.movie_year,
        movie_url: req.body.movie_url
    }
    knex("movie").insert(movie_data).then((data) => {
        console.log("post done!");
    });
});

app.put("/put", function (req, res){
    var movie_data = {
        movie_name: req.body.movie_name,
        movie_year: req.body.movie_year,
        movie_url: req.body.movie_url
    }
    knex("movie")
        .where({ id: req.body.id })
        .update( movie_data).then((data) => {
            console.log("updata done");
    })
})

app.delete("/delete", function (req, res){
    var movie_data = {
        movie_name: req.body.movie_name,
        movie_year: req.body.movie_year,
        movie_url: req.body.movie_url
    }
    knex("movie")
        .where({ id: req.body.id })
        .del(movie_data).then((data) => {
            console.log("del done");
    })
})

app.listen(5000, () => {
    console.log("5000 port pr shunta hai")
});