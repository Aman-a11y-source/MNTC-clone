import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, PointMaterial, Trail } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { random } from 'maath';

function ParticleSystem() {
    const { viewport, mouse } = useThree();
    const count = 4000;
    const mesh = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);


    const randomPositions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        random.inSphere(positions, { radius: 15 });
        return positions;
    }, [count]);


    const targetPositions = useMemo(() => {
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {

            const t = (i / count) * Math.PI * 2 * 10;
            const p = 2;
            const q = 3;
            const scale = 3.5;


            const r = 2 + Math.cos(q * t);
            const x = scale * r * Math.cos(p * t);
            const y = scale * r * Math.sin(p * t);
            const z = scale * Math.sin(q * t);


            const jitter = 0.5;
            positions[i * 3] = x + (Math.random() - 0.5) * jitter;
            positions[i * 3 + 1] = y + (Math.random() - 0.5) * jitter;
            positions[i * 3 + 2] = z + (Math.random() - 0.5) * jitter;
        }
        return positions;
    }, [count]);


    const offsets = useMemo(() => new Float32Array(count * 3).map(() => Math.random() * 100), [count]);

    useFrame((state, delta) => {
        if (!mesh.current) return;


        const scrollMax = document.body.scrollHeight - window.innerHeight;
        const scrollY = window.scrollY;

        let progress = Math.min(scrollY / (scrollMax || 1), 1);


        const morphFactor = THREE.MathUtils.smoothstep(progress, 0, 0.8);


        mesh.current.rotation.y += delta * 0.05;
        mesh.current.rotation.z += delta * 0.02;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;


            const rx = randomPositions[i3];
            const ry = randomPositions[i3 + 1];
            const rz = randomPositions[i3 + 2];

            const tx = targetPositions[i3];
            const ty = targetPositions[i3 + 1];
            const tz = targetPositions[i3 + 2];


            let x = THREE.MathUtils.lerp(rx, tx, morphFactor);
            let y = THREE.MathUtils.lerp(ry, ty, morphFactor);
            let z = THREE.MathUtils.lerp(rz, tz, morphFactor);


            const time = state.clock.getElapsedTime();
            const noiseIntensity = (1 - morphFactor) * 0.2 + 0.05;

            x += Math.sin(time * 0.5 + offsets[i3]) * noiseIntensity;
            y += Math.cos(time * 0.3 + offsets[i3 + 1]) * noiseIntensity;
            z += Math.sin(time * 0.2 + offsets[i3 + 2]) * noiseIntensity;


            const mouseX = (mouse.x * viewport.width) / 2;
            const mouseY = (mouse.y * viewport.height) / 2;

            const dx = x - mouseX;
            const dy = y - mouseY;
            const dz = z - 0;

            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);


            if (dist < influence) {
                const force = (influence - dist) / influence;

                x += dx * force * 1.5 * (1 - morphFactor * 0.5);
                y += dy * force * 1.5 * (1 - morphFactor * 0.5);
                z += dz * force * 1.5 * (1 - morphFactor * 0.5);
            }


            dummy.position.set(x, y, z);


            const scale = (1 - morphFactor) * 0.8 + 0.5;
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        }

        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>

            <dodecahedronGeometry args={[0.03, 0]} />
            <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={0.2}
                toneMapped={false}
                transparent
                opacity={0.7}
                roughness={0.1}
                metalness={0.9}
            />
        </instancedMesh>
    );
}

function ConnectingLines() {

    return (
        <group>
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                <mesh position={[-5, 0, -5]} rotation={[0, 0, Math.PI / 4]}>
                    <ringGeometry args={[6, 6.05, 64]} />
                    <meshStandardMaterial color="#333" emissive="#00f3ff" emissiveIntensity={0.5} opacity={0.3} transparent />
                </mesh>
            </Float>
            <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.1}>
                <mesh position={[5, 0, -8]} rotation={[Math.PI / 4, 0, 0]}>
                    <ringGeometry args={[4, 4.05, 64]} />
                    <meshStandardMaterial color="#333" emissive="#bc13fe" emissiveIntensity={0.5} opacity={0.3} transparent />
                </mesh>
            </Float>
        </group>
    )
}

function ExperienceContent() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
            <color attach="background" args={['#000000']} />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <group position={[0, 0, 0]}>
                <ParticleSystem />
            </group>

            <ConnectingLines />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#bc13fe" />

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </>
    );
}

export default function Experience() {
    return (
        <Canvas
            gl={{ antialias: false, pixelRatio: 1, alpha: false, preserveDrawingBuffer: true }}
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 15], fov: 50 }}
        >
            <Suspense fallback={null}>
                <ExperienceContent />
            </Suspense>
        </Canvas>
    );
}
