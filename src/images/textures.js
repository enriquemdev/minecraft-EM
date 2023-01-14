
import {
    grassImg,
    dirtImg,
    logImg,
    glassImg,
    woodImg,
    goldImg
  } from './images.js'

import { NearestFilter, RepeatWrapping, TextureLoader } from "three";

// Para cargar las texturas
const grassTexture = new TextureLoader().load(grassImg)
const dirtTexture = new TextureLoader().load(dirtImg)
const logTexture = new TextureLoader().load(logImg)
const glassTexture = new TextureLoader().load(glassImg)
const woodTexture = new TextureLoader().load(woodImg)
const goldTexture = new TextureLoader().load(goldImg)

const groundTexture = new TextureLoader().load(grassImg)


groundTexture.wrapS = RepeatWrapping; // Repeat the texture in the X direction
groundTexture.wrapT = RepeatWrapping; // Repeat the texture in the Y direction

groundTexture.magFilter = NearestFilter;//Para que la textura no se mire borrosa 
grassTexture.magFilter = NearestFilter
dirtTexture.magFilter = NearestFilter
logTexture.magFilter = NearestFilter
glassTexture.magFilter = NearestFilter
woodTexture.magFilter = NearestFilter
goldTexture.magFilter = NearestFilter

export {
    groundTexture,
    grassTexture,
    dirtTexture,
    logTexture,
    glassTexture,
    woodTexture,
    goldTexture
  }