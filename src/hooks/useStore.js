// este archivo gestiona y almacena el estado global de la aplicación

import { nanoid } from "nanoid";
import create from "zustand";

export const useStore = create(set => ({
    texture: 'dirt',
    cubes: [{
        id: nanoid(),//genera un id unico
        pos: [1, 2, 1],
        texture: 'dirt'
    }],
    addCube: (x, y, z) => {
        set(state => ({
          cubes: [...state.cubes, {
            id: nanoid(),
            texture: state.texture,
            pos: [x, y, z]
          }]
        }))
      },
    removeCube: () => {},
    setTexture: () => {},
    saveWorld: () => {},
    resetWorld: () => {}
}))
