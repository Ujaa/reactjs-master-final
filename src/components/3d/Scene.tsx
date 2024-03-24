import { Canvas, useFrame } from "@react-three/fiber";
import BaseFloor from "./BaseFloor";
import BaseEnvironment from "./BaseEnvironment";
import Television from "./Television";
import { useState } from "react";
import * as THREE from "three";
import styled from "styled-components";
import BasePostProcessing from "./BasePostProcessing";
import { useRecoilValue } from "recoil";
import { televisionZoomState } from "../../atom";
import { Variants, motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const variants: Variants = {
  initial: {
    opacity: 0.2,
  },
  animate: {
    opacity: 1,
  },
};

const Text = styled(motion.h1)`
  color: white;
  position: absolute;
  bottom: 6rem;
  z-index: 10;
  font-size: 1.2rem;
  border: 1px solid white;
  border-radius: 400rem;
  padding: 0.8rem 1.2rem;
`;

function Intro() {
  const [vector] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vector.set(state.pointer.x * 5, 3 + state.pointer.y * 2, 14),
      0.05
    );
    state.camera.lookAt(0, 1, 0);
  });
}

function Scene() {
  const isZoomed = useRecoilValue(televisionZoomState);

  return (
    <Wrapper>
      <Text
        variants={variants}
        initial={"initial"}
        animate={"animate"}
        transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
      >
        Click The Television
      </Text>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <BaseEnvironment />
        {!isZoomed && <BaseFloor />}
        <Television />
        <BasePostProcessing />
        {!isZoomed && <Intro />}
      </Canvas>
    </Wrapper>
  );
}

export default Scene;
