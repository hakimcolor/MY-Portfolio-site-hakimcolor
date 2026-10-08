'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ── Tech definitions — SVG path or unicode symbol + color ────────
const TECHS = [
  // Orbit 1
  { label: 'HTML5', color: '#e34c26', orbit: 1, symbol: '⬡', bg: '#e34c26' },
  { label: 'CSS3', color: '#1572b6', orbit: 1, symbol: '◈', bg: '#1572b6' },
  {
    label: 'JavaScript',
    color: '#f7df1e',
    orbit: 1,
    symbol: 'JS',
    bg: '#f7df1e',
  },
  {
    label: 'TypeScript',
    color: '#3178c6',
    orbit: 1,
    symbol: 'TS',
    bg: '#3178c6',
  },
  // Orbit 2
  { label: 'React', color: '#61dafb', orbit: 2, symbol: '⚛', bg: '#61dafb' },
  { label: 'Next.js', color: '#ffffff', orbit: 2, symbol: 'N›', bg: '#111111' },
  { label: 'Tailwind', color: '#38bdf8', orbit: 2, symbol: '~', bg: '#0f172a' },
  { label: 'Node.js', color: '#339933', orbit: 2, symbol: '⬡', bg: '#1a2e1a' },
  { label: 'Express', color: '#cccccc', orbit: 2, symbol: 'Ex', bg: '#1c1c1c' },
  // Orbit 3
  { label: 'MongoDB', color: '#47a248', orbit: 3, symbol: '🍃', bg: '#1a2e1a' },
  {
    label: 'PostgreSQL',
    color: '#4169e1',
    orbit: 3,
    symbol: '🐘',
    bg: '#0d1433',
  },
  { label: 'Prisma', color: '#5a67d8', orbit: 3, symbol: '◆', bg: '#1a1a2e' },
  { label: 'MySQL', color: '#00758f', orbit: 3, symbol: 'My', bg: '#001a20' },
  // Orbit 4
  { label: 'Git', color: '#f05032', orbit: 4, symbol: '⑂', bg: '#2e0d08' },
  { label: 'GitHub', color: '#ffffff', orbit: 4, symbol: '🐙', bg: '#161b22' },
  { label: 'Docker', color: '#2496ed', orbit: 4, symbol: '🐳', bg: '#051929' },
  { label: 'VS Code', color: '#007acc', orbit: 4, symbol: '⌨', bg: '#001a2e' },
  { label: 'Postman', color: '#ff6c37', orbit: 4, symbol: '📬', bg: '#2e1208' },
  // Orbit 5
  {
    label: 'WordPress',
    color: '#21759b',
    orbit: 5,
    symbol: 'W',
    bg: '#071520',
  },
  {
    label: 'Elementor',
    color: '#e2155a',
    orbit: 5,
    symbol: '⬛',
    bg: '#2e0315',
  },
  {
    label: 'WooCommerce',
    color: '#96588a',
    orbit: 5,
    symbol: '🛒',
    bg: '#1e0d20',
  },
  { label: 'Stripe', color: '#635bff', orbit: 5, symbol: '💳', bg: '#0d0b2e' },
  { label: 'CI/CD', color: '#22c55e', orbit: 5, symbol: '⟳', bg: '#071a0e' },
  {
    label: 'Docker Hub',
    color: '#2496ed',
    orbit: 5,
    symbol: '⊞',
    bg: '#051929',
  },
  { label: 'ERD', color: '#f59e0b', orbit: 5, symbol: '🗄', bg: '#1e1200' },
];

// Draw a clean circle icon — symbol inside, colored ring
function makeIconTexture(tech) {
  const S = 96;
  const cv = document.createElement('canvas');
  cv.width = S;
  cv.height = S;
  const ctx = cv.getContext('2d');

  const cx = S / 2,
    cy = S / 2,
    R = S / 2 - 4;

  // Outer glow
  const glow = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R + 4);
  glow.addColorStop(0, tech.color + '44');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, R + 4, 0, Math.PI * 2);
  ctx.fill();

  // Circle bg
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = tech.bg;
  ctx.fill();

  // Colored ring
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.strokeStyle = tech.color;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Symbol / emoji
  const sym = tech.symbol;
  const isEmoji = /\p{Emoji}/u.test(sym) && sym.length <= 2;
  ctx.font = isEmoji
    ? `${S * 0.38}px serif`
    : `bold ${sym.length > 2 ? S * 0.28 : S * 0.36}px monospace`;
  ctx.fillStyle = isEmoji ? '#ffffff' : tech.color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(sym, cx, cy + 1);

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

