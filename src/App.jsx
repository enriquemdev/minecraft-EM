import { Canvas } from "@react-three/fiber"
import { Sky } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import { Ground } from "./components/Ground"
import { FPV } from "./components/FPV"
import { Player } from "./components/Player"

//Codigo para usar cocket.io
import io from "socket.io-client"; 
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");//Conecta con el servidor que se ejecuta en ese puerto


function App () {
  //Estados de los mensajes a enviar y a recibir con el servidor
  const [message, setMessage] = useState(""); //Estado de mensajes a enviar
  const [messageReceived, setMessageReceived] = useState(""); //Estado de mensajes recibidos

  //Funcion para enviar mensajes al servidor
  const sendMessage = () => {
    socket.emit("send_message",  message );
  };

  //Funcion para recibir mensajes del servidor(Con useEffect para que cuando se reciba un mensaje se actualice el estado del mensaje recibido)
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data);
    });
  }, [socket]);

  return (
      <>
      {/* Codigo para enviar y recibir mensajes con el servidor mediante socket.io */}
      <button id='btn' onClick={sendMessage}  >boton</button>{/*Al hacer click en el boton se ejecuta la funcion sendMessage*/}
      <input type="text" id="input" placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);{/*Al escribir en el input se actualiza el estado del mensaje a enviar*/}
        }}
         />
         <p>{messageReceived}</p>{/*Se muestra el mensaje recibido del servidor*/}

          {/* <div id="canvasContainer"> */}
          <Canvas>
            <Sky sunPosition={[100, 100, 20]} ></Sky>
            <ambientLight intensity={0.5}></ambientLight>
            <FPV></FPV> 
            <Physics>
              <Player></Player>
              <Ground></Ground>
            </Physics>
          </Canvas>
          {/* </div> */}
      </>
    
  )
}

export default App

//Quede en el minuto 1:11:45