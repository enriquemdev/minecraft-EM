import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore.js";

export function Ground() {

    const [ref] = usePlane(() => ({ 
        // PI / 2 = 90º
        rotation: [- Math.PI / 2, 0, 0], //TRIPLETE X, Y, Z
        position: [0, -0.5, 0], //TRIPLETE X, Y, Z
    }));

    
    const [addCube] = useStore(state => [state.addCube]); //Para poder añadir cubos en el suelo

    groundTexture.repeat.set(100, 100);

    const handleClickGround = (event) => {
        event.stopPropagation();//Para que no cause errores al dejar pasar cubos por la mesh del suelo
        const [ x, y, z ] = Object.values(event.point)
            .map(n => Math.ceil(n)); //Para que los cubos se añadan en la posicion exacta del suelo de manera cuadrada y no en decimales

        addCube(x, y, z);
    }

    return (
        <mesh ref={ref} onClick={handleClickGround}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial 
                attach="material"  
                map={groundTexture}
            />
        </mesh>
    )
}