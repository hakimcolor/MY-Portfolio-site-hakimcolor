'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ── Tech icon definitions (colour + label) ──────────────────────
const TECHS = [
  // Orbit 1 — closest
  { label: 'HTML', color: '#e34c26', orbit: 1 },
  { label: 'CSS', color: '#1572b6', orbit: 1 },
  { label: 'JS', color: '#f7df1e', orbit: 1 },
  { label: 'TS', color: '#3178c6', orbit: 1 },
  // Orbit 2
  { label: 'React', color: '#61dafb', orbit: 2 },
  { label: 'Next.js', color: '#ffffff', orbit: 2 },
  { label: 'Tailwind', color: '#38bdf8', orbit: 2 },
  { label: 'Node.js', color: '#339933', orbit: 2 },
  { label: 'Express', color: '#aaaaaa', orbit: 2 },
  // Orbit 3
  { label: 'MongoDB', color: '#47a248', orbit: 3 },
  { label: 'PostgreSQL', color: '#4169e1', orbit: 3 },
  { label: 'ORM', color: '#5a67d8', orbit: 3 },
  { label: 'Redis', color: '#dc382d', orbit: 3 },
  // Orbit 4
  { label: 'Git', color: '#f05032', orbit: 4 },
  { label: 'GitHub', color: '#ffffff', orbit: 4 },
  { label: 'Docker', color: '#2496ed', orbit: 4 },
  { label: 'CI/CD', color: '#22c55e', orbit: 4 },
  { label: 'VS Code', color: '#007acc', orbit: 4 },
  // Orbit 5 — outermost
  { label: 'WordPress', color: '#21759b', orbit: 5 },
  { label: 'Elementor', color: '#e2155a', orbit: 5 },
  { label: 'WooCommerce', color: '#96588a', orbit: 5 },
  { label: 'Postman', color: '#ff6c37', orbit: 5 },
  { label: 'Beekeeper', color: '#22c55e', orbit: 5 },
  { label: 'Payment GW', color: '#635bff', orbit: 5 },
  { label: 'ERD', color: '#f59e0b', orbit: 5 },
];

