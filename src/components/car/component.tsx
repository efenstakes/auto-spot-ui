import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
    Object_7: THREE.Mesh;
    Object_8: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_11: THREE.Mesh;
    Object_12: THREE.Mesh;
    Object_13: THREE.Mesh;
    Object_14: THREE.Mesh;
    Object_15: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_17: THREE.Mesh;
    Object_18: THREE.Mesh;
    Object_19: THREE.Mesh;
    Object_21: THREE.Mesh;
    Object_22: THREE.Mesh;
    Object_24: THREE.Mesh;
    Object_26: THREE.Mesh;
    Object_27: THREE.Mesh;
    Object_28: THREE.Mesh;
    Object_30: THREE.Mesh;
    Object_31: THREE.Mesh;
    Object_32: THREE.Mesh;
    Object_34: THREE.Mesh;
    Object_35: THREE.Mesh;
    Object_36: THREE.Mesh;
    Object_38: THREE.Mesh;
    Object_39: THREE.Mesh;
    Object_40: THREE.Mesh;
  };
  materials: {
    ["Material.009"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.006"]: THREE.MeshStandardMaterial;
    ["Material.007"]: THREE.MeshPhysicalMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
    ["Material.008"]: THREE.MeshPhysicalMaterial;
    ["Material.016"]: THREE.MeshPhysicalMaterial;
    ["Material.017"]: THREE.MeshStandardMaterial;
    ["Material.018"]: THREE.MeshStandardMaterial;
    ["Material.019"]: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshPhysicalMaterial;
    ["Material.005"]: THREE.MeshStandardMaterial;
    ["Material.011"]: THREE.MeshStandardMaterial;
    ["Material.014"]: THREE.MeshStandardMaterial;
    ["Material.015"]: THREE.MeshStandardMaterial;
  };
};

type ActionName = "Animation";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export function CarModel(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    "/models/mazda_rx-7_car.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);
  console.log("Actions ", actions)


  useFrame((_state, delta)=> {
    group.current.rotation.y += delta * .1
  })


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.767}
          // position-z={-3}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Empty004_1"
                // position={[2.048, -0.684, 1.906]}
                scale={0.027}
              >
                <group
                  name="Plane001_0"
                  // position={[-16.033, -0.884, -40.345]}
                  rotation={[0.612, 0, 0]}
                  scale={1.496}
                >
                  <mesh
                    name="Object_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_5.geometry}
                    material={materials["Material.009"]}
                    material-color="red"
                  />
                  <mesh
                    name="Object_6"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_6.geometry}
                    material={materials["Material.002"]}
                    material-color="green"
                  />
                  <mesh
                    name="Object_7"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_7.geometry}
                    material={materials["Material.006"]}
                    // material-color="orange"
                  />
                  <mesh
                    name="Object_8"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_8.geometry}
                    material={materials["Material.007"]}
                    material-color="red"
                  />
                </group>
              </group>
              <group
                name="Plane_2"
                // position={[1.623, -0.708, 0.834]}
                // position={[1.623, -0.708, 0.834]}
                rotation={[0.612, 0, 0]}
                scale={0.04}
              >
                <mesh
                  name="Object_10"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_10.geometry}
                  material={materials["Material.007"]}
                />
                <mesh
                  name="Object_11"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_11.geometry}
                  material={materials["Material.003"]}
                />
                <mesh
                  name="Object_12"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_12.geometry}
                  material={materials["Material.006"]}
                />
                <mesh
                  name="Object_13"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_13.geometry}
                  material={materials["Material.008"]}
                />
                <mesh
                  name="Object_14"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_14.geometry}
                  material={materials["Material.009"]}
                />
                <mesh
                  name="Object_15"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_15.geometry}
                  material={materials["Material.016"]}
                />
                <mesh
                  name="Object_16"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_16.geometry}
                  material={materials["Material.017"]}
                />
                <mesh
                  name="Object_17"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_17.geometry}
                  material={materials["Material.018"]}
                />
                <mesh
                  name="Object_18"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_18.geometry}
                  material={materials["Material.019"]}
                />
                <mesh
                  name="Object_19"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_19.geometry}
                  material={materials.Material}
                />
              </group>
              <group
                name="Plane004_3"
                // position={[1.623, -0.708, 0.834]}
                rotation={[0.612, 0, 0]}
                scale={0.04}
              >
                <mesh
                  name="Object_21"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_21.geometry}
                  material={materials["Material.001"]}
                />
                <mesh
                  name="Object_22"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_22.geometry}
                  material={materials["Material.005"]}
                />
              </group>
              <group
                name="Cylinder003_4"
                // position={[1.248, -0.963, -0.447]}
                rotation={[1.532, 0, 0]}
                scale={0.026}
              >
                <mesh
                  name="Object_24"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_24.geometry}
                  material={materials["Material.001"]}
                />
              </group>

              {/* wheel */}
              <group
                name="Circle008_5"
                // position={[1.078, -0.94, 1.714]}
                position={[.468, -.3, -.814]}
                rotation={[-2.511, 0, -Math.PI / 2]}
                scale={0.172}
              >
                <mesh
                  name="Object_26"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_26.geometry}
                  material={materials["Material.011"]}
                />
                <mesh
                  name="Object_27"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_27.geometry}
                  material={materials["Material.014"]}
                />
                <mesh
                  name="Object_28"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_28.geometry}
                  material={materials["Material.015"]}
                />
              </group>

              {/* wheel */}
              <group
                name="Circle009_6"
                position={[-.468, -.3, .914]}
                rotation={[-0.63, 0, Math.PI / 2]}
                scale={0.172}
              >
                <mesh
                  name="Object_30"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_30.geometry}
                  material={materials["Material.011"]}
                  // material-color="red"
                />
                <mesh
                  name="Object_31"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_31.geometry}
                  material={materials["Material.014"]}
                  // material-color="red"
                />
                <mesh
                  name="Object_32"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_32.geometry}
                  material={materials["Material.015"]}
                  // material-color="red"
                />
              </group>

              {/* wheel */}
              <group
                name="Circle010_7"
                // original
                // position={[1.078, -0.94, 0.072]}
                position={[.468, -.3, .914]}
                rotation={[-2.511, 0, -Math.PI / 2]}
                scale={0.172}
              >
                <mesh
                  name="Object_34"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_34.geometry}
                  material={materials["Material.011"]}
                />
                <mesh
                  name="Object_35"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_35.geometry}
                  material={materials["Material.014"]}
                />
                <mesh
                  name="Object_36"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_36.geometry}
                  material={materials["Material.015"]}
                />
              </group>


              {/* wheel */}
              <group
                name="Circle011_8"
                // position={[2.168, -0.94, 0.072]}
                position={[-.468, -.3, -.814]}
                rotation={[-0.63, 0, Math.PI / 2]}
                scale={0.172}
              >
                <mesh
                  name="Object_38"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_38.geometry}
                  material={materials["Material.011"]}
                />
                <mesh
                  name="Object_39"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_39.geometry}
                  material={materials["Material.014"]}
                />
                <mesh
                  name="Object_40"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_40.geometry}
                  material={materials["Material.015"]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/mazda_rx-7_car.glb");
