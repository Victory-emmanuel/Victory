
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  useProgress, 
  Html 
} from '@react-three/drei';
import { Logo3D, CodeSphere } from './Logo3D';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-primary text-sm">
        {progress.toFixed(0)}% loaded
      </div>
    </Html>
  );
}

interface SceneProps {
  modelType?: 'logo' | 'sphere';
  cameraPosition?: [number, number, number];
  controlsEnabled?: boolean;
  className?: string;
}

export default function Scene({ 
  modelType = 'logo', 
  cameraPosition = [0, 0, 4],
  controlsEnabled = true,
  className = ''
}: SceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        <Suspense fallback={<Loader />}>
          {modelType === 'logo' ? <Logo3D /> : <CodeSphere />}
          <Environment preset="city" />
        </Suspense>
        {controlsEnabled && (
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        )}
      </Canvas>
    </div>
  );
}
