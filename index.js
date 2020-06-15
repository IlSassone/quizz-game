const express = require("express");
const path = require("path");

var app = express();
const port = process.env.PORT || 3000
app.use(express.static("./public"));

app.listen(port, ()=>{
    console.log("Server listening on port "+port);
});
