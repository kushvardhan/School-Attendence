const express = require("express");
const { AsyncHandler } = require("./utils/async-handler");
const app = express();

const PORT = process.env.PORT || 8000;

app.get("/",AsyncHandler(async (req,res)=>{
    
}))

app.listen(PORT,()=>{console.log(`Server started at ${PORT}`)});