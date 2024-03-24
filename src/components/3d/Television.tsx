import { useGLTF, useTexture } from "@react-three/drei";
import { AnimatePresence } from "framer-motion";
import { Variants } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as THREE from "three";
import { televisionClickedState, televisionZoomState } from "../../atom";

const variants: Variants = {
  zoom: {
    scale: 8,
    x: -15,
    y: 3,
    z: 15,
    rotateX: 0,
    rotateY: (Math.PI / 6) * -2,
    rotateZ: Math.PI,
    transition: {
      duration: 2,
      type: "spring",
    },
  },
  initial: {
    scale: 8,
    x: -15,
    y: 25,
    z: 15,
    rotateX: 0,
    rotateY: (Math.PI / 6) * -2,
    rotateZ: Math.PI,
    transition: {
      duration: 2,
      type: "spring",
    },
  },
  notZoom: {
    scale: 1.6,
    x: -3.4,
    y: 2.3,
    z: 3,
    rotateX: 0,
    rotateY: (Math.PI / 6) * -2,
    rotateZ: Math.PI,
    transition: {
      duration: 2,
      type: "spring",
    },
  },
};

function Television() {
  const isZoomed = useRecoilValue(televisionZoomState);
  const setIsZoomed = useSetRecoilState(televisionZoomState);

  const setIsClicked = useSetRecoilState(televisionClickedState);

  const { nodes } = useGLTF("./resources/television.glb");
  const texture = useTexture("/resources/television_uv.png");
  texture.flipY = false;
  const { ButtonBottom, Television, ButtonTop, Screen } = nodes;

  const handleOnClick = () => {
    setIsZoomed(true);

    setTimeout(() => {
      setIsClicked(true);
    }, 600);
  };
  return (
    <AnimatePresence>
      <motion.group
        onPointerUp={handleOnClick}
        variants={variants}
        initial={!isZoomed ? "initial" : "notZoom"}
        animate={!isZoomed ? "notZoom" : "zoom"}
      >
        <mesh
          rotation={[0, 0, Math.PI]}
          position={[0, 0, -2]}
          geometry={(Television as THREE.Mesh).geometry}
          material={new THREE.MeshBasicMaterial({ map: texture })}
        />
        <mesh
          scale={1.02}
          rotation={[0, 0, Math.PI]}
          position={[0, 0, -1.97]}
          geometry={(Screen as THREE.Mesh).geometry}
          material={new THREE.MeshBasicMaterial({ map: texture })}
        />
        <mesh
          rotation={[0, 0, Math.PI / 2]}
          position={[-0.72, -0.3, -3.36]}
          geometry={(ButtonBottom as THREE.Mesh).geometry}
          material={new THREE.MeshBasicMaterial({ map: texture })}
        />
        <mesh
          rotation={[0, 0, Math.PI / 2]}
          position={[-0.72, -0.67, -3.36]}
          geometry={(ButtonTop as THREE.Mesh).geometry}
          material={new THREE.MeshBasicMaterial({ map: texture })}
        />
      </motion.group>
    </AnimatePresence>
  );
}

export default Television;
