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
