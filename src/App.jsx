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

  const [socketClient, setSocketClient] = useState(null)
  const [clients, setClients] = useState({})

    useEffect(() => {
        // On mount initialize the socket connection
        setSocketClient(io())
        console.log("estimado "+socketClient)
        // Dispose gracefuly
        return () => {
            if (socketClient) socketClient.disconnect()
        }
    }, [])

    useEffect(() => {
      console.log("123 "+socketClient);
      if (socketClient) {
        console.log("siuu ");
          socket.on('moveyy', (clients) => {
            console.log("hhh "+socketClient);
              setClients(clients)
              console.log("fff "+socketClient);
          })
      }
  }, [socketClient])


    //socket.emit('move', '');




  //Estados de los mensajes a enviar y a recibir con el servidor
  const [message, setMessage] = useState(""); //Estado de mensajes a enviar
  const [messageReceived, setMessageReceived] = useState(""); //Estado de mensajes recibidos

  //Funcion para enviar mensajes al servidor
  const sendMessage = () => {
    socket.emit("send_message",  message );
  };


  // const getClient = () => {
  //   socket.emit("getClient",  "si" );
  // };


  //Funcion para recibir mensajes del servidor(Con useEffect para que cuando se reciba un mensaje se actualice el estado del mensaje recibido)
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data);
    });
  }, [socket]);



  

  return (socketClient && (
      <>
      {/* Codigo para enviar y recibir mensajes con el servidor mediante socket.io */}
      {/* <button onClick={getClient}>eeee</button> */}
      <button id='btn' onClick={sendMessage}  >boton</button>{/*Al hacer click en el boton se ejecuta la funcion sendMessage*/}
      <input type="text" id="input" placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);{/*Al escribir en el input se actualiza el estado del mensaje a enviar*/}
        }}
         />
         <p>{messageReceived}</p>
         {/* <p>{messageReceived}</p>Se muestra el mensaje recibido del servidor*/ }
        {console.log(clients)}
          {/* <div id="canvasContainer"> */}
          <Canvas>
            {/* {console.log(clients)} */}
            <Sky sunPosition={[100, 100, 20]} ></Sky>
            <ambientLight intensity={0.5}></ambientLight>
            <FPV></FPV> 
            <Physics>

            {Object.keys(clients)
                    .filter((clientKey) => clientKey !== socketClient.id)
                    .map((client) => {
                        const { position, rotation } = clients[client]
                        return (
                            <Player
                                key={client}
                                
                                posi={position}
                                rot={rotation}
                            />
                        )
                    })}
              {/* <Player></Player> */}
              <Ground></Ground>
            </Physics>
          </Canvas>
          {/* </div> */}
      </>
    
  ))
}

export default App

//Quede en el minuto 1:11:45