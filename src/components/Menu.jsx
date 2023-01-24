import { useStore } from "../hooks/useStore"
import { useLayoutEffect, useState, useEffect } from "react"
import { Help } from "./Help";
import { CubeSelection } from "./CubeSelection";

export const Menu = () => {
    const [saveWorld, resetWorld, setFlyingMode, setHelpVisible, setCubeSelectionVisible] = useStore((state) => [state.saveWorld, state.resetWorld, state.setFlyingMode, state.setHelpVisible, state.setCubeSelectionVisible]);
    
    const [cubeSelectionVisible, MenuCubeSelected, setMenuCubeSelected] = useStore((state) => [state.cubeSelectionVisible, state.MenuCubeSelected, state.setMenuCubeSelected]);
    const [setKey1, setKey2, setKey3, setKey4, setKey5, setKey6 ] = useStore((state) => [state.setKey1, state.setKey2, state.setKey3, state.setKey4, state.setKey5, state.setKey6]);

    const [downloadWorld, loadWorld] = useStore((state) => [state.downloadWorld, state.loadWorld]);

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
                        if (MenuCubeSelected % 12 !== 0) // if the selected cube is not the last one in the row
                        {
                            setMenuCubeSelected(MenuCubeSelected + 1);
                        }
                        else
                        {
                            setMenuCubeSelected(MenuCubeSelected - 11);
                        }
                    }
                    break;

                case 'ArrowLeft':
                    if (cubeSelectionVisible)
                    {
                        if (MenuCubeSelected % 13 !== 0) // if the selected cube is not the first one in the row
                        {
                            setMenuCubeSelected(MenuCubeSelected - 1);
                        }
                        else
                        {
                            setMenuCubeSelected(MenuCubeSelected + 11);
                        }
                        
                    }
                    break;

                case 'ArrowUp':
                    if (cubeSelectionVisible)
                    {
                        if (MenuCubeSelected > 12) // if the selected cube is not the first row
                        {
                            setMenuCubeSelected(MenuCubeSelected - 12); 
                        }
                        else
                        {
                            setMenuCubeSelected(MenuCubeSelected + 12);
                        }
                    }
                    break;

                case 'ArrowDown':
                    if (cubeSelectionVisible)
                    {
                        if (MenuCubeSelected > 12) // if the selected cube is not the first row
                        {
                            setMenuCubeSelected(MenuCubeSelected - 12); 
                        }
                        else
                        {
                            setMenuCubeSelected(MenuCubeSelected + 12);
                        }
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


    //funion que permite leer el archivo de texto subido y llama a la funcion loadWorld
    const showFile = async (e) => { //e es el evento que se dispara cuando se sube el archivo

        e.preventDefault() //evita que se recargue la pagina
  
        const reader = new FileReader() //crea un objeto que permite leer el archivo subido
  
        reader.onload = async (e) => { //cuando el archivo se haya leido, se ejecuta esta funcion
  
           const text = (e.target.result) //e.target.result es el contenido del archivo
           loadWorld(text); //llama a la funcion loadWorld y le pasa el contenido del archivo
  
        }; 
        reader.readAsText(e.target.files[0])  //lee el archivo subido
     } 

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

                <div className="buttonDiv">

                    <div>
                        <button
                            onClick={() => downloadWorld()}
                        >Download World</button>
                    </div>

                    <div>
                        <label htmlFor="fileInput" className="btn">Load World</label>
                        
                        <input id="fileInput" type="file" onChange={(e) => showFile(e)} />
                    </div>
                    
                </div>
                
            </div>
            <Help></Help>
            <CubeSelection></CubeSelection>
        </>
    )
}