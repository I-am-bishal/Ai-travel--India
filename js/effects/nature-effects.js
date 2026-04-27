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

      
