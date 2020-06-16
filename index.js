"use strict";
const express = require("express");
const path = require("path");
const http = require("http");
const https = require("https");
const socket = require("socket.io");
const Quiz = require("./quizApiRequest");

let app = express();
const port = process.env.PORT || 5500
let server = http.createServer(app);

app.use(express.static("./public"));

const quiz = new Quiz();


let io = socket(server);
io.on("connection", (socket)=>{
    console.log("someone connected");

    socket.on("gameStart", async ()=>{
        quiz.randomCategory().then((body)=>{
            console.log(body);
            socket.emit("sendCategories", body);
        })
        
        console.log("ao dall'altra parte hanno premuto er bottone");
        
    });



    socket.on("disconnect", (socket) => {

        console.log("someone disconnected");
    });
    
});



server.listen(port, ()=>{
    console.log("Server listening on port "+port);
});
