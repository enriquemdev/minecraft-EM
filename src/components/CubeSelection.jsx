// import * as images from '../images/images.js';
import { useStore } from '../hooks/useStore.js';
import { useKeyboard } from '../hooks/useKeyboard.js';
import { useEffect, useState, useLayoutEffect } from 'react';
import { dirtImg, grassImg, glassImg, woodImg, logImg, goldImg } from '../images/images.js';

const images = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    wood: woodImg,
    log: logImg,
    gold: goldImg
}

export const CubeSelection = () => {
    const [cubeSelectionVisible, setCubeSelectionVisible] = useStore((state) => [state.cubeSelectionVisible, state.setCubeSelectionVisible]);
    const [visible, setVisible] = useState(false)

    useLayoutEffect(() => {
        setVisible(cubeSelectionVisible);
    }, [cubeSelectionVisible]);

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
            //setTexture(textureName)
        }
    }, [dirt, grass, glass, wood, log, gold]);

        return (
            <div className={'cube-selection '+(visible ? 'visibleFlex' : 'hidden')}>
                {
                    Object.entries(images).map(([textureName, textureImg]) => {
                        return (
                            <img
                                key={textureName}
                                src={textureImg}
                                alt={textureName}
                                // className={`${textureName === texture ? 'active' : ''}`}
                            />
                        );
                    })
                }
            </div>
        );
}