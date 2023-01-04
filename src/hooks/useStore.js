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
          cubes: [...state.cubes, {//Añadir a los cubos este objeto que contiene los datos del cubo nuevo
            id: nanoid(),
            texture: state.texture,
            pos: [x, y, z]
          }]
        }))
      },
    removeCube: (id) => {
        set(state => ({
            cubes: state.cubes.filter(cube => {//Filtrar los cubos que no coincidan con las coordenadas del cubo que se quiere eliminar
                return cube.id !== id
            })
        }))
    },
    setTexture: (texture) => {
      set(() => ({ texture }))
    },
    saveWorld: () => {},
    resetWorld: () => {}
}))
