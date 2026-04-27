/* ═══════════════════════════════════════════════════
       HERO GLOBE — UNTOUCHED (Exact original)
    ═══════════════════════════════════════════════════ */

      (function initGlobe() {
        const canvas = document.getElementById("hero-canvas");
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          1000,
        );
        camera.position.set(2.0, 0.6, 3.8);
        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        const loader = new THREE.TextureLoader();
        const globeRadius = 1.5;
        const globeGeo = new THREE.SphereGeometry(globeRadius, 96, 96);
        const earthTexture = loader.load(
          "https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg",
        );
        earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const bumpTexture = loader.load(
          "https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png",
        );
        const globeMat = new THREE.MeshPhongMaterial({
          map: earthTexture,
          bumpMap: bumpTexture,
          bumpScale: 0.06,
          shininess: 15,
          specular: new THREE.Color(0x1a3a1a),
        });
        const globe = new THREE.Mesh(globeGeo, globeMat);
        globe.position.set(2.0, 0, 0);
        scene.add(globe);
        const cloudGeo = new THREE.SphereGeometry(globeRadius * 1.012, 64, 64);
        const cloudTexture = loader.load(
          "https://unpkg.com/three-globe@2.31.1/example/img/earth-water.png",
        );
        const cloudMat = new THREE.MeshPhongMaterial({
          alphaMap: cloudTexture,
          transparent: true,
          opacity: 0.08,
          depthWrite: false,
          color: 0xffffff,
          side: THREE.DoubleSide,
        });
        const clouds = new THREE.Mesh(cloudGeo, cloudMat);
        clouds.position.copy(globe.position);
        scene.add(clouds);
        const atmosGeo = new THREE.SphereGeometry(globeRadius * 1.15, 64, 64);
        const atmosMat = new THREE.ShaderMaterial({
          uniforms: { uGlow: { value: new THREE.Color(0x4caf50) } },
          vertexShader: `varying vec3 vNormal;void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
          fragmentShader: `uniform vec3 uGlow;varying vec3 vNormal;void main(){float intensity=pow(0.6-dot(vNormal,vec3(0.0,0.0,1.0)),4.0);vec3 col=mix(uGlow,vec3(0.2,0.7,1.0),0.3);gl_FragColor=vec4(col,intensity*0.45);}`,
          transparent: true,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
        atmosphere.position.copy(globe.position);
        scene.add(atmosphere);
        const ringGeo = new THREE.RingGeometry(2.0, 2.01, 128);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x4caf50,
          transparent: true,
          opacity: 0.07,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(globe.position);
        ring.rotation.x = Math.PI * 0.42;
        ring.rotation.z = 0.3;
        scene.add(ring);
        const starCount = 1500;
        const sg = new THREE.BufferGeometry();
        const sp = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
          sp[i * 3] = (Math.random() - 0.5) * 50;
          sp[i * 3 + 1] = (Math.random() - 0.5) * 50;
          sp[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        sg.setAttribute("position", new THREE.BufferAttribute(sp, 3));
        const sm = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.035,
          transparent: true,
          opacity: 0.4,
          sizeAttenuation: true,
          depthWrite: false,
        });
        const stars = new THREE.Points(sg, sm);
        scene.add(stars);
        function createArc(sLat, sLon, eLat, eLon, col) {
          const toV = (lat, lon, r) => {
            const p = ((90 - lat) * Math.PI) / 180;
            const t = ((lon + 180) * Math.PI) / 180;
            return new THREE.Vector3(
              -r * Math.sin(p) * Math.cos(t),
              r * Math.cos(p),
              r * Math.sin(p) * Math.sin(t),
            );
          };
          const r = globeRadius;
          const s = toV(sLat, sLon, r);
          const e = toV(eLat, eLon, r);
          const m = s.clone().add(e).multiplyScalar(0.5);
          m.normalize().multiplyScalar(r * 1.35);
          const c = new THREE.QuadraticBezierCurve3(s, m, e);
          const pts = c.getPoints(50);
          const lg = new THREE.BufferGeometry().setFromPoints(pts);
          const lm = new THREE.LineBasicMaterial({
            color: col,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          const l = new THREE.Line(lg, lm);
          l.position.copy(globe.position);
          return l;
        }
        [
          [28.6, 77.2, 15.3, 73.9, 0x4caf50],
          [28.6, 77.2, 27.2, 78.0, 0x8bc34a],
          [13.0, 77.6, 9.9, 76.3, 0x2ecc71],
          [18.9, 72.8, 26.9, 70.9, 0x4caf50],
          [22.3, 73.2, 32.2, 76.3, 0x8bc34a],
          [11.9, 79.8, 25.3, 82.9, 0x2ecc71],
        ].forEach((r) => scene.add(createArc(r[0], r[1], r[2], r[3], r[4])));
        function addCityDot(lat, lon, col, sz) {
          const p = ((90 - lat) * Math.PI) / 180;
          const t = ((lon + 180) * Math.PI) / 180;
          const r = globeRadius * 1.01;
          const dg = new THREE.SphereGeometry(sz, 8, 8);
          const dm = new THREE.MeshBasicMaterial({
            color: col,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
          });
          const d = new THREE.Mesh(dg, dm);
          d.position.set(
            -r * Math.sin(p) * Math.cos(t) + globe.position.x,
            r * Math.cos(p) + globe.position.y,
            r * Math.sin(p) * Math.sin(t) + globe.position.z,
          );
          scene.add(d);
        }
        [
          [28.6, 77.2],
          [19.0, 72.8],
          [13.0, 77.6],
          [22.5, 88.3],
          [26.9, 75.7],
          [15.3, 73.9],
          [27.2, 78.0],
          [25.3, 83.0],
          [10.0, 76.3],
          [32.2, 76.3],
          [11.6, 92.7],
          [34.1, 77.6],
        ].forEach((c) => addCityDot(c[0], c[1], 0x2ecc71, 0.02));
        scene.add(new THREE.AmbientLight(0x334433, 0.6));
        const sun = new THREE.DirectionalLight(0xfff5e0, 1.2);
        sun.position.set(5, 3, 5);
        scene.add(sun);
        const fill = new THREE.DirectionalLight(0x4caf50, 0.3);
        fill.position.set(-5, -2, -3);
        scene.add(fill);
        const rimL = new THREE.DirectionalLight(0x8bc34a, 0.4);
        rimL.position.set(-3, 2, -5);
        scene.add(rimL);
        let mx = 0,
          my = 0;
        window.addEventListener(
          "mousemove",
          (e) => {
            mx = (e.clientX / window.innerWidth - 0.5) * 2;
            my = (e.clientY / window.innerHeight - 0.5) * 2;
          },
          { passive: true },
        );
        const clk = new THREE.Clock();
        function animate() {
          requestAnimationFrame(animate);
          const t = clk.getElapsedTime();
          globe.rotation.y = t * 0.05;
          clouds.rotation.y = t * 0.06;
          atmosphere.rotation.y = t * 0.04;
          ring.rotation.z = t * 0.08;
          stars.rotation.y = t * 0.003;
          stars.rotation.x = t * 0.002;
          camera.position.x = 2.0 + mx * 0.25;
          camera.position.y = 0.6 + my * 0.15;
          camera.lookAt(globe.position);
          renderer.render(scene, camera);
        }
        animate();
        window.addEventListener("resize", () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      })();

      
