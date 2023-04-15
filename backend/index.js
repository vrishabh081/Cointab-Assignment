const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./config/database");
const authRouter = require("./routes/auth");
const PORT = 8080;

// middleware and routes-
app.use(express.json());
app.use(cors())
app.use("/", authRouter);

// server-
app.listen(PORT, async ()=>{
    try{
        await dbConnection
        console.log("Database connected successfully");
        console.log(`Server is successfully running on ${PORT}`);
    }
    catch(err){
        console.log(err);
        console.log("Database not connected");
        console.log("Servre is not running");
    }
})