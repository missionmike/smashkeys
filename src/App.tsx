import "./App.css";

import { Orb, OrbAnimation } from "./components/OrbAnimation";

import Canvas from "./components/Canvas";
import FullscreenContainer from "./components/FullscreenContainer";
import { useRef } from "react";

function App() {
  const orbsRef = useRef<Orb[]>([]);
  const animationFrameRef = useRef<number>();

  return (
    <FullscreenContainer>
      <Canvas orbsRef={orbsRef} animationFrameRef={animationFrameRef} />
      <OrbAnimation orbsRef={orbsRef} animationFrameRef={animationFrameRef} />
    </FullscreenContainer>
  );
}

export default App;
