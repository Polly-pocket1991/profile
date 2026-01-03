import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, OrbitControls } from '@react-three/drei';
import Experience from './Experience';

const CanvasLayout: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]} // Handle high-dpi screens
        gl={{ 
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
        
        {/* Helper for development, but restricted rotation to keep the hero layout intact */}
        <OrbitControls 
            {...({
              enableZoom: false,
              enablePan: false,
              maxPolarAngle: Math.PI / 1.8,
              minPolarAngle: Math.PI / 2.2,
              maxAzimuthAngle: Math.PI / 4,
              minAzimuthAngle: -Math.PI / 4
            } as any)}
        />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default CanvasLayout;