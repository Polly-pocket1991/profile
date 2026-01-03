import { Vector2, Color, ShaderMaterial } from 'three';
import React from 'react';

export interface ParticleUniforms {
  uTime: { value: number };
  uMouse: { value: Vector2 };
  uColor: { value: Color };
  uResolution: { value: Vector2 };
  uRepulsionRadius: { value: number };
  uRepulsionStrength: { value: number };
}

export type ParticleShaderMaterial = ShaderMaterial & {
  uniforms: ParticleUniforms;
}

// Type definitions for R3F elements
// We augment both global JSX and React.JSX to ensure compatibility across different TypeScript/React versions.

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js elements
      points: any;
      bufferGeometry: any;
      bufferAttribute: any;
      shaderMaterial: any;
      group: any;
      ambientLight: any;
      pointLight: any;
      color: any;
      primitive: any;
      mesh: any;

      // HTML/SVG elements (in case they are missing in the environment)
      div: any;
      span: any;
      header: any;
      nav: any;
      button: any;
      a: any;
      p: any;
      img: any;
      h1: any;
      h2: any;
      h3: any;
      h4: any;
      br: any;
      main: any;
      footer: any;
      svg: any;
      path: any;
      rect: any;
      text: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      points: any;
      bufferGeometry: any;
      bufferAttribute: any;
      shaderMaterial: any;
      group: any;
      ambientLight: any;
      pointLight: any;
      color: any;
      primitive: any;
      mesh: any;
    }
  }
}
