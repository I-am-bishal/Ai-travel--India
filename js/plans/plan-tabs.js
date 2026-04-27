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

      
