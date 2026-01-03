import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, Vector2, Color, AdditiveBlending } from 'three';
import { vertexShader, fragmentShader } from '../utils/shaders';
import { DESIGN_TOKENS, PARTICLE_COUNT } from '../constants';
import { ParticleShaderMaterial } from '../types';

const ParticleField: React.FC = () => {
  // Use generic Object3D or specific Points if available, but Object3D is safer for ref types in mixed envs
  const mesh = useRef<Points>(null);
  const { viewport, mouse } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0, 0) },
      uColor: { value: new Color(DESIGN_TOKENS.palette.particles) },
      uResolution: { value: new Vector2(viewport.width, viewport.height) },
      uRepulsionRadius: { value: DESIGN_TOKENS.physics.repulsionRadius * 5 }, // Scaled for world units
      uRepulsionStrength: { value: DESIGN_TOKENS.physics.repulsionStrength * 0.2 },
    }),
    [viewport]
  );

  const particles = useMemo(() => {
    const temp = new Float32Array(PARTICLE_COUNT * 3);
    const random = new Float32Array(PARTICLE_COUNT);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 15; // Spread width
      const y = (Math.random() - 0.5) * 10; // Spread height
      const z = (Math.random() - 0.5) * 5;  // Depth
      
      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;
      
      random[i] = Math.random();
    }
    
    return { positions: temp, random };
  }, []);

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      const material = mesh.current.material as ParticleShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
      
      // Convert normalized mouse (-1 to 1) to world units approx for the shader
      // For orthographic or fixed perspective at z=0
      material.uniforms.uMouse.value.x = (mouse.x * viewport.width) / 2;
      material.uniforms.uMouse.value.y = (mouse.y * viewport.height) / 2;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-initialPosition"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={particles.random.length}
          array={particles.random}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
};

export default ParticleField;