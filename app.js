const express = require("express");
const { AsyncHandler } = require("./utils/async-handler");
const authRoute = require("./routes/auth/auth.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use("/auth", authRoute);

app.get("/",AsyncHandler(async (req,res)=>{
    res.send("YO !!👋❤")
}));

app.listen(PORT,()=>{console.log(`Server started at ${PORT}`)});