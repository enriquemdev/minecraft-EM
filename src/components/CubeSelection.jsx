// import * as images from '../images/images.js';
import { useStore } from '../hooks/useStore.js';
import { useKeyboard } from '../hooks/useKeyboard.js';
import { useEffect, useState, useLayoutEffect } from 'react';
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

export const CubeSelection = () => {
    const [cubeSelectionVisible, MenuCubeSelected] = useStore((state) => [state.cubeSelectionVisible, state.MenuCubeSelected]);
    const [visible, setVisible] = useState(false)

    useLayoutEffect(() => {
        setVisible(cubeSelectionVisible);
    }, [cubeSelectionVisible]);

        let counter = 0;
        return (
            <div className={'cube-selection '+(visible ? 'visibleFlex' : 'hidden')}>
                {
                    Object.entries(images).map(([textureName, textureImg]) => {
                        counter++;

                        return (
                            <img
                                key={textureName}
                                src={textureImg}
                                alt={textureName}
                                className={`${counter == MenuCubeSelected ? 'selected' : ''}`}
                            />
                        );
                    })
                }
            </div>
        );
}