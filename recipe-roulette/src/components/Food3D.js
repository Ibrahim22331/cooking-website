import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";

/* =========================
   DISH
========================= */
function Dish({ image, autoRotate, scale, placed }) {
  const meshRef = useRef();

  const fallback =
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd";

  const texture = useTexture(image || fallback);

  useFrame(() => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={[scale, scale, scale]}
      position={[0, placed ? -1 : 0, 0]}
      rotation={[0.5, 0.5, 0]}
    >
      <cylinderGeometry args={[2, 2, 0.5, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

/* =========================
   MAIN COMPONENT
========================= */
export default function Food3D({ image, fullScreen, onClose }) {

  // 🔥 STATES (THIS WAS MISSING)
  const [autoRotate, setAutoRotate] = useState(false);
  const [light, setLight] = useState(0.6);
  const [scale, setScale] = useState(1);
  const [placed, setPlaced] = useState(false);

  const resetAll = () => {
    setAutoRotate(false);
    setLight(0.6);
    setScale(1);
    setPlaced(false);
  };

  return (
    <div className={fullScreen ? "w-full h-full" : "mt-3"}>

      {/* =========================
         FULLSCREEN AR
      ========================= */}
      {fullScreen ? (
        <div className="w-full h-full flex flex-col bg-black">

          {/* TOP BAR */}
          <div className="flex justify-between items-center p-3 text-white">

            <div className="flex gap-2 flex-wrap">

              <button
                onClick={() => setPlaced(true)}
                className="bg-green-600 px-3 py-1 rounded"
              >
                Place Dish
              </button>

              <button
                onClick={() => setScale(scale + 0.2)}
                className="bg-blue-600 px-3 py-1 rounded"
              >
                Resize +
              </button>

              <button
                onClick={() => setScale(Math.max(0.5, scale - 0.2))}
                className="bg-blue-600 px-3 py-1 rounded"
              >
                Resize -
              </button>

              <button
                onClick={() => setLight(light === 0.6 ? 1.2 : 0.6)}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Basic Lighting
              </button>

              <button
                onClick={resetAll}
                className="bg-gray-600 px-3 py-1 rounded"
              >
                Reset
              </button>
            </div>

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="bg-red-500 px-3 py-1 rounded"
            >
              ✕
            </button>
          </div>

          {/* CANVAS */}
          <div className="flex-1">
            <Canvas camera={{ position: [0, 2, 4] }}>
              <ambientLight intensity={light} />
              <directionalLight position={[5, 5, 5]} />

              <Dish
                image={image}
                autoRotate={true}
                scale={scale}
                placed={placed}
              />

              <OrbitControls />
            </Canvas>
          </div>
        </div>
      ) : (
        /* =========================
           CARD VIEW
        ========================= */
        <>
          <div style={{ height: "250px" }}>
            <Canvas camera={{ position: [0, 3, 5] }}>
              <ambientLight intensity={light} />
              <directionalLight position={[5, 5, 5]} />

              <Dish
                image={image}
                autoRotate={autoRotate}
                scale={1}
                placed={false}
              />

              <OrbitControls />
            </Canvas>
          </div>

          {/* CONTROLS */}
          <div className="flex gap-2 mt-3 flex-wrap">

            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="bg-teal-500 text-white px-3 py-1 rounded"
            >
              {autoRotate ? "Stop Rotation" : "Auto Rotate"}
            </button>

            <button
              onClick={resetAll}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Reset View
            </button>

            <button
              onClick={() => setLight(light === 0.6 ? 1.2 : 0.6)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Enhanced Lighting
            </button>
          </div>
        </>
      )}
    </div>
  );
}