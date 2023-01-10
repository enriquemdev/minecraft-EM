import { Canvas } from "@react-three/fiber"
import { Sky } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import { Ground } from "./components/Ground"
import { FPV } from "./components/FPV"
import { Player } from "./components/Player"
import { Cubes } from "./components/Cubes"
import { TextureSelector } from "./components/TextureSelector"
import { Menu } from "./components/Menu"
import Text from "./components/Text"
import { useStore } from "./hooks/useStore"
import { useEffect, useState } from "react"

function App () {
  //This is to activate or deactivate the fly mode based on gravity
  //Nos suscribimos a los cambios en estas variables de nuestro hook useStore
  const [flyingMode, setFlyingMode] = useStore((state) => [state.flyingMode, state.setFlyingMode]);

  //Usamos el useState para manejar los cambios en el estado de la gravedad y le damos el valor inicial de -9.81
  const [gravity_Y, setGravity_Y] = useState(-9.81);
 
  /*Y cuando percibimos un cambio en las variables del useStore usamos el useEffect para desencadenar el cambio en el estado de la gravedad
  por lo que se re-renderizará la pantalla con la nueva gravedad actualizada */
  useEffect(() => {  
    setGravity_Y(flyingMode ? 0 : -9.81);
  }, [flyingMode, setFlyingMode]);

  
  // // Add event listener on keydown
  // document.addEventListener('keydown', (event) => {
  //   //var name = event.key;
  //   var code = event.code;
  //   if (code === 'KeyQ') {
  //     console.log('Q was pressed');
  //     setFlyingMode();
  //   }
    
  // }, false);



  
  return (
      <>
        <Canvas>
          <Sky sunPosition={[100, 100, 20]} ></Sky>
          <ambientLight intensity={0.5}></ambientLight>
          <FPV></FPV>
          <Text></Text>

          <Physics
            gravity={[0, gravity_Y, 0]} //Se le pasa la gravedad de cuando se togglea el modo volador
            frictionGravity='0' //This is for when the player is not rounded so it can slide on the ground
          >
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

export default App;