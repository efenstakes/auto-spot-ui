import { useFrame } from "@react-three/fiber"
import { Depth, LayerMaterial, Noise } from "lamina"
import { useRef } from "react"


import * as THREE from 'three'

const CanvasBackground = ()=> {
    const ref = useRef(null)
  
    useFrame(()=> {
        ref.current.rotation.x += .02
        ref.current.rotation.y += .02
    })
  
    return (
        <mesh ref={ref} scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <LayerMaterial side={THREE.BackSide}>
                <Depth
                    colorA="teal"
                    colorB="black"
                    alpha={1}
                    mode="normal"
                    near={0}
                    far={300}
                    origin={[100, 100, 100]}
                />
                <Noise mapping="local" type="cell" scale={0.5} mode="darken" />
            </LayerMaterial>
        </mesh>
    )
  }
  
  

export default CanvasBackground