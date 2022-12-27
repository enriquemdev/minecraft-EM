//Esta es la camara para poder ver en primera persona
//Hay que importarla en el archivo App.jsx fuera de las fisicas

import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function FPV  () {
    const { camera, gl } = useThree();

    return (
        <PointerLockControls
            args={[camera, gl.domElement]}
        >

        </PointerLockControls>
    );
}