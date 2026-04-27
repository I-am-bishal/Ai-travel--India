/* ════════════════════════════════════════════════════
       CITY-WISE DESTINATION DATA — INDIA's Greatest Cities
    ════════════════════════════════════════════════════ */

      const CITIES = [
        {
          name: "New Delhi",
          region: "North India",
          state: "Delhi",
          tagline:
            "The pulsating capital of India — Mughal grandeur meets modern energy.",
          img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&q=85",
          tags: ["Heritage", "Food", "Urban"],
          rating: "4.7",
          temp: "Oct–Mar",
          badge: "Capital",
          popular: true,
          emoji: "🏛️",
        },
        {
          name: "Mumbai",
          region: "West India",
          state: "Maharashtra",
          tagline:
            "India's city of dreams — Bollywood, colonial charm & coastal magic.",
          img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=700&q=85",
          tags: ["Urban", "Beach", "Food"],
          rating: "4.6",
          temp: "Oct–Feb",
          badge: "Max City",
          popular: true,
          emoji: "🌆",
        },
        {
          name: "Jaipur",
          region: "North India",
          state: "Rajasthan",
          tagline:
            "The Pink City — palaces, forts and bazaars draped in rose-hued India.",
          img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=700&q=85",
          tags: ["Heritage", "Culture", "Honeymoon"],
          rating: "4.8",
          temp: "Oct–Mar",
          badge: "Pink City",
          popular: true,
          emoji: "🏰",
        },
        {
          name: "Varanasi",
          region: "North India",
          state: "Uttar Pradesh",
          tagline:
            "The spiritual soul of India — Ganga Aarti, ancient ghats, eternal light.",
          img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=700&q=85",
          tags: ["Spiritual", "Heritage", "Solo Travel"],
          rating: "4.7",
          temp: "Oct–Mar",
          badge: "Sacred",
          popular: false,
          emoji: "🪔",
        },
        {
          name: "Kolkata",
          region: "East India",
          state: "West Bengal",
          tagline:
            "India's cultural capital — art, literature, Durga Puja and street food bliss.",
          img: "https://i.pinimg.com/564x/4e/0e/b5/4e0eb5ab8ec6e4d1d808d4824a6f1e8e.jpg",
          tags: ["Urban", "Culture", "Food"],
          rating: "4.5",
          temp: "Oct–Mar",
          badge: "City of Joy",
          popular: false,
          emoji: "🎨",
        },
        {
          name: "Chennai",
          region: "South India",
          state: "Tamil Nadu",
          tagline:
            "Gateway to South India — temple architecture, Carnatic music & Marina Beach.",
          img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=700&q=85",
          tags: ["Beach", "Heritage", "Urban"],
          rating: "4.4",
          temp: "Nov–Feb",
          badge: "Gateway South",
          popular: false,
          emoji: "🌊",
        },
        {
          name: "Bengaluru",
          region: "South India",
          state: "Karnataka",
          tagline:
            "India's Silicon Valley — garden city with craft beer, cuisine & tech vibes.",
          img: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=700&q=85",
          tags: ["Urban", "Nature", "Food"],
          rating: "4.5",
          temp: "All Year",
          badge: "Garden City",
          popular: true,
          emoji: "🌳",
        },

        {
          name: "Rishikesh",
          region: "North India",
          state: "Uttarakhand",
          tagline:
            "Yoga Capital of India — Ganga, adventure, ashrams & Himalayan serenity.",
          img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=700&q=85",
          tags: ["Spiritual", "Mountain", "Solo Travel"],
          rating: "4.8",
          temp: "Sep–Jun",
          badge: "Yoga Capital",
          popular: false,
          emoji: "🧘",
        },
        {
          name: "Amritsar",
          region: "North India",
          state: "Punjab",
          tagline:
            "Home of India's Golden Temple — faith, langar & the legendary Wagah Border.",
          img: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=700&q=85",
          tags: ["Spiritual", "Heritage", "Food"],
          rating: "4.9",
          temp: "Oct–Mar",
          badge: "Golden City",
          popular: true,
          emoji: "⭐",
        },
        {
          name: "Kochi",
          region: "South India",
          state: "Kerala",
          tagline:
            "Fort Kochi — colonial spice legacy meets Kerala's backwater gateway in India.",
          img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=700&q=85",
          tags: ["Heritage", "Beach", "Honeymoon"],
          rating: "4.7",
          temp: "Sep–Feb",
          badge: "Spice Port",
          popular: false,
          emoji: "🌴",
        },
        {
          name: "Agra",
          region: "North India",
          state: "Uttar Pradesh",
          tagline:
            "City of the Taj — India's monument to love stands eternal on the Yamuna.",
          img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=700&q=85",
          tags: ["Heritage", "Honeymoon", "Monuments"],
          rating: "4.8",
          temp: "Oct–Mar",
          badge: "Taj City",
          popular: true,
          emoji: "🕌",
        },
        {
          name: "Jodhpur",
          region: "North India",
          state: "Rajasthan",
          tagline:
            "The Blue City — indigo lanes, Mehrangarh Fort & India's finest heritage hotels.",
          img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=85",
          tags: ["Heritage", "Culture", "Solo Travel"],
          rating: "4.7",
          temp: "Oct–Feb",
          badge: "Blue City",
          popular: false,
          emoji: "🔵",
        },
        {
          name: "Mysuru",
          region: "South India",
          state: "Karnataka",
          tagline:
            "Palace City of India — royal grandeur, sandalwood, silk sarees & Dasara.",
          img: "assets/images/mysuru_palace.png",
          tags: ["Heritage", "Royal", "Culture"],
          rating: "4.7",
          temp: "Oct–Mar",
          badge: "Palace City",
          popular: false,
          emoji: "👑",
        },
        {
          name: "Guwahati",
          region: "Northeast India",
          state: "Assam",
          tagline:
            "Gateway to Northeast India — Kamakhya temple, Brahmaputra & river dolphins.",
          img: "assets/images/guwahati_assam.png",
          tags: ["Mountain", "Nature", "Solo Travel"],
          rating: "4.4",
          temp: "Oct–Apr",
          badge: "Northeast Gate",
          popular: false,
          emoji: "🌿",
        },
        {
          name: "Pune",
          region: "West India",
          state: "Maharashtra",
          tagline:
            "The Oxford of India — Peshwa heritage, hill forts, cafes & film studios.",
          img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=700&q=85",
          tags: ["Urban", "Mountain", "Education"],
          rating: "4.4",
          temp: "Oct–Feb",
          badge: "Oxford of India",
          popular: false,
          emoji: "🏛️",
        },
      ];

      let activeCityTag = "all";

      function renderCities(tag) {
        const grid = document.getElementById("city-grid");
        if (!grid) return;
        const data =
          tag === "all" ? CITIES : CITIES.filter((c) => c.tags.includes(tag));
        grid.innerHTML = "";
        data.forEach((c, i) => {
          const card = document.createElement("div");
          card.className = "city-card rv";
          card.style.transitionDelay = (i % 4) * 0.06 + "s";
          card.innerHTML = `
      <img src="${c.img}" alt="${c.name}, ${c.state} — India" loading="lazy" onerror="this.style.display='none'"/>
      <div class="city-ov"></div>
      ${c.badge ? `<div class="city-badge">${c.emoji} ${c.badge}</div>` : ""}
      ${c.popular ? `<div class="city-popular-badge">⭐ Popular</div>` : ""}
      <div class="city-body">
        <div class="city-region"><strong>India</strong> · ${c.region} · ${c.state}</div>
        <div class="city-name">${c.name}</div>
        <div class="city-tagline">${c.tagline}</div>
        <div class="city-tags">${c.tags.map((t) => `<span class="city-tag">${t}</span>`).join("")}</div>
        <div class="city-meta-row">
          <div class="city-rating">★ ${c.rating}</div>
          <div class="city-temp">🗓 ${c.temp}</div>
        </div>
        <div class="city-explore-btn">Explore ${c.name} →</div>
      </div>`;
          card.addEventListener("click", () => {
            if (window.musafirToggle) musafirToggle();
            setTimeout(() => {
              const inp = document.getElementById("mai-input");
              if (inp) {
                inp.value = `Tell me about visiting ${c.name} in India`;
                inp.dispatchEvent(new Event("input"));
              }
            }, 500);
          });
          grid.appendChild(card);
          requestAnimationFrame(() =>
            requestAnimationFrame(() => card.classList.add("in")),
          );
        });
      }

      // City filter
      (function () {
        const filtersEl = document.getElementById("city-filters");
        if (!filtersEl) return;
        filtersEl.addEventListener("click", (e) => {
          const btn = e.target.closest(".cf");
          if (!btn) return;
          filtersEl
            .querySelectorAll(".cf")
            .forEach((b) => b.classList.remove("on"));
          btn.classList.add("on");
          activeCityTag = btn.dataset.tag;
          renderCities(activeCityTag);
        });
      })();
      renderCities("all");

      // City fireflies
      (function () {
        const ff = document.getElementById("firefly-cities");
        if (!ff) return;
        for (let i = 0; i < 18; i++) {
          const f = document.createElement("div");
          f.className = "firefly";
          f.style.left = Math.random() * 100 + "%";
          f.style.top = Math.random() * 100 + "%";
          f.style.width = 2 + Math.random() * 3 + "px";
          f.style.height = f.style.width;
          f.style.animationDuration = 4 + Math.random() * 7 + "s";
          f.style.animationDelay = Math.random() * 5 + "s";
          ff.appendChild(f);
        }
      })();

      // Star field for AI section
      (function () {
        const sf = document.getElementById("star-field-ai");
        if (!sf) return;
        for (let i = 0; i < 50; i++) {
          const s = document.createElement("div");
          s.className = "star";
          s.style.left = Math.random() * 100 + "%";
          s.style.top = Math.random() * 100 + "%";
          s.style.width = 1 + Math.random() * 2 + "px";
          s.style.height = s.style.width;
          s.style.animationDuration = 2 + Math.random() * 5 + "s";
          s.style.animationDelay = Math.random() * 4 + "s";
          sf.appendChild(s);
        }
      })();

      
