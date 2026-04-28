/* ═══════════════════════════════════════════════════════════════
   SPLASH SCREEN — Real 3D NASA Globe with Cinematic Zoom-In
   ═══════════════════════════════════════════════════════════════
   Uses Three.js (already loaded) + GSAP for:
   • Real NASA Blue Marble Earth texture
   • Atmosphere glow shader
   • Cinematic camera zoom from space → India close-up
   • Loading-aware: stays until window.onload fires
   • HUD data readouts that update in real-time
   ═══════════════════════════════════════════════════════════════ */

(function initSplashGlobe() {
  'use strict';

  /* ── Constants ── */
  const MIN_DISPLAY_MS = 1800;
  const EXIT_DURATION  = 600;

  /* ── DOM refs ── */
  const splash   = document.getElementById('splash-screen');
  const canvas   = document.getElementById('splash-canvas');
  const progBar  = document.getElementById('splash-progress-bar');
  const pctEl    = document.getElementById('splash-pct');
  const altEl    = document.getElementById('splash-alt');
  const statusEl = document.getElementById('splash-status');
  const brandEl  = document.getElementById('splash-brand');
  const reticle  = document.getElementById('splash-reticle');

  if (!splash || !canvas || typeof THREE === 'undefined') return;

  /* ── State ── */
  let pageLoaded    = false;
  let minTimePassed = false;
  let exiting       = false;
  const startTime   = Date.now();
  let animFrameId;

  /* ══════════════════════════════════════
     THREE.JS SCENE SETUP
     ══════════════════════════════════════ */

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  // Start far away in space
  camera.position.set(0, 0, 12);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  /* ── Textures ── */
  const loader = new THREE.TextureLoader();
  const GLOBE_RADIUS = 2;

  // NASA Blue Marble Earth
  const earthTex = loader.load(
    'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg'
  );
  earthTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const bumpTex = loader.load(
    'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png'
  );

  /* ── Earth Globe ── */
  const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 128, 128);
  const globeMat = new THREE.MeshPhongMaterial({
    map: earthTex,
    bumpMap: bumpTex,
    bumpScale: 0.05,
    shininess: 12,
    specular: new THREE.Color(0x111a11)
  });
  const globe = new THREE.Mesh(globeGeo, globeMat);
  // Rotate globe so India is visible from default camera angle
  globe.rotation.y = -1.4;  // ~78°E longitude facing camera
  scene.add(globe);

  /* ── Cloud Layer ── */
  const cloudGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.008, 64, 64);
  const cloudTex = loader.load(
    'https://unpkg.com/three-globe@2.31.1/example/img/earth-water.png'
  );
  const cloudMat = new THREE.MeshPhongMaterial({
    alphaMap: cloudTex,
    transparent: true,
    opacity: 0.06,
    depthWrite: false,
    color: 0xffffff,
    side: THREE.DoubleSide
  });
  const clouds = new THREE.Mesh(cloudGeo, cloudMat);
  scene.add(clouds);

  /* ── Atmosphere Glow (Shader) ── */
  const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.18, 64, 64);
  const atmosMat = new THREE.ShaderMaterial({
    uniforms: {
      uGlow: { value: new THREE.Color(0x4caf50) },
      uIntensity: { value: 0.65 }
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uGlow;
      uniform float uIntensity;
      varying vec3 vNormal;
      void main() {
        float rim = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
        vec3 col = mix(uGlow, vec3(0.2, 0.7, 1.0), 0.25);
        gl_FragColor = vec4(col, rim * uIntensity);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
  scene.add(atmosphere);

  /* ── Orbital Ring ── */
  const ringGeo = new THREE.TorusGeometry(GLOBE_RADIUS * 1.5, 0.005, 8, 128);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x4caf50,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI * 0.4;
  ring.rotation.z = 0.2;
  scene.add(ring);

  /* ── Second Orbital Ring ── */
  const ring2Geo = new THREE.TorusGeometry(GLOBE_RADIUS * 1.8, 0.003, 8, 128);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0x8bc34a,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = Math.PI * 0.55;
  ring2.rotation.z = -0.5;
  scene.add(ring2);

  /* ── Orbiting dot (satellite) ── */
  const satGeo = new THREE.SphereGeometry(0.04, 8, 8);
  const satMat = new THREE.MeshBasicMaterial({
    color: 0x2ecc71,
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending
  });
  const satellite = new THREE.Mesh(satGeo, satMat);
  scene.add(satellite);

  // Satellite glow
  const satGlowGeo = new THREE.SphereGeometry(0.12, 8, 8);
  const satGlowMat = new THREE.MeshBasicMaterial({
    color: 0x2ecc71,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const satGlow = new THREE.Mesh(satGlowGeo, satGlowMat);
  scene.add(satGlow);

  /* ── Stars ── */
  const starCount = 2500;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  const starSizes = new Float32Array(starCount);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3]     = (Math.random() - 0.5) * 80;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    starSizes[i] = Math.random() * 0.08 + 0.02;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
    depthWrite: false
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* ── India marker (glowing dot at ~20°N, 78°E) ── */
  function latLonToVec3(lat, lon, radius) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
       radius * Math.cos(phi),
       radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  const indiaPos = latLonToVec3(20.5937, 78.9629, GLOBE_RADIUS * 1.01);
  const markerGeo = new THREE.SphereGeometry(0.035, 8, 8);
  const markerMat = new THREE.MeshBasicMaterial({
    color: 0x2ecc71,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  const marker = new THREE.Mesh(markerGeo, markerMat);
  marker.position.copy(indiaPos);
  globe.add(marker);  // child of globe so it rotates with it

  // Marker pulse ring
  const pulseGeo = new THREE.RingGeometry(0.04, 0.07, 32);
  const pulseMat = new THREE.MeshBasicMaterial({
    color: 0x2ecc71,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const pulse = new THREE.Mesh(pulseGeo, pulseMat);
  pulse.position.copy(indiaPos);
  pulse.lookAt(new THREE.Vector3(0, 0, 0)); // face outward
  globe.add(pulse);

  /* ── Lights ── */
  scene.add(new THREE.AmbientLight(0x334433, 0.5));
  const sun = new THREE.DirectionalLight(0xfff5e0, 1.3);
  sun.position.set(5, 3, 5);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x4caf50, 0.25);
  fill.position.set(-5, -2, -3);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0x8bc34a, 0.35);
  rim.position.set(-3, 2, -5);
  scene.add(rim);

  /* ══════════════════════════════════════
     GSAP ANIMATION TIMELINE
     ══════════════════════════════════════ */

  // Camera zoom: 12 → 4 → 2.8 (close to globe surface)
  const camTarget = { z: 12, y: 0, rotY: globe.rotation.y };

  const tl = gsap.timeline({ paused: false });

  // Phase 1 (0–0.6s): Zoom in from deep space, globe rotates to show India
  tl.to(camTarget, {
    z: 4.5,
    y: 0.3,
    rotY: globe.rotation.y + 0.15, // slight rotate to center India
    duration: 0.8,
    ease: 'power2.inOut',
    onUpdate: function() {
      camera.position.z = camTarget.z;
      camera.position.y = camTarget.y;
      globe.rotation.y = camTarget.rotY;
    }
  });

  // Phase 2 (0.6–1.4s): Slow dramatic push closer
  tl.to(camTarget, {
    z: 3.2,
    y: 0.2,
    rotY: camTarget.rotY + 0.05,
    duration: 0.8,
    ease: 'power1.inOut',
    onUpdate: function() {
      camera.position.z = camTarget.z;
      camera.position.y = camTarget.y;
      globe.rotation.y = camTarget.rotY;
    }
  });

  /* ══════════════════════════════════════
     RENDER LOOP
     ══════════════════════════════════════ */

  const clock = new THREE.Clock();

  function animate() {
    animFrameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Slow background rotation
    clouds.rotation.y = globe.rotation.y + t * 0.01;
    atmosphere.rotation.y = globe.rotation.y;

    // Ring animations
    ring.rotation.z = 0.2 + t * 0.15;
    ring2.rotation.z = -0.5 - t * 0.1;

    // Satellite orbiting
    const satAngle = t * 1.2;
    const satR = GLOBE_RADIUS * 1.5;
    satellite.position.set(
      satR * Math.cos(satAngle) * Math.cos(Math.PI * 0.4),
      satR * Math.sin(Math.PI * 0.4) * Math.sin(satAngle),
      satR * Math.sin(satAngle) * Math.cos(Math.PI * 0.4)
    );
    satGlow.position.copy(satellite.position);

    // Star twinkle
    stars.rotation.y = t * 0.005;
    stars.rotation.x = t * 0.003;
    starMat.opacity = 0.35 + Math.sin(t * 2) * 0.1;

    // Marker pulse
    const pulseScale = 1 + Math.sin(t * 4) * 0.4;
    pulse.scale.set(pulseScale, pulseScale, 1);
    pulseMat.opacity = 0.5 - Math.sin(t * 4) * 0.3;

    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();

  /* ══════════════════════════════════════
     LOADING PROGRESS + HUD UPDATES
     ══════════════════════════════════════ */

  let progress = 0;
  let targetProgress = 0;

  function updateHUD() {
    const elapsed = Date.now() - startTime;

    // Progress calculation
    const timeFrac = Math.min(elapsed / MIN_DISPLAY_MS, 1);
    const entries = performance.getEntriesByType ? performance.getEntriesByType('resource') : [];
    const allRes = document.querySelectorAll('script[src], link[rel="stylesheet"], img[src]');
    const total = Math.max(allRes.length, 1);
    const resFrac = Math.min(entries.length / total, 1);

    targetProgress = Math.max(timeFrac * 0.3 + resFrac * 0.7, timeFrac * 0.5) * 100;
    if (pageLoaded) targetProgress = 100;

    progress += (targetProgress - progress) * 0.12;
    if (progress > 99.5 && pageLoaded) progress = 100;

    // Update progress bar
    if (progBar) progBar.style.width = progress + '%';

    // Update HUD percentage
    if (pctEl) pctEl.textContent = Math.round(progress) + '%';

    // Update altitude (decreases as camera zooms in)
    if (altEl) {
      const alt = Math.max(50, Math.round(35786 * (camera.position.z / 12)));
      altEl.textContent = alt.toLocaleString() + ' km';
    }

    // Update status text
    if (statusEl) {
      if (progress < 30) statusEl.textContent = 'ACQUIRING SIGNAL...';
      else if (progress < 60) statusEl.textContent = 'MAPPING TERRAIN...';
      else if (progress < 90) statusEl.textContent = 'LOCKING TARGET...';
      else statusEl.textContent = 'TARGET ACQUIRED ✓';
    }

    if (!exiting) requestAnimationFrame(updateHUD);
  }
  requestAnimationFrame(updateHUD);

  /* ══════════════════════════════════════
     EXIT SEQUENCE
     ══════════════════════════════════════ */

  function tryExit() {
    if (!pageLoaded || !minTimePassed || exiting) return;
    exiting = true;

    // Final zoom: camera rushes into the globe
    gsap.to(camera.position, {
      z: 0.5,
      y: 0.1,
      duration: 0.7,
      ease: 'power3.in',
      onUpdate: function() {
        camera.lookAt(0, 0, 0);
        // Increase atmosphere intensity as we get close
        atmosMat.uniforms.uIntensity.value = 0.65 + (1 - camera.position.z / 3.2) * 2;
      }
    });

    // Fade out HUD elements
    gsap.to([brandEl, '.splash-hud', '.splash-progress'], {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    });

    // Fade reticle scale up
    if (reticle) {
      gsap.to(reticle, {
        scale: 3,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      });
    }

    // After zoom, fade out the entire splash
    setTimeout(function() {
      splash.classList.add('splash-exit');

      // Reveal page
      document.body.classList.remove('splash-active');

      // Cleanup after fade
      setTimeout(function() {
        // Stop render loop
        if (animFrameId) cancelAnimationFrame(animFrameId);
        // Dispose Three.js resources
        renderer.dispose();
        globeGeo.dispose();
        globeMat.dispose();
        cloudGeo.dispose();
        cloudMat.dispose();
        atmosGeo.dispose();
        atmosMat.dispose();
        starGeo.dispose();
        starMat.dispose();
        ringGeo.dispose();
        ringMat.dispose();
        ring2Geo.dispose();
        ring2Mat.dispose();
        // Remove splash from DOM
        splash.classList.add('splash-gone');
        setTimeout(function() {
          if (splash.parentNode) splash.parentNode.removeChild(splash);
        }, 100);
      }, EXIT_DURATION);
    }, 650);
  }

  /* ── Triggers ── */
  setTimeout(function() {
    minTimePassed = true;
    tryExit();
  }, MIN_DISPLAY_MS);

  function onFullLoad() {
    pageLoaded = true;
    targetProgress = 100;
    tryExit();
  }

  if (document.readyState === 'complete') {
    onFullLoad();
  } else {
    window.addEventListener('load', onFullLoad);
  }

  // Safety timeout
  setTimeout(function() {
    if (!exiting) {
      pageLoaded = true;
      minTimePassed = true;
      tryExit();
    }
  }, 8000);

  /* ── Resize ── */
  window.addEventListener('resize', function() {
    if (exiting) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

})();
