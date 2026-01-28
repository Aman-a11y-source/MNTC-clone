import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, Sparkles, SpotLight, Text } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { Suspense, useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

function useGlowTexture() {
    return useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.1, 'rgba(160, 32, 240, 0.8)');
        gradient.addColorStop(0.4, 'rgba(100, 0, 200, 0.2)');
        gradient.addColorStop(0.7, 'rgba(50, 0, 100, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }, []);
}

function ArgusEclipse() {
    const glowTex = useGlowTexture();
    const group = useRef();
    const ringRef = useRef();
    const glowRef = useRef();
    const textRef = useRef();

    const [hovered, setHovered] = useState(false);

    const { viewport } = useThree();
    const responsiveScale = viewport.width / 8;

    useFrame((state, delta) => {
        if (!group.current || !ringRef.current || !glowRef.current) return;

        const t = state.clock.getElapsedTime();

        group.current.position.y = Math.sin(t * 0.5) * 0.1;

        const targetSpeed = hovered ? 2.5 : 0.2;
        ringRef.current.rotation.z += delta * targetSpeed;

        const targetGlowScale = hovered ? 22 : 16;
        const targetOpacity = hovered ? 1.0 : 0.8;

        glowRef.current.scale.lerp(new THREE.Vector3(targetGlowScale, targetGlowScale, 1), delta * 2);
        glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, targetOpacity, delta * 2);
    });

    return (
        <group
            ref={group}
            position={[0, 0, 0]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <group position={[0.1, 0, 0.5]}>
                <Text
                    position={[-responsiveScale * 1.1, 0, 0]}
                    fontSize={responsiveScale}
                    fontWeight={900}
                    letterSpacing={-0.05}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    M
                    <meshStandardMaterial color="#ffffff" toneMapped={false} emissive="#ffffff" emissiveIntensity={hovered ? 1.5 : 0.8} />
                </Text>

                <Text
                    position={[-responsiveScale * 0.28, 0, 0]}
                    fontSize={responsiveScale}
                    fontWeight={900}
                    letterSpacing={-0.05}
                    color="#00f3ff"
                    anchorX="center"
                    anchorY="middle"
                >
                    N
                    <meshStandardMaterial
                        color="#00f3ff"
                        toneMapped={false}
                        emissive="#00f3ff"
                        emissiveIntensity={hovered ? 3.0 : 1.5}
                    />
                </Text>

                <Text
                    position={[responsiveScale * 0.38, 0, 0]}
                    fontSize={responsiveScale}
                    fontWeight={900}
                    letterSpacing={-0.05}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    T
                    <meshStandardMaterial color="#ffffff" toneMapped={false} emissive="#ffffff" emissiveIntensity={hovered ? 1.5 : 0.8} />
                </Text>

                <Text
                    position={[responsiveScale * 0.92, 0, 0]}
                    fontSize={responsiveScale}
                    fontWeight={900}
                    letterSpacing={-0.05}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    C
                    <meshStandardMaterial color="#ffffff" toneMapped={false} emissive="#ffffff" emissiveIntensity={hovered ? 1.5 : 0.8} />
                </Text>
            </group>

            <group position={[-0.2, 0, -1]}>

                <group ref={ringRef} rotation={[0.4, 0, 0]}>
                    <mesh rotation={[1.6, 0, 0]}>
                        <torusGeometry args={[responsiveScale * 1.6, 0.15, 64, 200]} />
                        <meshStandardMaterial
                            color="#ffeb3b"
                            emissive="#ffeb3b"
                            emissiveIntensity={hovered ? 5.0 : 3.0}
                            toneMapped={false}
                        />
                    </mesh>
                </group>

                <mesh ref={glowRef} position={[0, 0.5, -0.5]} scale={[16, 16, 1]}>
                    <planeGeometry args={[1, 1]} />
                    <meshBasicMaterial
                        map={glowTex}
                        transparent
                        opacity={0.8}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                        color="#a855f7"
                        side={THREE.DoubleSide}
                    />
                </mesh>
            </group>
        </group>
    );
}

function ExperienceContent() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={50} />
            <color attach="background" args={['#00020a']} />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

            <group position={[0, 2, -2]}>
                <ArgusEclipse />
            </group>

            <Sparkles
                count={500}
                scale={[30, 30, 15]}
                size={4}
                speed={0.2}
                opacity={0.8}
                color="#a855f7"
            />

            <ambientLight intensity={0.5} color="#001133" />
            <pointLight position={[0, 0, 5]} intensity={5.0} color="#a855f7" distance={20} />

            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={0.5}
                    luminanceSmoothing={0.5}
                    height={300}
                    intensity={2.5}
                />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
            </EffectComposer>
        </>
    );
}

export default function Experience() {
    return (
        <Canvas
            gl={{ antialias: false, pixelRatio: 1, alpha: false, preserveDrawingBuffer: true }}
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 18], fov: 50 }}
        >
            <Suspense fallback={null}>
                <ExperienceContent />
            </Suspense>
        </Canvas>
    );
}
