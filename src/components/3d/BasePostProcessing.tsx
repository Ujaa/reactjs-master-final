import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
} from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { Vector2 } from "three";

function BasePostProcessing() {
  return (
    <EffectComposer>
      <Glitch
        delay={new Vector2(0.5, 1.5)}
        duration={new Vector2(0.6, 1.0)}
        strength={new Vector2(0.05, 0.1)}
        mode={GlitchMode.SPORADIC}
        active
        ratio={0.1}
      />
      <Bloom
        luminanceThreshold={0}
        mipmapBlur
        luminanceSmoothing={0.0}
        intensity={2}
      />
      <DepthOfField
        target={[3.4, 2, -3]}
        focalLength={0.18}
        bokehScale={30}
        height={6}
      />
    </EffectComposer>
  );
}

export default BasePostProcessing;
