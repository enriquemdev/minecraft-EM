//import * as images from '../images/images.js';
import { useStore } from '../hooks/useStore.js';
import { useKeyboard } from '../hooks/useKeyboard.js';
import { useEffect, useState } from 'react';
import { dirtImg, grassImg, glassImg, woodImg, logImg, goldImg } from '../images/images.js';

const images = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    wood: woodImg,
    log: logImg,
    gold: goldImg
}

export const TextureSelector = () => {
    const [visible, setVisible] = useState(false)
    const [texture, setTexture] = useStore(state => [state.texture, state.setTexture])


    const [cubeSelectionVisible] = useStore((state) => [state.cubeSelectionVisible]);
    const [cubeSelectionMenuVisible, setCubeSelectionMenuVisible] = useState(cubeSelectionVisible)

    useEffect(() => {
        setCubeSelectionMenuVisible(cubeSelectionVisible);
    }, [cubeSelectionVisible]);


    const [key1, key2, key3, key4, key5, key6] = useStore(state => [state.key1, state.key2, state.key3, state.key4, state.key5, state.key6])

    const keys = [key1, key2, key3, key4, key5, key6]; //Array que contiene las 6 texturas activas en el estado global

    const {
        dirt,
        grass,
        glass,
        wood,
        log,
        gold
    } = useKeyboard();

    useEffect(() => {
        const options = {
        dirt,
        grass,
        glass,
        wood,
        log,
        gold
        }
    
        const selectedTexture = Object  
        .entries(options)
        .find(([texture, isEnabled]) => isEnabled)
    
        if (selectedTexture) {
            const [textureName] = selectedTexture
            setTexture(textureName)
        }
    }, [setTexture, dirt, grass, glass, wood, log, gold]);


    useEffect(() => {
        const visibilityTimeout = setTimeout(() => {
            setVisible(false);
        }, 2000) //2 segundos

        //ISSUE / BUG
        /* EL ESTADO QUE SE OBTIENE ACERCA DE SI EL MENU DE SELECCION ES VISIBLE O NO ESTA ATRASADO, DE MANERA QUE SIEMPRE SE OBTENDRÁ
        EL ESTADO PRPEVIO AL MOMENTO, RESOLVIENDO ESTE PROBLEMA DE MANERA NO OPTIMA, APROCHANDO QUE EL ESTADO ES BOOLEANO, SIMPLEMENTE 
        NIEGO EL ESTADO OBTENIDO(ESTADO ANTERIOR) DE MANERA QUE SE CAMBIA AL OTRO VALOR BOOLEANO CORRESPONDIENTE
        (QUE ES LO QUE SE DESEABA LOGRAR EN UN INICIO)
        */
        if (!cubeSelectionMenuVisible)//AQUI
        {
            setVisible(true);
        }
        
        return () => {
            clearTimeout(visibilityTimeout);//Para que no se acumulen los timeouts
        }
    }, [texture]);//Para que se actualice cada vez que se cambie la textura activa




        return visible && (
            <div className='absolute centered texture-selector'>
                {
                    keys.map((key) => {
                        return Object.entries(images).map(([textureName, textureImg]) => {              
                            //console.log(key, textureName);
                            if (key === textureName)
                            {
                                    return (
                                        <img 
                                            key={textureName}
                                            src={textureImg}
                                            alt={textureName}
                                            
                                            className={`${textureName === texture ? 'active' : ''}`}
                                        />
                                    );            
                            }//ends if        
                        })//ends second loop
                    })//ends first loop
                }
            </div>
        );
}