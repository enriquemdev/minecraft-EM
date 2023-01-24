//Este es un hook custom que se encarga de manejar las acciones del teclado

import { useState, useEffect, useLayoutEffect } from 'react';
import { useStore } from './useStore';



export const useKeyboard = () => {
    const [key1, key2, key3, key4, key5, key6] = useStore(state => [state.key1, state.key2, state.key3, state.key4, state.key5, state.key6])

    let ACTIONS_KEYBOARD_MAP = {
        'KeyW': 'moveForward',
        'KeyS': 'moveBackward',
        'KeyA': 'moveLeft',
        'KeyD': 'moveRight',
        'Space': 'jump',
        'Digit1': key1,
        'Digit2': key2,
        'Digit3': key3,
        'Digit4': key4,
        'Digit5': key5,
        'Digit6': key6,
    
        //'KeyQ': 'toggleFlyingMode',
        'KeyR': 'ascend',
        'KeyF': 'descend',
    }

    useLayoutEffect(() => {
        //console.log(ACTIONS_KEYBOARD_MAP2)
        ACTIONS_KEYBOARD_MAP = {
            'KeyW': 'moveForward',
            'KeyS': 'moveBackward',
            'KeyA': 'moveLeft',
            'KeyD': 'moveRight',
            'Space': 'jump',
            'Digit1': key1,
            'Digit2': key2,
            'Digit3': key3,
            'Digit4': key4,
            'Digit5': key5,
            'Digit6': key6,
        
            //'KeyQ': 'toggleFlyingMode',
            'KeyR': 'ascend',
            'KeyF': 'descend',
        }

    }, [key1, key2, key3, key4, key5, key6])


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
        birch_wood: false,
        gold: false,

        acacia_wood: false,
        jungle_wood: false,
        dark_oak_wood: false,
        oak_wood: false,
        spruce_wood: false,
        warped_wood: false,

        celeste_glassImg: false,
        cobblestoneImg: false,
        creeper_sandstoneImg: false,
        diamondImg: false,
        emeraldImg: false,
        lapislazuliImg: false,

        mossy_cobblestoneImg: false,
        pumpkinImg: false,
        redstoneImg: false,
        sandstoneImg: false,
        stoneImg: false,
        spruce_logImg: false,

        //toggleFlyingMode: false,
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
    }, [key1, key2, key3, key4, key5, key6]);

    return actions;
}