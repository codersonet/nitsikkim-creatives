/**
 * NIT SIKKIM // THE OUTPOST
 * Spatial Interactive Logic & Dynamic Canvas Background
 * Built with WWDC Fluid Motion & Emil Kowalski Design Engineering Principles
 */

// Global Club Projects Dataset
const clubProjects = [
  {
    id: 1,
    title: "SYNAPSE_AUTONOMOUS_ROVER",
    club: "ROBOTICS SOCIETY",
    category: "robotics",
    description: "Alpine high-altitude terrain mapping rover equipped with LiDAR and real-time obstacle avoidance algorithms.",
    progress: 88,
    stack: "ROS2, C++, Python, OpenCV",
    status: "TESTING_IN_FIELD"
  },
  {
    id: 2,
    title: "NEURAL_CAMPUS_OS",
    club: "WEBDEV & CODING CLUB",
    category: "tech",
    description: "Centralized student query, attendance automation, and course material exchange system built for NIT Sikkim.",
    progress: 94,
    stack: "Next.js, Node.js, PostgreSQL",
    status: "DEPLOYED"
  },
  {
    id: 3,
    title: "ALPINE_ENERGY_HARVESTER",
    club: "GREEN TECH CLUB",
    category: "robotics",
    description: "Low-temperature piezoelectric kinetic energy generators tailored for mountain micro-grids.",
    progress: 62,
    stack: "Embedded C, MATLAB, IoT",
    status: "PROTOTYPING"
  },
  {
    id: 4,
    title: "KANCHENJUNGA_VR_ARCHIVE",
    club: "DESIGN & MEDIA CELL",
    category: "creative",
    description: "Photogrammetry and spatial computing reconstruction of Sikkim's cultural heritage and mountain geology.",
    progress: 75,
    stack: "Three.js, WebGL, Blender",
    status: "IN_DEVELOPMENT"
  },
  {
    id: 5,
    title: "QUANTUM_FINTECH_NODE",
    club: "E-CELL NIT SIKKIM",
    category: "tech",
    description: "Decentralized micro-finance platform tailored for rural Himalayan entrepreneurs and artisanal markets.",
    progress: 45,
    stack: "Solidity, Web3.js, React",
    status: "ALPHA_STAGE"
  },
  {
    id: 6,
    title: "AERO_SIKKIM_DRONE_NET",
    club: "AERO-MODELLING CLUB",
    category: "robotics",
    description: "Autonomous essential medical cargo delivery drone designed for turbulent mountain wind corridors.",
    progress: 80,
    stack: "PX4 Autopilot, MAVLink, PX4",
    status: "FLIGHT_TRIALS"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initMountainCanvas();
  highlightActiveNavLink();
  initCardSpotlightAndTilt();
  
  if (document.getElementById("projects-container")) {
    renderProjects(clubProjects);
    initFilters();
  }
  
  if (document.querySelectorAll(".count-up").length > 0) {
    initStatsCounter();
  }
  
  initModal();
  loadGlobalFooter();
  initInfiniteMarquee();
});

/* Highlight current active page link */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* --------------------------------------------------------------------------
   Interactive Dynamic Mountain & WWDC Aurora Spatial Canvas
   -------------------------------------------------------------------------- */
