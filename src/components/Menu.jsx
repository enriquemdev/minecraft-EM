import { useStore } from "../hooks/useStore"
import { useLayoutEffect, useState, useEffect } from "react"
import { Help } from "./Help";
import { CubeSelection } from "./CubeSelection";

export const Menu = () => {
    const [saveWorld, resetWorld, setFlyingMode, setHelpVisible, setCubeSelectionVisible] = useStore((state) => [state.saveWorld, state.resetWorld, state.setFlyingMode, state.setHelpVisible, state.setCubeSelectionVisible]);
    
    const [cubeSelectionVisible, MenuCubeSelected, setMenuCubeSelected] = useStore((state) => [state.cubeSelectionVisible, state.MenuCubeSelected, state.setMenuCubeSelected]);
    const [setKey1, setKey2, setKey3, setKey4, setKey5, setKey6 ] = useStore((state) => [state.setKey1, state.setKey2, state.setKey3, state.setKey4, state.setKey5, state.setKey6]);


    //MENU DE TECLAS
    useLayoutEffect(() => {

        //Esta funcion se ejecuta cuando se suelta una tecla (cuando deja de presionarse)
        const handleKeyUp = (event) => {
            const { code } = event; // code es el codigo de la tecla que se presiono
            
            switch (code) {
                case 'KeyQ':
                    setFlyingMode();
                    break;

                case 'KeyH':
                    setHelpVisible();
                    break;

                case 'KeyZ':
                    setCubeSelectionVisible();
                    break;

                // cases to navigate the cube selection menu with the arrows
                case 'ArrowRight':
                    if (cubeSelectionVisible)
                    {
                        setMenuCubeSelected(MenuCubeSelected + 1);
                    }
                    break;

                case 'ArrowLeft':
                    if (cubeSelectionVisible)
                    {
                        setMenuCubeSelected(MenuCubeSelected - 1);
                    }
                    break;

                case 'ArrowUp':
                    if (cubeSelectionVisible)
                    {
                        setMenuCubeSelected(MenuCubeSelected - 3); 
                    }
                    break;

                case 'ArrowDown':
                    if (cubeSelectionVisible)
                    {
                        setMenuCubeSelected(MenuCubeSelected + 3);
                    }
                    break;

                //cases for the setting the textures to the numeric digits
                case 'Digit1':
                    if (cubeSelectionVisible)
                    {
                        const cubeMenuSelectedElement = document.querySelector('.cube-selection img.selected');
                        const texture = cubeMenuSelectedElement.getAttribute('alt');
                        setKey1(texture);
                    }
                    break;

                case 'Digit2':
                    if (cubeSelectionVisible)
                    {
                        const cubeMenuSelectedElement = document.querySelector('.cube-selection img.selected');
                        const texture = cubeMenuSelectedElement.getAttribute('alt');
                        setKey2(texture);
                    }
                    break;

                case 'Digit3':
                    if (cubeSelectionVisible)
                    {
                        const cubeMenuSelectedElement = document.querySelector('.cube-selection img.selected');
                        const texture = cubeMenuSelectedElement.getAttribute('alt');
                        setKey3(texture);
                    }
                    break;

                case 'Digit4':
                    if (cubeSelectionVisible)
                    {
                        const cubeMenuSelectedElement = document.querySelector('.cube-selection img.selected');
                        const texture = cubeMenuSelectedElement.getAttribute('alt');
                        setKey4(texture);
                    }   
                    break;

                case 'Digit5':
                    if (cubeSelectionVisible)
                    {
                        const cubeMenuSelectedElement = document.querySelector('.cube-selection img.selected');
                        const texture = cubeMenuSelectedElement.getAttribute('alt');
                        setKey5(texture);
                    }
                    break;

                case 'Digit6':
                    if (cubeSelectionVisible)
                    {
                        const cubeMenuSelectedElement = document.querySelector('.cube-selection img.selected');
                        const texture = cubeMenuSelectedElement.getAttribute('alt');
                        setKey6(texture);
                    }
                    break;
            }

        }

        document.addEventListener('keyup', handleKeyUp);
        
        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [cubeSelectionVisible, MenuCubeSelected]);

    

    return (
        <>
            <div className="menu absolute">
                <button
                    onClick={() => saveWorld()}
                >Save</button>

                <button
                    onClick={() => resetWorld()}
                >Reset</button>

                <button
                    onClick={() => setFlyingMode()}
                >Fly</button>
            </div>
            <Help></Help>
            <CubeSelection></CubeSelection>
        </>
    )
}