// Este es el codigo del servidor escrito en express y socket.io
// https://www.youtube.com/watch?v=djMy4QsPWiI
// https://github.com/machadop1407/socket-io-react-example
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors()); //Permite que el servidor se comunique con el cliente

const server = http.createServer(app); //Crea el servidor

const io = new Server(server, { //Crea el socket.io
  cors: {
    origin: "http://127.0.0.1:5173",//Este es el puerto de la aplicacion cliente
    methods: ["GET", "POST"],
  },
});

//Aqui se guarda cuando un cliente se conecta al servidor
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);//Muestra el id del usuario que se conecto


  socket.on("send_message", (data) => { //Cuando un cliente envia un mensaje (Evento send_message proveniente del cliente (App.js)))
    io.sockets.emit("receive_message", data); //Envia el mensaje a todos los usuarios conectados
    socket.broadcast.emit("receive_message", data); //Envia el mensaje a todos los usuarios conectados excepto al que lo envio
  });

  socket.on('disconnect', () => {//Cuando un cliente se desconecta
        console.log(
            `User ${socket.id} disconnected, there are currently ${io.engine.clientsCount} users connected`//Muestra el id del usuario que se desconecto y la cantidad de usuarios conectados
        )
    });

});

//Inicia el servidor en el puerto 3001
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});