export const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uRepulsionRadius;
  uniform float uRepulsionStrength;
  
  attribute vec3 initialPosition;
  attribute float aRandom;
  
  varying vec3 vColor;
  varying float vLife;

  void main() {
    vec3 pos = position;
    
    // Convert 3D position to screen space approx for mouse interaction (Orthographic-like logic for simplicity in perspective)
    // For a true 3D scene, we usually raycast uMouse to a plane. 
    // Here we will do a simple distance check in 3D space assuming z=0 plane interaction or screen space projection.
    
    // Simple noise movement
    float move = sin(uTime * 2.0 + aRandom * 10.0) * 0.02;
    pos.y += move;

    // --- PHASE 2: Mouse Repulsion Logic (Vertex Displacement) ---
    // We project the mouse (NDC -1 to 1) to world coordinates roughly or assume a plane at z=0.
    // Ideally, uMouse is passed as world coordinates on the Z=0 plane.
    
    float dist = distance(pos.xy, uMouse);
    float influence = smoothstep(uRepulsionRadius, 0.0, dist);
    
    vec3 dir = normalize(pos - vec3(uMouse, 0.0));
    
    // Displace away from mouse
    pos += dir * influence * uRepulsionStrength;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation
    gl_PointSize = (4.0 * aRandom + 2.0) * (1.0 / -mvPosition.z);

    // Color variation
    vLife = influence; 
  }
`;

export const fragmentShader = `
  uniform vec3 uColor;
  varying float vLife;

  void main() {
    // Circular particle
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    // Glow effect
    float strength = 1.0 - (dist * 2.0);
    strength = pow(strength, 1.5);

    vec3 finalColor = uColor;
    
    // Mix with secondary color on interaction (vLife is influence)
    vec3 activeColor = vec3(0.39, 1.0, 0.85); // Neon Cyan
    finalColor = mix(uColor, activeColor, vLife);

    gl_FragColor = vec4(finalColor, strength);
  }
`;