// CPU chip texture
function makeCpuTexture() {
  const S = 256;
  const cv = document.createElement('canvas');
  cv.width = S;
  cv.height = S;
  const ctx = cv.getContext('2d');

  ctx.fillStyle = '#060d1a';
  ctx.fillRect(0, 0, S, S);

  // Outer glow ring
  const grd = ctx.createRadialGradient(S / 2, S / 2, 40, S / 2, S / 2, S / 2);
  grd.addColorStop(0, 'rgba(34,197,94,0.5)');
  grd.addColorStop(0.5, 'rgba(6,182,212,0.2)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, S, S);

  // Chip body
  ctx.fillStyle = '#0f1e38';
  ctx.fillRect(28, 28, S - 56, S - 56);
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, S - 56, S - 56);

  // Grid
  ctx.strokeStyle = 'rgba(6,182,212,0.12)';
  ctx.lineWidth = 1;
  for (let i = 1; i < 7; i++) {
    const v = 28 + i * ((S - 56) / 7);
    ctx.beginPath();
    ctx.moveTo(v, 28);
    ctx.lineTo(v, S - 28);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(28, v);
    ctx.lineTo(S - 28, v);
    ctx.stroke();
  }

  // Core
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, 38, 0, Math.PI * 2);
  const core = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, 38);
  core.addColorStop(0, 'rgba(34,197,94,1)');
  core.addColorStop(0.6, 'rgba(6,182,212,0.7)');
  core.addColorStop(1, 'transparent');
  ctx.fillStyle = core;
  ctx.fill();

  // Text
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CPU', S / 2, S / 2 - 8);
  ctx.fillStyle = '#06b6d4';
  ctx.font = '9px monospace';
  ctx.fillText('FULL-STACK', S / 2, S / 2 + 10);

  // Pins
  ctx.fillStyle = '#22c55e';
  for (let i = 0; i < 7; i++) {
    const p = 40 + i * 27;
    ctx.fillRect(6, p, 16, 5);
    ctx.fillRect(S - 22, p, 16, 5);
    ctx.fillRect(p, 6, 5, 16);
    ctx.fillRect(p, S - 22, 5, 16);
  }

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

