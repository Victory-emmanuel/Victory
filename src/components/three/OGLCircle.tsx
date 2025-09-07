import { useEffect, useRef } from "react";
import {
  Renderer,
  Camera,
  Transform,
  Geometry,
  Program,
  Mesh,
  Vec3,
} from "ogl";

interface OGLCircleProps {
  className?: string;
  size?: number;
  color?: string;
  segments?: number;
}

export default function OGLCircle({
  className = "",
  size = 200,
  color = "#a855f7",
  segments = 64,
}: OGLCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize OGL renderer
    const renderer = new Renderer({
      canvas: canvasRef.current,
      width: size,
      height: size,
      alpha: true,
      antialias: true,
    });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0); // Transparent background

    // Create camera
    const camera = new Camera(gl, { fov: 45 });
    camera.position.set(0, 0, 5);

    // Create scene
    const scene = new Transform();

    // Create circular geometry with multiple rings for better visual effect
    const vertices = [];
    const indices = [];

    // Center vertex
    vertices.push(0, 0, 0);

    // Create outer circle vertices
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * 1.0;
      const y = Math.sin(angle) * 1.0;
      vertices.push(x, y, 0);

      // Create triangles from center to outer ring
      if (i < segments) {
        indices.push(0, i + 1, i + 2);
      }
    }

    // Add inner ring for more visual complexity
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * 0.6;
      const y = Math.sin(angle) * 0.6;
      vertices.push(x, y, 0.1);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: new Float32Array(vertices) },
      index: { data: new Uint16Array(indices) },
    });

    // Create shader program
    const vertex = `
      attribute vec3 position;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec3 vPosition;
      
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragment = `
      precision mediump float;
      uniform vec3 uColor;
      uniform float uTime;
      varying vec3 vPosition;
      
      void main() {
        // Create a gradient effect based on position and time
        float dist = length(vPosition.xy);
        float alpha = 1.0 - smoothstep(0.8, 1.0, dist);
        
        // Add some animation to the color
        vec3 color = uColor + 0.2 * sin(uTime + dist * 10.0);
        
        gl_FragColor = vec4(color, alpha * 0.8);
      }
    `;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uColor: { value: hexToRgb(color) },
        uTime: { value: 0 },
      },
      transparent: true,
    });

    // Create mesh
    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);
    meshRef.current = mesh;

    // Animation loop
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;

      // Rotate the mesh
      mesh.rotation.z = elapsed * 0.5; // Continuous rotation

      // Update time uniform for shader animation
      program.uniforms.uTime.value = elapsed;

      // Render
      renderer.render({ scene, camera });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle canvas resize
    const handleResize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        camera.perspective({ aspect: rect.width / rect.height });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);

      // Clean up OGL resources
      geometry.remove();
      program.remove();
      if (rendererRef.current) {
        rendererRef.current.gl
          .getExtension("WEBGL_lose_context")
          ?.loseContext();
      }
    };
  }, [size, color, segments]);

  return (
    <canvas
      ref={canvasRef}
      className={`block ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

// Helper function to convert hex color to RGB array
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [0.66, 0.33, 0.97]; // Default purple color
}
