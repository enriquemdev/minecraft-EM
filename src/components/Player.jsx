import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useEffect, useRef } from "react";
import { useKeyboard } from "../hooks/useKeyboard";

const CHARACTER_SPEED = 4;
const CHARACTER_JUMP_FORCE = 4;

export const Player = () => {

    //El siguiente objeto es un hook que se encarga de monitorear las teclas que se presionan en el teclado
    const { 
        moveBackward, 
        moveForward, 
        moveLeft, 
        moveRight,
        jump,

    } = useKeyboard();

    //Se crea una referencia a la camara para poder acceder a ella
    const { camera } = useThree();

    //El player es una esfera
    //El player tiene una api a la que se puede suscribir para monitorear el movimiento(cambios en la posicion)
    const [ref, api] = useSphere(() => ({       
        mass: 1,
        type: "Dynamic",
        position: [0, 0.5, 0]
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
                pos.current[0], //X
                pos.current[1], //Y
                pos.current[2]  //Z

            )
        );

        const direction = new Vector3();

        //movimiento frontal y trasero del player
        const frontVector = new Vector3(
            0,
            0, 
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)//Si se presiona la tecla de adelante se le suma 1, si se presiona la tecla de atras se le resta 1, si no se presiona ninguna tecla se le suma 0
        );

        //movimiento lateral del player
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),//Si se presiona la tecla de izquierda se le suma 1, si se presiona la tecla de derecha se le resta 1, si no se presiona ninguna tecla se le suma 0
            0,
            0
        );
        
        direction   //direccion del player
        .subVectors(frontVector, sideVector) //resta de vectores (Se restan los vectores de movimiento frontal y trasero con los vectores de movimiento lateral)
        .normalize() //normalizar el vector (matematicas)
        .multiplyScalar(CHARACTER_SPEED) //multiplicar el vector por la velocidad del player
        .applyEuler(camera.rotation); //aplicar la rotacion de la camara al vector para que el player se mueva correspondientemente a la direccion en la que esta mirando la camara
        
        //console.log(direction);
        //la api de velocity es la que se suscribe a la posicion del player
        api.velocity.set(
            direction.x,
            vel.current[1],//Aqui es la velocidad por la velocidad de cuando se salta y luego el efecto de la gravedad al caer
            direction.z
        );

        //salto del player
        if (jump && Math.abs(vel.current[1]) < 0.05) { //Si se presiona la tecla de salto y la velocidad en Y es menor a 0.05 (osea para que no se salte 2 veces)
            api.velocity.set(
                vel.current[0],
                CHARACTER_JUMP_FORCE,
                vel.current[2]
            );
        }

    })

  return (
    <mesh ref={ref}></mesh>
  );
}