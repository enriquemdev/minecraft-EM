// este archivo gestiona y almacena el estado global de la aplicación

import { nanoid } from "nanoid";
import create from "zustand";
import { dirtImg } from "../images/images";

/********TRIED TO MAKE 3D GROUND ************/
// let firstX = -50;
// let firstZ = 60;

// let groundCubes = [];

// for (let i = 0; i < 20; i++) 
// {
//   for (let j = 0; j < 20; j++) 
//   {
//       groundCubes.push({
//         id: nanoid(),//genera un id unico
//         pos: [firstX + i, -0.5, firstZ + j],
//         texture: 'dirt'
//       });
//       //console.log('a');
//   }
// }


//Helper function for accesing local storage
const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))


export const useStore = create(set => ({
    texture: 'dirt', //textura por defecto
    //cubes: [...getLocalStorage('cubes') || [], ...groundCubes],/********TRIED TO MAKE 3D GROUND ************/
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
    removeCube: (x, y, z) => {
      set((prev) => ({
        cubes: prev.cubes.filter(cube => {
          const [X, Y, Z] = cube.pos
          return X !== x || Y !== y || Z !== z
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

  //my own code
  loadWorld: (text) => {
    set(() => ({
      cubes: [...JSON.parse(text)]
    }))
  },
  downloadWorld: () => {
    set((state) => {

      const downloadLink = document.createElement("a");
      const content = JSON.stringify(state.cubes);
      const file = new Blob([content], { type: 'text/plain' });

      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = "minecraft-em-WORLD.txt";
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);

      //console.log(JSON.parse(JSON.stringify(state.cubes)));
      return state
    })
    
  },

  flyingMode: false,
  setFlyingMode: () => {
    set((state) => ({ 
      flyingMode: !(state.flyingMode)
      
    }))
  },

  helpVisible: false,
  setHelpVisible: () => {
    set((state) => ({ 
      helpVisible: !(state.helpVisible)
      
    }))
  },
  
  cubeSelectionVisible: false,
  setCubeSelectionVisible: () => {
    set((state) => ({ 
      cubeSelectionVisible: !(state.cubeSelectionVisible)
      
    }))
  },

  MenuCubeSelected: 1,
  setMenuCubeSelected: (id) => {
    set(() => ({
      MenuCubeSelected: id
    }))
  },

  key1: 'dirt',
  setKey1: (texture) => {
    set(() => ({ 
      key1: texture 
    }))
  },
  key2: 'grass',
  setKey2: (texture) => {
    set(() => ({ 
      key2: texture 
    }))
  },
  key3: 'glass',
  setKey3: (texture) => {
    set(() => ({ 
      key3: texture 
    }))
  },
  key4: 'birch_wood',
  setKey4: (texture) => {
    set(() => ({ 
      key4: texture 
    }))
  },
  key5: 'log',
  setKey5: (texture) => {
    set(() => ({ 
      key5: texture 
    }))
  },
  key6: 'gold',
  setKey6: (texture) => {
    set(() => ({ 
      key6: texture 
    }))
  },

}))