const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.get("/",(req,res)=>{
    res.send("YO YE");
})

app.listen(PORT,()=>{console.log(`Server started at ${PORT}`)});