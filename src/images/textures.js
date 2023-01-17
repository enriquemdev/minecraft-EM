
import {
    grassImg,
    dirtImg,
    logImg,
    glassImg,
    birch_woodImg,
    goldImg,

    acacia_woodImg,
    jungle_woodImg,
    dark_oak_woodImg,
    oak_woodImg,
    spruce_woodImg,
    warped_woodImg,

    celeste_glassImg,
    cobblestoneImg,
    creeper_sandstoneImg,
    diamondImg,
    emeraldImg,
    lapislazuliImg,

    mossy_cobblestoneImg,
    pumpkinImg,
    redstoneImg,
    sandstoneImg,
    stoneImg,
    spruce_logImg,
  } from './images.js'

import { NearestFilter, RepeatWrapping, TextureLoader } from "three";

// Para cargar las texturas
const grassTexture = new TextureLoader().load(grassImg)
const dirtTexture = new TextureLoader().load(dirtImg)
const logTexture = new TextureLoader().load(logImg)
const glassTexture = new TextureLoader().load(glassImg)
const birch_woodTexture = new TextureLoader().load(birch_woodImg)
const goldTexture = new TextureLoader().load(goldImg)

const acacia_woodTexture = new TextureLoader().load(acacia_woodImg)
const jungle_woodTexture = new TextureLoader().load(jungle_woodImg)
const dark_oak_woodTexture = new TextureLoader().load(dark_oak_woodImg)
const oak_woodTexture = new TextureLoader().load(oak_woodImg)
const spruce_woodTexture = new TextureLoader().load(spruce_woodImg)
const warped_woodTexture = new TextureLoader().load(warped_woodImg)

const celeste_glassTexture = new TextureLoader().load(celeste_glassImg)
const cobblestoneTexture = new TextureLoader().load(cobblestoneImg)
const creeper_sandstoneTexture = new TextureLoader().load(creeper_sandstoneImg)
const diamondTexture = new TextureLoader().load(diamondImg)
const emeraldTexture = new TextureLoader().load(emeraldImg)
const lapislazuliTexture = new TextureLoader().load(lapislazuliImg)

const mossy_cobblestoneTexture = new TextureLoader().load(mossy_cobblestoneImg)
const pumpkinTexture = new TextureLoader().load(pumpkinImg)
const redstoneTexture = new TextureLoader().load(redstoneImg)
const sandstoneTexture = new TextureLoader().load(sandstoneImg)
const stoneTexture = new TextureLoader().load(stoneImg)
const spruce_logTexture = new TextureLoader().load(spruce_logImg)


const groundTexture = new TextureLoader().load(grassImg)


groundTexture.wrapS = RepeatWrapping; // Repeat the texture in the X direction
groundTexture.wrapT = RepeatWrapping; // Repeat the texture in the Y direction

groundTexture.magFilter = NearestFilter;//Para que la textura no se mire borrosa 
grassTexture.magFilter = NearestFilter
dirtTexture.magFilter = NearestFilter
logTexture.magFilter = NearestFilter
glassTexture.magFilter = NearestFilter
birch_woodTexture.magFilter = NearestFilter
goldTexture.magFilter = NearestFilter

acacia_woodTexture.magFilter = NearestFilter
jungle_woodTexture.magFilter = NearestFilter
dark_oak_woodTexture.magFilter = NearestFilter
oak_woodTexture.magFilter = NearestFilter
spruce_woodTexture.magFilter = NearestFilter
warped_woodTexture.magFilter = NearestFilter

celeste_glassTexture.magFilter = NearestFilter
cobblestoneTexture.magFilter = NearestFilter
creeper_sandstoneTexture.magFilter = NearestFilter
diamondTexture.magFilter = NearestFilter
emeraldTexture.magFilter = NearestFilter
lapislazuliTexture.magFilter = NearestFilter

mossy_cobblestoneTexture.magFilter = NearestFilter
pumpkinTexture.magFilter = NearestFilter
redstoneTexture.magFilter = NearestFilter
sandstoneTexture.magFilter = NearestFilter
stoneTexture.magFilter = NearestFilter
spruce_logTexture.magFilter = NearestFilter



export {
    groundTexture,
    grassTexture,
    dirtTexture,
    logTexture,
    glassTexture,
    birch_woodTexture,
    goldTexture,

    acacia_woodTexture,
    jungle_woodTexture,
    dark_oak_woodTexture,
    oak_woodTexture,
    spruce_woodTexture,
    warped_woodTexture,

    celeste_glassTexture,
    cobblestoneTexture,
    creeper_sandstoneTexture,
    diamondTexture,
    emeraldTexture,
    lapislazuliTexture,

    mossy_cobblestoneTexture,
    pumpkinTexture,
    redstoneTexture,
    sandstoneTexture,
    stoneTexture,
    spruce_logTexture,
    
  }