// Draw a rounded-rect label onto a canvas, return as texture
function makeLabelTexture(label, color) {
  const W = 128,
    H = 64;
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext('2d');

  // Background pill
  const r = 14;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(W - r, 0);
  ctx.quadraticCurveTo(W, 0, W, r);
  ctx.lineTo(W, H - r);
  ctx.quadraticCurveTo(W, H, W - r, H);
  ctx.lineTo(r, H);
  ctx.quadraticCurveTo(0, H, 0, H - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fillStyle = 'rgba(8,14,30,0.88)';
  ctx.fill();

  // Coloured border
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Glow dot
  const dotR = 7;
  ctx.beginPath();
  ctx.arc(dotR + 6, H / 2, dotR, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  // dot glow
  const grd = ctx.createRadialGradient(
    dotR + 6,
    H / 2,
    0,
    dotR + 6,
    H / 2,
    dotR * 2.5
  );
  grd.addColorStop(0, color + 'aa');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(dotR + 6, H / 2, dotR * 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Label text
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${label.length > 8 ? 13 : 15}px monospace`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, dotR * 2 + 14, H / 2);

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

// Draw CPU chip texture
function makeCpuTexture() {
  const S = 256;
  const cv = document.createElement('canvas');
  cv.width = S;
  cv.height = S;
  const ctx = cv.getContext('2d');

  // Background
  ctx.fillStyle = '#080e1e';
  ctx.fillRect(0, 0, S, S);

  // Outer border
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 4;
  ctx.strokeRect(6, 6, S - 12, S - 12);

  // Inner chip body
  ctx.fillStyle = '#0f1e38';
  ctx.fillRect(30, 30, S - 60, S - 60);
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, S - 60, S - 60);

  // Grid lines on chip
  ctx.strokeStyle = 'rgba(6,182,212,0.15)';
  ctx.lineWidth = 1;
  for (let i = 1; i < 6; i++) {
    const x = 30 + i * ((S - 60) / 6);
    ctx.beginPath();
    ctx.moveTo(x, 30);
    ctx.lineTo(x, S - 30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(30, x);
    ctx.lineTo(S - 30, x);
    ctx.stroke();
  }

  // Center core glow
  const grd = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, 55);
  grd.addColorStop(0, 'rgba(34,197,94,0.9)');
  grd.addColorStop(0.4, 'rgba(6,182,212,0.5)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, 55, 0, Math.PI * 2);
  ctx.fill();

  // CPU text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CPU', S / 2, S / 2 - 10);
  ctx.font = '11px monospace';
  ctx.fillStyle = '#06b6d4';
  ctx.fillText('FULL-STACK', S / 2, S / 2 + 12);

  // Pins (left & right)
  ctx.fillStyle = '#22c55e';
  for (let i = 0; i < 6; i++) {
    const y = 50 + i * 28;
    ctx.fillRect(8, y, 18, 6); // left
    ctx.fillRect(S - 26, y, 18, 6); // right
    ctx.fillRect(y, 8, 6, 18); // top
    ctx.fillRect(y, S - 26, 6, 18); // bottom
  }

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

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
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ───────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#05080f');
    scene.fog = new THREE.FogExp2('#05080f', isMobile ? 0.018 : 0.009);

    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 300);
    // Tilt camera for a cinematic top-down-ish angle
    camera.position.set(0, isMobile ? 22 : 18, isMobile ? 28 : 38);
    camera.lookAt(0, 0, 0);

    // ── Lighting ─────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight('#1a1a2e', 2));

    const pointGreen = new THREE.PointLight('#22c55e', 3, 60);
    pointGreen.position.set(0, 0, 0);
    scene.add(pointGreen);

    const pointCyan = new THREE.PointLight('#06b6d4', 2, 80);
    pointCyan.position.set(10, 5, -10);
    scene.add(pointCyan);

    const pointPurple = new THREE.PointLight('#7c3aed', 1.5, 60);
    pointPurple.position.set(-10, -5, 10);
    scene.add(pointPurple);

    // ── Starfield ────────────────────────────────────────────────
    const starCount = isMobile ? 600 : 1400;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 250;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 250;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 250;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: '#ffffff',
      size: 0.18,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── CPU at center ────────────────────────────────────────────
    const cpuSize = isMobile ? 2.2 : 3.0;
    const cpuGeo = new THREE.BoxGeometry(cpuSize, cpuSize * 0.18, cpuSize);
    const cpuTex = makeCpuTexture();
    const cpuMat = new THREE.MeshStandardMaterial({
      map: cpuTex,
      emissiveMap: cpuTex,
      emissive: new THREE.Color('#22c55e'),
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2,
    });
    const cpu = new THREE.Mesh(cpuGeo, cpuMat);
    scene.add(cpu);

    // CPU glow halo
    const haloGeo = new THREE.RingGeometry(cpuSize * 0.6, cpuSize * 0.85, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: '#22c55e',
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = -Math.PI / 2;
    scene.add(halo);

    // ── Orbit rings ──────────────────────────────────────────────
    const ORBIT_RADII = isMobile
      ? [5, 8.5, 12, 15.5, 19]
      : [6.5, 11, 15.5, 20, 25];
    const ORBIT_COLORS = [
      '#22c55e',
      '#06b6d4',
      '#7c3aed',
      '#f43f5e',
      '#f59e0b',
    ];
    const ORBIT_TILTS = [0, 0.12, -0.08, 0.15, -0.06]; // slight tilt for depth
    const ORBIT_SPEEDS = isMobile
      ? [0.45, 0.3, 0.2, 0.14, 0.09]
      : [0.4, 0.27, 0.18, 0.12, 0.08];

    ORBIT_RADII.forEach((rad, idx) => {
      const pts = [];
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * rad, 0, Math.sin(a) * rad));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const ringMat = new THREE.LineBasicMaterial({
        color: ORBIT_COLORS[idx],
        transparent: true,
        opacity: isMobile ? 0.18 : 0.22,
      });
      const ring = new THREE.LineLoop(ringGeo, ringMat);
      ring.rotation.x = ORBIT_TILTS[idx];
      scene.add(ring);
    });

    // ── Tech icon sprites ─────────────────────────────────────────
    // Group per orbit so we can rotate whole group
    const orbitGroups = ORBIT_RADII.map(() => {
      const g = new THREE.Group();
      scene.add(g);
      return g;
    });

    // Distribute techs evenly within each orbit
    const byOrbit = [[], [], [], [], []];
    TECHS.forEach((t) => byOrbit[t.orbit - 1].push(t));

    const allNodes = []; // { sprite, orbitIdx, angleOffset, bobOffset }

    byOrbit.forEach((group, oi) => {
      const rad = ORBIT_RADII[oi];
      group.forEach((tech, ti) => {
        const angleOffset = (ti / group.length) * Math.PI * 2;
        const tex = makeLabelTexture(tech.label, tech.color);
        const mat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0.95,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(mat);
        const spriteScale = isMobile ? 1.6 : 2.0;
        sprite.scale.set(spriteScale, spriteScale * 0.5, 1);
        // Initial position
        sprite.position.set(
          Math.cos(angleOffset) * rad,
          0,
          Math.sin(angleOffset) * rad
        );
        orbitGroups[oi].add(sprite);
        allNodes.push({
          sprite,
          orbitIdx: oi,
          angleOffset,
          bobOffset: Math.random() * Math.PI * 2,
          rad,
        });
      });
    });

    // ── Scroll / mouse ───────────────────────────────────────────
    let scrollY = 0,
      targetScrollY = 0,
      mouseX = 0,
      mouseY = 0;
    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
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
    let frame = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      const t = clock.getElapsedTime();

      scrollY += (targetScrollY - scrollY) * 0.05;

      // Camera position — scroll pulls back, mouse tilts
      camera.position.y = (isMobile ? 22 : 18) + scrollY * 0.003;
      if (!isMobile) {
        camera.position.x += (mouseX * 4 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 2 - (camera.position.y - 18)) * 0.02;
      }
      camera.lookAt(0, 0, 0);

      // Rotate each orbit group at its own speed
      orbitGroups.forEach((g, i) => {
        g.rotation.y = t * ORBIT_SPEEDS[i];
      });

      // CPU slow spin + pulse
      cpu.rotation.y = t * 0.2;
      const pulse = 0.35 + Math.sin(t * 1.8) * 0.15;
      cpuMat.emissiveIntensity = pulse;
      halo.material.opacity = 0.1 + Math.sin(t * 1.8) * 0.08;

      // Point light pulse
      pointGreen.intensity = 2.5 + Math.sin(t * 2.2) * 0.8;
      pointCyan.intensity = 1.5 + Math.sin(t * 1.4 + 1) * 0.5;

      // Sprites — keep upright & add gentle bob
      if (!isMobile || frame % 2 === 0) {
        allNodes.forEach(({ sprite, bobOffset }) => {
          sprite.position.y = Math.sin(t * 0.8 + bobOffset) * 0.35;
        });
      }

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
