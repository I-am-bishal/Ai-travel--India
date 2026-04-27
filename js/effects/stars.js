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

      