function initMountainCanvas() {
  const canvas = document.getElementById("mountain-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = window.innerWidth;
  let height = window.innerHeight;
  let isPageVisible = true;

  // Pointer position with spring inertia
  let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();

  window.addEventListener("pointermove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  window.addEventListener("pointerleave", () => {
    mouse.targetX = -1000;
    mouse.targetY = -1000;
  });

  document.addEventListener("visibilitychange", () => {
    isPageVisible = !document.hidden;
  });

  // Stardust / Spatial Nodes with High-Definition Sharp Twinkling
  const particleCount = Math.min(width > 768 ? 85 : 40, 110);
  const starColors = [
    "255, 255, 255",     // Pure brilliant white
    "240, 246, 255",     // Diamond blue white
    "218, 238, 255",     // Cyan starlight
    "245, 235, 255"      // Soft violet
  ];

  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() < 0.2 ? 1.5 : (Math.random() < 0.6 ? 1.0 : 0.75),
    speedX: (Math.random() - 0.5) * 0.18,
    speedY: (Math.random() - 0.5) * 0.18,
    baseAlpha: Math.random() * 0.35 + 0.45,
    twinkleSpeed: Math.random() * 0.045 + 0.025, // Snappy, sharp blink frequency
    twinklePhase: Math.random() * Math.PI * 2,
    hasCross: Math.random() < 0.22, // 22% of stars render a microscopic sharp optical cross spike at peak
    colorRgb: starColors[Math.floor(Math.random() * starColors.length)]
  }));

  let offset = 0;

  function draw() {
    if (!isPageVisible) {
      requestAnimationFrame(draw);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    // 1. Draw Sharp, Crystal-Clear Twinkling Stars (No Blur)
    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Sharp, distinct blink curve (holding a steady baseline with rapid crisp flares)
      const sinVal = Math.sin(offset * p.twinkleSpeed + p.twinklePhase);
      let brightness;

      if (sinVal > 0.35) {
        // Fast, crisp pulse up to 100% white
        const flare = (sinVal - 0.35) / 0.65;
        brightness = p.baseAlpha + (1.0 - p.baseAlpha) * Math.pow(flare, 1.5);
      } else if (sinVal < -0.65) {
        // Crisp dimming dip
        brightness = p.baseAlpha * 0.2;
      } else {
        // Stable crystal starlight
        brightness = p.baseAlpha;
      }

      // Crisp integer pixel coordinates (prevents subpixel anti-aliasing fuzziness)
      const px = Math.round(p.x);
      const py = Math.round(p.y);

      // Micro 1px razor cross spike on peak blink for authentic telescope / optical starlight
      if (p.hasCross && brightness > 0.88) {
        ctx.fillStyle = `rgba(255, 255, 255, ${(brightness * 0.9).toFixed(2)})`;
        ctx.fillRect(px - 3, py, 7, 1); // Horizontal razor hairline
        ctx.fillRect(px, py - 3, 1, 7); // Vertical razor hairline
      }

      // Pin-sharp solid star core
      ctx.beginPath();
      ctx.arc(px, py, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.colorRgb}, ${brightness.toFixed(2)})`;
      ctx.fill();
    });

    // 2. Draw 4 Mountain & Topographical Contour Wireframes
    const layers = [
      { amplitude: 45, frequency: 0.0025, speed: 0.0018, heightOffset: height * 0.62, color: "rgba(56, 189, 248, 0.2)" },
      { amplitude: 75, frequency: 0.002, speed: 0.0012, heightOffset: height * 0.70, color: "rgba(129, 140, 248, 0.25)" },
      { amplitude: 110, frequency: 0.0016, speed: 0.0008, heightOffset: height * 0.78, color: "rgba(192, 132, 252, 0.2)" },
      { amplitude: 150, frequency: 0.0012, speed: 0.0005, heightOffset: height * 0.88, color: "rgba(255, 255, 255, 0.12)" }
    ];

    layers.forEach((layer) => {
      ctx.beginPath();
      ctx.strokeStyle = layer.color;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += 18) {
        // Distance from pointer for interactive ripple
        const distToMouse = Math.hypot(x - mouse.x, layer.heightOffset - mouse.y);
        const mouseEffect = distToMouse < 260 ? Math.sin((distToMouse / 260) * Math.PI) * -35 : 0;

        const y = layer.heightOffset 
          + Math.sin(x * layer.frequency + offset * layer.speed) * layer.amplitude
          + Math.cos(x * 0.004) * 18
          + mouseEffect;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    });

    offset += 1;
    requestAnimationFrame(draw);
  }

  draw();
}

/* --------------------------------------------------------------------------
   Dynamic Card Spotlight & 3D Tilt (WWDC Spatial Feedback)
   -------------------------------------------------------------------------- */
function initCardSpotlightAndTilt() {
  // Check if touch device - avoid tilt on touch to maintain fast native scrolling
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function attachToCard(card) {
    if (card._hasSpotlight) return;
    card._hasSpotlight = true;

    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set cursor position for specular highlight
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      if (isFinePointer) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      }
    });

    card.addEventListener("pointerleave", () => {
      if (isFinePointer) {
        card.style.transform = "";
      }
    });
  }

  document.querySelectorAll(".glass-card").forEach(attachToCard);

  // MutationObserver to attach to newly injected cards (e.g. project filters)
  const observer = new MutationObserver(() => {
    document.querySelectorAll(".glass-card").forEach(attachToCard);
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

/* --------------------------------------------------------------------------
   Render Projects Cards with Fluid Staggered Entrance
   -------------------------------------------------------------------------- */
function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = "";

  projects.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "glass-card project-card";
    card.style.opacity = "0";
    card.style.transform = "translateY(16px)";
    card.style.transition = "transform 360ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out";

    card.innerHTML = `
      <div>
        <div class="card-header">
          <span class="label-mono text-muted">// ${item.club}</span>
          <span class="label-mono" style="color: var(--wwdc-cyan);">[${item.status}]</span>
        </div>
        <h3 class="card-title">${item.title}</h3>
        <p class="body-md">${item.description}</p>
      </div>

      <div>
        <div class="progress-container">
          <div class="card-header" style="margin: 0;">
            <span class="label-mono">OPTIMIZATION_INDEX</span>
            <span class="label-mono" style="color: var(--primary); font-weight:700;">${item.progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${item.progress}%"></div>
          </div>
        </div>

        <div class="card-footer">
          <span class="label-mono text-muted">${item.stack.split(',')[0]}</span>
          <button class="btn btn-ghost details-btn" data-id="${item.id}">VIEW_SPECS ↗</button>
        </div>
      </div>
    `;
    container.appendChild(card);

    // Stagger animation entry
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 40 * index);
  });
}

/* --------------------------------------------------------------------------
   Filter Logic with Instant Active State & Transition
   -------------------------------------------------------------------------- */
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) return;

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.filter;
      if (category === "all") {
        renderProjects(clubProjects);
      } else {
        const filtered = clubProjects.filter((p) => p.category === category);
        renderProjects(filtered);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   WWDC Keynote Stats Counter Animation (Exponential Ease-Out Curve)
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const counters = document.querySelectorAll(".count-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute("data-target");
        const duration = 1400; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Strong exponential ease-out curve
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(easeOut * target);

          el.innerText = target >= 1000 ? currentCount.toLocaleString() : currentCount;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.innerText = target >= 1000 ? target.toLocaleString() : target;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  counters.forEach((counter) => observer.observe(counter));
}

/* --------------------------------------------------------------------------
   Modal Window Logic (Keyboard Escape & Asymmetric Interruptible Motion)
   -------------------------------------------------------------------------- */
function initModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close");
  const container = document.getElementById("projects-container");

  if (!modal) return;

  function closeModal() {
    modal.classList.remove("active");
  }

  function openModal(id) {
    const project = clubProjects.find((p) => p.id === id);
    if (!project) return;

    const clubTag = document.getElementById("modal-club-tag");
    const title = document.getElementById("modal-title");
    const desc = document.getElementById("modal-description");
    const stack = document.getElementById("modal-stack");
    const status = document.getElementById("modal-status");

    if (clubTag) clubTag.innerText = `${project.club} // TECH_SPEC`;
    if (title) title.innerText = project.title;
    if (desc) desc.innerText = project.description;
    if (stack) stack.innerText = project.stack;
    if (status) status.innerText = project.status;

    modal.classList.add("active");
  }

  if (container) {
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".details-btn");
      if (btn) {
        const id = parseInt(btn.dataset.id, 10);
        openModal(id);
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Fast keyboard escape support (Emil & Apple HIG)
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   Infinite Marquee Duplication Helper
   -------------------------------------------------------------------------- */
function initInfiniteMarquee() {
  const track = document.querySelector(".marquee-track");
  if (track && track.children.length > 0 && !track._isCloned) {
    track._isCloned = true;
    track.innerHTML += track.innerHTML;
  }
}

/* --------------------------------------------------------------------------
   Global Futuristic Footer Injector
   -------------------------------------------------------------------------- */
function loadGlobalFooter() {
  const footerContainer = document.getElementById("footer-container");
  if (!footerContainer || footerContainer._isLoaded) return;
  footerContainer._isLoaded = true;

  // Clean template to avoid nested footers
  const footerMarkup = `
    <footer class="footer">
      <div class="footer-container">
        <!-- Brand Section -->
        <div class="footer-brand">
          <span class="brand-title text-glow">NIT_SIKKIM</span>
          <p class="label-mono text-muted">NATIONAL INSTITUTE OF TECHNOLOGY SIKKIM</p>
          <p class="body-md" style="font-size: 0.9rem; margin-top: 6px;">
            The pioneering high-altitude engineering and innovation hub nestled in the Himalayas.
          </p>
        </div>

        <!-- Terminal Links (2 Columns with 5 Links Each) -->
        <div class="footer-links">
          <span class="label-mono text-muted">// TERMINAL_LINKS</span>
          <div class="footer-links-grid">
            <div class="footer-links-col">
              <a href="index.html" class="footer-link">OVERVIEW</a>
              <a href="clubs.html" class="footer-link">CLUBS & PROJECTS</a>
              <a href="alumni.html" class="footer-link">ALUMNI DIRECTORY</a>
              <a href="metrics.html" class="footer-link">CAMPUS METRICS</a>
              <a href="events.html" class="footer-link">EVENTS & KEYNOTES</a>
            </div>
            <div class="footer-links-col">
              <a href="companies.html" class="footer-link">RECRUITER LOGS</a>
              <a href="clubs.html" class="footer-link">INNOVATION LABS</a>
              <a href="metrics.html" class="footer-link">RESEARCH PAPERS</a>
              <a href="events.html" class="footer-link">TECH CONCLAVES</a>
              <a href="/pages/contact.html" class="footer-link">CONTACT UPLINK</a>
            </div>
          </div>
        </div>

        <!-- Network Sync Section -->
        <div class="footer-newsletter">
          <span class="label-mono text-muted">// NETWORK_SYNC</span>
          <p class="body-md" style="font-size: 0.9rem;">
            Establish connection for real-time telemetry, campus updates, and alumni networking opportunities.
          </p>
          
          <form class="hud-form" onsubmit="event.preventDefault(); this.innerHTML = '<span class=\\'label-mono text-glow\\' style=\\'color: var(--wwdc-cyan);\\'>[✓] CONNECTION_ESTABLISHED</span>';">
            <input type="email" class="hud-input" placeholder="ENTER_EMAIL" required>
            <button type="submit" class="hud-submit">INITIATE</button>
          </form>

          <!-- Social Icons -->
          <div class="footer-social">
            <a href="https://github.com/opb_nitsikkim" class="social-icon" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
            <a href="https://www.instagram.com/opb_nitsikkim" class="social-icon" target="_blank" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.linkedin.com/school/opb-nit-sikkim/" class="social-icon" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://twitter.com/opb_nitsikkim" class="social-icon" target="_blank" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
            <a href="https://discord.com/invite/MD2sD4yRvw" class="social-icon" target="_blank" aria-label="Discord"><i class="fa-brands fa-discord"></i></a>
          </div>
        </div>
      </div>

      <div class="footer-meta">
        <span class="label-mono text-muted">&copy; ${new Date().getFullYear()} NIT SIKKIM // THE OUTPOST</span>
        <span class="label-mono text-muted">ENGINEERED FOR FLUID SPATIAL COMPUTING</span>
      </div>
    </footer>
  `;

  // If footerContainer is already wrapped by <footer class="footer">, replace outer element or insert properly
  if (footerContainer.parentElement && footerContainer.parentElement.tagName === "FOOTER") {
    footerContainer.parentElement.outerHTML = footerMarkup;
  } else {
    footerContainer.outerHTML = footerMarkup;
  }
}
