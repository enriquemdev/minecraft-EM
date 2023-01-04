// este archivo gestiona y almacena el estado global de la aplicación

import { nanoid } from "nanoid";
import create from "zustand";

//Helper function for accesing local storage
const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))


export const useStore = create(set => ({
    texture: 'dirt', //textura por defecto
    cubes: getLocalStorage('cubes') || [],//Si no hay nada en el local storage, se crea un array vacio

    // Para añadir un cubo a la lista de cubos
    //   cubes: [{
    //     id: nanoid(),//genera un id unico
    //     pos: [1, 2, 1],
    //     texture: 'dirt'
    // }],

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

    saveWorld: () => {
      set((prev) => {
        setLocalStorage('cubes', prev.cubes)
        return prev
      })
    },
    resetWorld: () => {
      set(() => ({
        cubes: []
      }))
    },
  }))