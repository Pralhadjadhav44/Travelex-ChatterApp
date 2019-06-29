const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 3030;

// Static folder to keep all static files
app.use(express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
    console.log("Called");
    res.sendFile(__dirname + "/public/abc.html");
})


io.on("connection",(client)=>{
    console.log("Connected.....");
    client.emit("acknowledge",{"message":"Successfully Connected"});
    client.on("msgServer", (chatterName,message) =>{
        client.emit("MessageReceived","Me",message);
        client.broadcast.emit("MessageReceived",chatterName,message);
    });
    
})

server.listen(port,()=>{
    console.log("Socket Server started at port : ",port);
})