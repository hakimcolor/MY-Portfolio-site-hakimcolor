'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';

// ── Real react-icon imports ───────────────────────────────────────
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaWordpress,
  FaGitAlt,
  FaGithub,
  FaNpm,
  FaElementor,
  FaDocker,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiDaisyui,
  SiNetlify,
  SiVercel,
  SiPostman,
  SiWoocommerce,
  SiTypescript,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiStripe,
} from 'react-icons/si';
import { TbBrandNextjs, TbBrandVscode } from 'react-icons/tb';
import { VscDatabase } from 'react-icons/vsc';
import { MdPayment } from 'react-icons/md';

// ── Tech list — matches Skills section exactly ────────────────────
const TECHS = [
  // Orbit 1 — Frontend core
  { label: 'HTML5', color: '#E34F26', icon: FaHtml5, orbit: 1 },
  { label: 'CSS3', color: '#1572B6', icon: FaCss3Alt, orbit: 1 },
  { label: 'JavaScript', color: '#F7DF1E', icon: FaJs, orbit: 1 },
  { label: 'TypeScript', color: '#3178C6', icon: SiTypescript, orbit: 1 },
  // Orbit 2 — Frameworks
  { label: 'React', color: '#61DAFB', icon: FaReact, orbit: 2 },
  { label: 'Next.js', color: '#ffffff', icon: TbBrandNextjs, orbit: 2 },
  { label: 'Tailwind CSS', color: '#38BDF8', icon: SiTailwindcss, orbit: 2 },
  { label: 'Bootstrap', color: '#7952B3', icon: FaBootstrap, orbit: 2 },
  { label: 'DaisyUI', color: '#F472B6', icon: SiDaisyui, orbit: 2 },
  // Orbit 3 — Backend & DB
  { label: 'Node.js', color: '#339933', icon: FaNodeJs, orbit: 3 },
  { label: 'Express.js', color: '#cccccc', icon: SiExpress, orbit: 3 },
  { label: 'MongoDB', color: '#47A248', icon: SiMongodb, orbit: 3 },
  { label: 'PostgreSQL', color: '#4169E1', icon: SiPostgresql, orbit: 3 },
  { label: 'MySQL', color: '#00758F', icon: SiMysql, orbit: 3 },
  { label: 'Prisma', color: '#5a67d8', icon: SiPrisma, orbit: 3 },
  { label: 'Firebase', color: '#FFCA28', icon: SiFirebase, orbit: 3 },
  // Orbit 4 — Tools
  { label: 'Git', color: '#F05032', icon: FaGitAlt, orbit: 4 },
  { label: 'GitHub', color: '#ffffff', icon: FaGithub, orbit: 4 },
  { label: 'VS Code', color: '#007ACC', icon: TbBrandVscode, orbit: 4 },
  { label: 'Docker', color: '#2496ED', icon: FaDocker, orbit: 4 },
  { label: 'NPM', color: '#CB3837', icon: FaNpm, orbit: 4 },
  { label: 'Postman', color: '#FF6C37', icon: SiPostman, orbit: 4 },
  { label: 'Netlify', color: '#00C7B7', icon: SiNetlify, orbit: 4 },
  { label: 'Vercel', color: '#ffffff', icon: SiVercel, orbit: 4 },
  // Orbit 5 — CMS & Payments
  { label: 'WordPress', color: '#21759B', icon: FaWordpress, orbit: 5 },
  { label: 'Elementor', color: '#E2155A', icon: FaElementor, orbit: 5 },
  { label: 'WooCommerce', color: '#96588A', icon: SiWoocommerce, orbit: 5 },
  { label: 'Stripe', color: '#635BFF', icon: SiStripe, orbit: 5 },
  { label: 'SQL / ORM', color: '#22c55e', icon: VscDatabase, orbit: 5 },
  { label: 'SSL / Pay', color: '#22c55e', icon: MdPayment, orbit: 5 },
];

// ── Render a react-icon to a canvas texture ───────────────────────
function makeIconTexture(tech) {
  const S = 128;
  const cv = document.createElement('canvas');
  cv.width = S;
  cv.height = S;
  const ctx = cv.getContext('2d');
  const cx = S / 2,
    cy = S / 2,
    R = S / 2 - 5;

  // Dark circle bg
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0f1e';
  ctx.fill();

  // Colored ring
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.strokeStyle = tech.color;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Outer glow
  const glow = ctx.createRadialGradient(cx, cy, R - 8, cx, cy, R + 6);
  glow.addColorStop(0, tech.color + '55');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, R + 6, 0, Math.PI * 2);
  ctx.fill();

  // Return a Promise that resolves to the texture
  // We render the SVG icon via renderToStaticMarkup then draw via Image
  const iconSize = Math.round(S * 0.52);
  const svgStr = renderToStaticMarkup(
    createElement(tech.icon, {
      size: iconSize,
      color: tech.color,
      style: {},
    })
  );

  // Wrap in a proper SVG envelope with xmlns so Image() can load it
  const wrapped = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 ${iconSize} ${iconSize}">${svgStr.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</svg>`;

  // We need to embed the actual inner paths — extract them from the rendered SVG
  // Better: use the SVG string directly from renderToStaticMarkup
  const fullSvg = svgStr
    .replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" `)
    // ensure width/height present
    .replace(/width="[^"]*"/, `width="${iconSize}"`)
    .replace(/height="[^"]*"/, `height="${iconSize}"`);

  const blob = new Blob([fullSvg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(
      img,
      cx - iconSize / 2,
      cy - iconSize / 2,
      iconSize,
      iconSize
    );
    tex.needsUpdate = true;
    URL.revokeObjectURL(url);
  };
  img.src = url;

  const tex = new THREE.CanvasTexture(cv);
  return tex;
}

