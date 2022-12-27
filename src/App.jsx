import { Canvas } from "@react-three/fiber"
import { Sky } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import { Ground } from "./components/Ground"
import { FPV } from "./components/FPV"
import { Player } from "./components/Player"

function App () {

  return (
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} ></Sky>
        <ambientLight intensity={0.5}></ambientLight>
        <FPV></FPV>
        <Physics>
          <Player></Player>
          <Ground></Ground>
        </Physics>
      </Canvas>
    
  )
}

export default App

//Quede en el minuto 1:11:45