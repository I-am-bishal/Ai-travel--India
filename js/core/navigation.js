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
         KEYBOARD: nav-lnk items accessible via Enter
      ══════════════════════════════════════════════ */

      document.addEventListener('DOMContentLoaded', () => {
        const sections = [
          { id: 'destinations', hookId: 'event-hook-8' },
          { id: 'city-guide', hookId: 'event-hook-9' },
          { id: 'ai-trip-builder', hookId: 'event-hook-10' },
          { id: 'plans', hookId: 'event-hook-11' },
          { id: 'clips', hookId: 'event-hook-12' },
          { id: 'travel-insights', hookId: 'event-hook-13' },
          { id: 'faq', hookId: 'event-hook-14' }
        ];

        const navLinks = document.querySelectorAll('.nav-lnk');

        function setActive(hookId) {
          navLinks.forEach(link => link.classList.toggle('on', link.id === hookId));
        }

        // Handle Clicks for immediate feedback
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            setActive(link.id);
          });
        });

        // Keyboard support
        document.querySelectorAll(".nav-lnk[tabindex='0']").forEach(el => {
          el.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              el.click();
            }
          });
        });

        function updateNav() {
          let currentId = '';
          let maxTop = -Infinity;
          
          // Check upper-middle of the viewport
          const scrollPosition = window.scrollY + window.innerHeight * 0.3;

          // If we're at the very top (Hero section), clear all active states
          if (window.scrollY < 200) {
            navLinks.forEach(link => link.classList.remove('on'));
            return;
          }

          sections.forEach(section => {
            const el = document.getElementById(section.id);
            if (el) {
              const elTop = el.getBoundingClientRect().top + window.scrollY;
              if (scrollPosition >= elTop && elTop > maxTop) {
                maxTop = elTop;
                currentId = section.id;
              }
            }
          });

          // Edge case: bottom of the page
          if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 100) {
            let absLastId = '';
            let absMaxTop = -Infinity;
            sections.forEach(section => {
              const el = document.getElementById(section.id);
              if (el) {
                const elTop = el.getBoundingClientRect().top + window.scrollY;
                if (elTop > absMaxTop) {
                  absMaxTop = elTop;
                  absLastId = section.id;
                }
              }
            });
            if (absLastId) currentId = absLastId;
          }

          if (currentId) {
            const activeSection = sections.find(s => s.id === currentId);
            if (activeSection) {
              setActive(activeSection.hookId);
            }
          }
        }

        window.addEventListener('scroll', updateNav, { passive: true });
        // Initial check after a short delay for layout calculation
        setTimeout(updateNav, 600);
      });


