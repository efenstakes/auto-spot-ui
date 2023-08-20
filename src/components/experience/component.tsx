import { motion } from 'framer-motion'
import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Backdrop, Box, ContactShadows, Loader, OrbitControls, Shadow, Sky, SpotLight, Stage, Stars, Text, } from '@react-three/drei'


// component
import { CarModel } from '../car/component'



// styles
import { containerVariants, itemVariants } from '@/styles/variants'
import './component.scss'
import CanvasBackground from '../canvas_background/component'
import { useWindowWidth } from '@react-hook/window-size'


const Experience = () => {
    const width = useWindowWidth()
    const isMobile = width < 840
    

    
    return (
        <motion.div
            className='experience'
            variants={containerVariants}
            animate='animate'
            initial='initial'
        >

            <motion.div
                variants={containerVariants}
                className='column ca_center experience__content'
            >

                <motion.p variants={itemVariants} className='title_5'>
                    We Agree
                </motion.p>

                <motion.p variants={itemVariants}>
                    Your moti Deserves to pop!
                </motion.p>

            </motion.div>

            <Canvas
                shadows={true}
                camera={{
                    position: [ 0, 2, 6 ]
                }}
                style={{
                    width: '100%', 
                    height: '64vh', 
                    backgroundColor: 'teal',
                    // backgroundColor: '#1e1e1e',
                    // backgroundColor: 'skyblue',
                    // backgroundColor: 'lightgray', 
                    borderRadius: '16px', 
                }}
            >

                {/* <ambientLight intensity={.5} /> */}
                {/* <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} /> */}
                {/* <ambientLight color='red' /> */}

                {/* <spotLight
                    angle={2}
                    distance={100}
                /> */}

                <OrbitControls />
                
                {/* adjustCamera */}
                <Stage  castShadow receiveShadow intensity={.2} shadows="contact" environment="city">
                    
                    {/* <group
                        rotation-y={Math.PI / 2}
                        rotation-x={-Math.PI / 17}
                        position-y={-2}
                        position-z={-8}
                    > */}
                        <CarModel />
                    {/* </group> */}
                </Stage>

                {/* <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="red" /> */}

                {/* <mesh
                    // position-y={-1.2}
                    position-z={20}
                    // rotation-x={ -Math.PI / 2 }
                    rotation-x={ -Math.PI / 1.6 }
                    scale={[ 200, 200, 200 ]}
                    receiveShadow
                >

                    <planeGeometry args={[ 20, 20 ]} />
                    <meshBasicMaterial color="cadetblue" />
                </mesh> */}

                <CanvasBackground />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                {/* <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} /> */}
                {/* <Shadow
                    color="red"
                    colorStop={0}
                    opacity={.5}
                    fog={true} // Reacts to fog (default=false)
                /> */}

                <SpotLight
                    distance={1000}
                    angle={30}
                    attenuation={5}
                    intensity={.5}
                    anglePower={5} // Diffuse-cone anglePower (default: 5)
                    position={[ 6, 10, -4 ]}
                    color={"gray"}
                />


                <Text
                    fontSize={ isMobile ? 2 : 3.2}
                    position-y={3}
                    position-z={-6}
                    rotation-x={-Math.PI/10}

                    strokeColor={"white"}
                    strokeWidth={.05}
                    strokeOpacity={.3}
                    fillOpacity={0}
                >
                    Auto Spot
                </Text>

                {/* <mesh>
                    <boxGeometry />
                    <meshStandardMaterial color={"red"} />
                </mesh> */}

            </Canvas>
            <Loader />
            
        </motion.div>
    )
}

export default Experience
