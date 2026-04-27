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
          name: "Udaipur",
          region: "North India",
          state: "Rajasthan",
          tagline:
            "India's most romantic city — shimmering lakes, white palaces & sunset royalty.",
          img: "udaipur_lake.png",
          tags: ["Heritage", "Honeymoon", "Lakes"],
          rating: "4.9",
          temp: "Oct–Mar",
          badge: "Lake City",
          popular: true,
          emoji: "🏰",
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
          img: "mysuru_palace.png",
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
          img: "guwahati_assam.png",
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

      /* ════════════════════════════════════════════════════
       AI TRIP BUILDER — Intelligent Itinerary Generator
       Uses curated INDIA destination knowledge base
    ════════════════════════════════════════════════════ */

      // Interest chip toggle
      document.querySelectorAll(".ai-chip-btn").forEach((btn) => {
        btn.addEventListener("click", () => btn.classList.toggle("sel"));
      });

      const AI_ITINERARY_DB = {
        rajasthan: {
          name: "Rajasthan",
          days: {
            2: [
              {
                t: "Pink City Jaipur",
                d: "Amber Fort sunrise, Hawa Mahal, City Palace, Jantar Mantar, Johari Bazaar evening",
                stops: ["Amber Fort", "Hawa Mahal", "City Palace"],
              },
              {
                t: "Jodhpur Blue City",
                d: "Mehrangarh Fort, Blue City walk, Clock Tower market, Mandore Gardens",
                stops: ["Mehrangarh Fort", "Blue City", "Clock Tower"],
              },
            ],
            3: [
              {
                t: "Jaipur Heritage",
                d: "Amber Fort, Sheesh Mahal, City Palace, Jantar Mantar, Nahargarh at sunset",
                stops: ["Amber Fort", "City Palace", "Nahargarh"],
              },
              {
                t: "Desert Drive to Jodhpur",
                d: "Stepwell Abhaneri en route, Mehrangarh Fort, Umaid Bhawan Palace",
                stops: ["Mehrangarh Fort", "Umaid Bhawan"],
              },
              {
                t: "Pushkar Day Trip",
                d: "Brahma Temple, Pushkar Lake, camel fair grounds, rooftop cafes",
                stops: ["Brahma Temple", "Pushkar Lake"],
              },
            ],
            5: [
              {
                t: "Jaipur — Day 1",
                d: "Amber Fort & Sheesh Mahal, Jaigarh Fort, City Palace, Jantar Mantar",
                stops: ["Amber Fort", "Jaigarh Fort", "City Palace"],
              },
              {
                t: "Jaipur — Day 2",
                d: "Hawa Mahal, Nahargarh sunset, Johari Bazaar, cultural show",
                stops: ["Hawa Mahal", "Nahargarh", "Bazaar"],
              },
              {
                t: "Jodhpur Blue City",
                d: "Mehrangarh Fort zip-line, Jaswant Thada, old city walk",
                stops: ["Mehrangarh Fort", "Jaswant Thada"],
              },
              {
                t: "Jaisalmer Golden Fort",
                d: "Jaisalmer Fort, havelis, camel safari sunset at Sam dunes",
                stops: ["Jaisalmer Fort", "Sam Dunes"],
              },
              {
                t: "Udaipur Lake City",
                d: "City Palace, Lake Pichola boat, Jag Mandir, Saheliyon ki Bari",
                stops: ["City Palace", "Lake Pichola", "Jag Mandir"],
              },
            ],
            7: [
              {
                t: "Delhi Gateway",
                d: "Old Delhi — Jama Masjid, Red Fort, Chandni Chowk, street food",
                stops: ["Jama Masjid", "Red Fort", "Chandni Chowk"],
              },
              {
                t: "Agra — Taj Mahal",
                d: "Taj Mahal sunrise, Agra Fort, Mehtab Bagh, Fatehpur Sikri",
                stops: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri"],
              },
              {
                t: "Jaipur Pink City",
                d: "Amber Fort, City Palace, Hawa Mahal, Nahargarh",
                stops: ["Amber Fort", "City Palace"],
              },
              {
                t: "Jodhpur Blue City",
                d: "Mehrangarh Fort, Blue lanes, Umaid Bhawan",
                stops: ["Mehrangarh Fort", "Blue City"],
              },
              {
                t: "Jaisalmer Desert",
                d: "Golden Fort, havelis, camel safari, desert camp",
                stops: ["Jaisalmer Fort", "Sam Dunes"],
              },
              {
                t: "Udaipur — Romance",
                d: "City Palace, Lake Pichola, Jag Mandir sunset dinner",
                stops: ["City Palace", "Lake Pichola"],
              },
              {
                t: "Mount Abu Hills",
                d: "Dilwara Jain Temples, Nakki Lake, Guru Shikhar peak",
                stops: ["Dilwara Temples", "Nakki Lake"],
              },
            ],
          },
          budgets: {
            budget: "₹1,800–2,800/day",
            mid: "₹4,000–7,000/day",
            luxury: "₹14,000–40,000+/day",
          },
          tags: ["Heritage", "Royal", "Desert", "Forts", "Culture"],
        },
        kerala: {
          name: "Kerala",
          days: {
            2: [
              {
                t: "Kochi Fort Heritage",
                d: "Chinese fishing nets, Mattancherry Palace, Jew Town spice market, Kathakali show",
                stops: ["Fort Kochi", "Mattancherry", "Jew Town"],
              },
              {
                t: "Alleppey Houseboat",
                d: "Board a kettuvallam, backwater cruise, village life, sunset on water",
                stops: ["Alleppey Backwaters", "Houseboat"],
              },
            ],
            3: [
              {
                t: "Kochi Discovery",
                d: "Fort Kochi walking tour, Bolghatty Island, Santa Cruz Basilica",
                stops: ["Fort Kochi", "Mattancherry"],
              },
              {
                t: "Munnar Tea Hills",
                d: "Tea Museum, Eravikulam NP, Top Station viewpoint, cardamom estates",
                stops: ["Tea Museum", "Eravikulam NP", "Top Station"],
              },
              {
                t: "Alleppey Backwaters",
                d: "Houseboat overnight, village cycling, toddy shop lunch",
                stops: ["Alleppey", "Mararikulam"],
              },
            ],
            5: [
              {
                t: "Kochi — Spice Capital",
                d: "Chinese fishing nets, Mattancherry, Synagogue, spice markets",
                stops: ["Fort Kochi", "Mattancherry", "Synagogue"],
              },
              {
                t: "Munnar Tea Gardens",
                d: "Tea Museum, Eravikulam NP, Kundala Lake, Anamudi peak",
                stops: ["Tea Museum", "Eravikulam NP"],
              },
              {
                t: "Thekkady Wildlife",
                d: "Periyar boat safari, bamboo rafting, spice garden, Ayurvedic spa",
                stops: ["Periyar", "Thekkady"],
              },
              {
                t: "Alleppey Houseboat",
                d: "Kettuvallam cruise, backwaters, village cycling, sunset",
                stops: ["Alleppey Backwaters"],
              },
              {
                t: "Varkala Cliffs",
                d: "Cliff walk, Papanasam Beach, Janardanaswamy Temple, Ayurvedic massage",
                stops: ["Varkala Cliffs", "Papanasam Beach"],
              },
            ],
            7: [
              {
                t: "Fly into Kochi",
                d: "Fort Kochi, Chinese nets, Mattancherry, cultural show",
                stops: ["Fort Kochi", "Mattancherry"],
              },
              {
                t: "Munnar Tea World",
                d: "Tea Museum, Eravikulam, Kundala Lake",
                stops: ["Munnar", "Tea Museum"],
              },
              {
                t: "Out to Thekkady",
                d: "Periyar, elephant safari, spice garden",
                stops: ["Periyar", "Thekkady"],
              },
              {
                t: "Alleppey Houseboat",
                d: "Board houseboat at noon, sunset cruise, village life",
                stops: ["Alleppey"],
              },
              {
                t: "Kollam Backwaters",
                d: "Ashtamudi Lake, cashew factory, quiet canals",
                stops: ["Kollam", "Ashtamudi"],
              },
              {
                t: "Varkala Cliff Day",
                d: "Cliff cafes, beach swim, yoga, Ayurveda",
                stops: ["Varkala"],
              },
              {
                t: "Kovalam & Fly Out",
                d: "Lighthouse Beach, Vizhinjam, Padmanabhapuram Palace",
                stops: ["Kovalam", "Trivandrum"],
              },
            ],
          },
          budgets: {
            budget: "₹1,400–2,200/day",
            mid: "₹3,500–6,500/day",
            luxury: "₹12,000–30,000+/day",
          },
          tags: ["Backwaters", "Nature", "Beaches", "Spiritual", "Food"],
        },
        ladakh: {
          name: "Ladakh",
          days: {
            2: [
              {
                t: "Leh Acclimatize",
                d: "Leh Palace, Shanti Stupa, local market, Namgyal Tsemo Gompa. Rest is mandatory!",
                stops: ["Leh Palace", "Shanti Stupa"],
              },
              {
                t: "Magnetic Hill & Sangam",
                d: "Magnetic Hill, Sangam (Indus–Zanskar meeting), Gurudwara Patthar Sahib, Hall of Fame",
                stops: ["Magnetic Hill", "Sangam Point"],
              },
            ],
            3: [
              {
                t: "Leh Rest Day",
                d: "Leh Palace, Shanti Stupa, Tsemo Fort, Main Bazaar",
                stops: ["Leh Palace", "Shanti Stupa"],
              },
              {
                t: "Nubra Valley",
                d: "Khardung La pass (world's highest motorable), Hunder double-hump camel safari",
                stops: ["Khardung La", "Hunder", "Nubra"],
              },
              {
                t: "Pangong Lake",
                d: "Chang La pass, Pangong Tso — blue-green magic, overnight camp",
                stops: ["Pangong Lake", "Chang La"],
              },
            ],
            5: [
              {
                t: "Leh Arrival—Rest",
                d: "Compulsory acclimatisation day in Leh city",
                stops: ["Leh"],
              },
              {
                t: "Leh Sightseeing",
                d: "Leh Palace, Shanti Stupa, Sangam, Hall of Fame",
                stops: ["Leh Palace", "Sangam"],
              },
              {
                t: "Nubra Desert Valley",
                d: "Khardung La, Diskit Monastery, camel safari at Hunder dunes",
                stops: ["Khardung La", "Diskit", "Hunder"],
              },
              {
                t: "Pangong Lake",
                d: "Chang La, Pangong Tso azure lake, camp overnight",
                stops: ["Chang La", "Pangong"],
              },
              {
                t: "Tso Moriri",
                d: "Remote high-altitude lake, nomadic settlements, prayer flags",
                stops: ["Tso Moriri", "Korzok"],
              },
            ],
          },
          budgets: {
            budget: "₹2,500–4,000/day",
            mid: "₹5,000–8,000/day",
            luxury: "₹15,000–25,000+/day",
          },
          tags: [
            "Mountains",
            "Adventure",
            "Spiritual",
            "Wildlife",
            "Photography",
          ],
        },
        goa: {
          name: "Goa",
          days: {
            2: [
              {
                t: "North Goa Beaches",
                d: "Calangute, Baga, Anjuna, Fort Aguada, beach shacks, water sports",
                stops: ["Calangute", "Baga", "Fort Aguada"],
              },
              {
                t: "South Goa Serenity",
                d: "Palolem crescent beach, Butterfly Beach kayaking, Cabo de Rama fort",
                stops: ["Palolem", "Butterfly Beach"],
              },
            ],
            3: [
              {
                t: "North Goa Day",
                d: "Calangute, Vagator, Chapora Fort, Saturday Night Market",
                stops: ["Calangute", "Chapora Fort"],
              },
              {
                t: "Old Goa Heritage",
                d: "Basilica of Bom Jesus (UNESCO), Se Cathedral, Goa State Museum",
                stops: ["Bom Jesus", "Se Cathedral"],
              },
              {
                t: "South Goa Escape",
                d: "Palolem Beach, agonda, dolphin cruise, sunset kayaking",
                stops: ["Palolem", "Agonda"],
              },
            ],
            5: [
              {
                t: "Arrive — North Beaches",
                d: "Calangute, Baga, Anjuna beach hop, sea-front dinner",
                stops: ["Calangute", "Baga", "Anjuna"],
              },
              {
                t: "Heritage Goa",
                d: "Old Goa UNESCO Churches, Fontainhas Latin Quarter, spice plantation tour",
                stops: ["Old Goa", "Fontainhas"],
              },
              {
                t: "Adventure Day",
                d: "Dudhsagar Falls trek, Mollem forest, river rafting, zip-line",
                stops: ["Dudhsagar Falls", "Mollem"],
              },
              {
                t: "South Goa Calm",
                d: "Palolem, Butterfly Beach kayak, silent disco night",
                stops: ["Palolem", "Butterfly Beach"],
              },
              {
                t: "Leisure & Fly",
                d: "Yoga, beachside brunch, Mapusa Market shopping",
                stops: ["Mapusa Market"],
              },
            ],
          },
          budgets: {
            budget: "₹1,200–2,000/day",
            mid: "₹3,500–6,000/day",
            luxury: "₹12,000–28,000+/day",
          },
          tags: ["Beaches", "Nightlife", "Heritage", "Food", "Nature"],
        },
        himachal: {
          name: "Himachal Pradesh",
          days: {
            3: [
              {
                t: "Shimla — Colonial Hills",
                d: "Mall Road, Christ Church, Jakhu Temple, Kufri day trip",
                stops: ["Mall Road", "Jakhu Temple", "Kufri"],
              },
              {
                t: "Shimla to Manali",
                d: "Mountain highway drive, Kullu valley, Bhuntar, Hadimba Temple arrival",
                stops: ["Kullu", "Manali", "Hadimba"],
              },
              {
                t: "Solang Snow Valley",
                d: "Solang Valley snow activities, Rohtang views, Old Manali market",
                stops: ["Solang Valley", "Old Manali"],
              },
            ],
            5: [
              {
                t: "Shimla",
                d: "Mall Road, Viceregal Lodge, Christ Church, Kufri",
                stops: ["Mall Road", "Viceregal Lodge"],
              },
              {
                t: "Manali Drive",
                d: "Great Himalayan Highway, Kullu Dussehra ground, Bhuntar",
                stops: ["Kullu", "Manali"],
              },
              {
                t: "Manali Sights",
                d: "Hadimba Temple, Van Vihar, Manu Temple, Old Manali",
                stops: ["Hadimba", "Van Vihar"],
              },
              {
                t: "Rohtang Pass",
                d: "High-altitude snowfields, panoramic views (book permit online)",
                stops: ["Rohtang Pass"],
              },
              {
                t: "Leisure & Depart",
                d: "Paragliding at Dobhi or Solang, local market shopping",
                stops: ["Solang Valley"],
              },
            ],
          },
          budgets: {
            budget: "₹1,500–2,500/day",
            mid: "₹3,500–6,000/day",
            luxury: "₹10,000–22,000+/day",
          },
          tags: ["Mountains", "Adventure", "Nature", "Heritage", "Winter"],
        },
        default: {
          name: "Incredible India",
          days: {
            5: [
              {
                t: "Delhi — The Megacity",
                d: "Red Fort, India Gate, Humayun's Tomb, Qutub Minar, Chandni Chowk street food",
                stops: ["Red Fort", "India Gate", "Qutub Minar"],
              },
              {
                t: "Agra — Taj Mahal",
                d: "Taj Mahal at sunrise (UNESCO), Agra Fort, Mehtab Bagh, local petha",
                stops: ["Taj Mahal", "Agra Fort"],
              },
              {
                t: "Jaipur Pink City",
                d: "Amber Fort, Hawa Mahal, City Palace, Jantar Mantar",
                stops: ["Amber Fort", "Hawa Mahal"],
              },
              {
                t: "Varanasi Ghats",
                d: "Ganga Aarti at sunset, sunrise boat ride, Kashi Vishwanath Temple",
                stops: ["Dashashwamedh Ghat", "Kashi Vishwanath"],
              },
              {
                t: "Mumbai — City of Dreams",
                d: "Gateway of India, Marine Drive, Dharavi, street food, Bollywood",
                stops: ["Gateway of India", "Marine Drive"],
              },
            ],
          },
          budgets: {
            budget: "₹1,500–2,500/day",
            mid: "₹4,000–7,000/day",
            luxury: "₹15,000–45,000+/day",
          },
          tags: ["Heritage", "Culture", "Food", "Spiritual", "Urban"],
        },
      };

      function matchDestination(q) {
        q = q.toLowerCase();
        if (/rajasthan|jaipur|jodhpur|udaipur|jaisalmer/.test(q))
          return "rajasthan";
        if (/kerala|alleppey|munnar|kochi|backwater/.test(q)) return "kerala";
        if (/ladakh|leh|nubra|pangong|spiti/.test(q)) return "ladakh";
        if (/goa|calangute|palolem|baga|beach/.test(q)) return "goa";
        if (/himachal|manali|shimla|rohtang|solang/.test(q)) return "himachal";
        return "default";
      }

      window.generateAITrip = function () {
        const dest = document.getElementById("ai-dest").value.trim();
        const days = parseInt(document.getElementById("ai-days").value) || 5;
        const budget = document.getElementById("ai-budget").value;
        const group = document.getElementById("ai-group").value;
        const interests = [
          ...document.querySelectorAll(".ai-chip-btn.sel"),
        ].map((b) => b.dataset.i);

        if (!dest) {
          const inp = document.getElementById("ai-dest");
          inp.style.borderColor = "rgba(255,80,80,.4)";
          inp.placeholder = "Please enter a destination in India first!";
          setTimeout(() => {
            inp.style.borderColor = "";
            inp.placeholder = "e.g. Rajasthan, Kerala, Ladakh…";
          }, 2500);
          return;
        }

        const btn = document.getElementById("ai-gen-btn");
        btn.classList.add("loading");
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Crafting your India plan…`;

        const key = matchDestination(dest);
        const db = AI_ITINERARY_DB[key];
        const dayKeys = Object.keys(db.days)
          .map(Number)
          .sort((a, b) => a - b);
        const bestKey = dayKeys.reduce((prev, curr) =>
          Math.abs(curr - days) < Math.abs(prev - days) ? curr : prev,
        );
        const plan = db.days[bestKey];

        setTimeout(() => {
          btn.classList.remove("loading");
          btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Generate My <strong>India</strong> Itinerary`;

          const idle = document.getElementById("ai-result-idle");
          const content = document.getElementById("ai-result-content");
          if (idle) idle.style.display = "none";
          if (content) {
            content.style.display = "flex";
            content.innerHTML = "";
          }

          const groupLabel =
            {
              solo: "Solo Explorer",
              couple: "Couple",
              family: "Family",
              friends: "Group",
            }[group] || "Traveller";
          const budgetLabel = db.budgets[budget] || db.budgets.mid;
          const totalBudget = budgetLabel
            .split("–")[0]
            .replace(/[₹,]/g, "")
            .trim();
          const approxTotal =
            "₹" +
            (
              parseInt(totalBudget.replace(/[^0-9]/g, "")) * days
            ).toLocaleString("en-IN") +
            " approx total";

          // Header
          const hdr = document.createElement("div");
          hdr.className = "ai-plan-header";
          hdr.innerHTML = `<div>
      <div class="ai-plan-title">🇮🇳 <strong>${db.name}</strong> — ${days}-Day Journey</div>
      <div class="ai-plan-meta">
        <span class="ai-plan-tag">${groupLabel}</span>
        <span class="ai-plan-tag">${budget === "budget" ? "Budget" : "budget" === "luxury" ? "Luxury" : "Mid-Range"}</span>
        ${interests
          .slice(0, 3)
          .map((i) => `<span class="ai-plan-tag">${i}</span>`)
          .join("")}
      </div>
    </div>
    <div class="ai-plan-badge">AI Generated</div>`;
          content.appendChild(hdr);

          // Timeline
          const timeline = document.createElement("div");
          timeline.className = "ai-timeline";
          const actualDays = Math.min(days, plan.length + 2);
          for (let i = 0; i < Math.min(days, plan.length); i++) {
            const d = plan[i];
            const row = document.createElement("div");
            row.className = "ai-day-row";
            row.style.animation = `mMsgIn .4s ease both`;
            row.style.animationDelay = i * 0.07 + "s";
            row.innerHTML = `<div class="ai-day-num">D${i + 1}</div>
        <div class="ai-day-content">
          <div class="ai-day-t">${d.t}</div>
          <div class="ai-day-d">${d.d}</div>
          <div class="ai-day-stops">${(d.stops || []).map((s) => `<span class="ai-day-stop">${s}</span>`).join("")}</div>
        </div>`;
            timeline.appendChild(row);
          }
          // If user requested more days than plan, add extension note
          if (days > plan.length) {
            const ext = document.createElement("div");
            ext.className = "ai-day-row";
            ext.innerHTML = `<div class="ai-day-num">+</div>
        <div class="ai-day-content">
          <div class="ai-day-t">Flexible Extension Days</div>
          <div class="ai-day-d">Explore nearby gems in <strong>India</strong> or enjoy leisurely revisits to favourite spots. AI recommends adding a day in the closest adjoining region.</div>
        </div>`;
            timeline.appendChild(ext);
          }
          content.appendChild(timeline);

          // Footer
          const ftr = document.createElement("div");
          ftr.className = "ai-plan-footer";
          ftr.innerHTML = `<div>
      <div style="font-family:'Space Mono',monospace;font-size:10px;color:rgba(46,204,113,.5);letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px">Estimated Budget</div>
      <div class="ai-plan-budget">${budgetLabel}</div>
      <div style="font-size:12px;color:rgba(245,245,240,.3);margin-top:3px">${approxTotal}</div>
    </div>
    <div class="ai-plan-cta">
      <button class="ai-save-btn" onclick="alert('Save feature coming soon! Your India plan is ready.')">💾 Save Plan</button>
      <button class="ai-share-btn" onclick="musafirToggle&&musafirToggle()">💬 Ask Musafir AI</button>
    </div>`;
          content.appendChild(ftr);

          // Scroll to result
          document
            .getElementById("ai-result-panel")
            .scrollTo({ top: 0, behavior: "smooth" });
        }, 1600);
      };
      // Voice Search Logic
      (function () {
        const micBtn = document.getElementById("ai-mic-btn");
        const voiceInput = document.getElementById("ai-voice-prompt");
        if (!micBtn || !voiceInput) return;

        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          micBtn.style.display = "none";
          voiceInput.placeholder =
            "Voice search not supported in this browser.";
          return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = "en-IN";

        let isRecording = false;

        micBtn.addEventListener("click", () => {
          if (isRecording) {
            recognition.stop();
            return;
          }

          recognition.start();
          isRecording = true;
          micBtn.style.background = "rgba(255,80,80,.2)";
          micBtn.style.borderColor = "#ff5050";
          micBtn.style.color = "#ff5050";
          voiceInput.placeholder = "Listening... Speak now.";
          voiceInput.value = "";
        });

        recognition.onresult = (event) => {
          const text = event.results[0][0].transcript;
          voiceInput.value = text;

          // Simple NLP parser to fill fields
          const lowerText = text.toLowerCase();

          // Match days
          const daysMatch = lowerText.match(/(\d+)\s*day/);
          if (daysMatch && daysMatch[1]) {
            const d = parseInt(daysMatch[1]);
            const daysSelect = document.getElementById("ai-days");
            if (d <= 2) daysSelect.value = "2";
            else if (d <= 3) daysSelect.value = "3";
            else if (d <= 5) daysSelect.value = "5";
            else if (d <= 7) daysSelect.value = "7";
            else if (d <= 10) daysSelect.value = "10";
            else daysSelect.value = "14";
          }

          // Match Budget (e.g. 50k, budget, luxury)
          if (lowerText.includes("luxury") || lowerText.match(/\b\d\d\d+k/)) {
            document.getElementById("ai-budget").value = "luxury";
          } else if (
            lowerText.includes("budget") ||
            lowerText.includes("cheap") ||
            lowerText.match(/under 20k/)
          ) {
            document.getElementById("ai-budget").value = "budget";
          } else {
            document.getElementById("ai-budget").value = "mid";
          }

          // Match Group
          if (lowerText.includes("solo") || lowerText.includes("alone")) {
            document.getElementById("ai-group").value = "solo";
          } else if (
            lowerText.includes("family") ||
            lowerText.includes("kids")
          ) {
            document.getElementById("ai-group").value = "family";
          } else if (
            lowerText.includes("friends") ||
            lowerText.includes("group")
          ) {
            document.getElementById("ai-group").value = "friends";
          } else if (
            lowerText.includes("honeymoon") ||
            lowerText.includes("couple")
          ) {
            document.getElementById("ai-group").value = "couple";
          }

          // Match Destination
          const dests = [
            "kerala",
            "rajasthan",
            "ladakh",
            "goa",
            "kashmir",
            "himachal",
            "sikkim",
            "andaman",
            "uttarakhand",
            "karnataka",
            "delhi",
            "mumbai",
            "jaipur",
            "varanasi",
            "kolkata",
            "chennai",
            "bengaluru",
            "udaipur",
            "rishikesh",
            "amritsar",
            "kochi",
            "agra",
            "jodhpur",
            "mysuru",
            "guwahati",
            "pune",
          ];
          let foundDest = "";
          for (let d of dests) {
            if (lowerText.includes(d)) {
              foundDest = d.charAt(0).toUpperCase() + d.slice(1);
              break;
            }
          }
          if (foundDest) {
            document.getElementById("ai-dest").value = foundDest;
          } else {
            // If no specific state found, extract word after 'in' or 'to'
            const inMatch = lowerText.match(/(?:in|to) ([a-z]+)/);
            if (inMatch && inMatch[1]) {
              document.getElementById("ai-dest").value =
                inMatch[1].charAt(0).toUpperCase() + inMatch[1].slice(1);
            } else {
              // Use the whole text if short enough
              if (text.length < 30)
                document.getElementById("ai-dest").value = text;
            }
          }

          // Click Generate automatically after a short delay
          setTimeout(() => {
            if (document.getElementById("ai-dest").value) {
              if (typeof generateAITrip === "function") generateAITrip();
            }
          }, 1000);
        };

        recognition.onend = () => {
          isRecording = false;
          micBtn.style.background = "var(--green-dim)";
          micBtn.style.borderColor = "var(--green)";
          micBtn.style.color = "var(--green)";
          if (!voiceInput.value) {
            voiceInput.placeholder =
              "Click the mic and say: 'Plan a 5-day honeymoon in Kerala under 50k'";
          }
        };
      })();

      /* ══════════════════════════════════════════════
         LANGUAGE TOGGLE
      ══════════════════════════════════════════════ */
      const UI_STRINGS = {
        en: {
          heroEyebrow: "AI-Powered · INDIA · Travel Intelligence",
          heroH1: "Discover<br><span class='accent'>Incredible</span><br><span class='outline' style='text-shadow:0 0 40px rgba(46,204,113,.25)'>India.</span>",
          heroDesc: "Where real satellite geography meets AI-powered journey planning. Explore every mountain, coastline and temple of <strong style='color:var(--green);font-weight:800'>INDIA</strong> — mapped, rated and ready for your next adventure.",
          planBtn: "✦ Plan with AI",
          destNav: "Destinations",
          insightsNav: "Insights",
        },
        hi: {
          heroEyebrow: "AI-संचालित · भारत · यात्रा बुद्धिमत्ता",
          heroH1: "खोजें<br><span class='accent'>अविश्वसनीय</span><br><span class='outline' style='text-shadow:0 0 40px rgba(46,204,113,.25)'>भारत।</span>",
          heroDesc: "जहाँ वास्तविक उपग्रह भूगोल AI-संचालित यात्रा योजना से मिलता है। <strong style='color:var(--green);font-weight:800'>भारत</strong> के हर पहाड़, समुद्र तट और मंदिर को खोजें।",
          planBtn: "✦ AI से योजना बनाएं",
          destNav: "गंतव्य",
          insightsNav: "अंतर्दृष्टि",
        },
        bn: {
          heroEyebrow: "AI-চালিত · ভারত · ভ্রমণ বুদ্ধিমত্তা",
          heroH1: "আবিষ্কার করুন<br><span class='accent'>অবিশ্বাস্য</span><br><span class='outline' style='text-shadow:0 0 40px rgba(46,204,113,.25)'>ভারত।</span>",
          heroDesc: "যেখানে প্রকৃত স্যাটেলাইট ভূগোল AI-চালিত ভ্রমণ পরিকল্পনার সাথে মিলিত হয়। <strong style='color:var(--green);font-weight:800'>ভারত</strong> এর প্রতিটি পর্বত, উপকূল এবং মন্দির অন্বেষণ করুন।",
          planBtn: "✦ AI দিয়ে পরিকল্পনা করুন",
          destNav: "গন্তব্য",
          insightsNav: "অন্তর্দৃষ্টি",
        },
        ta: {
          heroEyebrow: "AI-இயக்கப்படும் · இந்தியா · பயண நுண்ணறிவு",
          heroH1: "கண்டுபிடிக்க<br><span class='accent'>அற்புதமான</span><br><span class='outline' style='text-shadow:0 0 40px rgba(46,204,113,.25)'>இந்தியா.</span>",
          heroDesc: "உண்மையான செயற்கைக்கோள் புவியியல் AI-இயக்கப்படும் பயணத் திட்டமிடலுடன் சந்திக்கும் இடம். <strong style='color:var(--green);font-weight:800'>இந்தியாவின்</strong> ஒவ்வொரு மலை, கடற்கரை மற்றும் கோயிலை ஆராயுங்கள்.",
          planBtn: "✦ AI மூலம் திட்டமிடுங்கள்",
          destNav: "இடங்கள்",
          insightsNav: "நுண்ணறிவு",
        },
        te: {
          heroEyebrow: "AI-శక్తితో · భారతదేశం · ప్రయాణ మేధస్సు",
          heroH1: "కనుగొనండి<br><span class='accent'>అద్భుతమైన</span><br><span class='outline' style='text-shadow:0 0 40px rgba(46,204,113,.25)'>భారతదేశం.</span>",
          heroDesc: "నిజమైన ఉపగ్రహ భూగోళం AI-శక్తితో కూడిన ప్రయాణ ప్రణాళికను కలిసే చోట. <strong style='color:var(--green);font-weight:800'>భారతదేశంలోని</strong> ప్రతి పర్వతం, తీరం మరియు దేవాలయాన్ని అన్వేషించండి.",
          planBtn: "✦ AI తో ప్రణాళిక చేయండి",
          destNav: "గమ్యాలు",
          insightsNav: "అంతర్దృష్టులు",
        },
        mr: {
          heroEyebrow: "AI-चालित · भारत · प्रवास बुद्धिमत्ता",
          heroH1: "शोधा<br><span class='accent'>अविश्वसनीय</span><br><span class='outline' style='text-shadow:0 0 40px rgba(46,204,113,.25)'>भारत.</span>",
          heroDesc: "जिथे खऱ्या उपग्रह भूगोलाची भेट AI-चालित प्रवास नियोजनाशी होते. <strong style='color:var(--green);font-weight:800'>भारताचा</strong> प्रत्येक पर्वत, किनारा आणि मंदिर शोधा.",
          planBtn: "✦ AI सह योजना करा",
          destNav: "गंतव्ये",
          insightsNav: "अंतर्दृष्टी",
        },
      };

      let currentLang = localStorage.getItem("tm-lang") || "en";

      function applyLanguage(lang) {
        const s = UI_STRINGS[lang];
        if (!s) return;
        document.documentElement.setAttribute("lang", lang);
        const eyebrow = document.getElementById("hero-eyebrow");
        if (eyebrow) eyebrow.innerHTML = '<div class="hero-eye-dot"></div>' + s.heroEyebrow;
        const h1 = document.getElementById("hero-h1");
        if (h1) h1.innerHTML = s.heroH1;
        const desc = document.getElementById("hero-desc");
        if (desc) desc.innerHTML = s.heroDesc;
        document.querySelectorAll(".btn-nv").forEach(b => { if (b.textContent.includes("Plan")) b.textContent = s.planBtn; });
        localStorage.setItem("tm-lang", lang);
        currentLang = lang;
      }

      window.setLanguage = function(lang, flag, label) {
        document.getElementById("lang-flag").textContent = flag;
        document.getElementById("lang-label").textContent = label;
        document.querySelectorAll(".lang-opt").forEach(o => {
          o.classList.toggle("active", o.dataset.lang === lang);
          o.setAttribute("aria-selected", o.dataset.lang === lang ? "true" : "false");
        });
        applyLanguage(lang);
        closeLangMenu();
      };

      window.toggleLangMenu = function() {
        const lt = document.getElementById("lang-toggle");
        const btn = document.getElementById("lang-btn");
        const isOpen = lt.classList.toggle("open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      };

      function closeLangMenu() {
        const lt = document.getElementById("lang-toggle");
        const btn = document.getElementById("lang-btn");
        if (lt) { lt.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
      }

      // Close lang dropdown when clicking outside
      document.addEventListener("click", e => {
        if (!e.target.closest("#lang-toggle")) closeLangMenu();
      });

      // Apply saved language on load
      if (currentLang !== "en") {
        const saved = UI_STRINGS[currentLang];
        if (saved) {
          const opt = document.querySelector(`.lang-opt[data-lang="${currentLang}"]`);
          if (opt) {
            document.getElementById("lang-flag").textContent = opt.dataset.flag;
            document.getElementById("lang-label").textContent = opt.dataset.label;
            opt.classList.add("active");
          }
          applyLanguage(currentLang);
        }
      }

      /* ══════════════════════════════════════════════
         HIGH CONTRAST MODE
      ══════════════════════════════════════════════ */
      window.toggleHighContrast = function() {
        const isHC = document.body.classList.toggle("high-contrast");
        localStorage.setItem("tm-hc", isHC ? "1" : "0");
        const btn = document.getElementById("hc-toggle-btn");
        if (btn) btn.setAttribute("aria-pressed", isHC ? "true" : "false");
      };

      // Restore HC preference
      if (localStorage.getItem("tm-hc") === "1") {
        document.body.classList.add("high-contrast");
        const btn = document.getElementById("hc-toggle-btn");
        if (btn) btn.setAttribute("aria-pressed", "true");
      }

      /* ══════════════════════════════════════════════
         STAR FIELD — INSIGHTS SECTION
      ══════════════════════════════════════════════ */
      (function() {
        const sf = document.getElementById("star-field-insights");
        if (!sf) return;
        for (let i = 0; i < 40; i++) {
          const s = document.createElement("div");
          s.className = "star";
          s.style.left = Math.random() * 100 + "%";
          s.style.top = Math.random() * 100 + "%";
          s.style.width = s.style.height = (1 + Math.random() * 2) + "px";
          s.style.animationDuration = (3 + Math.random() * 5) + "s";
          s.style.animationDelay = Math.random() * 4 + "s";
          sf.appendChild(s);
        }
      })();

      /* ══════════════════════════════════════════════
         KEYBOARD: nav-lnk items accessible via Enter
      ══════════════════════════════════════════════ */
      document.querySelectorAll(".nav-lnk[tabindex='0']").forEach(el => {
        el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.click(); } });
      });