export default function ThreeBackground() {
  const mountRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;
    const W = window.innerWidth,
      H = window.innerHeight;

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
    scene.fog = new THREE.FogExp2('#05080f', isMobile ? 0.016 : 0.008);

    const camera = new THREE.PerspectiveCamera(58, W / H, 0.1, 300);
    camera.position.set(0, isMobile ? 24 : 20, isMobile ? 26 : 36);
    camera.lookAt(0, 0, 0);

    // ── Lights ───────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight('#1a1a2e', 2.5));
    const pGreen = new THREE.PointLight('#22c55e', 4, 70);
    pGreen.position.set(0, 2, 0);
    scene.add(pGreen);
    const pCyan = new THREE.PointLight('#06b6d4', 2.5, 90);
    pCyan.position.set(12, 6, -12);
    scene.add(pCyan);
    const pPurple = new THREE.PointLight('#7c3aed', 2, 70);
    pPurple.position.set(-12, -4, 12);
    scene.add(pPurple);

    // ── Stars ────────────────────────────────────────────────────
    const starCount = isMobile ? 700 : 1600;
    const sPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 280;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 280;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 280;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    scene.add(
      new THREE.Points(
        sGeo,
        new THREE.PointsMaterial({
          color: '#ffffff',
          size: 0.2,
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
        })
      )
    );

    // ── CPU center ───────────────────────────────────────────────
    const cpuSize = isMobile ? 2.4 : 3.2;
    const cpuGeo = new THREE.BoxGeometry(cpuSize, cpuSize * 0.15, cpuSize);
    const cpuTex = makeCpuTexture();
    const cpuMat = new THREE.MeshStandardMaterial({
      map: cpuTex,
      emissiveMap: cpuTex,
      emissive: new THREE.Color('#22c55e'),
      emissiveIntensity: 0.5,
      metalness: 0.85,
      roughness: 0.15,
    });
    const cpu = new THREE.Mesh(cpuGeo, cpuMat);
    scene.add(cpu);

    // Halo ring
    const haloGeo = new THREE.RingGeometry(cpuSize * 0.55, cpuSize * 0.8, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: '#22c55e',
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = -Math.PI / 2;
    scene.add(halo);

    // ── Orbit rings ──────────────────────────────────────────────
    const RADII = isMobile ? [5.5, 9, 13, 17, 21] : [7, 12, 17, 22, 27];
    const OCOLOR = ['#22c55e', '#06b6d4', '#7c3aed', '#f43f5e', '#f59e0b'];
    const OTILTS = [0, 0.1, -0.07, 0.13, -0.05];
    const OSPEED = isMobile
      ? [0.42, 0.28, 0.19, 0.13, 0.085]
      : [0.38, 0.25, 0.17, 0.11, 0.075];

    RADII.forEach((rad, idx) => {
      const pts = [];
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * rad, 0, Math.sin(a) * rad));
      }
      const rGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const rMat = new THREE.LineBasicMaterial({
        color: OCOLOR[idx],
        transparent: true,
        opacity: isMobile ? 0.2 : 0.25,
      });
      const rLine = new THREE.LineLoop(rGeo, rMat);
      rLine.rotation.x = OTILTS[idx];
      scene.add(rLine);
    });

    // ── Tech icons ───────────────────────────────────────────────
    const orbitGroups = RADII.map(() => {
      const g = new THREE.Group();
      scene.add(g);
      return g;
    });
    const byOrbit = [[], [], [], [], []];
    TECHS.forEach((t) => byOrbit[t.orbit - 1].push(t));

    const spriteMap = new Map(); // sprite → tech label (for click)
    const allSprites = [];

    byOrbit.forEach((group, oi) => {
      const rad = RADII[oi];
      group.forEach((tech, ti) => {
        const angle = (ti / group.length) * Math.PI * 2;
        const tex = makeIconTexture(tech);
        const mat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0.92,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(mat);
        const sc = isMobile ? 1.5 : 1.9;
        sprite.scale.set(sc, sc, 1);
        sprite.position.set(Math.cos(angle) * rad, 0, Math.sin(angle) * rad);
        orbitGroups[oi].add(sprite);
        spriteMap.set(sprite, tech.label);
        allSprites.push({ sprite, bobOffset: Math.random() * Math.PI * 2 });
      });
    });

    // ── Tooltip DOM element ───────────────────────────────────────
    const tooltip = document.createElement('div');
    tooltip.style.cssText = `
      position:fixed; padding:6px 14px; background:rgba(8,14,30,0.95);
      border:1px solid #22c55e; border-radius:8px; color:#fff;
      font:bold 13px monospace; pointer-events:none; opacity:0;
      transition:opacity 0.2s; z-index:9999; white-space:nowrap;
      box-shadow:0 0 14px rgba(34,197,94,0.4);
    `;
    document.body.appendChild(tooltip);
    tooltipRef.current = tooltip;

    // ── Raycaster for click/hover ─────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const getSprites = () => [...spriteMap.keys()];

    const onPointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      pointer.x = (clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(getSprites());
      if (hits.length > 0) {
        const label = spriteMap.get(hits[0].object);
        tooltip.textContent = label;
        tooltip.style.left = clientX + 14 + 'px';
        tooltip.style.top = clientY - 10 + 'px';
        tooltip.style.opacity = '1';
        renderer.domElement.style.cursor = 'pointer';
      } else {
        tooltip.style.opacity = '0';
        renderer.domElement.style.cursor = 'default';
      }
      // mouse parallax
      if (!isMobile) {
        mouseX = (clientX / window.innerWidth - 0.5) * 2;
        mouseY = (clientY / window.innerHeight - 0.5) * 2;
      }
    };

    const onPointerDown = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      pointer.x = (clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(getSprites());
      if (hits.length > 0) {
        const label = spriteMap.get(hits[0].object);
        // Pulse clicked sprite
        const sp = hits[0].object;
        const origScale = sp.scale.x;
        sp.scale.set(origScale * 1.5, origScale * 1.5, 1);
        setTimeout(() => sp.scale.set(origScale, origScale, 1), 300);
      }
    };

    // pointerEvents must be active for click
    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.addEventListener('mousemove', onPointerMove);
    renderer.domElement.addEventListener('click', onPointerDown);
    renderer.domElement.addEventListener('touchstart', onPointerDown, {
      passive: true,
    });

    // ── Scroll ───────────────────────────────────────────────────
    let scrollY = 0,
      targetScrollY = 0,
      mouseX = 0,
      mouseY = 0;
    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ──────────────────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      const t = clock.getElapsedTime();

      scrollY += (targetScrollY - scrollY) * 0.05;
      camera.position.y = (isMobile ? 24 : 20) + scrollY * 0.003;
      if (!isMobile) {
        camera.position.x += (mouseX * 4 - camera.position.x) * 0.022;
        camera.position.y += (-mouseY * 2 - (camera.position.y - 20)) * 0.022;
      }
      camera.lookAt(0, 0, 0);

      orbitGroups.forEach((g, i) => {
        g.rotation.y = t * OSPEED[i];
      });

      cpu.rotation.y = t * 0.18;
      cpuMat.emissiveIntensity = 0.35 + Math.sin(t * 2) * 0.18;
      halo.material.opacity = 0.12 + Math.sin(t * 2) * 0.08;
      pGreen.intensity = 3.5 + Math.sin(t * 2.5) * 1.0;
      pCyan.intensity = 2.0 + Math.sin(t * 1.6 + 1) * 0.6;

      if (!isMobile || frame % 2 === 0) {
        allSprites.forEach(({ sprite, bobOffset }) => {
          sprite.position.y = Math.sin(t * 0.75 + bobOffset) * 0.4;
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('mousemove', onPointerMove);
      renderer.domElement.removeEventListener('click', onPointerDown);
      renderer.domElement.removeEventListener('touchstart', onPointerDown);
      renderer.dispose();
      if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
  );
}
