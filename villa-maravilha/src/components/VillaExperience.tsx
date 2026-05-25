'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   SWATCHES CONFIG
   ============================================ */
const SWATCHES = [
  { color: '#E6E1D8', label: 'Nylon Ecru' },
  { color: '#8C7A6B', label: 'Micro Light' },
  { color: '#2D3032', label: 'Concrete Shade' },
];

export default function VillaExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sofaMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const [activeSwatch, setActiveSwatch] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  // UI panel refs for GSAP animation
  const ui2Ref = useRef<HTMLDivElement>(null);
  const ui3Ref = useRef<HTMLDivElement>(null);
  const ui4Ref = useRef<HTMLDivElement>(null);

  /* ============================================
     SWATCH CLICK HANDLER
     ============================================ */
  const handleSwatchClick = useCallback((index: number) => {
    setActiveSwatch(index);
    if (sofaMatRef.current) {
      const targetColor = new THREE.Color(SWATCHES[index].color);
      gsap.to(sofaMatRef.current.color, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, []);

  /* ============================================
     THREE.JS SCENE SETUP
     ============================================ */
  useEffect(() => {
    if (!canvasRef.current || !scrollContainerRef.current) return;

    // ---- SCENE ----
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a1520, 0.012);
    scene.background = new THREE.Color(0x0a1520);

    const sizes = { width: window.innerWidth, height: window.innerHeight };
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 200);
    camera.position.set(0, 5, 25);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // ---- LIGHTING ----
    const ambientLight = new THREE.AmbientLight(0x334466, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e0, 2.2);
    sunLight.position.set(15, 25, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 80;
    sunLight.shadow.camera.left = -30;
    sunLight.shadow.camera.right = 30;
    sunLight.shadow.camera.top = 30;
    sunLight.shadow.camera.bottom = -30;
    scene.add(sunLight);

    const fillLight = new THREE.PointLight(0x6699cc, 1.0, 60);
    fillLight.position.set(-15, 8, -10);
    scene.add(fillLight);

    const interiorLight = new THREE.PointLight(0xffddaa, 2.5, 18);
    interiorLight.position.set(0, 4, -20);
    scene.add(interiorLight);

    const interiorFillLight = new THREE.PointLight(0x88aacc, 0.8, 12);
    interiorFillLight.position.set(5, 3, -18);
    scene.add(interiorFillLight);

    // ---- MATERIALS ----
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0xd4d0c8, roughness: 0.75, metalness: 0.02 });
    const darkConcreteMat = new THREE.MeshStandardMaterial({ color: 0xa8a49c, roughness: 0.8, metalness: 0.02 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x7a5c3e, roughness: 0.85 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x88ccee, transparent: true, opacity: 0.2, roughness: 0.0, metalness: 0.9, side: THREE.DoubleSide });
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x0d4055, roughness: 0.05, metalness: 0.85 });
    const poolMat = new THREE.MeshStandardMaterial({ color: 0x1a8ca0, roughness: 0.0, metalness: 0.6 });
    const sandMat = new THREE.MeshStandardMaterial({ color: 0xc9b896, roughness: 0.95 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1a4020, roughness: 0.85 });
    const darkFoliageMat = new THREE.MeshStandardMaterial({ color: 0x0d2b0d, roughness: 0.9 });
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x4a2d0f, roughness: 0.8 });

    // ---- OCEAN & BEACH ----
    const waterGeo = new THREE.PlaneGeometry(200, 200, 40, 40);
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -2;
    water.receiveShadow = true;
    scene.add(water);

    const beach = new THREE.Mesh(new THREE.PlaneGeometry(45, 22), sandMat);
    beach.rotation.x = -Math.PI / 2;
    beach.position.set(0, -1.85, 14);
    beach.receiveShadow = true;
    scene.add(beach);

    // ---- VILLA EXTERIOR ----
    // Main lower volume
    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(16, 5, 10), concreteMat);
    mainBody.position.set(0, 0.5, 0);
    mainBody.castShadow = true;
    mainBody.receiveShadow = true;
    scene.add(mainBody);

    // Upper volume
    const upperBody = new THREE.Mesh(new THREE.BoxGeometry(10, 3.5, 8), concreteMat);
    upperBody.position.set(-2, 4.75, -0.5);
    upperBody.castShadow = true;
    scene.add(upperBody);

    // Lower roof slab (overhang)
    const roofLower = new THREE.Mesh(new THREE.BoxGeometry(18, 0.2, 12), darkConcreteMat);
    roofLower.position.set(0, 3.15, 0.5);
    roofLower.castShadow = true;
    scene.add(roofLower);

    // Upper roof slab
    const roofUpper = new THREE.Mesh(new THREE.BoxGeometry(12, 0.15, 10), darkConcreteMat);
    roofUpper.position.set(-2, 6.6, -0.5);
    roofUpper.castShadow = true;
    scene.add(roofUpper);

    // Glass curtain wall (front)
    const glassWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 4.5), glassMat);
    glassWall.position.set(0, 1.25, 5.01);
    scene.add(glassWall);

    // Terrace deck (wood)
    const terrace = new THREE.Mesh(new THREE.BoxGeometry(18, 0.15, 5), woodMat);
    terrace.position.set(0, -1.85, 7.5);
    terrace.receiveShadow = true;
    scene.add(terrace);

    // Front columns
    [-7, -3.5, 0, 3.5, 7].forEach((x) => {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5.2, 0.2), concreteMat);
      col.position.set(x, 0.6, 5);
      col.castShadow = true;
      scene.add(col);
    });

    // Upper balcony railing
    const railing = new THREE.Mesh(new THREE.BoxGeometry(8, 0.08, 0.08), darkConcreteMat);
    railing.position.set(-2, 4, 3.5);
    scene.add(railing);
    for (let i = 0; i < 8; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1, 0.04), darkConcreteMat);
      bar.position.set(-5.5 + i * 1.14, 3.5, 3.5);
      scene.add(bar);
    }

    // ---- INFINITY POOL ----
    const pool = new THREE.Mesh(new THREE.BoxGeometry(12, 0.3, 6), poolMat);
    pool.position.set(0, -1.5, 9);
    scene.add(pool);

    const poolEdge = new THREE.Mesh(new THREE.BoxGeometry(13, 0.12, 6.8), darkConcreteMat);
    poolEdge.position.set(0, -1.2, 9);
    scene.add(poolEdge);

    // ---- CENOTE ----
    const cenote = new THREE.Mesh(
      new THREE.CircleGeometry(4, 32),
      new THREE.MeshStandardMaterial({ color: 0x0a2030, roughness: 0.05, metalness: 0.6 })
    );
    cenote.rotation.x = -Math.PI / 2;
    cenote.position.set(18, -1.8, -6);
    scene.add(cenote);

    const cenoteRim = new THREE.Mesh(
      new THREE.RingGeometry(4, 5, 32),
      new THREE.MeshStandardMaterial({ color: 0x6b5e4a, roughness: 0.9 })
    );
    cenoteRim.rotation.x = -Math.PI / 2;
    cenoteRim.position.set(18, -1.75, -6);
    scene.add(cenoteRim);

    // ---- PALM TREES ----
    function addPalmTree(px: number, pz: number, h: number) {
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4c30, roughness: 0.95 });
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.2, h, 6), trunkMat);
      trunk.position.set(px, -2 + h / 2, pz);
      trunk.castShadow = true;
      scene.add(trunk);

      const leafMat = new THREE.MeshStandardMaterial({ color: 0x1a5525, roughness: 0.85 });
      for (let i = 0; i < 5; i++) {
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(1.5, 6, 5), leafMat);
        const angle = (i / 5) * Math.PI * 2;
        leaf.position.set(px + Math.cos(angle) * 1.1, -2 + h + 0.2, pz + Math.sin(angle) * 1.1);
        leaf.scale.set(0.7, 0.35, 1.4);
        leaf.rotation.set(0, angle, Math.cos(angle) * 0.4);
        leaf.castShadow = true;
        scene.add(leaf);
      }
    }
    addPalmTree(-9, 12, 8);
    addPalmTree(9, 15, 7);
    addPalmTree(-13, 4, 9);
    addPalmTree(13, -2, 6.5);
    addPalmTree(-6, -9, 7);
    addPalmTree(7, -11, 8);

    // ---- JUNGLE FOLIAGE ----
    for (let i = 0; i < 55; i++) {
      let x = (Math.random() - 0.5) * 45;
      const y = Math.random() * 6;
      const z = Math.random() * 55 - 18;
      if (Math.abs(x) < 3 && z > -5 && z < 25) x += (Math.sign(x) || 1) * 5;
      const scale = Math.random() * 2.5 + 0.8;
      const mat = Math.random() > 0.5 ? foliageMat : darkFoliageMat;
      const bush = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8), mat);
      bush.position.set(x, y - 2, z);
      bush.scale.set(scale, scale * 0.7, scale);
      bush.castShadow = true;
      scene.add(bush);
    }

    // Dense foliage wall (transition zone)
    for (let i = 0; i < 25; i++) {
      const x = (Math.random() - 0.5) * 24;
      if (Math.abs(x) < 2.5) continue;
      const z = -3 - Math.random() * 7;
      const scale = Math.random() * 2 + 1.5;
      const bush = new THREE.Mesh(
        new THREE.SphereGeometry(1, 8, 8),
        Math.random() > 0.3 ? foliageMat : darkFoliageMat
      );
      bush.position.set(x, Math.random() * 4 - 1, z);
      bush.scale.set(scale, scale, scale);
      bush.castShadow = true;
      scene.add(bush);
    }

    // ---- GARDEN PATH & DOOR ----
    for (let i = 0; i < 12; i++) {
      const stone = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45 + Math.random() * 0.3, 0.55 + Math.random() * 0.3, 0.06, 8),
        new THREE.MeshStandardMaterial({ color: 0x9e9585, roughness: 0.95 })
      );
      stone.position.set((Math.random() - 0.5) * 0.6, -1.92, -7 - i * 0.85);
      stone.receiveShadow = true;
      scene.add(stone);
    }

    // Wooden door
    const door = new THREE.Mesh(new THREE.BoxGeometry(3.5, 5.5, 0.35), doorMat);
    door.position.set(0, 0.8, -14);
    door.castShadow = true;
    scene.add(door);

    // Door frame
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x3a1f08, roughness: 0.85 });
    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.3, 0.45), frameMat);
    frameTop.position.set(0, 3.65, -14);
    scene.add(frameTop);
    const frameL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 5.5, 0.45), frameMat);
    frameL.position.set(-1.95, 0.8, -14);
    scene.add(frameL);
    const frameR = new THREE.Mesh(new THREE.BoxGeometry(0.25, 5.5, 0.45), frameMat);
    frameR.position.set(1.95, 0.8, -14);
    scene.add(frameR);

    // Decorative garden walls flanking the door
    const gardenWallMat = new THREE.MeshStandardMaterial({ color: 0xc8c0b0, roughness: 0.85 });
    const wallL = new THREE.Mesh(new THREE.BoxGeometry(5, 4, 0.3), gardenWallMat);
    wallL.position.set(-5.5, 0, -14);
    wallL.castShadow = true;
    scene.add(wallL);
    const wallR = new THREE.Mesh(new THREE.BoxGeometry(5, 4, 0.3), gardenWallMat);
    wallR.position.set(5.5, 0, -14);
    wallR.castShadow = true;
    scene.add(wallR);

    // ---- INTERIOR ROOM ----
    const roomGroup = new THREE.Group();
    roomGroup.position.set(0, 0, -20);

    // Floor
    const floorMat = new THREE.MeshStandardMaterial({ color: 0xd8d0c4, roughness: 0.65 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Rug
    const rug = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 5),
      new THREE.MeshStandardMaterial({ color: 0xb0a894, roughness: 0.95 })
    );
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, -1.98, 1);
    roomGroup.add(rug);

    // Back wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(14, 8, 0.4), concreteMat);
    backWall.position.set(0, 2, -7);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    // Left wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 8, 14), concreteMat);
    leftWall.position.set(-7, 2, 0);
    roomGroup.add(leftWall);

    // Right wall (lower + upper = window gap)
    const rwBottom = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3, 14), concreteMat);
    rwBottom.position.set(7, -0.5, 0);
    roomGroup.add(rwBottom);
    const rwTop = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2, 14), concreteMat);
    rwTop.position.set(7, 5, 0);
    roomGroup.add(rwTop);

    // Ceiling
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0xe8e4dc, roughness: 0.6 });
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 6;
    roomGroup.add(ceiling);

    // Sofa (compound shape)
    const sofaMat = new THREE.MeshStandardMaterial({ color: SWATCHES[0].color, roughness: 0.45, metalness: 0.02 });
    sofaMatRef.current = sofaMat;

    const sofaSeat = new THREE.Mesh(new THREE.BoxGeometry(5, 0.9, 2.2), sofaMat);
    sofaSeat.position.set(0, -1.1, 0);
    sofaSeat.castShadow = true;
    roomGroup.add(sofaSeat);

    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(5, 1.6, 0.45), sofaMat);
    sofaBack.position.set(0, -0.3, -1.1);
    sofaBack.castShadow = true;
    roomGroup.add(sofaBack);

    const sofaArmL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1, 2.2), sofaMat);
    sofaArmL.position.set(-2.35, -0.7, 0);
    roomGroup.add(sofaArmL);

    const sofaArmR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1, 2.2), sofaMat);
    sofaArmR.position.set(2.35, -0.7, 0);
    roomGroup.add(sofaArmR);

    // Sofa cushions
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0xccc5b8, roughness: 0.5 });
    for (let i = 0; i < 3; i++) {
      const cushion = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 0.4), cushionMat);
      cushion.position.set(-1.5 + i * 1.5, -0.05, -0.8);
      cushion.rotation.x = -0.15;
      roomGroup.add(cushion);
    }

    // Coffee table
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x5a4030, roughness: 0.7 });
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.08, 1.4), tableMat);
    tableTop.position.set(0, -1.35, 2.2);
    tableTop.castShadow = true;
    roomGroup.add(tableTop);

    const legMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.4, metalness: 0.8 });
    [[-1, -0.5], [1, -0.5], [-1, 0.5], [1, 0.5]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.55, 6), legMat);
      leg.position.set(lx, -1.66, 2.2 + lz);
      roomGroup.add(leg);
    });

    // Side table + lamp
    const sideTableMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.4, metalness: 0.3 });
    const sideTable = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.4, 0.7), sideTableMat);
    sideTable.position.set(-4.5, -1.3, -1);
    roomGroup.add(sideTable);

    const lampPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.4, 8),
      new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.9, roughness: 0.2 })
    );
    lampPole.position.set(-4.5, 0.1, -1);
    roomGroup.add(lampPole);

    const lampShade = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.15, 0.45, 12),
      new THREE.MeshStandardMaterial({ color: 0xffeecc, transparent: true, opacity: 0.8, emissive: 0xffddaa, emissiveIntensity: 0.4 })
    );
    lampShade.position.set(-4.5, 0.95, -1);
    roomGroup.add(lampShade);

    // Art frame on back wall
    const frameBorder = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 1.8, 0.05),
      new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.3, metalness: 0.6 })
    );
    frameBorder.position.set(0, 3.5, -6.75);
    roomGroup.add(frameBorder);

    const artCanvas = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x8899aa, roughness: 0.9 })
    );
    artCanvas.position.set(0, 3.5, -6.72);
    roomGroup.add(artCanvas);

    scene.add(roomGroup);

    // ---- FLOATING PARTICLES ----
    const particleCount = 200;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 60;
      pPositions[i * 3 + 1] = Math.random() * 14 - 2;
      pPositions[i * 3 + 2] = Math.random() * 65 - 25;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({
      size: 0.06, color: 0xffeedd, transparent: true, opacity: 0.35, sizeAttenuation: true,
    }));
    scene.add(particles);

    // ---- SAVE WATER VERTEX POSITIONS ----
    const waterOriginalPositions = new Float32Array(waterGeo.attributes.position.array as Float32Array);

    // ---- GSAP SCROLL TIMELINE ----
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    // Phase 1: Hero → Aerial (0 – 0.3)
    tl.to(camera.position, { x: 3, y: 10, z: 8, duration: 0.3, ease: 'power1.inOut' }, 0);
    tl.to(camera.rotation, { x: -0.25, y: 0.08, duration: 0.3, ease: 'power1.inOut' }, 0);

    // UI-2 fade in
    tl.to(ui2Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.2);
    // UI-2 fade out
    tl.to(ui2Ref.current, { opacity: 0, y: -30, duration: 0.08 }, 0.34);

    // Phase 2: Aerial → Garden (0.3 – 0.65)
    tl.to(camera.position, { x: -1, y: 4, z: -8, duration: 0.35, ease: 'power1.inOut' }, 0.3);
    tl.to(camera.rotation, { x: -0.05, y: -0.06, duration: 0.35, ease: 'power1.inOut' }, 0.3);

    // UI-3 fade in
    tl.to(ui3Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.5);
    // UI-3 fade out
    tl.to(ui3Ref.current, { opacity: 0, y: -30, duration: 0.08 }, 0.62);

    // Phase 3: Garden → Interior (0.65 – 1.0)
    tl.to(camera.position, { x: 0, y: 1.5, z: -15, duration: 0.35, ease: 'power2.inOut' }, 0.65);
    tl.to(camera.rotation, { x: -0.05, y: 0, duration: 0.35, ease: 'power2.inOut' }, 0.65);

    // UI-4 fade in
    tl.to(ui4Ref.current, { opacity: 1, y: 0, duration: 0.12 }, 0.82);

    // ---- RENDER LOOP ----
    let animationId: number;
    const tick = () => {
      const time = performance.now() * 0.001;

      // Animate water surface
      const wPos = waterGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < wPos.length; i += 3) {
        const ox = waterOriginalPositions[i];
        const oy = waterOriginalPositions[i + 1];
        wPos[i + 2] = Math.sin(ox * 0.3 + time * 0.6) * 0.1 + Math.cos(oy * 0.4 + time * 0.4) * 0.07;
      }
      waterGeo.attributes.position.needsUpdate = true;

      // Rotate particles slowly
      particles.rotation.y += 0.0002;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(tick);
    };
    tick();

    // ---- RESIZE ----
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener('resize', handleResize);

    // ---- LOADING COMPLETE ----
    const loadTimer1 = setTimeout(() => setIsLoaded(true), 1200);
    const loadTimer2 = setTimeout(() => setShowLoader(false), 2300);

    // ---- CLEANUP ----
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(loadTimer1);
      clearTimeout(loadTimer2);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, []);

  /* ============================================
     JSX RETURN
     ============================================ */
  return (
    <>
      {/* ===== LOADING SCREEN ===== */}
      {showLoader && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200, background: '#000',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transition: 'opacity 1s ease', opacity: isLoaded ? 0 : 1,
            pointerEvents: isLoaded ? 'none' : 'auto',
          }}
        >
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
            letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.5)',
          }}>
            Villa Maravilha
          </div>
          <div style={{ marginTop: '1.5rem', width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)' }} />
          <div style={{
            marginTop: '0.8rem', fontFamily: "'Inter', sans-serif", fontSize: '0.55rem',
            letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.2)',
          }}>
            Loading Experience
          </div>
        </div>
      )}

      {/* ===== 3D CANVAS ===== */}
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none' }} />

      {/* ===== VIGNETTE ===== */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)' }} />

      {/* ===== NAV ===== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.85rem', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.8, cursor: 'pointer' }}>VM</div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Gallery', 'Contact'].map((item) => (
            <span key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.45, cursor: 'pointer' }}>{item}</span>
          ))}
          <div style={{ padding: '0.4rem 1.2rem', border: '1px solid rgba(201,169,110,0.4)', borderRadius: '2px', fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', cursor: 'pointer' }}>Book Tour</div>
        </div>
      </nav>

      {/* ===== SCROLL CONTENT ===== */}
      <div ref={scrollContainerRef} style={{ position: 'relative', zIndex: 10 }}>

        {/* ----- Scene 1: Hero ----- */}
        <section style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem', pointerEvents: 'none' }}>
          <div style={{ width: '50px', height: '1px', background: 'rgba(201,169,110,0.4)', marginBottom: '2rem' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 8.5vw, 7.5rem)', fontWeight: 400, letterSpacing: '0.12em', lineHeight: 0.95, textTransform: 'uppercase', marginBottom: '1.2rem', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
            Villa<br />Maravilha
          </h1>
          <div style={{ width: '50px', height: '1px', background: 'rgba(201,169,110,0.4)', marginBottom: '1.2rem' }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase', opacity: 0.65 }}>
            Private beach · Sunset garden · Cenote view
          </p>
          <div style={{ position: 'absolute', bottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.3 }}>Scroll to explore</span>
            <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.5))', animation: 'scrollPulse 2s ease-in-out infinite' }} />
          </div>
        </section>

        <div style={{ height: '50vh' }} />

        {/* ----- Scene 2: Between Sea and Cenote ----- */}
        <section style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', padding: '4rem', pointerEvents: 'none' }}>
          <div ref={ui2Ref} style={{
            maxWidth: '400px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.08)', padding: '2.5rem', borderRadius: '6px', opacity: 0, transform: 'translateY(30px)',
          }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a96e' }}>Location</span>
            <div style={{ width: '35px', height: '1px', background: 'rgba(201,169,110,0.5)', margin: '0.8rem 0' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 400, letterSpacing: '0.05em', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '1rem' }}>
              Between<br />Sea and<br />Cenote
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', lineHeight: 1.8, fontWeight: 300, color: 'rgba(245,240,235,0.45)' }}>
              Nestled between the turquoise Caribbean and a pristine natural cenote, this estate bridges two worlds of sublime beauty.
            </p>
          </div>
        </section>

        <div style={{ height: '50vh' }} />

        {/* ----- Scene 3: The Garden Arrival ----- */}
        <section style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '4rem', pointerEvents: 'none' }}>
          <div ref={ui3Ref} style={{
            maxWidth: '400px', textAlign: 'right', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.08)', padding: '2.5rem', borderRadius: '6px', opacity: 0, transform: 'translateY(30px)',
          }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a96e' }}>Arrival</span>
            <div style={{ width: '35px', height: '1px', background: 'rgba(201,169,110,0.5)', margin: '0.8rem 0 0.8rem auto' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 400, letterSpacing: '0.05em', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '1rem' }}>
              The<br />Garden<br />Arrival
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', lineHeight: 1.8, fontWeight: 300, color: 'rgba(245,240,235,0.45)' }}>
              A shaded stone pathway through tropical gardens leads to the grand wooden entrance.
            </p>
          </div>
        </section>

        <div style={{ height: '50vh' }} />

        {/* ----- Scene 4: Noon Interior + Material Swapper ----- */}
        <section style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: '4rem', paddingBottom: '5rem', pointerEvents: 'none' }}>
          <div ref={ui4Ref} style={{
            width: '100%', maxWidth: '480px', background: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.06)', padding: '2.2rem 2.5rem', borderRadius: '6px', opacity: 0, transform: 'translateY(30px)', pointerEvents: 'auto',
          }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a96e' }}>Interior Design</span>
            <div style={{ width: '35px', height: '1px', background: 'rgba(201,169,110,0.5)', margin: '0.8rem 0' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 400, letterSpacing: '0.05em', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Noon Interior
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', lineHeight: 1.6, fontWeight: 300, color: 'rgba(245,240,235,0.35)', marginBottom: '1.8rem' }}>
              Customize the material palette. Each finish is handcrafted from natural materials.
            </p>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.25)', marginBottom: '0.8rem' }}>Material Setup</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {SWATCHES.map((swatch, i) => (
                <button
                  key={swatch.label}
                  onClick={() => handleSwatchClick(i)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%', backgroundColor: swatch.color,
                    border: activeSwatch === i ? '2px solid #c9a96e' : '2px solid transparent',
                    boxShadow: activeSwatch === i ? '0 0 20px rgba(201,169,110,0.3)' : 'none',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: activeSwatch === i ? 'scale(1.15)' : 'scale(1)',
                  }} />
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '0.45rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: activeSwatch === i ? '#c9a96e' : 'rgba(245,240,235,0.3)', transition: 'color 0.3s ease',
                  }}>
                    {swatch.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ===== FOOTER ===== */}
      <footer style={{
        position: 'relative', zIndex: 10, padding: '3rem 4rem', background: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Villa Maravilha</span>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(245,240,235,0.2)', marginTop: '0.3rem' }}>© 2026 All rights reserved</p>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Instagram', 'Pinterest', 'Behance'].map((item) => (
            <span key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,235,0.25)', cursor: 'pointer' }}>{item}</span>
          ))}
        </div>
      </footer>
    </>
  );
}
