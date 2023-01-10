import { useStore } from "../hooks/useStore"
import { useLayoutEffect } from "react"
import { Help } from "./Help";

export const Menu = () => {
    const [saveWorld, resetWorld, setFlyingMode, setHelpVisible] = useStore((state) => [state.saveWorld, state.resetWorld, state.setFlyingMode, state.setHelpVisible]);
    //const [helpVisible, setHelpVisible] = useState(false);

    //MENU DE TECLAS
    useLayoutEffect(() => {
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
        }

        document.addEventListener('keyup', handleKeyUp);
        
        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, []);


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
        </>
    )
}