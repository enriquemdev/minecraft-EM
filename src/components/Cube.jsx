import { useBox } from "@react-three/cannon"
import * as textures from '../images/textures.js'
import { useStore } from '../hooks/useStore.js'

export const Cube = ( { id, position, texture } ) => {
    const [ref] = useBox(() => ({
        type: "Static",
        position
    }));


    const activeTexture = textures[texture + 'Texture'];


    return (
        <mesh ref={ref} >
            <boxBufferGeometry attach="geometry" />{/*Lo atamos a la geometria de la malla (mesh) */}
            <meshStandardMaterial map={activeTexture} attach='material'></meshStandardMaterial> {/* Se le pone map en vez de color si se quiere poner una imagen */}
            
        </mesh>
    )
}