//Este es un hook custom que se encarga de manejar las acciones del teclado

import { useState, useEffect } from 'react';

const ACTIONS_KEYBOARD_MAP = {
    'KeyW': 'moveForward',
    'KeyS': 'moveBackward',
    'KeyA': 'moveLeft',
    'KeyD': 'moveRight',
    'Space': 'jump',
    'Digit1': 'dirt',
    'Digit2': 'grass',
    'Digit3': 'glass',
    'Digit4': 'wood',
    'Digit5': 'log',

    'KeyQ': 'toggleFlyingMode',
    'KeyR': 'ascend',
    'KeyF': 'descend',
}

export const useKeyboard = () => {


    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        dirt: false,
        grass: false,
        glass: false,
        log: false,
        wood: false,
        toggleFlyingMode: false,
        ascend: false,
        descend: false,

    })

    //console.log(actions);

    useEffect(() => {

        //Esta funcion se ejecuta cuando se presiona una tecla
        const handleKeyDown = (event) => {
            const { code } = event; // code es el codigo de la tecla que se presiono
            const action = ACTIONS_KEYBOARD_MAP[code]; //action contendrá la accion que corresponde a la tecla presionada

            if (action) //Si la tecla presionada tiene una accion asignada
            {
                setActions((prevActions) => ({ //recibe el objeto de acciones cuando se crea el useState (con Actions)
                    ...prevActions,//Deja las acciones con el mismo estado anterior que tenian
                    [action]: true,//Y le coloca true solo a la accin correspondiente a la tecla presionada
                }));
            }

        }

        //Esta funcion se ejecuta cuando se suelta una tecla (cuando deja de presionarse)
        const handleKeyUp = (event) => {
            const { code } = event; 
            const action = ACTIONS_KEYBOARD_MAP[code]; 

            if (action) 
            {
                setActions((prevActions) => ({ 
                    ...prevActions,
                    [action]: false,
                }));
            }

        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, []);

    return actions;
}