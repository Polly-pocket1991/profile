import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import ParticleField from './ParticleField';
import { DESIGN_TOKENS } from '../constants';
import { Group, MathUtils } from 'three';
import '../types'; // Import types to ensure global JSX augmentation is applied

const Experience: React.FC = () => {
    const groupRef = useRef<Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        
        // Gentle rotation of the entire field
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        
        // Slight parallax based on mouse
        const x = state.mouse.x * 0.2;
        const y = state.mouse.y * 0.2;
        groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, y, 0.05);
        groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, x, 0.05);
    });

  return (
    <>
      <color attach="background" args={[DESIGN_TOKENS.palette.background]} />
      
      {/* Lights - Minimalist for particle emission self-illumination look */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.0} color={DESIGN_TOKENS.palette.primary} />
      <pointLight position={[-10, -10, -10]} intensity={1.0} color={DESIGN_TOKENS.palette.secondary} />

      <group ref={groupRef}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <ParticleField />
          </Float>
      </group>
    </>
  );
};

export default Experience;