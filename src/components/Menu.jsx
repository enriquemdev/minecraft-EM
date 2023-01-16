import { useStore } from "../hooks/useStore"
import { useLayoutEffect, useState, useEffect } from "react"
import { Help } from "./Help";
import { CubeSelection } from "./CubeSelection";

export const Menu = () => {
    const [saveWorld, resetWorld, setFlyingMode, setHelpVisible, setCubeSelectionVisible] = useStore((state) => [state.saveWorld, state.resetWorld, state.setFlyingMode, state.setHelpVisible, state.setCubeSelectionVisible]);
    
    const [cubeSelectionVisible, MenuCubeSelected, setMenuCubeSelected] = useStore((state) => [state.cubeSelectionVisible, state.MenuCubeSelected, state.setMenuCubeSelected]);
    const [setKey2] = useStore((state) => [state.setKey2]);

    
    // const [cubeSelectionIsVisible, setCubeSelectionIsVisible] = useState(cubeSelectionVisible);
    
    // useEffect(() => {
    //     console.log("estado asignar: "+ cubeSelectionVisible);
    //     setCubeSelectionIsVisible(cubeSelectionVisible);
    //     console.log("estado asignado: "+ cubeSelectionIsVisible);
    // }, [cubeSelectionVisible])

    //MENU DE TECLAS
    useLayoutEffect(() => {
        console.log('actu');
        //Esta funcion se ejecuta cuando se suelta una tecla (cuando deja de presionarse)
        const handleKeyUp = (event) => {
            const { code } = event; // code es el codigo de la tecla que se presiono

            if (code === 'KeyQ')
            {
                //console.log('Q was pressed');
                setFlyingMode();    
            }
            else if (code === 'KeyH')
            {
                setHelpVisible();
            }
            else if (code === 'KeyZ')
            {
                setCubeSelectionVisible();
            }
            else if (code === 'ArrowRight')
            {   
                // console.log("estado al presionar la tecla zustand "  +cubeSelectionVisible);
                // console.log("estado al presionar la tecla local "+cubeSelectionIsVisible);//variable del useState
                if (cubeSelectionVisible)
                {
                    setMenuCubeSelected(MenuCubeSelected + 1);
                    console.log('ArrowRight was pressed');
                }
                
            }
            else if (code === 'Digit2')
            {   
                if (cubeSelectionVisible)
                {
                    const cubeMenuSelectedElement = document.querySelector('.cube-selection img.selected');
                    const texture = cubeMenuSelectedElement.getAttribute('alt');
                    setKey2(texture);
                    //console.log('ArrowRight was pressed');
                }
                
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