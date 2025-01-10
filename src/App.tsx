import "./App.css";

import { Orb, useOrbAnimation } from "./hooks/useOrbAnimation";

import Canvas from "./components/Canvas";
import FullscreenContainer from "./components/FullscreenContainer";
import { Instructions } from "./components/Instructions";
import { useRef } from "react";

function App() {
  const orbsRef = useRef<Orb[]>([]);
  const animationFrameRef = useRef<number>();

  useOrbAnimation({ orbsRef, animationFrameRef });

  return (
    <FullscreenContainer>
      <Instructions />
      <Canvas orbsRef={orbsRef} animationFrameRef={animationFrameRef} />
      <footer>
        <p>
          made with 💜 by{" "}
          <a
            href="https://github.com/missionmike/smashkeys"
            target="_blank"
            rel="nofollow noopener"
          >
            missionmike
          </a>
        </p>
      </footer>
    </FullscreenContainer>
  );
}

export default App;
