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

      
