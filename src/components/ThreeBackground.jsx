'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;

    const W = window.innerWidth;
    const H = window.innerHeight;

    // ── Renderer ─────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(W, H);
    // Cap pixel ratio: 1 on mobile, 1.5 on desktop
    renderer.setPixelRatio(
      isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)
    );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ───────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0b1120');
    scene.fog = new THREE.FogExp2('#0b1120', isMobile ? 0.025 : 0.016);

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 8, 30);
    camera.lookAt(0, 0, 0);

    // ── Wave grid — adaptive density ─────────────────────────────
    // Mobile: 40×40 = 1600pts | Desktop: 70×70 = 4900pts
    const COLS = isMobile ? 40 : 70;
    const ROWS = isMobile ? 40 : 70;
    const SPACING = isMobile ? 0.65 : 0.58;

    const count = COLS * ROWS;
    const posArr = new Float32Array(count * 3);
    const colorArr = new Float32Array(count * 3);

    // Store base XZ for wave calc (no need to recompute)
    const baseX = new Float32Array(count);
    const baseZ = new Float32Array(count);

    const c1 = new THREE.Color('#22c55e'); // green
    const c2 = new THREE.Color('#0ea5e9'); // cyan accent
    const c3 = new THREE.Color('#8b5cf6'); // purple accent

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        const x = (c - COLS / 2) * SPACING;
        const z = (r - ROWS / 2) * SPACING;
        baseX[i] = x;
        baseZ[i] = z;
        posArr[i * 3] = x;
        posArr[i * 3 + 1] = 0;
        posArr[i * 3 + 2] = z;

        // Radial colour blend
        const dist = Math.sqrt(x * x + z * z) / 20;
        const col =
          dist < 0.5
            ? c1.clone().lerp(c2, dist * 2)
            : c2.clone().lerp(c3, (dist - 0.5) * 2);
        colorArr[i * 3] = col.r;
        colorArr[i * 3 + 1] = col.g;
        colorArr[i * 3 + 2] = col.b;
      }
    }

    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    gridGeo.setAttribute('color', new THREE.BufferAttribute(colorArr, 3));

    const gridMat = new THREE.PointsMaterial({
      vertexColors: true,
      size: isMobile ? 0.07 : 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: isMobile ? 0.65 : 0.8,
      depthWrite: false,
    });

    const grid = new THREE.Points(gridGeo, gridMat);
    scene.add(grid);

    // ── Horizontal scan lines (desktop only) ─────────────────────
    if (!isMobile) {
      const scanMat = new THREE.LineBasicMaterial({
        color: '#22c55e',
        transparent: true,
        opacity: 0.06,
      });
      const stride = 4; // every 4th row
      for (let r = 0; r < ROWS; r += stride) {
        const pts = [];
        for (let c = 0; c < COLS; c++) {
          pts.push(
            new THREE.Vector3(baseX[r * COLS + c], 0, baseZ[r * COLS + c])
          );
        }
        scene.add(
          new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), scanMat)
        );
      }
    }

    // ── Floating wireframe icosahedra ─────────────────────────────
    const orbCount = isMobile ? 3 : 6;
    const orbData = [];
    const orbColors = [
      '#22c55e',
      '#0ea5e9',
      '#8b5cf6',
      '#f43f5e',
      '#22c55e',
      '#0ea5e9',
    ];

    for (let i = 0; i < orbCount; i++) {
      const radius = 0.3 + Math.random() * (isMobile ? 0.25 : 0.4);
      const geo = new THREE.IcosahedronGeometry(radius, 1);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(orbColors[i % orbColors.length]),
        transparent: true,
        opacity: 0.22,
        wireframe: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * (isMobile ? 20 : 32),
        3 + Math.random() * 5,
        (Math.random() - 0.5) * (isMobile ? 14 : 22)
      );
      scene.add(mesh);
      orbData.push({
        mesh,
        speed: 0.25 + Math.random() * 0.4,
        offset: (i / orbCount) * Math.PI * 2,
        rotX: 0.003 + Math.random() * 0.003,
        rotZ: 0.002 + Math.random() * 0.003,
      });
    }

    // ── Central glowing ring (desktop only) ──────────────────────
    if (!isMobile) {
      const ringGeo = new THREE.TorusGeometry(5, 0.04, 8, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: '#22c55e',
        transparent: true,
        opacity: 0.18,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -1;
      scene.add(ring);
      orbData.push({ mesh: ring, isRing: true });

      const ring2Geo = new THREE.TorusGeometry(8, 0.03, 8, 100);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: '#0ea5e9',
        transparent: true,
        opacity: 0.1,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.x = Math.PI / 2.5;
      ring2.position.y = -2;
      scene.add(ring2);
      orbData.push({ mesh: ring2, isRing2: true });
    }

    // ── Scroll / mouse ───────────────────────────────────────────
    let scrollY = 0,
      targetScrollY = 0;
    let mouseX = 0;
    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!isMobile) window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animation ────────────────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();

    // Mobile: only update wave every 2nd frame to halve CPU cost
    let frameCount = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frameCount++;
      const t = clock.getElapsedTime();

      scrollY += (targetScrollY - scrollY) * 0.05;

      // Wave — skip on odd frames for mobile
      if (!isMobile || frameCount % 2 === 0) {
        for (let i = 0; i < count; i++) {
          const x = baseX[i];
          const z = baseZ[i];
          posArr[i * 3 + 1] =
            Math.sin(x * 0.45 + t * 0.9) * 0.65 +
            Math.sin(z * 0.35 + t * 0.7) * 0.55 +
            Math.sin((x + z) * 0.22 + t * 1.1) * 0.35;
        }
        gridGeo.attributes.position.needsUpdate = true;
      }

      // Camera
      camera.position.y = 8 - scrollY * 0.004;
      if (!isMobile) {
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.025;
      }
      camera.lookAt(0, 0, 0);

      // Slow grid rotation
      grid.rotation.y = t * 0.012;

      // Orbs / rings
      orbData.forEach(
        ({ mesh, speed, offset, rotX, rotZ, isRing, isRing2 }) => {
          if (isRing) {
            mesh.rotation.z = t * 0.08;
            return;
          }
          if (isRing2) {
            mesh.rotation.z = -t * 0.05;
            mesh.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.2) * 0.05;
            return;
          }
          mesh.position.y = 3 + Math.sin(t * speed + offset) * 1.8;
          mesh.rotation.x += rotX;
          mesh.rotation.z += rotZ;
        }
      );

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
