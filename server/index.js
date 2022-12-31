// Este es el codigo del servidor escrito en express y socket.io
// https://www.youtube.com/watch?v=djMy4QsPWiI
// https://github.com/machadop1407/socket-io-react-example
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { IsObject } = require("@react-three/drei");
const { isObject } = require("util");

app.use(cors()); //Permite que el servidor se comunique con el cliente

const server =  http.createServer(app); //Crea el servidor

const io = new Server(server, { //Crea el socket.io
  cors: {
    origin: "http://127.0.0.1:5173",//Este es el puerto de la aplicacion cliente
    methods: ["GET", "POST"],
  },
});

let clients = {}

//Aqui se guarda cuando un cliente se conecta al servidor
io.on("connection", (client) => {
  console.log(`User Connected: ${client.id}`);//Muestra el id del usuario que se conecto

    //Add a new client indexed by his id
    clients[client.id] = {
        position: ["0", 0, 0],
        rotation: ["0", 0, 0],
    }

    
    io.sockets.emit('moveyy', clients)
    console.log(clients)
    // socket.on('move', ( id ) => {
    //     // clients[id].position = position
    //     // clients[id].rotation = rotation
    //     io.sockets.emit('move', clients)
    //     console.log('move on server' + clients[socket.id].position);
    //     //io.sockets.emit('move', clients)
    // })

    // client.on("getClient", (data) => { //Cuando un cliente envia un mensaje (Evento send_message proveniente del cliente (App.js)))
    //     console.log(data+' esta funcionando')
    //     io.sockets.emit('moveyy', clients); //Envia el mensaje a todos los usuarios conectados
    //     //socket.broadcast.emit("receive_message", data); //Envia el mensaje a todos los usuarios conectados excepto al que lo envio
    //   });

  client.on("send_message", (data) => { //Cuando un cliente envia un mensaje (Evento send_message proveniente del cliente (App.js)))
    io.sockets.emit("receive_message", data); //Envia el mensaje a todos los usuarios conectados
    //socket.broadcast.emit("receive_message", data); //Envia el mensaje a todos los usuarios conectados excepto al que lo envio
  });

    client.on('disconnect', () => {//Cuando un cliente se desconecta
        console.log(
            `User ${client.id} disconnected, there are currently ${io.engine.clientsCount} users connected`//Muestra el id del usuario que se desconecto y la cantidad de usuarios conectados
        )

        //Delete this client from the object
        delete clients[client.id]

        io.sockets.emit('move', clients)
    });

});

//Inicia el servidor en el puerto 3001
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});