// ── CPU chip texture ─────────────────────────────────────────────
function makeCpuTexture() {
  const S = 256;
  const cv = document.createElement('canvas');
  cv.width = S;
  cv.height = S;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#060d1a';
  ctx.fillRect(0, 0, S, S);
  const grd = ctx.createRadialGradient(S / 2, S / 2, 30, S / 2, S / 2, S / 2);
  grd.addColorStop(0, 'rgba(34,197,94,0.5)');
  grd.addColorStop(0.5, 'rgba(6,182,212,0.2)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, S, S);
  ctx.fillStyle = '#0f1e38';
  ctx.fillRect(28, 28, S - 56, S - 56);
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, S - 56, S - 56);
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
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, 38, 0, Math.PI * 2);
  const core = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, 38);
  core.addColorStop(0, 'rgba(34,197,94,1)');
  core.addColorStop(0.6, 'rgba(6,182,212,0.7)');
  core.addColorStop(1, 'transparent');
  ctx.fillStyle = core;
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CPU', S / 2, S / 2 - 8);
  ctx.fillStyle = '#06b6d4';
  ctx.font = '9px monospace';
  ctx.fillText('FULL-STACK', S / 2, S / 2 + 10);
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
    const sc = isMobile ? 700 : 1600;
    const sPos = new Float32Array(sc * 3);
    for (let i = 0; i < sc; i++) {
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

    // ── CPU ───────────────────────────────────────────────────────
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
      const rLine = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({
          color: OCOLOR[idx],
          transparent: true,
          opacity: isMobile ? 0.2 : 0.25,
        })
      );
      rLine.rotation.x = OTILTS[idx];
      scene.add(rLine);
    });

    // ── Sprites ───────────────────────────────────────────────────
    const orbitGroups = RADII.map(() => {
      const g = new THREE.Group();
      scene.add(g);
      return g;
    });
    const byOrbit = [[], [], [], [], []];
    TECHS.forEach((t) => byOrbit[t.orbit - 1].push(t));
    const spriteMap = new Map();
    const allSprites = [];

    byOrbit.forEach((group, oi) => {
      const rad = RADII[oi];
      group.forEach((tech, ti) => {
        const angle = (ti / group.length) * Math.PI * 2;
        const tex = makeIconTexture(tech);
        const mat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0.95,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(mat);
        const sc = isMobile ? 1.7 : 2.2;
        sprite.scale.set(sc, sc, 1);
        sprite.position.set(Math.cos(angle) * rad, 0, Math.sin(angle) * rad);
        orbitGroups[oi].add(sprite);
        spriteMap.set(sprite, tech.label);
        allSprites.push({ sprite, bobOffset: Math.random() * Math.PI * 2 });
      });
    });

    // ── Tooltip ───────────────────────────────────────────────────
    const tooltip = document.createElement('div');
    tooltip.style.cssText =
      'position:fixed;padding:5px 12px;background:rgba(5,8,15,0.95);border:1px solid #22c55e;border-radius:8px;color:#fff;font:bold 12px monospace;pointer-events:none;opacity:0;transition:opacity 0.18s;z-index:9999;white-space:nowrap;box-shadow:0 0 12px rgba(34,197,94,0.45)';
    document.body.appendChild(tooltip);
    tooltipRef.current = tooltip;

    // ── Raycaster ────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let mouseX = 0,
      mouseY = 0;

    const onPointerMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy2 = e.touches ? e.touches[0].clientY : e.clientY;
      pointer.x = (cx / window.innerWidth) * 2 - 1;
      pointer.y = -(cy2 / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects([...spriteMap.keys()]);
      if (hits.length > 0) {
        const lbl = spriteMap.get(hits[0].object);
        tooltip.textContent = lbl;
        tooltip.style.left = cx + 16 + 'px';
        tooltip.style.top = cy2 - 12 + 'px';
        tooltip.style.opacity = '1';
        renderer.domElement.style.cursor = 'pointer';
      } else {
        tooltip.style.opacity = '0';
        renderer.domElement.style.cursor = 'default';
      }
      if (!isMobile) {
        mouseX = (cx / window.innerWidth - 0.5) * 2;
        mouseY = (cy2 / window.innerHeight - 0.5) * 2;
      }
    };

    const onPointerDown = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy2 = e.touches ? e.touches[0].clientY : e.clientY;
      pointer.x = (cx / window.innerWidth) * 2 - 1;
      pointer.y = -(cy2 / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects([...spriteMap.keys()]);
      if (hits.length > 0) {
        const sp = hits[0].object;
        const os = sp.scale.x;
        sp.scale.set(os * 1.6, os * 1.6, 1);
        setTimeout(() => sp.scale.set(os, os, 1), 280);
      }
    };

    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.addEventListener('mousemove', onPointerMove);
    renderer.domElement.addEventListener('click', onPointerDown);
    renderer.domElement.addEventListener('touchstart', onPointerDown, {
      passive: true,
    });

    // ── Scroll / resize ──────────────────────────────────────────
    let scrollY = 0,
      targetScrollY = 0;
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
