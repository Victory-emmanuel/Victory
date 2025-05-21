
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';
import { usePortfolio } from '@/context/PortfolioContext';

export function Logo3D() {
  const meshRef = useRef<Group>(null);
  const { activeSection } = usePortfolio();
  
  // Simple cube mesh as fallback
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Rotate based on active section
      if (activeSection === 'home') {
        meshRef.current.rotation.y += delta * 0.2;
      } else {
        // Slow down rotation when not in focus
        meshRef.current.rotation.y += delta * 0.05;
      }
    }
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#a855f7" 
          roughness={0.3}
          metalness={0.7}
          emissive="#a855f7"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0, 0, 1]} castShadow>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial 
          color="#f472b6" 
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

export function CodeSphere() {
  const meshRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#8b5cf6"
          wireframe={true}
          emissive="#8b5cf6"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}
