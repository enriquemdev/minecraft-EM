import { useBox } from "@react-three/cannon"
import * as textures from '../images/textures.js'
import { useStore } from '../hooks/useStore.js'
import { useState } from "react"

export const Cube = ( { id, position, texture } ) => {

    const [isHovered, setIsHovered] = useState(false);
    const [addCube ,removeCube] = useStore(state => [state.addCube, state.removeCube]);


    const [ref] = useBox(() => ({
        type: "Static",
        // mass: 1,
        position
    }));


    const activeTexture = textures[texture + 'Texture'];


    return (
        <mesh ref={ref} 
            onPointerMove={(event) => {
                event.stopPropagation();
                setIsHovered(true);
            }}

            onPointerOut={(event) => {
                event.stopPropagation();
                setIsHovered(false);
            }}

            onClick={(event) => {
                event.stopPropagation();
                const clickedFace = Math.floor(event.faceIndex / 2); //
				const { x, y, z } = ref.current.position;

                if (event.altKey) 
                {
                    //const { x, y, z } = ref.current.position; //La posicion la saca de la ref obtenida arriba en el useBox y se le pasa al mesh
                    removeCube(x, y, z)
                    return;
                }
                else if (clickedFace === 0) {
					addCube(x + 1, y, z)
					return
				}
				else if (clickedFace === 1) {
					addCube(x - 1, y, z)
					return
				}
				else if (clickedFace === 2) {
					addCube(x, y + 1, z)
					return
				}
				else if (clickedFace === 3) {
					addCube(x, y - 1, z)
					return
				}
				else if (clickedFace === 4) {
					addCube(x, y, z + 1)
					return
				}
				else if (clickedFace === 5) {
					addCube(x, y, z - 1)
					return
				}
            }}
        >
            <boxGeometry attach="geometry" />{/*Lo atamos a la geometria de la malla (mesh) */}
            <meshStandardMaterial 
                color={isHovered ? 'lightgray' : 'white'}
                transparent
                opacity={texture === 'glass' ? 0.6 : 1}
                map={activeTexture} 
                attach='material'

            ></meshStandardMaterial>{/* Se le pone map en vez de color si se quiere poner una imagen */}
        </mesh>
    )
}