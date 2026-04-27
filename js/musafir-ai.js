      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
       MUSAFIR AI â€” India-only Travel Intelligence Engine
       â€¢ Pattern-match against curated travel KB
       â€¢ Graceful off-topic refusal
       â€¢ Web Speech API voice read-aloud toggle
       â€¢ Typing indicator + timestamp
       â€¢ Auto-resize textarea
    â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      (function () {
        let voiceEnabled = false;
        let synth = window.speechSynthesis || null;
        let panelOpen = false;

        /* â”€â”€ Travel Knowledge Base â”€â”€ */
        const KB = [
          // â”€â”€ Best time / seasons â”€â”€
          {
            p: /best time.*(visit|go|travel|trip).*(ladakh|leh)/i,
            r: "ðŸ”ï¸ **Ladakh** is best visited from **June to September**. Roads to Leh via Manali and Srinagar open post-May snowmelt. Expect clear skies, lush valleys, and all attractions accessible. Avoid monsoon for Leh-Manali Highway â€” it can wash out. Winter (Janâ€“Feb) is only for hardcore cold-weather enthusiasts at -15Â°C!",
          },
          {
            p: /best time.*(visit|go|travel|trip).*(kerala|backwater)/i,
            r: "ðŸŒ´ **Kerala** is perfect from **September to February**. Octoberâ€“February is peak season with low humidity, clear skies, and all houseboat routes open. Monsoon (Junâ€“Aug) transforms Kerala into a misty green paradise â€” great if you love rain. Avoid Marchâ€“May (peak heat).",
          },
          {
            p: /best time.*(visit|go|travel|trip).*(rajasthan|jaipur|jodhpur|jaisalmer|udaipur)/i,
            r: "ðŸœï¸ **Rajasthan** shines from **October to February**. Desert nights are cool, monuments less crowded, and the Great Rann of Kutch comes alive. December sees the Pushkar Camel Fair. Avoid Aprilâ€“June â€” temperatures touch 48Â°C in Jaisalmer. Monsoon (Julâ€“Sep) adds romantic fogs to Udaipur's lakes.",
          },
          {
            p: /best time.*(visit|go|travel|trip).*(goa|beach|goan)/i,
            r: "ðŸ–ï¸ **Goa** is best from **November to February** â€” golden weather, festive vibe, New Year's parties, and clear waters. Marchâ€“May is still warm but crowded. Avoid monsoon (Junâ€“Sep) when beaches close and rip-currents peak, though off-season Goa has its own rustic charm!",
          },
          {
            p: /best time.*(visit|go|travel|trip).*(himachal|manali|shimla|spiti)/i,
            r: "â›°ï¸ **Himachal Pradesh**: Shimla/Manali are lovely **Octoberâ€“June** (minus winter snowfall Decâ€“Feb). Spiti Valley opens **Juneâ€“September** only. Manali for snow: **Januaryâ€“February**. Spring (Aprâ€“May) brings blooming rhododendrons. Rohtang Pass opens Mayâ€“October depending on snowfall.",
          },
          {
            p: /best time|(when.*visit|when.*go|when.*travel)/i,
            r: "ðŸ—“ï¸ India has incredible diversity by season! Here's a quick guide:\nâ€¢ **Octâ€“Mar** â†’ Most of India: Rajasthan, Delhi, South India, Goa\nâ€¢ **Junâ€“Sep** â†’ Ladakh, Spiti, Northeast, Kerala (monsoon magic)\nâ€¢ **Aprâ€“Jun** â†’ Hill stations: Shimla, Ooty, Darjeeling\nâ€¢ **Novâ€“Feb** â†’ Kerala, Tamil Nadu, Andaman Islands\n\nTell me which region interests you for a precise answer!",
          },
          // â”€â”€ Budget â”€â”€
          {
            p: /budget.*(rajasthan|jaipur|jodhpur|udaipur|jaisalmer)/i,
            r: "ðŸ’° **Rajasthan Budget Guide:**\nâ€¢ Budget traveller: â‚¹1,500â€“2,500/day (hostels, local dhabas, buses)\nâ€¢ Mid-range: â‚¹3,500â€“6,000/day (heritage guesthouses, train, restaurants)\nâ€¢ Luxury: â‚¹12,000â€“40,000+/day (palace hotels like Umaid Bhawan or Taj Lake Palace)\n\n**Golden Triangle** (Delhiâ€“Agraâ€“Jaipur) in 5 days: â‚¹18kâ€“28k mid-range including trains, mid-tier hotels, meals & entry fees.",
          },
          {
            p: /budget.*(kerala|backwater|munnar|alleppey|kochi)/i,
            r: "ðŸ’° **Kerala Budget Guide:**\nâ€¢ Budget: â‚¹1,200â€“2,000/day (homestays, local buses, kanji meals)\nâ€¢ Mid-range: â‚¹3,000â€“6,500/day (boutique homestays, AC houseboat, Kerala meals)\nâ€¢ Luxury houseboat: â‚¹8,000â€“18,000 for 2 nights (fully-catered, AC)\n\nTip: Government-run KSRTC buses are excellent and cheap for intercity.",
          },
          {
            p: /budget.*(goa)/i,
            r: "ðŸ’° **Goa Budget Guide:**\nâ€¢ Backpacker: â‚¹1,000â€“1,800/day (beach shack hut, local food)\nâ€¢ Mid-range: â‚¹3,000â€“6,000/day (boutique hotel, scooter rental, beach shacks)\nâ€¢ Premium: â‚¹10,000â€“25,000/day (5-star resort)\n\nRenting a scooter (â‚¹300â€“500/day) is the best way to explore. Avoid Decemberâ€“January for best rates.",
          },
          {
            p: /budget.*(himachal|manali|shimla|ladakh|leh|spiti)/i,
            r: "ðŸ’° **Himachal/Ladakh Budget:**\nâ€¢ Manali backpacker: â‚¹1,500â€“2,500/day\nâ€¢ Ladakh mid-range: â‚¹4,500â€“7,000/day (guesthouses, shared jeep, local food)\nâ€¢ Luxury Ladakh: â‚¹12,000â€“20,000/day\n\nLadakh requires permits (free) & acclimatization days. Budget 10â€“12 days for a full Ladakh circuit.",
          },
          {
            p: /budget|cost|price|how much|expensive|cheap/i,
            r: "ðŸ’° **India Budget Overview:**\nâ€¢ **Budget traveller:** â‚¹1,200â€“2,000/day (hostels, local transport, dhabas)\nâ€¢ **Mid-range:** â‚¹3,500â€“7,000/day (3-star hotels, trains, restaurants)\nâ€¢ **Luxury:** â‚¹15,000â€“60,000+/day (palace hotels, private tours)\n\nWhich destination are you budgeting for? I can give exact estimates!",
          },
          // â”€â”€ Taj Mahal â”€â”€
          {
            p: /taj mahal/i,
            r: "ðŸ•Œ **Taj Mahal â€” Essential Guide:**\nâ€¢ **Timings:** Sunrise to sunset, closed Fridays\nâ€¢ **Entry:** â‚¹1,100 (foreign tourists) | â‚¹50 (Indian nationals)\nâ€¢ **Best time:** Sunrise or 1 hour before sunset for golden light & fewer crowds\nâ€¢ **Pro tips:** Book tickets online at asi.payumoney.com to skip queues. Mehtab Bagh (across river) gives stunning reflection views. The full moon nights (limited tickets) are magical!\nâ€¢ **Nearby:** Agra Fort (4km), Fatehpur Sikri (40km)",
          },
          // â”€â”€ Ladakh â”€â”€
          {
            p: /ladakh|leh|nubra|pangong|khardung/i,
            r: "ðŸ”ï¸ **Ladakh â€” The Land of High Passes:**\nâ€¢ **How to reach:** Fly to Leh (best), or drive via Manali or Srinagar\nâ€¢ **Acclimatize:** Spend 2 full days in Leh before any high-altitude excursions\nâ€¢ **Must-sees:** Pangong Lake, Nubra Valley, Diskit Monastery, Magnetic Hill, Khardung La\nâ€¢ **Season:** Juneâ€“September only (roads close in winter)\nâ€¢ **Permits:** Inner Line Permit for Nubra, Pangong, Tso Moriri (â‚¹500 approx, get in Leh)\nâ€¢ **Budget:** â‚¹4,500â€“7,000/day mid-range",
          },
          // â”€â”€ Kerala â”€â”€
          {
            p: /kerala|backwater|alleppey|houseboat|munnar|kochi|varkala|kovalam/i,
            r: "ðŸŒ´ **Kerala â€” God's Own Country:**\nâ€¢ **Backwaters:** Alleppey (Alappuzha) â€” book a kettuvallam houseboat for 2 nights\nâ€¢ **Tea hills:** Munnar (3â€“4 hrs from Kochi) â€” best for dawn views & elaichi chai\nâ€¢ **Beach:** Varkala cliffs, Kovalam lighthouse beach, Mararikulam\nâ€¢ **Wildlife:** Periyar (elephant boat safari), Wayanad\nâ€¢ **Best route:** Kochi â†’ Munnar â†’ Thekkady â†’ Alleppey â†’ Varkala (7â€“10 days)\nâ€¢ **Season:** Sepâ€“Feb for best weather",
          },
          // â”€â”€ Rajasthan â”€â”€
          {
            p: /rajasthan|jaipur|jaisalmer|jodhpur|udaipur|pushkar|amber fort|mehran/i,
            r: "ðŸœï¸ **Rajasthan â€” Land of Maharajas:**\nâ€¢ **Classic circuit:** Jaipur â†’ Jodhpur â†’ Jaisalmer â†’ Udaipur (7â€“10 days)\nâ€¢ **Jaipur highlights:** Amber Fort, Hawa Mahal, City Palace, Jantar Mantar\nâ€¢ **Jodhpur:** Mehrangarh Fort, Blue City walk, Zip-lining\nâ€¢ **Jaisalmer:** Desert safari, golden fort, camel camps\nâ€¢ **Udaipur:** City Palace, Lake Pichola boat, Bambora\nâ€¢ **Best season:** Octoberâ€“March\nâ€¢ **Train tip:** Take overnight trains between cities â€” saves on accommodation!",
          },
          // â”€â”€ Golden Temple â”€â”€
          {
            p: /golden temple|amritsar|wagah|punjab|sikh/i,
            r: "â­ **Golden Temple, Amritsar:**\nâ€¢ **Entry:** Free, open 24 hours\nâ€¢ **Langar:** Free community meal served 24/7 â€” feeds 100,000 people daily!\nâ€¢ **Best time to visit:** 4â€“5 AM (early morning prayer) or after 9 PM (illuminated reflection)\nâ€¢ **Wagah Border:** Beating Retreat ceremony â€” reach by 4 PM, highly emotional & patriotic\nâ€¢ **Nearby:** Jallianwala Bagh memorial, Partition Museum\nâ€¢ **How to dress:** Cover head (scarves provided), remove shoes, wash feet",
          },
          // â”€â”€ Varanasi â”€â”€
          {
            p: /varanasi|banaras|ganga|kashi|aarti|ghats/i,
            r: "ðŸª” **Varanasi â€” The Eternal City:**\nâ€¢ **Ganga Aarti:** Dashashwamedh Ghat every evening at sunset â€” magical ceremony\nâ€¢ **Sunrise boat ride:** Must-do â€” hire a rowboat (â‚¹300â€“600) at 5 AM\nâ€¢ **Kashi Vishwanath Temple:** Major Shiva temple, now expanded into grand corridor\nâ€¢ **Shopping:** Banarasi silk sarees from Vishwanath Gali, lassi at Blue Lassi shop\nâ€¢ **Day trip:** Sarnath (15km) â€” where Buddha gave his first sermon\nâ€¢ **Stay:** Hotels on the ghats for authentic experience",
          },
          // â”€â”€ Himachal / Manali â”€â”€
          {
            p: /manali|rohtang|solang|kullu|himachal|hp|spiti/i,
            r: "â›°ï¸ **Manali & Himachal Guide:**\nâ€¢ **Best seasons:** Mayâ€“June (pre-monsoon) & Sepâ€“Oct (post-monsoon, crisp skies)\nâ€¢ **Manali musts:** Hadimba Temple, Solang Valley, Old Manali, Manu Temple\nâ€¢ **Rohtang Pass:** Permits required (book online), open Mayâ€“Oct\nâ€¢ **Spiti:** Via Rohtang or Shimlaâ€“Spiti road. Best Junâ€“Sep\nâ€¢ **Adventure:** Paragliding at Bir Billing (â‚¹2,800), trekting Hampta Pass, Kheerganga\nâ€¢ **Budget stay:** Vashisht & Old Manali neighborhoods",
          },
          // â”€â”€ Goa â”€â”€
          {
            p: /goa|beach|calangute|baga|palolem|anjuna|north goa|south goa/i,
            r: "ðŸ–ï¸ **Goa â€” India's Beach Capital:**\nâ€¢ **North Goa:** Lively â€” Calangute, Baga, Anjuna (nightlife, water sports)\nâ€¢ **South Goa:** Peaceful â€” Palolem, Agonda, Butterfly Beach (kayaking, dolphins)\nâ€¢ **Season:** Novâ€“Feb for perfect weather\nâ€¢ **Must-do:** Sunset at Fort Aguada, Saturday Night Market (Arpora), Dudhsagar Falls\nâ€¢ **Transport:** Rent a scooter â‚¹300â€“500/day â€” best way to explore\nâ€¢ **Food:** Goan fish curry at a beach shack is non-negotiable!",
          },
          // â”€â”€ Andaman â”€â”€
          {
            p: /andaman|havelock|radhanagar|port blair|neil island/i,
            r: "ðŸ  **Andaman & Nicobar Islands:**\nâ€¢ **How to reach:** Fly to Port Blair from Chennai, Kolkata, Delhi (2â€“3 hrs)\nâ€¢ **Best island:** Havelock (Neil Island combo is ideal)\nâ€¢ **Radhanagar Beach:** Asia's best â€” arrive by 3 PM for the sunset\nâ€¢ **Activities:** Snorkeling, scuba diving, sea-walking, glass-bottom boat\nâ€¢ **Season:** Novemberâ€“April (avoid Mayâ€“October monsoon)\nâ€¢ **Budget:** â‚¹5,000â€“8,000/day including ferry + accommodation",
          },
          // â”€â”€ Wildlife â”€â”€
          {
            p: /tiger|safari|wildlife|ranthambore|jim corbett|kaziranga|sundarbans|periyar/i,
            r: "ðŸ… **India's Best Wildlife Experiences:**\nâ€¢ **Bengal Tiger:** Ranthambhore (Rajasthan), Jim Corbett (Uttarakhand), Bandhavgarh (MP)\nâ€¢ **One-horned Rhino:** Kaziranga National Park, Assam â€” UNESCO World Heritage\nâ€¢ **Elephants:** Periyar (Kerala), Corbett, Nagarhole (Karnataka)\nâ€¢ **Snow Leopard:** Hemis NP, Ladakh\nâ€¢ **Booking:** Tiger safaris need 2â€“3 months advance booking, especially zones 1â€“5 at Ranthambhore\nâ€¢ **Best season:** Octâ€“June (avoid monsoon when parks partially close)",
          },
          // â”€â”€ Northeastern India â”€â”€
          {
            p: /northeast|meghalaya|assam|arunachal|nagaland|manipur|shillong|cherrapunji|ziro/i,
            r: "ðŸŒ¿ **Northeast India â€” India's Hidden Paradise:**\nâ€¢ **Must-visit:** Meghalaya (living root bridges, cleanest village Mawlynnong), Kaziranga (rhinos), Ziro Valley (Apatani culture)\nâ€¢ **Permit:** Inner Line Permit required for Arunachal, Nagaland, Mizoram, Manipur\nâ€¢ **Cherrapunji:** Wettest place on Earth â€” stunning waterfalls, Mawsmai caves\nâ€¢ **Shillong:** Scotland of East â€” Ward's Lake, Elephant Falls, polo ground\nâ€¢ **Best time:** Sepâ€“Nov (post-monsoon, clear, lush)\nâ€¢ **Cuisine:** Don't miss Meghalaya pork with bamboo shoot, Assamese fish curry",
          },
          // â”€â”€ Solo travel / safety â”€â”€
          {
            p: /solo|safety|safe|woman|female|alone/i,
            r: "ðŸ§³ **Solo Travel in India â€” Tips:**\nâ€¢ **Safest states:** Kerala, Himachal, Uttarakhand, Rajasthan (tourist circuits)\nâ€¢ **For solo women:** Kerala & South India consistently rated safest; Ladakh is very secure\nâ€¢ **Transport:** Use Ola/Uber for cabs, pre-booked trains (book on IRCTC app)\nâ€¢ **Accommodation:** Book well-reviewed properties on Booking.com/Airbnb\nâ€¢ **Emergency:** 112 (Police), 100 (Police), 108 (Ambulance)\nâ€¢ **Key tip:** Register with your country's embassy for remote treks",
          },
          // â”€â”€ Visa â”€â”€
          {
            p: /visa|e.visa|passport|entry|permit/i,
            r: "ðŸ›‚ **India Visa Information:**\nâ€¢ **e-Visa:** Available for 167+ nationalities â€” indianvisaonline.gov.in\nâ€¢ **Types:** Tourist e-Visa (30 days/1 year/5 year), Business, Medical\nâ€¢ **Apply:** Minimum 4 days before arrival; approval usually within 72 hours\nâ€¢ **Cost:** USD 25â€“80 depending on nationality and duration\nâ€¢ **Special permits:** Ladakh, Arunachal, Nagaland, Sikkim require Inner Line Permits (free/cheap for Indian nationals)",
          },
          // â”€â”€ Food â”€â”€
          {
            p: /food|eat|cuisine|restaurant|dine|dish|street food|local food/i,
            r: "ðŸ› **India Food Guide:**\nâ€¢ **North India:** Butter chicken, biryani, chole bhature, parathas, dal makhani\nâ€¢ **South India:** Masala dosa, idli-sambar, Chettinad curry, Hyderabadi biryani, Kerala fish curry\nâ€¢ **Street food icons:** Vada pav (Mumbai), Pani puri, Golgappa, Papri chaat (Delhi), Kathi roll (Kolkata)\nâ€¢ **Rajasthan:** Dal baati churma, laal maas, ghewar\nâ€¢ **Safety tip:** Opt for cooked, hot street food. Avoid cut fruits and ice in non-touristy areas\nâ€¢ **Vegetarian heaven:** India has the world's richest vegetarian cuisine!",
          },
          // â”€â”€ Currency / money / payment â”€â”€
          {
            p: /currency|money|cash|atm|upi|payment|rupee|exchange/i,
            r: "ðŸ’³ **Money in India:**\nâ€¢ **Currency:** Indian Rupee (â‚¹) â€” 1 USD â‰ˆ â‚¹83â€“84\nâ€¢ **ATMs:** Widespread in cities; carry cash in rural/remote areas\nâ€¢ **UPI:** PhonePe, Google Pay, Paytm accepted almost everywhere â€” incredibly convenient\nâ€¢ **Exchange:** Airports, authorised forex dealers, or your bank at home\nâ€¢ **Budget markers:** â‚¹10â€“30 chai, â‚¹60â€“150 local meal, â‚¹500â€“800 budget guesthouse",
          },
          // â”€â”€ Language â”€â”€
          {
            p: /language|speak|hindi|english|communicate|translation/i,
            r: "ðŸ—£ï¸ **Languages in India:**\nâ€¢ India has 22 official languages + 1,600 dialects\nâ€¢ **English** is widely spoken in tourist areas, hotels, transport hubs, and by educated professionals\nâ€¢ **Hindi** is understood across North & Central India\nâ€¢ **South India:** Tamil, Telugu, Kannada, Malayalam â€” English very helpful here\nâ€¢ **App tip:** Google Translate works offline. Download the India language packs!",
          },
          // â”€â”€ Transport â”€â”€
          {
            p: /train|taxi|flight|flight|bus|transport|how to reach|getting around|irctc|ola|uber|auto/i,
            r: "ðŸš† **Getting Around India:**\nâ€¢ **Trains:** IRCTC app â€” backbone of Indian travel. Book Tatkal (â‚¹150â€“500 extra) 1 day before for last-minute tickets\nâ€¢ **Flights:** IndiGo, Air India, SpiceJet for domestic â€” often cheap if booked 2+ months ahead\nâ€¢ **Cabs:** Ola & Uber in all major cities â€” safe and metered\nâ€¢ **Auto-rickshaws:** Negotiate before boarding or insist on meter\nâ€¢ **Buses:** KSRTC (Kerala), MSRTC (Maharashtra) â€” comfortable and very affordable",
          },
          // â”€â”€ Weather â”€â”€
          {
            p: /weather|climate|temperature|monsoon|rain|hot|cold|winter|summer/i,
            r: "ðŸŒ¦ï¸ **India Climate Overview:**\nâ€¢ **Octâ€“Mar:** Winter â€” perfect for most destinations. Cool, dry, clear skies\nâ€¢ **Aprâ€“Jun:** Summer â€” hot plains; ideal for hill stations (Shimla, Ooty, Darjeeling)\nâ€¢ **Julâ€“Sep:** Monsoon â€” Northwest hit hard; Kerala & Northeast transform into lush green paradise\nâ€¢ **Hill stations in summer:** Above 1,500m stays pleasant at 15â€“22Â°C even in Mayâ€“June\n\nWhere are you planning to visit? I'll give exact forecast expectations!",
          },
          // â”€â”€ Photography â”€â”€
          {
            p: /photo|photography|camera|shoot|instagram|picture/i,
            r: "ðŸ“¸ **Photography in India â€” Golden tips:**\nâ€¢ **Golden hour:** 30 min after sunrise & 1 hr before sunset â€” magical light everywhere\nâ€¢ **Taj Mahal:** Sunrise for fewer crowds, mist, and perfect golden light\nâ€¢ **Varanasi:** Boat at 5 AM for ghats photography\nâ€¢ **Restrictions:** Many temples/forts prohibit cameras inside (tripods usually banned at ASI sites)\nâ€¢ **Respect:** Always ask permission before photographing locals\nâ€¢ **Best gear:** A 24â€“70mm lens covers 90% of India travel photography",
          },
          // â”€â”€ Trekking â”€â”€
          {
            p: /trek|trekking|hike|hiking|camp|camping|altitude/i,
            r: "ðŸ¥¾ **Trekking in India:**\nâ€¢ **Beginner:** Triund (Dharamsala), Kheerganga (Manali), Valley of Flowers (Uttarakhand)\nâ€¢ **Moderate:** Hampta Pass, Roopkund Lake, Kedarkantha\nâ€¢ **Advanced:** Stok Kangri (Ladakh, 6,153m), Sandakphu (Darjeeling)\nâ€¢ **Operators:** Book via reputed operators like Indiahikes or Thrillophilia for guided treks\nâ€¢ **Best season:** Mayâ€“June & Sepâ€“Oct for most Himalayan treks\nâ€¢ **Altitude sickness:** Acclimatize properly above 3,000m; carry Diamox if advised",
          },
          // â”€â”€ Spiritual â”€â”€
          {
            p: /temple|spiritual|pilgrimage|yoga|ashram|meditation|holy|sacred|divine/i,
            r: "ðŸ™ **Spiritual India â€” Key Destinations:**\nâ€¢ **Varanasi:** Oldest living city; Ganga Aarti, Kashi Vishwanath â€” deeply transformative\nâ€¢ **Rishikesh:** Yoga capital; ashrams, meditation retreats, Beatles Ashram\nâ€¢ **Tirupati:** Most visited religious site in the world; Sri Venkateswara Temple\nâ€¢ **Golden Temple, Amritsar:** Sikh holiest shrine; free langar; open 24/7\nâ€¢ **Char Dham:** Kedarnath, Badrinath, Gangotri, Yamunotri â€” ultimate Himalayan pilgrimage\nâ€¢ **Yoga retreats:** Book at Parmarth Niketan or Sivananda Ashram in Rishikesh",
          },
          // â”€â”€ Hotels / stay â”€â”€
          {
            p: /hotel|resort|stay|accommodation|hostel|guesthouse|airbnb|heritage|palace/i,
            r: "ðŸ¨ **Where to Stay in India:**\nâ€¢ **Budget:** Zostel hostels (â‚¹400â€“700/bed), OYO rooms, family guesthouses\nâ€¢ **Mid-range:** Fabhotels, Treebo â€” clean, comfortable (â‚¹1,200â€“3,500)\nâ€¢ **Heritage luxury:** Taj Hotels, Oberoi, ITC â€” palace experiences (â‚¹8,000â€“50,000+)\nâ€¢ **Unique stays:** Houseboat in Kerala, tent in Spiti, haveli in Rajasthan\nâ€¢ **Booking tip:** Booking.com, MakeMyTrip, Goibibo â€” compare all. Book directly with heritage properties for better rates\nâ€¢ **Airbnb:** Great for Kerala homestays and Coorg coffee estates",
          },
          // â”€â”€ General India travel â”€â”€
          {
            p: /india|incredible india|plan|itinerary|route|circuit|discover|explore/i,
            r: "ðŸ‡®ðŸ‡³ **Planning Your India Journey:**\n\nIndia is vast â€” best explored in thematic circuits:\nâ€¢ **Golden Triangle:** Delhi â†’ Agra â†’ Jaipur (5â€“7 days) â€” perfect intro\nâ€¢ **Rajasthan Odyssey:** Jaipur â†’ Jodhpur â†’ Jaisalmer â†’ Udaipur (10â€“14 days)\nâ€¢ **South India:** Kerala â†’ Tamil Nadu â†’ Karnataka (10â€“16 days)\nâ€¢ **Himalayan Adventure:** Manali â†’ Leh â†’ Nubra â†’ Pangong (10â€“14 days)\nâ€¢ **Northeast Circuit:** Guwahati â†’ Kaziranga â†’ Shillong â†’ Cherrapunji (8â€“10 days)\n\nShare your interests, duration & budget â€” I'll build a custom itinerary! ðŸ—ºï¸",
          },
        ];

        /* â”€â”€ Off-topic patterns (reject these) â”€â”€ */
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

        /* â”€â”€ Helpers â”€â”€ */
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
            .replace(/[â€¢Â·]/g, "")
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
            wrap.innerHTML = `<div class="mai-msg-avatar">ðŸ§­</div>
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
              text: `ðŸŒ Great question about **${q.replace(/[?!.]/g, "").substring(0, 40)}**!\n\nAs your India travel specialist, I can help with:\nâ€¢ **Destinations:** Best places to visit based on your interests\nâ€¢ **Itineraries:** Day-by-day route planning\nâ€¢ **Budgets:** Accurate cost estimates by travel style\nâ€¢ **Tips:** Visas, permits, local transport, safety\n\nCould you add more detail? For example: *"3-day trip to Kerala under â‚¹15,000"* or *"Best wildlife parks for tiger sighting"* â€” and I'll give a precise answer! ðŸ—ºï¸`,
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
                "ðŸ§³ I'm **Musafir AI**, your dedicated India travel assistant! I specialise exclusively in travel â€” destinations, itineraries, budgets, tips, and experiences across India's incredible 36 states.\n\nFor non-travel topics, please use a general assistant. But ask me anything about *where to go, when to visit, how to plan, or what to pack* in India â€” I'm all yours! ðŸŒ";
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
                'ðŸ§­ I specialise only in **India travel** â€” destinations, trip planning, budgets, safety, visas, transport, food, and experiences. Could you frame your question around a travel topic? For example:\n\nâ€¢ *"Best places to visit in Uttarakhand"*\nâ€¢ *"Budget for 7-day Kerala trip"*\nâ€¢ *"How to reach Spiti Valley from Delhi"*\n\nI\'m here to plan your perfect Indian adventure! ðŸŒ';
              appendMsg("ai", formatResponse(reply), true);
              speak(reply);
            } else {
              appendMsg("ai", formatResponse(text), false);
              speak(text);
            }
          }, delay);
        }

        /* â”€â”€ Public API â”€â”€ */
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
                  "ðŸ™ **Namaste! I'm Musafir AI** â€” your personal India travel expert.\n\nI can help you with:\nâ€¢ **Destination discovery** across all 36 states\nâ€¢ **Custom itineraries** for any duration & budget\nâ€¢ **Best seasons** to visit each place\nâ€¢ **Visa, permits** & travel logistics\nâ€¢ **Local food, culture** & insider tips\n\nWhere in India are you dreaming of exploring? âœˆï¸",
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
                "ðŸ”„ Chat reset! Ready for your next **India** adventure.\n\nWhat destination are you curious about? ðŸ—ºï¸",
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
          icon.textContent = voiceEnabled ? "ðŸ”Š" : "ðŸ”‡";
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
