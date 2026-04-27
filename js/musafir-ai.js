      /* ════════════════════════════════════════════════════════
       MUSAFIR AI — India-only Travel Intelligence Engine
       • Pattern-match against curated travel KB
       • Graceful off-topic refusal
       • Web Speech API voice read-aloud toggle
       • Typing indicator + timestamp
       • Auto-resize textarea
    ════════════════════════════════════════════════════════ */
      (function () {
        let voiceEnabled = false;
        let synth = window.speechSynthesis || null;
        let panelOpen = false;

        /* ── Travel Knowledge Base ── */
        const KB = [
          // ── Best time / seasons ──
          {
            p: /best time.*(visit|go|travel|trip).*(ladakh|leh)/i,
            r: "🏔️ **Ladakh** is best visited from **June to September**. Roads to Leh via Manali and Srinagar open post-May snowmelt. Expect clear skies, lush valleys, and all attractions accessible. Avoid monsoon for Leh-Manali Highway — it can wash out. Winter (Jan–Feb) is only for hardcore cold-weather enthusiasts at -15°C!",
          },
          {
            p: /best time.*(visit|go|travel|trip).*(kerala|backwater)/i,
            r: "🌴 **Kerala** is perfect from **September to February**. October–February is peak season with low humidity, clear skies, and all houseboat routes open. Monsoon (Jun–Aug) transforms Kerala into a misty green paradise — great if you love rain. Avoid March–May (peak heat).",
          },
          {
            p: /best time.*(visit|go|travel|trip).*(rajasthan|jaipur|jodhpur|jaisalmer|udaipur)/i,
            r: "🏜️ **Rajasthan** shines from **October to February**. Desert nights are cool, monuments less crowded, and the Great Rann of Kutch comes alive. December sees the Pushkar Camel Fair. Avoid April–June — temperatures touch 48°C in Jaisalmer. Monsoon (Jul–Sep) adds romantic fogs to Udaipur's lakes.",
          },
          {
            p: /best time.*(visit|go|travel|trip).*(goa|beach|goan)/i,
            r: "🏖️ **Goa** is best from **November to February** — golden weather, festive vibe, New Year's parties, and clear waters. March–May is still warm but crowded. Avoid monsoon (Jun–Sep) when beaches close and rip-currents peak, though off-season Goa has its own rustic charm!",
          },
          {
            p: /best time.*(visit|go|travel|trip).*(himachal|manali|shimla|spiti)/i,
            r: "⛰️ **Himachal Pradesh**: Shimla/Manali are lovely **October–June** (minus winter snowfall Dec–Feb). Spiti Valley opens **June–September** only. Manali for snow: **January–February**. Spring (Apr–May) brings blooming rhododendrons. Rohtang Pass opens May–October depending on snowfall.",
          },
          {
            p: /best time|(when.*visit|when.*go|when.*travel)/i,
            r: "🗓️ India has incredible diversity by season! Here's a quick guide:\n• **Oct–Mar** → Most of India: Rajasthan, Delhi, South India, Goa\n• **Jun–Sep** → Ladakh, Spiti, Northeast, Kerala (monsoon magic)\n• **Apr–Jun** → Hill stations: Shimla, Ooty, Darjeeling\n• **Nov–Feb** → Kerala, Tamil Nadu, Andaman Islands\n\nTell me which region interests you for a precise answer!",
          },
          // ── Budget ──
          {
            p: /budget.*(rajasthan|jaipur|jodhpur|udaipur|jaisalmer)/i,
            r: "💰 **Rajasthan Budget Guide:**\n• Budget traveller: ₹1,500–2,500/day (hostels, local dhabas, buses)\n• Mid-range: ₹3,500–6,000/day (heritage guesthouses, train, restaurants)\n• Luxury: ₹12,000–40,000+/day (palace hotels like Umaid Bhawan or Taj Lake Palace)\n\n**Golden Triangle** (Delhi–Agra–Jaipur) in 5 days: ₹18k–28k mid-range including trains, mid-tier hotels, meals & entry fees.",
          },
          {
            p: /budget.*(kerala|backwater|munnar|alleppey|kochi)/i,
            r: "💰 **Kerala Budget Guide:**\n• Budget: ₹1,200–2,000/day (homestays, local buses, kanji meals)\n• Mid-range: ₹3,000–6,500/day (boutique homestays, AC houseboat, Kerala meals)\n• Luxury houseboat: ₹8,000–18,000 for 2 nights (fully-catered, AC)\n\nTip: Government-run KSRTC buses are excellent and cheap for intercity.",
          },
          {
            p: /budget.*(goa)/i,
            r: "💰 **Goa Budget Guide:**\n• Backpacker: ₹1,000–1,800/day (beach shack hut, local food)\n• Mid-range: ₹3,000–6,000/day (boutique hotel, scooter rental, beach shacks)\n• Premium: ₹10,000–25,000/day (5-star resort)\n\nRenting a scooter (₹300–500/day) is the best way to explore. Avoid December–January for best rates.",
          },
          {
            p: /budget.*(himachal|manali|shimla|ladakh|leh|spiti)/i,
            r: "💰 **Himachal/Ladakh Budget:**\n• Manali backpacker: ₹1,500–2,500/day\n• Ladakh mid-range: ₹4,500–7,000/day (guesthouses, shared jeep, local food)\n• Luxury Ladakh: ₹12,000–20,000/day\n\nLadakh requires permits (free) & acclimatization days. Budget 10–12 days for a full Ladakh circuit.",
          },
          {
            p: /budget|cost|price|how much|expensive|cheap/i,
            r: "💰 **India Budget Overview:**\n• **Budget traveller:** ₹1,200–2,000/day (hostels, local transport, dhabas)\n• **Mid-range:** ₹3,500–7,000/day (3-star hotels, trains, restaurants)\n• **Luxury:** ₹15,000–60,000+/day (palace hotels, private tours)\n\nWhich destination are you budgeting for? I can give exact estimates!",
          },
          // ── Taj Mahal ──
          {
            p: /taj mahal/i,
            r: "🕌 **Taj Mahal — Essential Guide:**\n• **Timings:** Sunrise to sunset, closed Fridays\n• **Entry:** ₹1,100 (foreign tourists) | ₹50 (Indian nationals)\n• **Best time:** Sunrise or 1 hour before sunset for golden light & fewer crowds\n• **Pro tips:** Book tickets online at asi.payumoney.com to skip queues. Mehtab Bagh (across river) gives stunning reflection views. The full moon nights (limited tickets) are magical!\n• **Nearby:** Agra Fort (4km), Fatehpur Sikri (40km)",
          },
          // ── Ladakh ──
          {
            p: /ladakh|leh|nubra|pangong|khardung/i,
            r: "🏔️ **Ladakh — The Land of High Passes:**\n• **How to reach:** Fly to Leh (best), or drive via Manali or Srinagar\n• **Acclimatize:** Spend 2 full days in Leh before any high-altitude excursions\n• **Must-sees:** Pangong Lake, Nubra Valley, Diskit Monastery, Magnetic Hill, Khardung La\n• **Season:** June–September only (roads close in winter)\n• **Permits:** Inner Line Permit for Nubra, Pangong, Tso Moriri (₹500 approx, get in Leh)\n• **Budget:** ₹4,500–7,000/day mid-range",
          },
          // ── Kerala ──
          {
            p: /kerala|backwater|alleppey|houseboat|munnar|kochi|varkala|kovalam/i,
            r: "🌴 **Kerala — God's Own Country:**\n• **Backwaters:** Alleppey (Alappuzha) — book a kettuvallam houseboat for 2 nights\n• **Tea hills:** Munnar (3–4 hrs from Kochi) — best for dawn views & elaichi chai\n• **Beach:** Varkala cliffs, Kovalam lighthouse beach, Mararikulam\n• **Wildlife:** Periyar (elephant boat safari), Wayanad\n• **Best route:** Kochi → Munnar → Thekkady → Alleppey → Varkala (7–10 days)\n• **Season:** Sep–Feb for best weather",
          },
          // ── Rajasthan ──
          {
            p: /rajasthan|jaipur|jaisalmer|jodhpur|udaipur|pushkar|amber fort|mehran/i,
            r: "🏜️ **Rajasthan — Land of Maharajas:**\n• **Classic circuit:** Jaipur → Jodhpur → Jaisalmer → Udaipur (7–10 days)\n• **Jaipur highlights:** Amber Fort, Hawa Mahal, City Palace, Jantar Mantar\n• **Jodhpur:** Mehrangarh Fort, Blue City walk, Zip-lining\n• **Jaisalmer:** Desert safari, golden fort, camel camps\n• **Udaipur:** City Palace, Lake Pichola boat, Bambora\n• **Best season:** October–March\n• **Train tip:** Take overnight trains between cities — saves on accommodation!",
          },
          // ── Golden Temple ──
          {
            p: /golden temple|amritsar|wagah|punjab|sikh/i,
            r: "⭐ **Golden Temple, Amritsar:**\n• **Entry:** Free, open 24 hours\n• **Langar:** Free community meal served 24/7 — feeds 100,000 people daily!\n• **Best time to visit:** 4–5 AM (early morning prayer) or after 9 PM (illuminated reflection)\n• **Wagah Border:** Beating Retreat ceremony — reach by 4 PM, highly emotional & patriotic\n• **Nearby:** Jallianwala Bagh memorial, Partition Museum\n• **How to dress:** Cover head (scarves provided), remove shoes, wash feet",
          },
          // ── Varanasi ──
          {
            p: /varanasi|banaras|ganga|kashi|aarti|ghats/i,
            r: "🪔 **Varanasi — The Eternal City:**\n• **Ganga Aarti:** Dashashwamedh Ghat every evening at sunset — magical ceremony\n• **Sunrise boat ride:** Must-do — hire a rowboat (₹300–600) at 5 AM\n• **Kashi Vishwanath Temple:** Major Shiva temple, now expanded into grand corridor\n• **Shopping:** Banarasi silk sarees from Vishwanath Gali, lassi at Blue Lassi shop\n• **Day trip:** Sarnath (15km) — where Buddha gave his first sermon\n• **Stay:** Hotels on the ghats for authentic experience",
          },
          // ── Himachal / Manali ──
          {
            p: /manali|rohtang|solang|kullu|himachal|hp|spiti/i,
            r: "⛰️ **Manali & Himachal Guide:**\n• **Best seasons:** May–June (pre-monsoon) & Sep–Oct (post-monsoon, crisp skies)\n• **Manali musts:** Hadimba Temple, Solang Valley, Old Manali, Manu Temple\n• **Rohtang Pass:** Permits required (book online), open May–Oct\n• **Spiti:** Via Rohtang or Shimla–Spiti road. Best Jun–Sep\n• **Adventure:** Paragliding at Bir Billing (₹2,800), trekting Hampta Pass, Kheerganga\n• **Budget stay:** Vashisht & Old Manali neighborhoods",
          },
          // ── Goa ──
          {
            p: /goa|beach|calangute|baga|palolem|anjuna|north goa|south goa/i,
            r: "🏖️ **Goa — India's Beach Capital:**\n• **North Goa:** Lively — Calangute, Baga, Anjuna (nightlife, water sports)\n• **South Goa:** Peaceful — Palolem, Agonda, Butterfly Beach (kayaking, dolphins)\n• **Season:** Nov–Feb for perfect weather\n• **Must-do:** Sunset at Fort Aguada, Saturday Night Market (Arpora), Dudhsagar Falls\n• **Transport:** Rent a scooter ₹300–500/day — best way to explore\n• **Food:** Goan fish curry at a beach shack is non-negotiable!",
          },
          // ── Andaman ──
          {
            p: /andaman|havelock|radhanagar|port blair|neil island/i,
            r: "🐠 **Andaman & Nicobar Islands:**\n• **How to reach:** Fly to Port Blair from Chennai, Kolkata, Delhi (2–3 hrs)\n• **Best island:** Havelock (Neil Island combo is ideal)\n• **Radhanagar Beach:** Asia's best — arrive by 3 PM for the sunset\n• **Activities:** Snorkeling, scuba diving, sea-walking, glass-bottom boat\n• **Season:** November–April (avoid May–October monsoon)\n• **Budget:** ₹5,000–8,000/day including ferry + accommodation",
          },
          // ── Wildlife ──
          {
            p: /tiger|safari|wildlife|ranthambore|jim corbett|kaziranga|sundarbans|periyar/i,
            r: "🐅 **India's Best Wildlife Experiences:**\n• **Bengal Tiger:** Ranthambhore (Rajasthan), Jim Corbett (Uttarakhand), Bandhavgarh (MP)\n• **One-horned Rhino:** Kaziranga National Park, Assam — UNESCO World Heritage\n• **Elephants:** Periyar (Kerala), Corbett, Nagarhole (Karnataka)\n• **Snow Leopard:** Hemis NP, Ladakh\n• **Booking:** Tiger safaris need 2–3 months advance booking, especially zones 1–5 at Ranthambhore\n• **Best season:** Oct–June (avoid monsoon when parks partially close)",
          },
          // ── Northeastern India ──
          {
            p: /northeast|meghalaya|assam|arunachal|nagaland|manipur|shillong|cherrapunji|ziro/i,
            r: "🌿 **Northeast India — India's Hidden Paradise:**\n• **Must-visit:** Meghalaya (living root bridges, cleanest village Mawlynnong), Kaziranga (rhinos), Ziro Valley (Apatani culture)\n• **Permit:** Inner Line Permit required for Arunachal, Nagaland, Mizoram, Manipur\n• **Cherrapunji:** Wettest place on Earth — stunning waterfalls, Mawsmai caves\n• **Shillong:** Scotland of East — Ward's Lake, Elephant Falls, polo ground\n• **Best time:** Sep–Nov (post-monsoon, clear, lush)\n• **Cuisine:** Don't miss Meghalaya pork with bamboo shoot, Assamese fish curry",
          },
          // ── Solo travel / safety ──
          {
            p: /solo|safety|safe|woman|female|alone/i,
            r: "🧳 **Solo Travel in India — Tips:**\n• **Safest states:** Kerala, Himachal, Uttarakhand, Rajasthan (tourist circuits)\n• **For solo women:** Kerala & South India consistently rated safest; Ladakh is very secure\n• **Transport:** Use Ola/Uber for cabs, pre-booked trains (book on IRCTC app)\n• **Accommodation:** Book well-reviewed properties on Booking.com/Airbnb\n• **Emergency:** 112 (Police), 100 (Police), 108 (Ambulance)\n• **Key tip:** Register with your country's embassy for remote treks",
          },
          // ── Visa ──
          {
            p: /visa|e.visa|passport|entry|permit/i,
            r: "🛂 **India Visa Information:**\n• **e-Visa:** Available for 167+ nationalities — indianvisaonline.gov.in\n• **Types:** Tourist e-Visa (30 days/1 year/5 year), Business, Medical\n• **Apply:** Minimum 4 days before arrival; approval usually within 72 hours\n• **Cost:** USD 25–80 depending on nationality and duration\n• **Special permits:** Ladakh, Arunachal, Nagaland, Sikkim require Inner Line Permits (free/cheap for Indian nationals)",
          },
          // ── Food ──
          {
            p: /food|eat|cuisine|restaurant|dine|dish|street food|local food/i,
            r: "🍛 **India Food Guide:**\n• **North India:** Butter chicken, biryani, chole bhature, parathas, dal makhani\n• **South India:** Masala dosa, idli-sambar, Chettinad curry, Hyderabadi biryani, Kerala fish curry\n• **Street food icons:** Vada pav (Mumbai), Pani puri, Golgappa, Papri chaat (Delhi), Kathi roll (Kolkata)\n• **Rajasthan:** Dal baati churma, laal maas, ghewar\n• **Safety tip:** Opt for cooked, hot street food. Avoid cut fruits and ice in non-touristy areas\n• **Vegetarian heaven:** India has the world's richest vegetarian cuisine!",
          },
          // ── Currency / money / payment ──
          {
            p: /currency|money|cash|atm|upi|payment|rupee|exchange/i,
            r: "💳 **Money in India:**\n• **Currency:** Indian Rupee (₹) — 1 USD ≈ ₹83–84\n• **ATMs:** Widespread in cities; carry cash in rural/remote areas\n• **UPI:** PhonePe, Google Pay, Paytm accepted almost everywhere — incredibly convenient\n• **Exchange:** Airports, authorised forex dealers, or your bank at home\n• **Budget markers:** ₹10–30 chai, ₹60–150 local meal, ₹500–800 budget guesthouse",
          },
          // ── Language ──
          {
            p: /language|speak|hindi|english|communicate|translation/i,
            r: "🗣️ **Languages in India:**\n• India has 22 official languages + 1,600 dialects\n• **English** is widely spoken in tourist areas, hotels, transport hubs, and by educated professionals\n• **Hindi** is understood across North & Central India\n• **South India:** Tamil, Telugu, Kannada, Malayalam — English very helpful here\n• **App tip:** Google Translate works offline. Download the India language packs!",
          },
          // ── Transport ──
          {
            p: /train|taxi|flight|flight|bus|transport|how to reach|getting around|irctc|ola|uber|auto/i,
            r: "🚆 **Getting Around India:**\n• **Trains:** IRCTC app — backbone of Indian travel. Book Tatkal (₹150–500 extra) 1 day before for last-minute tickets\n• **Flights:** IndiGo, Air India, SpiceJet for domestic — often cheap if booked 2+ months ahead\n• **Cabs:** Ola & Uber in all major cities — safe and metered\n• **Auto-rickshaws:** Negotiate before boarding or insist on meter\n• **Buses:** KSRTC (Kerala), MSRTC (Maharashtra) — comfortable and very affordable",
          },
          // ── Weather ──
          {
            p: /weather|climate|temperature|monsoon|rain|hot|cold|winter|summer/i,
            r: "🌦️ **India Climate Overview:**\n• **Oct–Mar:** Winter — perfect for most destinations. Cool, dry, clear skies\n• **Apr–Jun:** Summer — hot plains; ideal for hill stations (Shimla, Ooty, Darjeeling)\n• **Jul–Sep:** Monsoon — Northwest hit hard; Kerala & Northeast transform into lush green paradise\n• **Hill stations in summer:** Above 1,500m stays pleasant at 15–22°C even in May–June\n\nWhere are you planning to visit? I'll give exact forecast expectations!",
          },
          // ── Photography ──
          {
            p: /photo|photography|camera|shoot|instagram|picture/i,
            r: "📸 **Photography in India — Golden tips:**\n• **Golden hour:** 30 min after sunrise & 1 hr before sunset — magical light everywhere\n• **Taj Mahal:** Sunrise for fewer crowds, mist, and perfect golden light\n• **Varanasi:** Boat at 5 AM for ghats photography\n• **Restrictions:** Many temples/forts prohibit cameras inside (tripods usually banned at ASI sites)\n• **Respect:** Always ask permission before photographing locals\n• **Best gear:** A 24–70mm lens covers 90% of India travel photography",
          },
          // ── Trekking ──
          {
            p: /trek|trekking|hike|hiking|camp|camping|altitude/i,
            r: "🥾 **Trekking in India:**\n• **Beginner:** Triund (Dharamsala), Kheerganga (Manali), Valley of Flowers (Uttarakhand)\n• **Moderate:** Hampta Pass, Roopkund Lake, Kedarkantha\n• **Advanced:** Stok Kangri (Ladakh, 6,153m), Sandakphu (Darjeeling)\n• **Operators:** Book via reputed operators like Indiahikes or Thrillophilia for guided treks\n• **Best season:** May–June & Sep–Oct for most Himalayan treks\n• **Altitude sickness:** Acclimatize properly above 3,000m; carry Diamox if advised",
          },
          // ── Spiritual ──
          {
            p: /temple|spiritual|pilgrimage|yoga|ashram|meditation|holy|sacred|divine/i,
            r: "🙏 **Spiritual India — Key Destinations:**\n• **Varanasi:** Oldest living city; Ganga Aarti, Kashi Vishwanath — deeply transformative\n• **Rishikesh:** Yoga capital; ashrams, meditation retreats, Beatles Ashram\n• **Tirupati:** Most visited religious site in the world; Sri Venkateswara Temple\n• **Golden Temple, Amritsar:** Sikh holiest shrine; free langar; open 24/7\n• **Char Dham:** Kedarnath, Badrinath, Gangotri, Yamunotri — ultimate Himalayan pilgrimage\n• **Yoga retreats:** Book at Parmarth Niketan or Sivananda Ashram in Rishikesh",
          },
          // ── Hotels / stay ──
          {
            p: /hotel|resort|stay|accommodation|hostel|guesthouse|airbnb|heritage|palace/i,
            r: "🏨 **Where to Stay in India:**\n• **Budget:** Zostel hostels (₹400–700/bed), OYO rooms, family guesthouses\n• **Mid-range:** Fabhotels, Treebo — clean, comfortable (₹1,200–3,500)\n• **Heritage luxury:** Taj Hotels, Oberoi, ITC — palace experiences (₹8,000–50,000+)\n• **Unique stays:** Houseboat in Kerala, tent in Spiti, haveli in Rajasthan\n• **Booking tip:** Booking.com, MakeMyTrip, Goibibo — compare all. Book directly with heritage properties for better rates\n• **Airbnb:** Great for Kerala homestays and Coorg coffee estates",
          },
          // ── General India travel ──
          {
            p: /india|incredible india|plan|itinerary|route|circuit|discover|explore/i,
            r: "🇮🇳 **Planning Your India Journey:**\n\nIndia is vast — best explored in thematic circuits:\n• **Golden Triangle:** Delhi → Agra → Jaipur (5–7 days) — perfect intro\n• **Rajasthan Odyssey:** Jaipur → Jodhpur → Jaisalmer → Udaipur (10–14 days)\n• **South India:** Kerala → Tamil Nadu → Karnataka (10–16 days)\n• **Himalayan Adventure:** Manali → Leh → Nubra → Pangong (10–14 days)\n• **Northeast Circuit:** Guwahati → Kaziranga → Shillong → Cherrapunji (8–10 days)\n\nShare your interests, duration & budget — I'll build a custom itinerary! 🗺️",
          },
        ];

        /* ── Off-topic patterns (reject these) ── */
        const NON_TRAVEL = [
          /\b(code|python|java|javascript|html|css|program|debug|software|algorithm|machine learning|ai model|chatgpt|gpt)\b/i,
          /\b(recipe|cook|cooking|medical|doctor|hospital|medicine|health|cure|disease|symptom)\b/i,
          /\b(stock|market|crypto|bitcoin|finance|invest|tax|loan|bank account)\b/i,
          /\b(homework|essay|math|science|physics|chemistry|history of)\b/i,
          /\b(movie|song|music|actor|actress|bollywood|cricket|sports|ipl|football)\b/i,
          /\b(politics|election|government|vote|news|newspaper|war|army|military)\b/i,
        ];

        const TRAVEL_KEYWORDS =
          /\b(travel|trip|tour|visit|destination|place|india|hotel|flight|train|bus|beach|mountain|trek|safari|temple|budget|visa|goa|rajasthan|kerala|ladakh|himachal|andaman|varanasi|mysore|delhi|mumbai|kolkata|jaipur|udaipur|manali|shimla|ooty|wildlife|backwater|heritage|culture|food|stay|route|itinerary|season|time|weather|monsoon|permit|passport|currency|rupee|guide|tips|safety|solo|plan|package|night|day|week)\b/i;

        /* ── Helpers ── */
        function getTime() {
          return new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        }

        function formatResponse(text) {
          // Convert **bold** and newlines for HTML display
          return text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br>");
        }

        function scrollBottom() {
          const msgs = document.getElementById("mai-msgs");
          if (!msgs) return;
          requestAnimationFrame(() => {
            msgs.scrollTo({ top: msgs.scrollHeight, behavior: "smooth" });
          });
        }

        function speak(text) {
          if (!voiceEnabled || !synth) return;
          synth.cancel();
          const plain = text
            .replace(/<[^>]+>/g, "")
            .replace(/\*\*/g, "")
            .replace(/[•·]/g, "")
            .replace(/\n/g, " ")
            .trim();
          const utt = new SpeechSynthesisUtterance(plain.substring(0, 600));
          utt.lang = "en-IN";
          utt.rate = 0.88;
          utt.pitch = 1.15;
          utt.volume = 1;

          function pickVoice(voices) {
            if (!voices || voices.length === 0) return null;
            // Priority 1: female Indian English voices by name
            const femaleIndianNames = [
              "Aditi",
              "Raveena",
              "Heera",
              "Sunita",
              "Priya",
              "Neerja",
              "Lekha",
              "Shreya",
              "Ananya",
            ];
            for (const name of femaleIndianNames) {
              const v = voices.find((v) => v.name.includes(name));
              if (v) return v;
            }
            // Priority 2: en-IN female voice
            const inFem = voices.find(
              (v) => v.lang === "en-IN" && /female|woman|girl/i.test(v.name),
            );
            if (inFem) return inFem;
            // Priority 3: any en-IN voice
            const inAny = voices.find((v) => v.lang === "en-IN");
            if (inAny) return inAny;
            // Priority 4: en-GB female (closest to Indian accent in browsers)
            const gbFem = voices.find(
              (v) => v.lang === "en-GB" && /female|woman/i.test(v.name),
            );
            if (gbFem) return gbFem;
            // Priority 5: any en voice
            return voices.find((v) => v.lang.startsWith("en")) || voices[0];
          }

          const voices = synth.getVoices();
          if (voices.length > 0) {
            const v = pickVoice(voices);
            if (v) utt.voice = v;
            synth.speak(utt);
          } else {
            synth.addEventListener(
              "voiceschanged",
              () => {
                const v2 = pickVoice(synth.getVoices());
                if (v2) utt.voice = v2;
                synth.speak(utt);
              },
              { once: true },
            );
          }
        }

        function appendMsg(role, html, isOff) {
          const msgs = document.getElementById("mai-msgs");
          const wrap = document.createElement("div");
          wrap.className = "mai-msg" + (role === "user" ? " user-msg" : "");
          if (role === "ai") {
            wrap.innerHTML = `<div class="mai-msg-avatar">🧭</div>
        <div>
          <div class="mai-bubble ai${isOff ? " off" : ""}">${html}</div>
          <span class="mai-msg-time">${getTime()}</span>
        </div>`;
          } else {
            wrap.innerHTML = `<div>
          <div class="mai-bubble user">${html}</div>
          <span class="mai-msg-time">${getTime()}</span>
        </div>`;
          }
          msgs.appendChild(wrap);
          scrollBottom();
        }

        function showTyping() {
          const msgs = document.getElementById("mai-msgs");
          const t = document.createElement("div");
          t.className = "mai-msg";
          t.id = "mai-typing";
          t.innerHTML = `<div class="mai-msg-avatar" style="overflow:hidden;background:transparent;padding:0;flex-shrink:0">
        <img src="musafir-ai-logo.png" alt="Musafir AI" style="width:100%;height:100%;object-fit:cover;border-radius:50%" onerror="this.parentElement.style.background='var(--mai-green3)';this.style.display='none';this.parentElement.textContent='\u{1F9ED}'" />
      </div>
      <div class="mai-bubble ai" style="padding:2px 4px">
        <div class="mai-typing"><span></span><span></span><span></span></div>
      </div>`;
          msgs.appendChild(t);
          scrollBottom();
        }

        function removeTyping() {
          const t = document.getElementById("mai-typing");
          if (t) t.remove();
        }

        function findAnswer(q) {
          for (const item of KB) {
            if (item.p.test(q)) return { text: item.r, off: false };
          }
          // Check if clearly travel-related but not in KB
          if (TRAVEL_KEYWORDS.test(q)) {
            return {
              text: `🌍 Great question about **${q.replace(/[?!.]/g, "").substring(0, 40)}**!\n\nAs your India travel specialist, I can help with:\n• **Destinations:** Best places to visit based on your interests\n• **Itineraries:** Day-by-day route planning\n• **Budgets:** Accurate cost estimates by travel style\n• **Tips:** Visas, permits, local transport, safety\n\nCould you add more detail? For example: *"3-day trip to Kerala under ₹15,000"* or *"Best wildlife parks for tiger sighting"* — and I'll give a precise answer! 🗺️`,
              off: false,
            };
          }
          return { text: null, off: true };
        }

        function processQuery(q) {
          if (!q.trim()) return;

          // Hide suggestions once user starts chatting
          const sugs = document.getElementById("mai-suggestions");
          if (sugs && sugs.style.display !== "none") {
            sugs.style.opacity = "0";
            sugs.style.transform = "translateY(10px)";
            setTimeout(() => {
              sugs.style.display = "none";
            }, 400);
          }

          // Append user message
          appendMsg("user", q.replace(/</g, "&lt;").replace(/>/g, "&gt;"));

          // Check non-travel
          const isNonTravel = NON_TRAVEL.some((p) => p.test(q));
          if (isNonTravel) {
            showTyping();
            setTimeout(() => {
              removeTyping();
              const reply =
                "🧳 I'm **Musafir AI**, your dedicated India travel assistant! I specialise exclusively in travel — destinations, itineraries, budgets, tips, and experiences across India's incredible 36 states.\n\nFor non-travel topics, please use a general assistant. But ask me anything about *where to go, when to visit, how to plan, or what to pack* in India — I'm all yours! 🌍";
              appendMsg("ai", formatResponse(reply), true);
              speak(reply);
            }, 900);
            return;
          }

          showTyping();
          const delay = 700 + Math.random() * 600;
          setTimeout(() => {
            removeTyping();
            const { text, off } = findAnswer(q);
            if (off) {
              const reply =
                '🧭 I specialise only in **India travel** — destinations, trip planning, budgets, safety, visas, transport, food, and experiences. Could you frame your question around a travel topic? For example:\n\n• *"Best places to visit in Uttarakhand"*\n• *"Budget for 7-day Kerala trip"*\n• *"How to reach Spiti Valley from Delhi"*\n\nI\'m here to plan your perfect Indian adventure! 🌍';
              appendMsg("ai", formatResponse(reply), true);
              speak(reply);
            } else {
              appendMsg("ai", formatResponse(text), false);
              speak(text);
            }
          }, delay);
        }

        /* ── Public API ── */
        window.musafirToggle = function () {
          panelOpen = !panelOpen;
          document
            .getElementById("musafir-panel")
            .classList.toggle("open", panelOpen);
          document
            .getElementById("musafir-launcher")
            .classList.toggle("open", panelOpen);
          if (
            panelOpen &&
            document.getElementById("mai-msgs").children.length === 0
          ) {
            // Welcome message
            setTimeout(() => {
              appendMsg(
                "ai",
                formatResponse(
                  "🙏 **Namaste! I'm Musafir AI** — your personal India travel expert.\n\nI can help you with:\n• **Destination discovery** across all 36 states\n• **Custom itineraries** for any duration & budget\n• **Best seasons** to visit each place\n• **Visa, permits** & travel logistics\n• **Local food, culture** & insider tips\n\nWhere in India are you dreaming of exploring? ✈️",
                ),
                false,
              );
              // Show suggestions only on first open
              const sugs = document.getElementById("mai-suggestions");
              if (sugs) {
                sugs.style.display = "flex";
                sugs.style.opacity = "1";
                sugs.style.transform = "none";
              }
            }, 350);
          }
          if (panelOpen)
            setTimeout(() => document.getElementById("mai-input").focus(), 400);
        };

        window.musafirReset = function () {
          // Clear all messages
          const msgs = document.getElementById("mai-msgs");
          if (msgs) msgs.innerHTML = "";
          // Stop any voice
          if (synth) synth.cancel();
          // Restore suggestions
          const sugs = document.getElementById("mai-suggestions");
          if (sugs) {
            sugs.style.display = "flex";
            sugs.style.opacity = "1";
            sugs.style.transform = "none";
          }
          // Show fresh greeting after brief pause
          setTimeout(() => {
            appendMsg(
              "ai",
              formatResponse(
                "🔄 Chat reset! Ready for your next **India** adventure.\n\nWhat destination are you curious about? 🗺️",
              ),
              false,
            );
          }, 200);
        };

        window.musafirVoiceToggle = function () {
          voiceEnabled = !voiceEnabled;
          const btn = document.getElementById("mai-voice-btn");
          const icon = btn.querySelector(".mai-voice-icon");
          const label = document.getElementById("mai-voice-label");
          btn.classList.toggle("active", voiceEnabled);
          icon.textContent = voiceEnabled ? "🔊" : "🔇";
          label.textContent = voiceEnabled ? "Voice On" : "Voice Off";
          if (!voiceEnabled && synth) synth.cancel();
          else if (voiceEnabled) {
            // Announce voice on
            speak(
              "Voice responses enabled. Ask me anything about travel in India!",
            );
          }
        };

        window.musafirSend = function () {
          const inp = document.getElementById("mai-input");
          const q = inp.value.trim();
          if (!q) return;
          inp.value = "";
          inp.style.height = "44px";
          processQuery(q);
        };

        window.musafirKey = function (e) {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            musafirSend();
          }
        };

        window.musafirSuggest = function (el) {
          const q = el.textContent.trim();
          // Briefly highlight
          el.style.background = "rgba(46,204,113,.25)";
          setTimeout(() => {
            el.style.background = "";
          }, 400);
          processQuery(q);
        };

        window.musafirResize = function (el) {
          el.style.height = "44px";
          el.style.height = Math.min(el.scrollHeight, 96) + "px";
        };

        // Load voices asynchronously
        if (synth) {
          if (synth.getVoices().length === 0) {
            synth.addEventListener("voiceschanged", () => {}, { once: true });
          }
        }
      })();