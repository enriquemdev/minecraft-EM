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
        setVisible(true);

        return () => {
            clearTimeout(visibilityTimeout);//Para que no se acumulen los timeouts
        }
    }, [texture]);//Para que se actualice cada vez que se cambie la textura activa




        return visible && (
            <div className='absolute centered texture-selector'>
                {
                    Object.entries(images).map(([textureName, textureImg]) => {
                        return (
                            <img 
                                key={textureName}
                                src={textureImg}
                                alt={textureName}
                                className={`${textureName === texture ? 'active' : ''}`}
                            />
                        );
                    })
                }
            </div>
        );
}