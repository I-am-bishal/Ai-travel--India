/**
 * Indigenix Tour Guide System
 * Handles the interactive onboarding tour for new users.
 */

const tourSteps = [
  {
    title: "Welcome to Indigenix",
    content: "Discover Incredible India with our AI-powered travel ecosystem. Let's take a quick 30-second tour!",
    icon: "🇮🇳",
    target: null
  },
  {
    title: "Interactive 3D Globe",
    content: "Explore the Indian subcontinent with our real-time satellite visualization. Rotate and zoom to find your next destination.",
    icon: "🌍",
    target: "#hero-canvas"
  },
  {
    title: "AI Trip Builder",
    content: "Need a perfect itinerary? Describe your dream trip and our AI will build a day-by-day plan in seconds.",
    icon: "🤖",
    target: "#ai-trip-builder"
  },
  {
    title: "Curated Destinations",
    content: "Browse over 800+ destinations with real-time ratings, costs, and sustainability scores.",
    icon: "🌿",
    target: "#destinations"
  },
  {
    title: "Musafir AI Assistant",
    content: "Have questions? Our 24/7 AI travel expert is always ready to help you with localized insights.",
    icon: "🧭",
    target: "#musafir-launcher"
  }
];

class TourGuide {
  constructor() {
    this.currentStep = 0;
    this.isActive = false;
    this.init();
  }

  init() {
    // Wait for splash screen to complete
    const checkSplash = setInterval(() => {
      if (!document.body.classList.contains('splash-active')) {
        clearInterval(checkSplash);
        // Small delay to let the page settle after splash exit
        setTimeout(() => {
          if (!localStorage.getItem('indigenix_tour_completed')) {
            this.startTour();
          }
        }, 1500);
      }
    }, 500);
  }

  startTour() {
    this.isActive = true;
    this.render();
    this.showStep(0);
  }

  render() {
    const tourHTML = `
      <div id="tour-guide">
        <div class="tour-header">
          <div class="tour-icon" id="tour-icon"></div>
          <div class="tour-title" id="tour-title"></div>
        </div>
        <div class="tour-content" id="tour-content"></div>
        <div class="tour-footer">
          <div class="tour-progress" id="tour-progress"></div>
          <div class="tour-btns">
            <button class="tour-btn tour-btn-skip" id="tour-skip">Skip</button>
            <button class="tour-btn tour-btn-next" id="tour-next">Next →</button>
          </div>
        </div>
      </div>
      <div class="tour-indicator" id="tour-indicator"></div>
    `;

    document.body.insertAdjacentHTML('beforeend', tourHTML);

    this.elements = {
      container: document.getElementById('tour-guide'),
      title: document.getElementById('tour-title'),
      content: document.getElementById('tour-content'),
      icon: document.getElementById('tour-icon'),
      progress: document.getElementById('tour-progress'),
      skip: document.getElementById('tour-skip'),
      next: document.getElementById('tour-next'),
      indicator: document.getElementById('tour-indicator')
    };

    this.elements.skip.addEventListener('click', () => this.endTour());
    this.elements.next.addEventListener('click', () => this.nextStep());
  }

  showStep(index) {
    const step = tourSteps[index];
    this.elements.title.textContent = step.title;
    this.elements.content.textContent = step.content;
    this.elements.icon.textContent = step.icon;
    this.elements.progress.textContent = `${index + 1} / ${tourSteps.length}`;

    if (index === tourSteps.length - 1) {
      this.elements.next.textContent = "Finish";
      this.elements.next.classList.add('tour-btn-finish');
    } else {
      this.elements.next.textContent = "Next →";
      this.elements.next.classList.remove('tour-btn-finish');
    }

    // Scroll to target if exists
    if (step.target) {
      const targetEl = document.querySelector(step.target);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.positionIndicator(targetEl);
      }
    } else {
      this.elements.indicator.classList.remove('active');
    }

    this.elements.container.classList.add('active');
  }

  positionIndicator(el) {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    this.elements.indicator.style.left = `${rect.left + rect.width / 2 + scrollLeft}px`;
    this.elements.indicator.style.top = `${rect.top + rect.height / 2 + scrollTop}px`;
    this.elements.indicator.classList.add('active');
  }

  nextStep() {
    if (this.currentStep < tourSteps.length - 1) {
      this.currentStep++;
      this.showStep(this.currentStep);
    } else {
      this.endTour();
    }
  }

  endTour() {
    this.elements.container.classList.remove('active');
    this.elements.indicator.classList.remove('active');
    localStorage.setItem('indigenix_tour_completed', 'true');
    
    // Cleanup after animation
    setTimeout(() => {
      this.elements.container.remove();
      this.elements.indicator.remove();
    }, 500);
  }
}

// Initialize the tour guide
const indigenixTour = new TourGuide();
