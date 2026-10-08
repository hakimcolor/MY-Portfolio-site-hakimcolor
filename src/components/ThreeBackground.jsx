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
    renderer.setPixelRatio(
      isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)
    );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ───────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#060d1a');
    scene.fog = new THREE.FogExp2('#060d1a', isMobile ? 0.018 : 0.01);

    const camera = new THREE.PerspectiveCamera(72, W / H, 0.1, 200);
    camera.position.set(0, 10, 32);
    camera.lookAt(0, 0, 0);

    // ── Wave grid ────────────────────────────────────────────────
    const COLS = isMobile ? 45 : 75;
    const ROWS = isMobile ? 45 : 75;
    const SPACING = isMobile ? 0.62 : 0.55;
    const count = COLS * ROWS;

    const posArr = new Float32Array(count * 3);
    const colorArr = new Float32Array(count * 3);
    const baseX = new Float32Array(count);
    const baseZ = new Float32Array(count);

    const cGreen = new THREE.Color('#22c55e');
    const cCyan = new THREE.Color('#06b6d4');
    const cPurple = new THREE.Color('#7c3aed');

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

        const dist = Math.sqrt(x * x + z * z) / 18;
        const col =
          dist < 0.5
            ? cGreen.clone().lerp(cCyan, dist * 2)
            : cCyan.clone().lerp(cPurple, Math.min((dist - 0.5) * 2, 1));
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
      size: isMobile ? 0.13 : 0.11,
      sizeAttenuation: true,
      transparent: true,
      opacity: isMobile ? 0.8 : 0.92,
      depthWrite: false,
    });

    const grid = new THREE.Points(gridGeo, gridMat);
    scene.add(grid);

    // ── Scan lines (desktop) ──────────────────────────────────────
    if (!isMobile) {
      const scanMat = new THREE.LineBasicMaterial({
        color: '#22c55e',
        transparent: true,
        opacity: 0.07,
      });
      for (let r = 0; r < ROWS; r += 5) {
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

    // ── Floating icosahedra ───────────────────────────────────────
    const orbCount = isMobile ? 3 : 7;
    const orbColors = [
      '#22c55e',
      '#06b6d4',
      '#7c3aed',
      '#f43f5e',
      '#22c55e',
      '#06b6d4',
      '#7c3aed',
    ];
    const orbData = [];

    for (let i = 0; i < orbCount; i++) {
      const radius = 0.35 + Math.random() * (isMobile ? 0.3 : 0.55);
      const geo = new THREE.IcosahedronGeometry(radius, 1);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(orbColors[i % orbColors.length]),
        transparent: true,
        opacity: 0.35,
        wireframe: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * (isMobile ? 22 : 36),
        2 + Math.random() * 6,
        (Math.random() - 0.5) * (isMobile ? 16 : 26)
      );
      scene.add(mesh);
      orbData.push({
        mesh,
        speed: 0.28 + Math.random() * 0.45,
        offset: (i / orbCount) * Math.PI * 2,
        rotX: 0.004 + Math.random() * 0.004,
        rotZ: 0.003 + Math.random() * 0.003,
      });
    }

    // ── Torus rings (desktop) ─────────────────────────────────────
    if (!isMobile) {
      [
        {
          r: 5.5,
          tube: 0.045,
          col: '#22c55e',
          op: 0.3,
          rx: Math.PI / 2,
          ry: 0,
          py: -1,
        },
        {
          r: 9,
          tube: 0.03,
          col: '#06b6d4',
          op: 0.18,
          rx: Math.PI / 2.3,
          ry: 0.4,
          py: -2,
        },
        {
          r: 13,
          tube: 0.02,
          col: '#7c3aed',
          op: 0.12,
          rx: Math.PI / 3,
          ry: -0.3,
          py: -3,
        },
      ].forEach(({ r, tube, col, op, rx, ry, py }, idx) => {
        const geo = new THREE.TorusGeometry(r, tube, 8, 100);
        const mat = new THREE.MeshBasicMaterial({
          color: col,
          transparent: true,
          opacity: op,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = rx;
        mesh.rotation.y = ry;
        mesh.position.y = py;
        scene.add(mesh);
        orbData.push({ mesh, isRing: true, ringIdx: idx });
      });
    }

    // ── Scroll / mouse ───────────────────────────────────────────
    let scrollY = 0,
      targetScrollY = 0,
      mouseX = 0;
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

    // ── Animation loop ────────────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      const t = clock.getElapsedTime();

      scrollY += (targetScrollY - scrollY) * 0.05;

      // Wave — every frame desktop, every 2nd frame mobile
      if (!isMobile || frame % 2 === 0) {
        for (let i = 0; i < count; i++) {
          const x = baseX[i],
            z = baseZ[i];
          posArr[i * 3 + 1] =
            Math.sin(x * 0.42 + t * 0.85) * 1.2 +
            Math.sin(z * 0.38 + t * 0.65) * 1.0 +
            Math.sin((x + z) * 0.2 + t * 1.1) * 0.6;
        }
        gridGeo.attributes.position.needsUpdate = true;
      }

      // Camera
      camera.position.y = 10 - scrollY * 0.004;
      if (!isMobile)
        camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.025;
      camera.lookAt(0, 0, 0);

      grid.rotation.y = t * 0.007;

      orbData.forEach(
        ({ mesh, speed, offset, rotX, rotZ, isRing, ringIdx }) => {
          if (isRing) {
            const speeds = [0.14, 0.09, 0.06];
            mesh.rotation.z +=
              speeds[ringIdx] * (ringIdx % 2 === 0 ? 1 : -1) * 0.016;
            return;
          }
          mesh.position.y = 3.5 + Math.sin(t * speed + offset) * 2;
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
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
