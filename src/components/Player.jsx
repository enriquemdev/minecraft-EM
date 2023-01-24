import {  useBox, useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useEffect, useRef } from "react";
import { useKeyboard } from "../hooks/useKeyboard";

import { useStore } from "../hooks/useStore";

const CHARACTER_SPEED = 4;
const CHARACTER_JUMP_FORCE = 4.1;
const CHARACTER_FLYING_SPEED = 0.065;

export const Player = () => {

    const [flyingMode] = useStore(state => [state.flyingMode])

    //El siguiente objeto es un hook que se encarga de monitorear las teclas que se presionan en el teclado
    const { 
        moveBackward,
        moveForward,
        moveLeft,
        moveRight,
        jump,

        //toggleFlyingMode,
        ascend,
        descend,

    } = useKeyboard();

    //Se crea una referencia a la camara para poder acceder a ella
    const { camera } = useThree();

    //El player es una esfera
    //El player tiene una api a la que se puede suscribir para monitorear el movimiento(cambios en la posicion)
    const [ref, api] = useBox(() => ({       
        mass: 1,
        type: "Dynamic",  
        position: [0, 0.50, 0],
        //args: [0.5],//radio de la esfera (fisicas)
        args : [0.5, 2, 0.5],//ancho, alto, largo (fisicas del box)
        fixedRotation: true,//Esto permite que el objeto no se vuelque y siempre este dispuesto verticalmente (que no se rote)
    }));

    /*
    NOTAS:
    El useSphere (puede ser useBox, usePlane, useCilinder) son las propiedades fisicas que se aplican a un objeto(provienen de useCannon la libreria de fisicas para r3f)
    si se le da args se puede cambiar el tamao del objeto,
    cuando es esfera solo recibe uno que es el radio, por lo que es una forma cuadrada
    ver la de las demás dando ctrl click en args (probar cilndro para ver si se puede hacer la figura 1x2 como una persona)
    */
    


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

    //////////////////////////////////////////////////////////////////////////////////////////////////


    //Entonces haremos que la camara copie la posicion del player suscribiendonos a la api del player
    useFrame(() => {
        camera.position.copy(
            new Vector3(
                pos.current[0], //X
                pos.current[1] + 0.75,//Y (0.75 es la de los ojos del player)
                pos.current[2]//Z

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


        //la api suscrita al objeto player puede acceder a proiedades omo la velocidad, la posicion, etc

        if (!flyingMode) //Si el flying mode esta desactivado
        {
            //Puede tener velocidad en Y y asi saltar y caer (lo normal)
            api.velocity.set(
                direction.x,
                vel.current[1],//Aqui es la velocidad por la velocidad de cuando se salta y luego el efecto de la gravedad al caer
                direction.z
            );
        }
        else
        {
            //No puede tener velocidad en Y y asi no saltar ni caer
            api.velocity.set(
                direction.x,
                0,//Aqui es la velocidad por la velocidad de cuando se salta y luego el efecto de la gravedad al caer
                direction.z
            );
        }
   

        //salto del player
        if (jump && Math.abs(vel.current[1]) < 0.05 && (!flyingMode)) { //Si se presiona la tecla de salto y la velocidad en Y es menor a 0.05 (osea para que no se salte 2 veces) y si además el flying mode esta desactivado
            //console.log(masa.current);
            api.velocity.set(
                vel.current[0],
                CHARACTER_JUMP_FORCE,
                vel.current[2]
            );
        }

        // //Tratar de que funcione el flying mode con la tecla q(posiblemente hacer un event listener normal posiblemente en el app )
        // if (toggleFlyingMode) //Si se presiona la tecla de toggleFlyingMode que es la q
        // {
        //     setFlyingMode();//toggle flying mode
        //     //console.log("holaaa");
        // }

        //console.log("flying mode: " + flyingMode);
        if (flyingMode) //Si el flying mode esta activado
        {
            //se puede ascender y descender
            if (ascend)
            {

                // masa.current = 0;
                // console.log("masaa deberia ser 0: " + masa.current);
                api.position.set(
                    pos.current[0],
                    pos.current[1] + CHARACTER_FLYING_SPEED,
                    pos.current[2]
                );
            }

            if (descend)
            {
                api.position.set(
                    pos.current[0],
                    pos.current[1] - CHARACTER_FLYING_SPEED,
                    pos.current[2]
                );
            }
        } //Ends flying mode if

        

    })


    // El sphereGeometry tambien puede ser boxGeometry, planeGeometry, cilinderGeometry
    // Sirve para ponerle la forma visible al objeto, sin fisicas (para usar fisicas usar el useSphere, useBox, usePlane, useCilinder de useCannon)
    // La propiedad args puede determinar el tamaño del objeto

    

  return (
    <mesh ref={ref} >


    {/* <boxGeometry attach="geometry" args={[0.5, 2, 0.5]}></boxGeometry>
            <meshStandardMaterial 
                attach="material"  
                color='red'
            /> */}
    </mesh>
  );
}