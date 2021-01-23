const express = require("express")
var app = express()
const fs = require("fs")
const path = require("path")
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname , "src/index.html"))
})
app.listen(3000) 
app.use(express.static("src"))