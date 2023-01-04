import { Canvas } from "@react-three/fiber"
import { Sky } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import { Ground } from "./components/Ground"
import { FPV } from "./components/FPV"
import { Player } from "./components/Player"
import { Cubes } from "./components/Cubes"
import { TextureSelector } from "./components/TextureSelector"
import { Menu } from "./components/Menu"

function App () {

  return (
      <>
        <Canvas>
          <Sky sunPosition={[100, 100, 20]} ></Sky>
          <ambientLight intensity={0.5}></ambientLight>
          <FPV></FPV>
          
          <Physics>
            <Cubes></Cubes>
            <Player></Player>
            <Ground></Ground>
          </Physics>
        </Canvas>
        <div id='pointer'>+</div>
        <TextureSelector></TextureSelector>
        <Menu></Menu>
      </>
  )
}
//Quede en el minuto 1:20:06 FCC
export default App;