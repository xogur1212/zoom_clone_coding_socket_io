import http from "http";
import SocketIO from "socket.io";
import express from "express";
import { parse } from "path";
const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);
const httpServer = http.createServer(app);
const wsServer =SocketIO(httpServer);


wsServer.on("connection",(socket) => {
  socket.on("enter_room",(msg,done)=>{
    console.log(msg);
    setTimeout(()=>{
      done();
    },10000)
  });

})

httpServer.listen(3000, handleListen);