import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useEffect, useRef } from "react";
import { useKeyboard } from "../hooks/useKeyboard";


import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";

const CHARACTER_SPEED = 2;
const CHARACTER_JUMP_FORCE = 10;

export const Player = () => {

    const { 
        moveBackward, 
        moveForward, 
        moveLeft, 
        moveRight,
        jump,

    } = useKeyboard();

    const { camera } = useThree();

    //El player es una esfera
    //El player tiene una api a la que se puede suscribir para monitorear el movimiento(cambios en la posicion)
    const [ref, api] = useSphere(() => ({       
        mass: 1,
        type: "Dynamic",
        position: [0, 0.5, 0],
        // rotation: [- Math.PI / 2,  Math.PI / 2, Math.PI / 2],
    }));


    //POSICION DEL PLAYER
    //suscribirse a la api del player, se utiliza useRef en vez de useState porque useRef no renderiza el componente todo el tiempo, solo se toma la referencia
    const pos = useRef([0, 0, 0]); //Crea una referencia de la posicion del player y le da el valor inicial de [0, 0, 0] (TRIPLETE X, Y, Z)
    useEffect(() => {
        api.position.subscribe(p => {//suscribirse a la api del player, recibe el valor de p que es la posicion del player 
            pos.current = p//actualizar la posicion del player, con el atributo current que se puede usar por el useRef
        })
    }, [api.position]);

    //VELOCIDAD DEL PLAYER
    const vel = useRef([0, 0, 0]); 
    useEffect(() => {
        api.velocity.subscribe(v => {
            vel.current = v
        })
    }, [api.velocity]);


    //Entonces haremos que la camara copie la posicion del player suscribiendonos a la api del player
    useFrame(() => {
        camera.position.copy(
            new Vector3(
                pos.current[0] + 20, //X
                pos.current[1] +3, //Y
                pos.current[2]  //Z

            )
        );

        const direction = new Vector3();

        //movimiento frontal y trasero del player
        const frontVector = new Vector3(
            0,
            0, 
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        );

        //movimiento lateral del player
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
        );
        
        direction   //direccion del player
        .subVectors(frontVector, sideVector) //resta de vectores (Se restan los vectores de movimiento frontal y trasero con los vectores de movimiento lateral)
        .normalize() //normalizar el vector (matematicas)
        .multiplyScalar(CHARACTER_SPEED) //multiplicar el vector por la velocidad del player
        .applyEuler(camera.rotation); //aplicar la rotacion de la camara al vector para que el player se mueva correspondientemente a la direccion en la que esta mirando la camara
        
        console.log(direction);
        api.velocity.set(
            direction.x,
            vel.current[1],//Aqui es la velocidad por la velocidad de cuando se salta y luego el efecto de la gravedad al caer
            direction.z
        );

    })

  return (
    <mesh ref={ref}>
        {/* <planeBufferGeometry attach="geometry" args={[100, 100]} /> */}
        <sphereBufferGeometry attach="geometry" args={[5, 5]}></sphereBufferGeometry>
            <meshStandardMaterial 
                attach="material"  
                color='red'
            />
    </mesh>
  );
}