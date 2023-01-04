import { useBox } from "@react-three/cannon"
import * as textures from '../images/textures.js'
import { useStore } from '../hooks/useStore.js'
import { useState } from "react"

export const Cube = ( { id, position, texture } ) => {

    const [isHovered, setIsHovered] = useState(false);
    const [removeCube] = useStore(state => [state.removeCube]);


    const [ref] = useBox(() => ({
        type: "Static",
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
                if (event.altKey) 
                {
                    //const { x, y, z } = ref.current.position; //La posicion la saca de la ref obtenida arriba en el useBox y se le pasa al mesh
                    removeCube(x, y, z);
                }
            }}
        >
            <boxBufferGeometry attach="geometry" />{/*Lo atamos a la geometria de la malla (mesh) */}
            <meshStandardMaterial 
                color={isHovered ? 'lightgray' : 'white'}
                transparent
                map={activeTexture} 
                attach='material'
            ></meshStandardMaterial> {/* Se le pone map en vez de color si se quiere poner una imagen */}
            
        </mesh>
    )
}