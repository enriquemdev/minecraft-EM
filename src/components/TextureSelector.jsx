//import * as images from '../images/images.js';
import { useStore } from '../hooks/useStore.js';
import { useKeyboard } from '../hooks/useKeyboard.js';
import { useEffect, useState } from 'react';
import { dirtImg, grassImg, glassImg, birch_woodImg, logImg, goldImg } from '../images/images.js';
import { acacia_woodImg, jungle_woodImg, dark_oak_woodImg, oak_woodImg, spruce_woodImg, warped_woodImg } from '../images/images.js';
import { celeste_glassImg, cobblestoneImg, creeper_sandstoneImg, diamondImg, emeraldImg, lapislazuliImg } from '../images/images.js';
import { mossy_cobblestoneImg, pumpkinImg, redstoneImg, sandstoneImg, stoneImg, spruce_logImg, } from '../images/images.js';

const images = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    birch_wood: birch_woodImg,
    log: logImg,
    gold: goldImg,

    acacia_wood: acacia_woodImg,
    jungle_wood: jungle_woodImg,
    dark_oak_wood: dark_oak_woodImg,
    oak_wood: oak_woodImg,
    spruce_wood: spruce_woodImg,
    warped_wood: warped_woodImg,

    celeste_glass: celeste_glassImg,
    cobblestone: cobblestoneImg,
    creeper_sandstone: creeper_sandstoneImg,
    diamond: diamondImg,
    emerald: emeraldImg,
    lapislazuli: lapislazuliImg,

    mossy_cobblestone: mossy_cobblestoneImg,
    pumpkin: pumpkinImg,
    redstone: redstoneImg,
    sandstone: sandstoneImg,
    stone: stoneImg,
    spruce_log: spruce_logImg,

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
        birch_wood,
        log,
        gold,

        acacia_wood,
        jungle_wood,
        dark_oak_wood,
        oak_wood,
        spruce_wood,
        warped_wood,

        celeste_glass,
        cobblestone,
        creeper_sandstone,
        diamond,
        emerald,
        lapislazuli,

        mossy_cobblestone,
        pumpkin,
        redstone,
        sandstone,
        stone,
        spruce_log,

    } = useKeyboard();

    const dependenciesArray = [dirt, grass, glass, birch_wood, log, gold, 
        acacia_wood, jungle_wood, dark_oak_wood, oak_wood, spruce_wood, warped_wood,
        celeste_glass, cobblestone, creeper_sandstone, diamond, emerald, lapislazuli,
        mossy_cobblestone, pumpkin, redstone, sandstone, stone, spruce_log];

    useEffect(() => {
        const options = {
        dirt,
        grass,
        glass,
        birch_wood,
        log,
        gold,

        acacia_wood,
        jungle_wood,
        dark_oak_wood,
        oak_wood,
        spruce_wood,
        warped_wood,

        celeste_glass,
        cobblestone,
        creeper_sandstone,
        diamond,
        emerald,
        lapislazuli,

        mossy_cobblestone,
        pumpkin,
        redstone,
        sandstone,
        stone,
        spruce_log,

        }
    
        const selectedTexture = Object  
        .entries(options)
        .find(([texture, isEnabled]) => isEnabled)
    
        if (selectedTexture) {
            const [textureName] = selectedTexture
            setTexture(textureName)
        }
    }, [...dependenciesArray]);


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