import { extend } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import myFont from '../assets/fonts/Noto Sans Black_Regular.json'

extend({ TextGeometry })


export default function Text() {

    const font = new FontLoader().parse(myFont);
    
    return(
    <mesh position={[-36, 2, -80]}>
        <textGeometry args={['By: Enrique Muñoz', {font, size:5, height: 1}]}/>
        <meshLambertMaterial attach='material' color={'#08024d'}/>
    </mesh>
    )
    }