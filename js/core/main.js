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

      /* ═══════════════════════════════════════════════════
       NATURE BACKGROUND ANIMATIONS
       — Living things, geological features, weather, biomes
    ═══════════════════════════════════════════════════ */
      (function initNatureBackgrounds() {
        // ─── FOREST BIOME: Falling leaves + Fireflies ───
        const leafC = document.getElementById("leaf-container");
        if (leafC) {
          const leafEmojis = ["🍃", "🌿", "🍂", "🌱", "🍀", "🪷", "🌺"];
          for (let i = 0; i < 18; i++) {
            const leaf = document.createElement("span");
            leaf.className = "falling-leaf";
            leaf.textContent =
              leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
            leaf.style.left = Math.random() * 100 + "%";
            leaf.style.fontSize = 14 + Math.random() * 16 + "px";
            leaf.style.animationDuration = 12 + Math.random() * 18 + "s";
            leaf.style.animationDelay = Math.random() * 15 + "s";
            leaf.style.opacity = 0.06 + Math.random() * 0.1;
            leafC.appendChild(leaf);
          }
        }
        // Fireflies (destinations)
        const ffDest = document.getElementById("firefly-dest");
        if (ffDest) {
          for (let i = 0; i < 25; i++) {
            const ff = document.createElement("div");
            ff.className = "firefly";
            ff.style.left = Math.random() * 100 + "%";
            ff.style.top = Math.random() * 100 + "%";
            ff.style.width = 2 + Math.random() * 4 + "px";
            ff.style.height = ff.style.width;
            ff.style.animationDuration = 4 + Math.random() * 8 + "s";
            ff.style.animationDelay = Math.random() * 6 + "s";
            ffDest.appendChild(ff);
          }
        }
        // Fireflies (CTA)
        const ffCta = document.getElementById("firefly-cta");
        if (ffCta) {
          for (let i = 0; i < 15; i++) {
            const ff = document.createElement("div");
            ff.className = "firefly";
            ff.style.left = Math.random() * 100 + "%";
            ff.style.top = Math.random() * 100 + "%";
            ff.style.width = 2 + Math.random() * 3 + "px";
            ff.style.height = ff.style.width;
            ff.style.animationDuration = 5 + Math.random() * 7 + "s";
            ff.style.animationDelay = Math.random() * 5 + "s";
            ff.style.background = "var(--green3)";
            ff.style.boxShadow =
              "0 0 8px var(--green3),0 0 16px rgba(26,188,156,.3)";
            ffCta.appendChild(ff);
          }
        }

        // ─── MOUNTAIN BIOME: Stars + Clouds (plans section) ───
        const starP = document.getElementById("star-field-plans");
        if (starP) {
          for (let i = 0; i < 60; i++) {
            const s = document.createElement("div");
            s.className = "star";
            s.style.left = Math.random() * 100 + "%";
            s.style.top = Math.random() * 70 + "%";
            s.style.width = 1 + Math.random() * 2 + "px";
            s.style.height = s.style.width;
            s.style.animationDuration = 2 + Math.random() * 5 + "s";
            s.style.animationDelay = Math.random() * 4 + "s";
            starP.appendChild(s);
          }
        }
        const cloudP = document.getElementById("cloud-plans");
        if (cloudP) {
          for (let i = 0; i < 5; i++) {
            const c = document.createElement("div");
            c.className = "cloud";
            c.style.top = 10 + Math.random() * 50 + "%";
            c.style.width = 200 + Math.random() * 300 + "px";
            c.style.height = 40 + Math.random() * 60 + "px";
            c.style.animationDuration = 40 + Math.random() * 60 + "s";
            c.style.animationDelay = Math.random() * 30 + "s";
            cloudP.appendChild(c);
          }
        }

        // ─── OCEAN BIOME: Rain + Bubbles (clips section) ───
        const rainC = document.getElementById("rain-clips");
        if (rainC) {
          for (let i = 0; i < 40; i++) {
            const r = document.createElement("div");
            r.className = "raindrop";
            r.style.left = Math.random() * 100 + "%";
            r.style.height = 15 + Math.random() * 25 + "px";
            r.style.animationDuration = 0.8 + Math.random() * 1.2 + "s";
            r.style.animationDelay = Math.random() * 3 + "s";
            r.style.opacity = 0.15 + Math.random() * 0.15;
            rainC.appendChild(r);
          }
          // Add bubbles rising
          for (let i = 0; i < 12; i++) {
            const b = document.createElement("div");
            b.className = "bubble";
            b.style.left = Math.random() * 100 + "%";
            b.style.bottom = "-20px";
            b.style.width = 4 + Math.random() * 12 + "px";
            b.style.height = b.style.width;
            b.style.animationDuration = 6 + Math.random() * 10 + "s";
            b.style.animationDelay = Math.random() * 8 + "s";
            rainC.appendChild(b);
          }
        }

        // ─── DESERT BIOME: Sand particles (FAQ section) ───
        const sandF = document.getElementById("sand-faq");
        if (sandF) {
          for (let i = 0; i < 30; i++) {
            const s = document.createElement("div");
            s.className = "sand-particle";
            s.style.left = Math.random() * 100 + "%";
            s.style.top = Math.random() * 100 + "%";
            s.style.animationDuration = 8 + Math.random() * 12 + "s";
            s.style.animationDelay = Math.random() * 10 + "s";
            sandF.appendChild(s);
          }
        }

        // ─── CTA: Stars ───
        const starC = document.getElementById("star-field-cta");
        if (starC) {
          for (let i = 0; i < 40; i++) {
            const s = document.createElement("div");
            s.className = "star";
            s.style.left = Math.random() * 100 + "%";
            s.style.top = Math.random() * 100 + "%";
            s.style.width = 1 + Math.random() * 2 + "px";
            s.style.height = s.style.width;
            s.style.animationDuration = 3 + Math.random() * 4 + "s";
            s.style.animationDelay = Math.random() * 3 + "s";
            starC.appendChild(s);
          }
        }

        // ─── THREE.JS CANVAS PARTICLES (wildlife organisms, minerals, water) ───
        function initSectionCanvas(canvasId, opts) {
          const canvas = document.getElementById(canvasId);
          if (!canvas || !canvas.parentElement) return;
          const parent = canvas.parentElement;
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(
            60,
            parent.offsetWidth / parent.offsetHeight,
            0.1,
            100,
          );
          camera.position.z = 30;
          const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: false,
            alpha: true,
          });
          renderer.setSize(parent.offsetWidth, parent.offsetHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          renderer.setClearColor(0x000000, 0);
          // Particles (organisms, minerals, water molecules)
          const pCount = opts.pCount || 80;
          const pGeo = new THREE.BufferGeometry();
          const pPos = new Float32Array(pCount * 3);
          for (let i = 0; i < pCount; i++) {
            pPos[i * 3] = (Math.random() - 0.5) * 60;
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
          }
          pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
          const pMat = new THREE.PointsMaterial({
            color: opts.pColor || 0x2ecc71,
            size: opts.pSize || 0.12,
            transparent: true,
            opacity: opts.pOp || 0.25,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });
          const particles = new THREE.Points(pGeo, pMat);
          scene.add(particles);
          // Wireframe geological shapes (rocks, minerals, crystals)
          const shapes = [];
          const geoTypes = [
            new THREE.IcosahedronGeometry(0.6, 0),
            new THREE.OctahedronGeometry(0.5, 0),
            new THREE.TetrahedronGeometry(0.5, 0),
          ];
          for (let i = 0; i < (opts.shapes || 5); i++) {
            const g = geoTypes[i % geoTypes.length];
            const m = new THREE.MeshBasicMaterial({
              color: opts.sColor || 0x2ecc71,
              wireframe: true,
              transparent: true,
              opacity: 0.04 + Math.random() * 0.04,
            });
            const mesh = new THREE.Mesh(g, m);
            mesh.position.set(
              (Math.random() - 0.5) * 50,
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 15,
            );
            mesh.userData = {
              rx: 0.002 + Math.random() * 0.005,
              ry: 0.003 + Math.random() * 0.006,
              sp: 0.1 + Math.random() * 0.3,
            };
            shapes.push(mesh);
            scene.add(mesh);
          }
          const clk = new THREE.Clock();
          function anim() {
            requestAnimationFrame(anim);
            const t = clk.getElapsedTime();
            particles.rotation.y = t * 0.008;
            particles.rotation.x = Math.sin(t * 0.04) * 0.04;
            shapes.forEach((s) => {
              s.rotation.x += s.userData.rx;
              s.rotation.y += s.userData.ry;
              s.position.y += Math.sin(t * s.userData.sp) * 0.002;
            });
            renderer.render(scene, camera);
          }
          anim();
          const ro = new ResizeObserver(() => {
            const w = parent.offsetWidth;
            const h = parent.offsetHeight;
            if (w > 0 && h > 0) {
              camera.aspect = w / h;
              camera.updateProjectionMatrix();
              renderer.setSize(w, h);
            }
          });
          ro.observe(parent);
        }
        // Forest: green organisms, plant cells
        initSectionCanvas("nc-dest", {
          pCount: 100,
          pColor: 0x4caf50,
          pSize: 0.15,
          pOp: 0.2,
          shapes: 6,
          sColor: 0x2ecc71,
        });
        // Mountain: blue-white minerals, ice crystals
        initSectionCanvas("nc-plans", {
          pCount: 70,
          pColor: 0x88bbff,
          pSize: 0.1,
          pOp: 0.18,
          shapes: 4,
          sColor: 0x6699cc,
        });
        // Ocean: cyan water molecules, marine life
        initSectionCanvas("nc-clips", {
          pCount: 90,
          pColor: 0x1abc9c,
          pSize: 0.13,
          pOp: 0.22,
          shapes: 5,
          sColor: 0x1abc9c,
        });
        // Desert: amber minerals, sand grains
        initSectionCanvas("nc-faq", {
          pCount: 60,
          pColor: 0xd4a843,
          pSize: 0.11,
          pOp: 0.15,
          shapes: 4,
          sColor: 0xd4a843,
        });
      })();

      /* HERO ENTRANCE */
      gsap.to("#hero-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.to("#hero-h1", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
      gsap.to("#hero-desc", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.7,
        ease: "power3.out",
      });
      gsap.to("#hero-btns", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.9,
        ease: "power3.out",
      });
      gsap.to("#hero-stats", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.1,
        ease: "power3.out",
      });
      gsap.to("#ob-1", {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 1.2,
        ease: "power3.out",
      });
      gsap.to("#ob-2", {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 1.4,
        ease: "power3.out",
      });
      gsap.to("#ob-3", {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 1.6,
        ease: "power3.out",
      });
      window.addEventListener(
        "scroll",
        () => {
          document
            .getElementById("nav")
            .classList.toggle("scrolled", window.scrollY > 60);
        },
        { passive: true },
      );

      /* ═══════════════════════════════════════════════════
       DESTINATION DATA — with proper name-wise thumbnails
    ═══════════════════════════════════════════════════ */
      const DESTS = [
        // ── MOST VISITED FIRST (sorted by annual visitor count) ──
        {
          name: "Taj Mahal",
          loc: "Agra, Uttar Pradesh",
          cat: "Heritage",
          emoji: "🕌",
          rating: 4.9,
          price: "₹1,100",
          season: "Oct–Mar",
          badge: "UNESCO",
          bg: "linear-gradient(145deg,#1a1228,#2a1a3a)",
          img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
          desc: "One of the Seven Wonders of the World, an ivory-white marble mausoleum built by Mughal Emperor Shah Jahan. A timeless symbol of love and architectural perfection.",
          highlights: [
            "Sunrise View",
            "Mughal Gardens",
            "Mosque & Guest House",
            "Mehtab Bagh",
            "Light Show",
          ],
          tips: "Visit at sunrise for best photos. Entry free on Fridays. Carry water and sunscreen.",
        },
        {
          name: "Golden Temple",
          loc: "Amritsar, Punjab",
          cat: "Spiritual",
          emoji: "⭐",
          rating: 4.9,
          price: "₹1,000/day",
          season: "Oct–Mar",
          badge: "ICONIC",
          bg: "linear-gradient(145deg,#1a1208,#3a2a08)",
          img: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&q=80",
          desc: "The holiest Gurdwara gleaming in gold and marble, reflected in the sacred Sarovar. The Langar feeds 100,000+ people for free daily.",
          highlights: [
            "Golden Temple Visit",
            "Langar (Free Kitchen)",
            "Wagah Border Ceremony",
            "Jallianwala Bagh",
            "Amritsari Kulcha",
          ],
          tips: "Early morning or late evening for fewer crowds. Cover head and remove shoes. Wagah Border closes at sunset.",
        },
        {
          name: "Varanasi Ghats",
          loc: "Uttar Pradesh",
          cat: "Spiritual",
          emoji: "🪔",
          rating: 4.6,
          price: "₹2,000/day",
          season: "Oct–Mar",
          badge: "SACRED",
          bg: "linear-gradient(145deg,#1a0a0a,#3a1a08)",
          img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&q=80",
          desc: "The spiritual capital—one of the world's oldest continuously inhabited cities. Ghats along the Ganges and the evening Ganga Aarti create a moving experience.",
          highlights: [
            "Ganga Aarti",
            "Boat Ride at Sunrise",
            "Kashi Vishwanath Temple",
            "Sarnath Visit",
            "Street Food Walk",
          ],
          tips: "Sunrise boat ride is unmissable. Aarti at Dashashwamedh Ghat at sunset. Wear modest clothing.",
        },
        {
          name: "Tirupati",
          loc: "Andhra Pradesh",
          cat: "Spiritual",
          emoji: "🙏",
          rating: 4.8,
          price: "₹1,500/day",
          season: "All Year",
          badge: "DIVINE",
          bg: "linear-gradient(145deg,#1a1208,#3a2210)",
          img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
          desc: "Sri Venkateswara Temple atop seven hills—the most visited religious site in the world with 50,000+ daily pilgrims. Pure divine energy.",
          highlights: [
            "Tirumala Darshan",
            "Talakona Waterfalls",
            "Sri Padmavathi Temple",
            "Akasaganga Teertham",
            "TTD Laddu",
          ],
          tips: "Book darshan online weeks ahead. ₹300 special entry saves 8+ hrs. Carry minimal belongings.",
        },
        {
          name: "Red Fort",
          loc: "Delhi",
          cat: "Heritage",
          emoji: "🏯",
          rating: 4.5,
          price: "₹35",
          season: "Oct–Mar",
          badge: "ICONIC",
          bg: "linear-gradient(145deg,#2a0808,#4a1010)",
          img: "https://images.unsplash.com/photo-1585506942812-e72b29cef752?w=600&q=80",
          desc: "The magnificent Red Fort—residence of Mughal emperors for 200 years. Where India's PM hoists the national flag on Independence Day.",
          highlights: [
            "Diwan-i-Am",
            "Diwan-i-Khas",
            "Rang Mahal",
            "Moti Masjid",
            "Light Show",
          ],
          tips: "Evening light show is a must. Combine with Chandni Chowk food walk.",
        },
        {
          name: "Qutub Minar",
          loc: "Delhi",
          cat: "Heritage",
          emoji: "🕍",
          rating: 4.6,
          price: "₹300",
          season: "Nov–Mar",
          badge: "UNESCO",
          bg: "linear-gradient(145deg,#1a1a1a,#2a2210)",
          img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
          desc: "The tallest brick minaret in the world at 72.5 meters. A stunning Indo-Islamic architecture masterpiece dating back to 1193 AD.",
          highlights: [
            "Iron Pillar",
            "Alai Darwaza",
            "Quwwat-ul-Islam Mosque",
            "Garden Complex",
            "Iltutmish Tomb",
          ],
          tips: "Visit during golden hour. Audio guides available. Combine with Mehrauli Archaeological Park.",
        },
        {
          name: "Kedarnath",
          loc: "Uttarakhand",
          cat: "Spiritual",
          emoji: "⛰️",
          rating: 4.9,
          price: "₹3,500/day",
          season: "May–Nov",
          badge: "DIVINE",
          bg: "linear-gradient(145deg,#0a1220,#1a2230)",
          img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
          desc: "At 3,583m among snow-capped Himalayas—one of the twelve Jyotirlingas. The 16 km trek is itself a spiritual journey through stunning mountains.",
          highlights: [
            "Kedarnath Temple",
            "16km Trek",
            "Chorabari Glacier",
            "Bhairavnath Temple",
            "Helicopter Darshan",
          ],
          tips: "Trek or helicopter (book well in advance). Season May–Nov only. Carry warm clothes even in summer.",
        },
        {
          name: "Amer Fort",
          loc: "Jaipur, Rajasthan",
          cat: "Heritage",
          emoji: "🏰",
          rating: 4.8,
          price: "₹550",
          season: "Oct–Feb",
          badge: "ICONIC",
          bg: "linear-gradient(145deg,#2a1a08,#4a2a10)",
          img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
          desc: "Perched on a hilltop overlooking Maota Lake, a stunning blend of Hindu and Mughal architecture with the legendary Sheesh Mahal (Mirror Palace).",
          highlights: [
            "Sheesh Mahal",
            "Light & Sound Show",
            "Ganesh Pol Gate",
            "Maota Lake",
            "Elephant Rides",
          ],
          tips: "Book the light show in advance. Visit early morning for cooler weather.",
        },
        {
          name: "Calangute Beach",
          loc: "North Goa",
          cat: "Beaches",
          emoji: "🏖️",
          rating: 4.7,
          price: "₹3,500/day",
          season: "Nov–Feb",
          badge: "POPULAR",
          bg: "linear-gradient(145deg,#0c3d6e,#1565a8)",
          img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
          desc: 'The "Queen of Beaches"—Goa\'s largest and most popular beach with water sports, beach shacks, and buzzing nightlife.',
          highlights: [
            "Water Sports",
            "Beach Shacks",
            "Saturday Night Market",
            "Fort Aguada",
            "Sunset Views",
          ],
          tips: "Weekdays for fewer crowds. Book water sports through hotel for better rates.",
        },
        {
          name: "Rishikesh",
          loc: "Uttarakhand",
          cat: "Spiritual",
          emoji: "🧘",
          rating: 4.8,
          price: "₹2,200/day",
          season: "Sep–Jun",
          badge: "YOGA CAPITAL",
          bg: "linear-gradient(145deg,#0a1e1a,#1a3e2a)",
          img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80",
          desc: "The Yoga Capital of the World on the holy Ganges amidst Himalayan foothills. Yoga ashrams to white-water rafting—spirituality meets adventure.",
          highlights: [
            "Yoga Ashrams",
            "White Water Rafting",
            "Beatles Ashram",
            "Laxman Jhula",
            "Triveni Ghat Aarti",
          ],
          tips: "Week-long yoga course for real transformation. Bungee jumping at Mohanchatti. Vegan food everywhere.",
        },
        {
          name: "Udaipur",
          loc: "Rajasthan",
          cat: "Urban",
          emoji: "🏰",
          rating: 4.8,
          price: "₹4,000/day",
          season: "Oct–Mar",
          badge: "LAKE CITY",
          bg: "linear-gradient(145deg,#0a1830,#1a2848)",
          img: "assets/images/udaipur_lake.png",
          desc: "India's most romantic city—City Palace, serene Lake Pichola, and the floating Taj Lake Palace create a fairy tale setting.",
          highlights: [
            "City Palace",
            "Lake Pichola Boat",
            "Jag Mandir Island",
            "Saheliyon ki Bari",
            "Monsoon Palace",
          ],
          tips: "Sunset from Ambrai Ghat. Boat to Jag Mandir for dinner. City Palace needs 3+ hours.",
        },
        {
          name: "Mumbai",
          loc: "Maharashtra",
          cat: "Urban",
          emoji: "🌆",
          rating: 4.5,
          price: "₹4,800/day",
          season: "Oct–Mar",
          badge: "MAX CITY",
          bg: "linear-gradient(145deg,#1a0a2e,#3a1550)",
          img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80",
          desc: "The city of dreams—Bollywood, colonial heritage, street-food culture. From Gateway of India to local trains, Mumbai pulses with unique energy.",
          highlights: [
            "Gateway of India",
            "Marine Drive Sunset",
            "Dharavi Tour",
            "Street Food Trail",
            "Leopold Cafe",
          ],
          tips: "Local train during off-peak for real Mumbai. Marine Drive sunset is unmissable. Try vada pav at Ashok.",
        },
        {
          name: "Old Delhi",
          loc: "Delhi",
          cat: "Urban",
          emoji: "🕌",
          rating: 4.6,
          price: "₹2,500/day",
          season: "Oct–Mar",
          badge: "CHAOTIC BEAUTY",
          bg: "linear-gradient(145deg,#1a1010,#2a1a18)",
          img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
          desc: "Labyrinthine lanes bursting with spices, street food, Mughal architecture, and organized chaos of 400 years of history.",
          highlights: [
            "Chandni Chowk Walk",
            "Jama Masjid",
            "Paranthe Wali Gali",
            "Spice Market",
            "Rickshaw Ride",
          ],
          tips: "Start at Jama Masjid, walk to Red Fort. Try parathas at Paranthe Wali Gali. Foot or cycle rickshaw.",
        },
        {
          name: "Mysore",
          loc: "Karnataka",
          cat: "Urban",
          emoji: "👑",
          rating: 4.7,
          price: "₹2,600/day",
          season: "Oct–Mar",
          badge: "PALACE CITY",
          bg: "linear-gradient(145deg,#1a1008,#2a2010)",
          img: "assets/images/mysuru_palace.png",
          desc: "The City of Palaces—regal heritage, silk sarees, sandalwood, and the Dasara festival. The illuminated Palace is one of India's most visited monuments.",
          highlights: [
            "Mysore Palace",
            "Chamundi Hills",
            "Brindavan Gardens",
            "Devaraja Market",
            "Silk Shopping",
          ],
          tips: "Sunday evenings—97,000 bulbs light the palace. Dasara in October is unforgettable. Buy silk from Cauvery Emporium.",
        },
        {
          name: "Hampi Ruins",
          loc: "Karnataka",
          cat: "Heritage",
          emoji: "🗿",
          rating: 4.8,
          price: "₹500",
          season: "Oct–Mar",
          badge: "UNESCO",
          bg: "linear-gradient(145deg,#2a1a08,#3a2010)",
          img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&q=80",
          desc: "Ruins of the Vijayanagara Empire scattered across a surreal boulder-strewn landscape. Once richer than Rome, now a UNESCO heritage marvel.",
          highlights: [
            "Virupaksha Temple",
            "Stone Chariot",
            "Vittala Temple",
            "Matanga Hill Sunset",
            "Royal Enclosure",
          ],
          tips: "Rent a bicycle to explore. Stay on Hippie Island for budget. Best over 2–3 days.",
        },
        {
          name: "Ajanta Caves",
          loc: "Aurangabad, Maharashtra",
          cat: "Heritage",
          emoji: "🏙️",
          rating: 4.8,
          price: "₹250",
          season: "Nov–Mar",
          badge: "UNESCO",
          bg: "linear-gradient(145deg,#1a1208,#2a1c10)",
          img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
          desc: "30 rock-cut Buddhist cave monuments from 2nd century BCE featuring extraordinary paintings—the finest surviving examples of ancient Indian art.",
          highlights: [
            "Cave 1 Paintings",
            "Cave 26 Buddha",
            "Waterfall View",
            "Ancient Murals",
            "Buddhist Viharas",
          ],
          tips: "Hire a guide. Caves closed Mondays. Comfortable walking shoes essential.",
        },
        {
          name: "Ellora Caves",
          loc: "Aurangabad, Maharashtra",
          cat: "Heritage",
          emoji: "⛩️",
          rating: 4.8,
          price: "₹250",
          season: "Nov–Mar",
          badge: "UNESCO",
          bg: "linear-gradient(145deg,#181220,#281a30)",
          img: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80",
          desc: "34 caves representing Buddhist, Hindu, and Jain traditions. Kailasa Temple (Cave 16) is the largest monolithic rock excavation in the world.",
          highlights: [
            "Kailasa Temple",
            "Buddhist Caves",
            "Jain Caves",
            "Rock-cut Art",
            "Cave Sculptures",
          ],
          tips: "Plan half a day minimum. Photography allowed. Best with a knowledgeable guide.",
        },
        {
          name: "Konark Temple",
          loc: "Puri, Odisha",
          cat: "Heritage",
          emoji: "🌅",
          rating: 4.7,
          price: "₹40",
          season: "Oct–Mar",
          badge: "UNESCO",
          bg: "linear-gradient(145deg,#201808,#3a2810)",
          img: "https://images.unsplash.com/photo-1558618047-3bcd21db5a0f?w=600&q=80",
          desc: "A giant chariot with 24 intricately carved wheels and seven horses. An architectural masterpiece dedicated to the Hindu Sun God, Surya.",
          highlights: [
            "Stone Chariot Wheels",
            "Dance Hall",
            "Horse Sculptures",
            "Museum",
            "Chandrabhaga Beach",
          ],
          tips: "Attend Konark Dance Festival in December. Temple magical at sunrise. Combine with Puri.",
        },
        {
          name: "Alleppey",
          loc: "Kerala",
          cat: "Backwaters",
          emoji: "🛥️",
          rating: 4.8,
          price: "₹8,500/2nights",
          season: "Sep–Feb",
          badge: "BACKWATERS",
          bg: "linear-gradient(145deg,#0a2e1e,#145a38)",
          img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
          desc: "Venice of the East—palm-fringed canals explored on traditional Kettuvallam houseboats. Wake to misty mornings and sleep to gentle rocking.",
          highlights: [
            "Houseboat Stay",
            "Backwater Cruise",
            "Village Cycling",
            "Toddy Shop Lunch",
            "Mararikulam Beach",
          ],
          tips: "Premium houseboat with AC and upper deck. Avoid weekends. Sunset from upper deck is magical.",
        },
        {
          name: "Jodhpur",
          loc: "Rajasthan",
          cat: "Urban",
          emoji: "🔵",
          rating: 4.7,
          price: "₹3,200/day",
          season: "Oct–Feb",
          badge: "BLUE CITY",
          bg: "linear-gradient(145deg,#0a1040,#1a2060)",
          img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
          desc: "The Blue City—indigo-washed houses surrounding Mehrangarh Fort. One of India's most photogenic cities blending royal history and street life.",
          highlights: [
            "Mehrangarh Fort",
            "Blue City Walk",
            "Clock Tower Market",
            "Umaid Bhawan Palace",
            "Zip-lining",
          ],
          tips: "Blue city walking tour at sunrise is magical. Try mirchi vada. Zip-line from Mehrangarh Fort.",
        },
        {
          name: "Kolkata",
          loc: "West Bengal",
          cat: "Urban",
          emoji: "🎨",
          rating: 4.6,
          price: "₹2,800/day",
          season: "Oct–Mar",
          badge: "CITY OF JOY",
          bg: "linear-gradient(145deg,#1a1028,#2a1a38)",
          img: "https://images.unsplash.com/photo-1558431382-27e303142255?w=600&q=80",
          desc: "The cultural capital—literary festivals, art galleries, Durga Puja pandals, and the best street food in the country. The iconic Howrah Bridge spans the Hooghly River.",
          highlights: [
            "Victoria Memorial",
            "Howrah Bridge",
            "Kumartuli Idol Makers",
            "Park Street",
            "Durga Puja",
          ],
          tips: "Visit during Durga Puja (Oct) for the most spectacular festival. Try phuchka. Hand-pulled rickshaw in North Kolkata.",
        },
        {
          name: "Ranthambhore",
          loc: "Rajasthan",
          cat: "Wildlife",
          emoji: "🐅",
          rating: 4.8,
          price: "₹8,000/day",
          season: "Oct–Jun",
          badge: "TIGER RESERVE",
          bg: "linear-gradient(145deg,#1a1008,#2a2010)",
          img: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&q=80",
          desc: "One of India's best places to spot wild Bengal tigers. Ancient fort overlooks the park where tigers roam among historic ruins and lakes.",
          highlights: [
            "Tiger Safari",
            "Ranthambhore Fort",
            "Padam Talao Lake",
            "Crocodile Spotting",
            "Birdwatching",
          ],
          tips: "Book zone 1–5 for best sightings. Carry binoculars and telephoto lens. Morning safaris best.",
        },
        {
          name: "Jim Corbett",
          loc: "Nainital, Uttarakhand",
          cat: "Wildlife",
          emoji: "🦁",
          rating: 4.7,
          price: "₹7,500/day",
          season: "Nov–Jun",
          badge: "TIGER RESERVE",
          bg: "linear-gradient(145deg,#0a1e08,#1a3e10)",
          img: "https://images.unsplash.com/photo-1615824996195-f780bba7cfab?w=600&q=80",
          desc: "India's oldest national park (1936). Named after hunter-turned-conservationist Jim Corbett. Home to 200+ tigers, elephants, leopards, 600+ bird species.",
          highlights: [
            "Dhikala Zone Safari",
            "Bijrani Zone",
            "Jhirna Gate",
            "Elephant Safari",
            "Corbett Museum",
          ],
          tips: "Dhikala zone is best but needs overnight booking. Book permits months ahead. Avoid monsoon.",
        },
        {
          name: "Kaziranga",
          loc: "Assam",
          cat: "Wildlife",
          emoji: "🦏",
          rating: 4.9,
          price: "₹6,000/day",
          season: "Nov–Apr",
          badge: "UNESCO",
          bg: "linear-gradient(145deg,#0a2010,#1a4020)",
          img: "https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=600&q=80",
          desc: "Home to two-thirds of the world's one-horned rhinoceros. Also shelters wild buffalo, swamp deer, elephants, and Bengal tigers.",
          highlights: [
            "Rhino Safari",
            "Elephant Ride",
            "Central Range",
            "Tea Garden Visit",
            "Birdwatching",
          ],
          tips: "Elephant safaris at dawn—book day before. Central and Western ranges best for rhinos.",
        },
        {
          name: "Radhanagar Beach",
          loc: "Andaman",
          cat: "Beaches",
          emoji: "🐠",
          rating: 4.9,
          price: "₹4,000/day",
          season: "Nov–Apr",
          badge: "TOP RATED",
          bg: "linear-gradient(145deg,#0a2a4a,#1a5a8a)",
          img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
          desc: "Consistently ranked among Asia's best—powdery white sand, turquoise waters, and pristine tropical forest backdrop.",
          highlights: [
            "Crystal Clear Water",
            "Snorkeling",
            "Sunset Point",
            "Elephant Beach",
            "Scuba Diving",
          ],
          tips: "Reach by 3pm for best sunset. No facilities after dark. Reef-safe sunscreen only.",
        },
        {
          name: "Spiti Valley",
          loc: "Himachal Pradesh",
          cat: "Mountains",
          emoji: "🏔️",
          rating: 4.9,
          price: "₹4,200/day",
          season: "Jun–Sep",
          badge: "REMOTE",
          bg: "linear-gradient(145deg,#1a2a4a,#243859)",
          img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
          desc: "A cold desert at 12,500 feet—stark landscapes, ancient monasteries, and starlit skies make it a dream for adventurers.",
          highlights: [
            "Key Monastery",
            "Chandratal Lake",
            "Dhankar Gompa",
            "Kibber Village",
            "Stargazing",
          ],
          tips: "Acclimatize before heading up. Carry altitude sickness meds. Roads open Jun–Oct only.",
        },
        {
          name: "Nubra Valley",
          loc: "Ladakh",
          cat: "Mountains",
          emoji: "🐪",
          rating: 4.9,
          price: "₹5,000/day",
          season: "Jun–Sep",
          badge: "HIGH ALT.",
          bg: "linear-gradient(145deg,#1a1830,#2a2840)",
          img: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&q=80",
          desc: "Double-humped Bactrian camels on sand dunes at 10,000 feet. The drive through Khardung La (one of the highest roads) is unforgettable.",
          highlights: [
            "Hunder Sand Dunes",
            "Diskit Monastery",
            "Bactrian Camel Safari",
            "Khardung La Pass",
            "Hot Springs",
          ],
          tips: "Carry cash—ATMs unreliable. Acclimatize in Leh first (2+ days). Permits required.",
        },
        {
          name: "Palolem Beach",
          loc: "South Goa",
          cat: "Beaches",
          emoji: "🛶",
          rating: 4.8,
          price: "₹3,200/day",
          season: "Nov–Feb",
          badge: "SERENE",
          bg: "linear-gradient(145deg,#0a3040,#1a6080)",
          img: "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=600&q=80",
          desc: "A crescent-shaped bay fringed with coconut palms. South Goa's crown jewel—kayak to Butterfly Beach or spot dolphins at dawn.",
          highlights: [
            "Kayaking",
            "Dolphin Spotting",
            "Silent Noise Parties",
            "Beach Hut Stays",
            "Sunset Kayaking",
          ],
          tips: "Book beachfront huts early. Silent disco parties are legendary. Try the dolphin trip.",
        },
        {
          name: "Ajmer Sharif",
          loc: "Rajasthan",
          cat: "Spiritual",
          emoji: "🕌",
          rating: 4.6,
          price: "₹1,200/day",
          season: "Oct–Mar",
          badge: "SUFI",
          bg: "linear-gradient(145deg,#1a0808,#2a1010)",
          img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
          desc: "The Ajmer Sharif Dargah shrine of Sufi saint Moinuddin Chishti attracts devotees from all faiths. Urs Festival features qawwali and prayers.",
          highlights: [
            "Dargah Sharif",
            "Ana Sagar Lake",
            "Adhai Din Ka Jhonpra",
            "Taragarh Fort",
            "Urs Festival",
          ],
          tips: "Early morning or evening for peaceful darshan. Respectful attire. Combine with Pushkar day trip.",
        },
        {
          name: "Rohtang Pass",
          loc: "Manali, HP",
          cat: "Mountains",
          emoji: "❄️",
          rating: 4.7,
          price: "₹3,500/day",
          season: "May–Oct",
          badge: "SCENIC",
          bg: "linear-gradient(145deg,#1a2848,#2a3868)",
          img: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&q=80",
          desc: "At 3,978 meters—a gateway between Kullu Valley and Lahaul-Spiti with snow-covered peaks, glaciers, and panoramic views.",
          highlights: [
            "Snow Activities",
            "Panoramic Views",
            "Beas Kund Trek",
            "Atal Tunnel",
            "Glacier Walk",
          ],
          tips: "Permits required—book online. Weather changes quickly; carry warm layers. Avoid weekends.",
        },
        {
          name: "Varkala Cliffs",
          loc: "Kerala",
          cat: "Beaches",
          emoji: "🪨",
          rating: 4.7,
          price: "₹2,500/day",
          season: "Oct–Mar",
          badge: "SCENIC",
          bg: "linear-gradient(145deg,#1a0c0a,#3a1a10)",
          img: "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=80",
          desc: "Dramatic red laterite cliffs dropping into the Arabian Sea. The cliff-top path is lined with cafes offering breathtaking ocean views.",
          highlights: [
            "Cliff Walks",
            "Papanasam Beach",
            "Janardanaswamy Temple",
            "Ayurvedic Spas",
            "Cliff Cafes",
          ],
          tips: "Stay at cliff-edge properties for ocean views. Great Ayurvedic massage options nearby.",
        },
        {
          name: "Chopta Valley",
          loc: "Uttarakhand",
          cat: "Mountains",
          emoji: "🦌",
          rating: 4.8,
          price: "₹2,800/day",
          season: "Apr–Jun",
          badge: "MINI SWISS",
          bg: "linear-gradient(145deg,#0a1e1a,#1a3e2a)",
          img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
          desc: '"Mini Switzerland of India"—a pristine meadow surrounded by forests of pine, deodar, and rhododendron. Base for Tungnath trek.',
          highlights: [
            "Tungnath Trek",
            "Chandrashila Summit",
            "Deoria Tal",
            "Rhododendron Forests",
            "Winter Snowfall",
          ],
          tips: "Tungnath trek moderate; doable in one day. Camp at Deoria Tal for stunning reflections.",
        },
        {
          name: "Coorg",
          loc: "Karnataka",
          cat: "Mountains",
          emoji: "☕",
          rating: 4.7,
          price: "₹3,800/day",
          season: "Oct–Mar",
          badge: "COFFEE LAND",
          bg: "linear-gradient(145deg,#0a1e0a,#1a3e1a)",
          img: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=600&q=80",
          desc: '"Scotland of India"—Coorg is famous for coffee plantations, waterfalls, and the warm hospitality of the Kodava people.',
          highlights: [
            "Coffee Plantation Tour",
            "Abbey Falls",
            "Raja's Seat",
            "Namdroling Monastery",
            "Iruppu Falls",
          ],
          tips: "Stay at a homestay for authentic cuisine. Visit a coffee estate. Best explored by self-drive.",
        },
        {
          name: "Periyar",
          loc: "Kerala",
          cat: "Wildlife",
          emoji: "🐘",
          rating: 4.7,
          price: "₹4,500/day",
          season: "Oct–Mar",
          badge: "BIOSPHERE",
          bg: "linear-gradient(145deg,#0a1e18,#1a3e28)",
          img: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80",
          desc: "Tiger and elephant reserve around an artificial lake in the cardamom hills. Unique boat safaris let you watch elephants bathing from the water.",
          highlights: [
            "Boat Safari",
            "Bamboo Rafting",
            "Spice Garden Tour",
            "Elephant Junction",
            "Night Patrol",
          ],
          tips: "Bamboo rafting is exceptional for photography. Visit a cardamom plantation. Ayurvedic massage after safari.",
        },
        {
          name: "Sundarbans",
          loc: "West Bengal",
          cat: "Wildlife",
          emoji: "🐊",
          rating: 4.6,
          price: "₹5,000/day",
          season: "Oct–Mar",
          badge: "UNESCO",
          bg: "linear-gradient(145deg,#081818,#183030)",
          img: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=600&q=80",
          desc: "The world's largest mangrove forest, home to the Royal Bengal Tiger that swims through tidal waterways. A surreal world of water, mud, and green.",
          highlights: [
            "Tiger Tracking Boat Safari",
            "Mangrove Walks",
            "Sajnekhali Watch Tower",
            "Crocodile Spotting",
            "Honey Collectors",
          ],
          tips: "Multi-day boat excursions best for tiger spotting. Carry insect repellent. Gov-approved guides mandatory.",
        },
        {
          name: "Kumarakom",
          loc: "Kerala",
          cat: "Backwaters",
          emoji: "🐦",
          rating: 4.8,
          price: "₹9,000/2nights",
          season: "Oct–Feb",
          badge: "BIRD SANCTUARY",
          bg: "linear-gradient(145deg,#081e18,#143830)",
          img: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80",
          desc: "On the banks of Vembanad Lake, famous for its bird sanctuary and luxury resorts. Migratory birds from Siberia visit Nov–Feb.",
          highlights: [
            "Bird Sanctuary",
            "Vembanad Lake Cruise",
            "Ayurvedic Resort",
            "Village Life Tour",
            "Fishing Experience",
          ],
          tips: "Visit 6 AM for bird sightings. Combine with Alleppey. Luxury resorts offer Ayurvedic packages.",
        },
        {
          name: "Kollam Backwaters",
          loc: "Kerala",
          cat: "Backwaters",
          emoji: "🌴",
          rating: 4.6,
          price: "₹7,000/2nights",
          season: "Oct–Feb",
          badge: "SERENE",
          bg: "linear-gradient(145deg,#0a2a1a,#1a4a2a)",
          img: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80",
          desc: "Southern gateway to Kerala's backwaters with the longest stretch. Ashtamudi Lake cruise is less crowded and more authentic.",
          highlights: [
            "Ashtamudi Lake Cruise",
            "Cashew Factories",
            "Thirumullavaram Beach",
            "Palaruvi Waterfall",
            "Krishnapuram Palace",
          ],
          tips: "8-hour public ferry from Kollam to Alleppey for authentic experience. Try cashew feni.",
        },
        {
          name: "Marina Beach",
          loc: "Chennai, TN",
          cat: "Beaches",
          emoji: "🌊",
          rating: 4.4,
          price: "₹500/day",
          season: "Nov–Mar",
          badge: "LARGEST",
          bg: "linear-gradient(145deg,#0a1a3a,#1a3a6a)",
          img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80",
          desc: "The second longest urban beach in the world at 13 km along the Bay of Bengal. A cultural hub with stalls, horse rides, and Madras vibes.",
          highlights: [
            "Evening Sundal Stalls",
            "Lighthouse",
            "Fort St George",
            "MGR Memorial",
            "Sunrise Walk",
          ],
          tips: "Visit evenings for street food. Don't swim—currents strong. Great sunrise photography.",
        },
        {
          name: "Gokarna Beach",
          loc: "Karnataka",
          cat: "Beaches",
          emoji: "🕉️",
          rating: 4.7,
          price: "₹1,800/day",
          season: "Oct–Mar",
          badge: "HIDDEN GEM",
          bg: "linear-gradient(145deg,#0a2a1a,#1a5a3a)",
          img: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80",
          desc: "Goa vibes minus commercialization. Trek between Om Beach, Half Moon, and Paradise Beach for unforgettable coastal scenery.",
          highlights: [
            "Om Beach",
            "Half Moon Beach Trek",
            "Mahabaleshwar Temple",
            "Paradise Beach",
            "Cliff Camping",
          ],
          tips: "Trek Om to Paradise Beach for magic. Carry water and snacks. Camp overnight at Half Moon.",
        },
        {
          name: "Ziro Valley",
          loc: "Arunachal Pradesh",
          cat: "Mountains",
          emoji: "🌾",
          rating: 4.8,
          price: "₹3,000/day",
          season: "Sep–Oct",
          badge: "UNESCO NOM.",
          bg: "linear-gradient(145deg,#0a1a0a,#1a3a1a)",
          img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
          desc: "Home to the Apatani tribe—lush green valley with rice fields, bamboo groves, and pine-clad hills. The Ziro Music Festival is Gen Z legend.",
          highlights: [
            "Ziro Music Festival",
            "Apatani Villages",
            "Rice Terraces",
            "Tarin Fish Farm",
            "Talley Valley",
          ],
          tips: "Music fest in late September—book months ahead. Inner Line Permit required.",
        },
      ];

      /* ═══════════════════════════════════════════════════
       RENDER DESTINATIONS
    ═══════════════════════════════════════════════════ */
      let showAllDestsFlag = false;
      const INITIAL_COUNT = 8;

      function starsHTML(r) {
        const f = Math.floor(r);
        return Array.from(
          { length: 5 },
          (_, i) =>
            `<span style="color:${i < f ? "var(--green)" : "rgba(46,204,113,0.2)"};font-size:16px">★</span>`,
        ).join("");
      }

      function renderDests(cat) {
        const grid = document.getElementById("dest-grid");
        const data = cat === "all" ? DESTS : DESTS.filter((d) => d.cat === cat);
        const isAll = cat === "all";
        const showCount =
          isAll && !showAllDestsFlag ? INITIAL_COUNT : data.length;
        const visibleData = data.slice(0, showCount);
        document.getElementById("dest-count").textContent =
          `Showing ${visibleData.length} of ${data.length} destinations`;
        grid.innerHTML = "";
        visibleData.forEach((d, i) => {
          const card = document.createElement("div");
          card.className = "dest-card";
          card.innerHTML = `
      <div class="dest-img" style="background:${d.bg}">
        ${d.img ? `<img src="${d.img}" alt="${d.name}" loading="lazy" onerror="this.style.display='none'"/>` : ""}
        <div class="dest-img-ov"></div>
        <div class="dest-badge">${d.badge}</div>
        <div class="dest-rating-badge">${d.rating} ★</div>
      </div>
      <div class="dest-body">
        <div class="dest-cat">${d.cat}</div>
        <div class="dest-name">${d.name}</div>
        <div class="dest-loc">📍 ${d.loc}</div>
        <div class="dest-desc-preview">${d.desc || ""}</div>
        <div class="dest-meta">
          <div><div class="dest-price">${d.price}</div><div style="font-size:11px;color:var(--text4);margin-top:2px">From</div></div>
          <div><div class="dest-season">${d.season}</div><div style="font-size:11px;color:var(--text4);margin-top:2px;text-align:right">Best Time</div></div>
        </div>
        <div class="dest-view-btn">Explore Details →</div>
      </div>`;
          card.addEventListener("click", () => openDestModal(d));
          grid.appendChild(card);
        });
        const wrap = document.getElementById("see-more-wrap");
        const btn = document.getElementById("btn-see-more");
        if (isAll && data.length > INITIAL_COUNT) {
          wrap.style.display = "flex";
          if (showAllDestsFlag) {
            btn.innerHTML = 'Show Less <span class="arrow">↑</span>';
            btn.onclick = () => {
              showAllDestsFlag = false;
              renderDests("all");
              window.scrollTo({
                top: document.getElementById("destinations").offsetTop - 80,
                behavior: "smooth",
              });
            };
          } else {
            btn.innerHTML = `See All ${data.length} Destinations <span class="arrow">↓</span>`;
            btn.onclick = () => {
              showAllDestsFlag = true;
              renderDests("all");
            };
          }
        } else {
          wrap.style.display = "none";
        }
      }
      window.showAllDests = function () {
        showAllDestsFlag = true;
        renderDests("all");
      };
      renderDests("all");

      /* Detail Modal */
      function openDestModal(d) {
        const heroEl = document.getElementById("dm-hero");
        heroEl.style.background = d.bg;
        const oldImg = heroEl.querySelector("img");
        if (oldImg) oldImg.remove();
        if (d.img) {
          const img = document.createElement("img");
          img.src = d.img;
          img.alt = d.name;
          heroEl.insertBefore(img, heroEl.firstChild);
        }
        document.getElementById("dm-emoji").textContent = d.emoji;
        document.getElementById("dm-badge").textContent = d.badge;
        document.getElementById("dm-cat").textContent = d.cat;
        document.getElementById("dm-name").textContent = d.name;
        document.getElementById("dm-loc").textContent = "📍 " + d.loc;
        document.getElementById("dm-desc").textContent =
          d.desc || "Explore this stunning Indian destination...";
        document.getElementById("dm-info-grid").innerHTML = `
    <div class="dm-info-box"><div class="dm-info-val">${d.rating}/5</div><div class="dm-info-label">Rating</div></div>
    <div class="dm-info-box"><div class="dm-info-val">${d.price}</div><div class="dm-info-label">Starting From</div></div>
    <div class="dm-info-box"><div class="dm-info-val">${d.season}</div><div class="dm-info-label">Best Season</div></div>`;
        const hlGrid = document.getElementById("dm-hl-grid");
        hlGrid.innerHTML = "";
        (d.highlights || []).forEach((h) => {
          hlGrid.innerHTML += `<span class="dm-hl-tag">${h}</span>`;
        });
        document.getElementById("dm-tips-text").textContent =
          d.tips || "Carry comfortable shoes and stay hydrated.";
        document.getElementById("dest-modal-overlay").classList.add("open");
        document.body.style.overflow = "hidden";
      }
      window.closeDestModal = function () {
        document.getElementById("dest-modal-overlay").classList.remove("open");
        document.body.style.overflow = "";
      };
      document
        .getElementById("dest-modal-overlay")
        .addEventListener("click", (e) => {
          if (e.target === document.getElementById("dest-modal-overlay"))
            closeDestModal();
        });

      /* Filter */
      (function () {
        const fc = document.getElementById("dest-filter");
        const btns = fc.querySelectorAll(".df");
        function hf(e) {
          e.preventDefault();
          e.stopPropagation();
          const btn = e.target.closest(".df");
          if (!btn) return;
          btns.forEach((b) => b.classList.remove("on"));
          btn.classList.add("on");
          showAllDestsFlag = false;
          renderDests(btn.dataset.cat);
        }
        fc.addEventListener("click", hf);
        fc.addEventListener(
          "touchend",
          function (e) {
            const btn = e.target.closest(".df");
            if (!btn) return;
            e.preventDefault();
            hf(e);
          },
          { passive: false },
        );
      })();

      /* Footer */
      const ftExplore = document.getElementById("ft-explore");
      [
        "Taj Mahal",
        "Goa Beaches",
        "Spiti Valley",
        "Kerala Backwaters",
        "Rajasthan Heritage",
        "Ranthambhore",
      ].forEach((n) => {
        const li = document.createElement("li");
        li.innerHTML = `<a>${n}</a>`;
        ftExplore.appendChild(li);
      });

      /* ═══════════════════════════════════════════════════
       TRIP PLANS
    ═══════════════════════════════════════════════════ */
      const PLANS = {
        "2d": [
          {
            dest: "Golden Triangle Sprint",
            sub: "Delhi · Agra · Back",
            days: [
              {
                t: "Delhi Arrival",
                d: "Red Fort, Chandni Chowk, India Gate, Old Delhi food walk",
              },
              {
                t: "Taj Mahal Sunrise",
                d: "Agra Fort, Taj Mahal at sunrise, return to Delhi",
              },
            ],
            budget: "₹8,500–12,000",
          },
          {
            dest: "Goa Quick Escape",
            sub: "Goa · Beaches · Nightlife",
            days: [
              {
                t: "North Goa Day",
                d: "Calangute, Baga Beach, shack lunch, Anjuna flea market",
              },
              {
                t: "South Goa + Night",
                d: "Palolem beach, Fort Aguada, seafood dinner, beach party",
              },
            ],
            budget: "₹7,000–10,000",
          },
          {
            dest: "Mysore Weekend",
            sub: "Bangalore · Mysore · Palace",
            days: [
              {
                t: "Mysore Arrival",
                d: "Mysore Palace, Devaraja Market, Chamundi Hills",
              },
              {
                t: "Brindavan + Return",
                d: "Brindavan Gardens, silk shopping, St. Philomena's Church",
              },
            ],
            budget: "₹5,500–8,000",
          },
          {
            dest: "Rishikesh Retreat",
            sub: "Haridwar · Rishikesh",
            days: [
              {
                t: "Haridwar Ganga Aarti",
                d: "Har Ki Pauri, Ganga Aarti ceremony, evening prayers",
              },
              {
                t: "Rishikesh Yoga",
                d: "Yoga class, Beatles Ashram, Laxman Jhula, river rafting",
              },
            ],
            budget: "₹4,500–7,000",
          },
        ],
        "3d": [
          {
            dest: "Rajasthan Triangle",
            sub: "Jaipur · Jodhpur · Pushkar",
            days: [
              {
                t: "Jaipur — Pink City",
                d: "Amber Fort, Hawa Mahal, City Palace, Jantar Mantar",
              },
              {
                t: "Jodhpur — Blue City",
                d: "Mehrangarh Fort, Jaswant Thada, Clock Tower market",
              },
              {
                t: "Pushkar Lake",
                d: "Brahma Temple, Pushkar Lake, camel safari sunset",
              },
            ],
            budget: "₹14,000–20,000",
          },
          {
            dest: "Kerala Highlights",
            sub: "Kochi · Munnar · Alleppey",
            days: [
              {
                t: "Kochi Heritage",
                d: "Fort Kochi, Chinese fishing nets, Mattancherry, spice market",
              },
              {
                t: "Munnar Tea",
                d: "Tea museum, Eravikulam NP, Top Station viewpoint",
              },
              {
                t: "Alleppey Houseboat",
                d: "Houseboat cruise, backwater village life, sunset on deck",
              },
            ],
            budget: "₹16,000–24,000",
          },
          {
            dest: "Himachal Escape",
            sub: "Shimla · Manali · Solang",
            days: [
              {
                t: "Shimla Colonial",
                d: "Mall Road, Christ Church, Jakhu Temple, Annadale",
              },
              {
                t: "Manali Adventure",
                d: "Hadimba Temple, Van Vihar, Old Manali village",
              },
              {
                t: "Solang Valley",
                d: "Paragliding, skiing, snow tubing, Rohtang Pass",
              },
            ],
            budget: "₹15,000–22,000",
          },
          {
            dest: "Golden Triangle",
            sub: "Delhi · Agra · Jaipur",
            days: [
              {
                t: "Delhi Discovery",
                d: "Qutub Minar, Humayun's Tomb, India Gate, Dilli Haat",
              },
              {
                t: "Agra — Taj",
                d: "Taj Mahal sunrise, Agra Fort, Fatehpur Sikri",
              },
              {
                t: "Jaipur — Pink",
                d: "Amer Fort, Hawa Mahal, City Palace, Bapu Bazaar",
              },
            ],
            budget: "₹18,000–26,000",
          },
          {
            dest: "Andaman Paradise",
            sub: "Port Blair · Havelock",
            days: [
              {
                t: "Port Blair",
                d: "Cellular Jail, Corbyn's Cove, museum, light show",
              },
              {
                t: "Havelock Island",
                d: "Radhanagar Beach, snorkeling, Neil Island ferry",
              },
              {
                t: "Water Sports",
                d: "Scuba diving, sea walk, glass bottom boat, sunset cruise",
              },
            ],
            budget: "₹22,000–32,000",
          },
        ],
        "5d": [
          {
            dest: "South India Grand",
            sub: "Chennai · Madurai · Ooty · Mysore",
            days: [
              {
                t: "Chennai",
                d: "Marina Beach, Kapaleeshwarar Temple, Mahabalipuram",
              },
              {
                t: "Madurai",
                d: "Meenakshi Temple, Thirumalai Nayakkar Palace, food",
              },
              {
                t: "Ooty",
                d: "Toy train, Botanical Gardens, Doddabetta Peak, tea",
              },
              { t: "Coorg", d: "Coffee plantation, Abbey Falls, Raja's Seat" },
              {
                t: "Mysore",
                d: "Mysore Palace, Chamundi Hills, Brindavan Gardens",
              },
            ],
            budget: "₹28,000–40,000",
          },
          {
            dest: "Rajasthan Odyssey",
            sub: "Jaipur · Jodhpur · Jaisalmer · Udaipur",
            days: [
              {
                t: "Jaipur",
                d: "Amber Fort, City Palace, Jantar Mantar, bazaars",
              },
              {
                t: "Jodhpur",
                d: "Mehrangarh Fort, Umaid Bhawan Palace, Kailana Lake",
              },
              {
                t: "Jaisalmer",
                d: "Fort, Sam Sand Dunes, camel safari, bonfire",
              },
              {
                t: "Bikaner",
                d: "Junagarh Fort, Karni Mata temple, camel research",
              },
              {
                t: "Udaipur",
                d: "City Palace, Lake Pichola boat, Jagdish Temple",
              },
            ],
            budget: "₹35,000–55,000",
          },
          {
            dest: "Northeast Wonder",
            sub: "Kaziranga · Shillong · Cherrapunji",
            days: [
              {
                t: "Kaziranga Safari",
                d: "Jeep safari, elephant safari, rhinos!",
              },
              {
                t: "Guwahati",
                d: "Kamakhya Temple, Umananda Island, Brahmaputra",
              },
              {
                t: "Shillong",
                d: "Ward's Lake, Elephant Falls, Police Bazaar",
              },
              {
                t: "Cherrapunji",
                d: "Seven Sisters Falls, Mawsmai Cave, root bridges",
              },
              { t: "Dawki", d: "Umngot River, Shnongpdeng village, boat ride" },
            ],
            budget: "₹32,000–48,000",
          },
        ],
        "7d": [
          {
            dest: "Kerala Complete",
            sub: "Kochi · Munnar · Alleppey · Varkala · Kovalam",
            days: [
              {
                t: "Kochi",
                d: "Fort Kochi, Mattancherry, Synagogue, Chinese nets",
              },
              {
                t: "Munnar",
                d: "Tea museum, Eravikulam NP, Kundala Lake, Top Station",
              },
              {
                t: "Thekkady",
                d: "Periyar cruise, spice garden, Ayurvedic spa",
              },
              { t: "Alleppey", d: "Houseboat cruise, village life, cycling" },
              {
                t: "Kollam",
                d: "Ashtamudi Lake, cashew factory, Krishnapuram Palace",
              },
              {
                t: "Varkala",
                d: "Beach, cliff walk, Ayurvedic massage, seafood",
              },
              {
                t: "Kovalam",
                d: "Lighthouse Beach, Halcyon Castle, Ayurvedic treatment",
              },
            ],
            budget: "₹55,000–80,000",
          },
          {
            dest: "Himachal Adventure",
            sub: "Delhi · Shimla · Manali · Spiti · Back",
            days: [
              {
                t: "Delhi",
                d: "Old Delhi food, Humayun's Tomb, Connaught Place",
              },
              {
                t: "Shimla",
                d: "Mall Road, Christ Church, Kufri, heritage hotels",
              },
              {
                t: "Manali",
                d: "Hadimba Devi Temple, Solang Valley, Van Vihar",
              },
              {
                t: "Rohtang",
                d: "Rohtang Pass (3978m), panoramic views, yak riding",
              },
              {
                t: "Spiti",
                d: "Key Monastery, Kibber, Pin Valley, Chicham Bridge",
              },
              {
                t: "Lahaul",
                d: "Chandratal Lake trek, Kunzum Pass, Buddhist culture",
              },
              {
                t: "Return",
                d: "Manali markets, Kullu shawl shopping, Manu Temple",
              },
            ],
            budget: "₹65,000–95,000",
          },
        ],
      };
      window.shareTrip = function (btn, destName) {
        const card = btn.closest(".plan-card");
        const footerBtns = card.querySelector(".plan-footer");
        const originalHTML = footerBtns.innerHTML;
        footerBtns.innerHTML =
          '<div style="font-size:12px;color:var(--green);font-weight:bold;text-align:center;width:100%">TravelMantra AI Itinerary</div>';

        const opt = {
          margin: 0.4,
          filename: destName.replace(/\s+/g, "_") + "_Itinerary.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: "#0a0f0a" },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        const prevTransform = card.style.transform;
        card.style.transform = "none";

        html2pdf()
          .set(opt)
          .from(card)
          .save()
          .then(() => {
            footerBtns.innerHTML = originalHTML;
            card.style.transform = prevTransform;
          });
      };

      function renderPlans(key) {
        const g = document.getElementById("pg-" + key);
        if (!g || g.children.length) return;
        (PLANS[key] || []).forEach((p) => {
          const card = document.createElement("div");
          card.className = "plan-card";
          card.innerHTML = `<div class="plan-header"><div class="plan-dest">${p.dest}</div><div class="plan-duration">${p.sub}</div></div><div class="plan-days">${p.days.map((d, i) => `<div class="plan-day"><div class="plan-day-n">D${i + 1}</div><div><div class="plan-day-t">${d.t}</div><div class="plan-day-d">${d.d}</div></div></div>`).join("")}</div><div class="plan-footer"><div><div style="font-size:11px;color:var(--text4);margin-bottom:3px">Budget Range</div><div class="plan-budget">${p.budget}</div></div><div style="display:flex;gap:8px"><button class="plan-btn" style="background:transparent;border:1px solid var(--green);color:var(--green)" onclick="shareTrip(this, '${p.dest}')">Share PDF</button><button class="plan-btn">Book Now →</button></div></div>`;
          g.appendChild(card);
        });
      }
      window.switchPlan = function (key, btn) {
        document
          .querySelectorAll(".plan-tab")
          .forEach((b) => b.classList.remove("on"));
        document
          .querySelectorAll(".plans-content")
          .forEach((c) => c.classList.remove("on"));
        btn.classList.add("on");
        document.getElementById("plans-" + key).classList.add("on");
        renderPlans(key);
      };
      renderPlans("5d");

      /* ═══════════════════════════════════════════════════
       VIDEO CLIPS — Premium thumbnails
    ═══════════════════════════════════════════════════ */
      const CLIPS = [
        {
          name: "Taj Mahal at Sunrise",
          loc: "Agra, Uttar Pradesh",
          dur: "3:24",
          yt: "Uy-AhSGoXgo",
          cat: "Heritage",
          views: "2.4M views",
          thumb:
            "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=85",
        },
        {
          name: "Kerala Backwaters",
          loc: "Alleppey, Kerala",
          dur: "4:12",
          yt: "kdVEI4K9s3Y",
          cat: "Backwaters",
          views: "1.8M views",
          thumb:
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=85",
        },
        {
          name: "Rajasthan Desert Life",
          loc: "Jaisalmer, Rajasthan",
          dur: "5:08",
          yt: "J3zNfABqB5k",
          cat: "Heritage",
          views: "3.1M views",
          thumb:
            "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=85",
        },
        {
          name: "Varanasi Ganga Aarti",
          loc: "Varanasi, UP",
          dur: "6:30",
          yt: "HbAZ5JUV1CY",
          cat: "Spiritual",
          views: "4.2M views",
          thumb:
            "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=85",
        },
        {
          name: "Himalayan Landscapes",
          loc: "Spiti Valley, HP",
          dur: "4:45",
          yt: "wD2hWUEMvnk",
          cat: "Mountains",
          views: "1.5M views",
          thumb:
            "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=85",
        },
        {
          name: "Goa Beach Vibes",
          loc: "North Goa",
          dur: "3:55",
          yt: "V0Z8X_yTrU8",
          cat: "Beaches",
          views: "2.9M views",
          thumb:
            "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=85",
        },
      ];
      const cg = document.getElementById("clips-grid");
      CLIPS.forEach((c) => {
        const card = document.createElement("div");
        card.className = "clip-card rv";
        card.innerHTML = `<div class="clip-thumb"><img src="${c.thumb}" alt="${c.name}" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(145deg,#1a2a1a,#2a3a2a)';this.style.display='none';"/><div class="clip-ov"></div><div class="clip-play"></div><div class="clip-dur">${c.dur}</div><div class="clip-cat-badge">${c.cat}</div></div><div class="clip-body"><div class="clip-name">${c.name}</div><div class="clip-loc">📍 ${c.loc}</div><div class="clip-views">▶ ${c.views}</div></div>`;
        card.addEventListener("click", () => openVid(c.yt));
        cg.appendChild(card);
      });
      function openVid(yt) {
        document.getElementById("vid-iframe").src =
          `https://www.youtube.com/embed/${yt}?autoplay=1&rel=0`;
        document.getElementById("vid-modal").classList.add("open");
      }
      window.closeVid = function () {
        document.getElementById("vid-iframe").src = "";
        document.getElementById("vid-modal").classList.remove("open");
      };
      document.getElementById("vid-modal").addEventListener("click", (e) => {
        if (e.target === document.getElementById("vid-modal")) closeVid();
      });

      /* FAQ */
      const FAQS = [
        {
          q: "What is the best time to visit India?",
          a: "Oct–Mar for most regions. Ladakh: Jun–Sep. Kerala: Sep–Feb. Northeast: Sep–Nov.",
        },
        {
          q: "How does the AI trip planner work?",
          a: "Enter budget, style, days, interests. AI analyses thousands of combinations, crowd data, and price trends to build your custom itinerary.",
        },
        {
          q: "Are the destination prices accurate?",
          a: "Estimated mid-range averages. Budget travellers spend 40–50% less; luxury 200–300% more. Updated quarterly.",
        },
        {
          q: "How do I get a visa for India?",
          a: "Most nationalities: e-Visa at indianvisaonline.gov.in. Valid 90 days, multiple entries. Apply 4+ days before travel.",
        },
        {
          q: "Is India safe for solo female travellers?",
          a: "Generally safe with precautions. Use app-based cabs, dress modestly at temples. Kerala, Rajasthan, HP are very traveller-friendly.",
        },
        {
          q: "What currency and payment methods?",
          a: "Indian Rupee (₹). ATMs everywhere. UPI (Google Pay, PhonePe) widely accepted. Carry cash for rural areas.",
        },
        {
          q: "Best destinations for wildlife?",
          a: "Tigers: Ranthambhore, Jim Corbett. Rhinos: Kaziranga. Elephants: Periyar. Birds: Bharatpur, Chilika. Book safaris in advance.",
        },
        {
          q: "Can I customise trip plans?",
          a: "Yes! Adjust days, swap destinations, change hotel categories, set custom budgets. AI recalculates in real time.",
        },
        {
          q: "What languages are spoken?",
          a: "22 official languages. Hindi & English widely spoken in tourist areas. English guides available at all major destinations.",
        },
        {
          q: "How far in advance should I book?",
          a: "Peak season: 2–3 months. Tiger safaris: 3–4 months. Ladakh permits: 1–2 months.",
        },
      ];
      const fg = document.getElementById("faq-grid");
      FAQS.forEach((f) => {
        const item = document.createElement("div");
        item.className = "faq-item";
        item.innerHTML = `<div class="faq-q"><div class="faq-q-text">${f.q}</div><div class="faq-icon">+</div></div><div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>`;
        item.querySelector(".faq-q").addEventListener("click", () => {
          const isOpen = item.classList.contains("open");
          document
            .querySelectorAll(".faq-item")
            .forEach((i) => i.classList.remove("open"));
          if (!isOpen) item.classList.add("open");
        });
        fg.appendChild(item);
      });

      /* MARQUEE */
      (() => {
        const items = [
          "Taj Mahal · Agra",
          "Goa Beaches",
          "Spiti Valley",
          "Kerala Backwaters",
          "Ranthambhore Tigers",
          "Varanasi Ghats",
          "Rajasthan Forts",
          "Andaman Islands",
          "Kaziranga Rhinos",
          "Ziro Valley",
          "Golden Temple · Amritsar",
          "Hampi Ruins",
          "Rishikesh Yoga",
          "Munnar Tea Estates",
          "Nubra Valley · Ladakh",
          "Sundarbans",
          "Coorg Coffee",
          "Varkala Cliffs",
        ];
        const t = document.getElementById("mq-t");
        t.innerHTML = items
          .map(
            (i) => `<div class="mq-item"><div class="mq-dot"></div>${i}</div>`,
          )
          .join("")
          .repeat(2);
      })();

      /* UTILS */
      window.scrollTo2 = (id) =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      window.openMob = () =>
        document.getElementById("mob-menu").classList.add("open");
      window.closeMob = () =>
        document.getElementById("mob-menu").classList.remove("open");
      window.addEventListener(
        "scroll",
        () => {
          document.getElementById("prog").style.width =
            (scrollY / (document.body.scrollHeight - innerHeight)) * 100 + "%";
        },
        { passive: true },
      );
      const io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("in");
          });
        },
        { threshold: 0.07 },
      );
      document
        .querySelectorAll(".rv,.rv-l,.rv-r")
        .forEach((el) => io.observe(el));
      const cio = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target,
              target = parseFloat(el.dataset.count),
              suf = el.dataset.suf || "",
              isF = String(target).includes(".");
            let cur = 0;
            const iv = setInterval(() => {
              cur += target / 55;
              if (cur >= target) {
                cur = target;
                clearInterval(iv);
              }
              el.textContent = (isF ? cur.toFixed(1) : Math.round(cur)) + suf;
            }, 25);
            cio.unobserve(el);
          });
        },
        { threshold: 0.5 },
      );
      document
        .querySelectorAll("[data-count]")
        .forEach((el) => cio.observe(el));
      setInterval(() => {
        const now = new Date();
        document.getElementById("nav-coord").textContent =
          `20°N·78°E · ${now.toLocaleTimeString("en-IN", { hour12: false })}`;
      }, 1000);
      window.submitEmail = function () {
        const v = document.getElementById("cta-email").value.trim();
        if (!v || !v.includes("@")) {
          document.getElementById("cta-email").style.borderColor =
            "rgba(255,80,80,.5)";
          return;
        }
        document.getElementById("cta-form").style.display = "none";
        document.getElementById("cta-ok").classList.add("show");
      };