// ==================== NAVIGATION FUNCTIONALITY ====================
class Navigation {
  constructor() {
    this.header = document.getElementById("header");
    this.hamburger = document.getElementById("hamburger");
    this.navMenu = document.getElementById("nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");

    this.init();
  }

  init() {
    this.handleScroll();
    this.handleMobileMenu();
    this.handleSmoothScroll();
    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.header.classList.add("scrolled");
    } else {
      this.header.classList.remove("scrolled");
    }
  }

  handleMobileMenu() {
    this.hamburger.addEventListener("click", () => {
      this.navMenu.classList.toggle("active");
      this.hamburger.classList.toggle("active");
    });

    // Close menu when clicking on nav links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.navMenu.classList.remove("active");
        this.hamburger.classList.remove("active");
      });
    });
  }

  handleSmoothScroll() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }
}

// ==================== ANIMATIONS FUNCTIONALITY ====================
class AnimationController {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupCounterAnimation();
    this.setupServiceCardHover();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
        }
      });
    }, this.observerOptions);

    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll(
      [
        ".service-card",
        ".feature-item",
        ".testimonial-card",
        ".section-header",
      ].join(",")
    );

    elementsToObserve.forEach((el) => observer.observe(el));
  }

  setupCounterAnimation() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }

  setupServiceCardHover() {
    const serviceCards = document.querySelectorAll(".service-card");
    serviceCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
      });
    });
  }
}

// ==================== ENTERING FORM FUNCTIONALITY ====================
class FormController {
  constructor() {
    this.forms = document.querySelectorAll("form");
    this.init();
  }

  init() {
    this.forms.forEach((form) => {
      form.addEventListener("submit", (e) => this.handleSubmit(e));
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Simulate form submission
    this.showLoadingState(form);

    setTimeout(() => {
      this.showSuccessMessage();
      form.reset();
      this.hideLoadingState(form);
    }, 2000);
  }

  showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Mengirim...";
    }
  }

  hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Kirim Pesan";
    }
  }

  showSuccessMessage() {
    // Create and show success notification
    const notification = document.createElement("div");
    notification.className = "notification success";
    notification.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #27AE60;
                        color: white;
                        padding: 15px 20px;
                        border-radius: 10px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                        z-index: 10000;
                        font-weight: 500;
                    ">
                        ✅ Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.
                    </div>
                `;
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 5000);
  }
}

// ==================== UTILITY FUNCTIONS ====================
class Utils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  static isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// ==================== WHATSAPP INTEGRATION ====================
class WhatsAppIntegration {
  constructor() {
    this.phoneNumber = "#";
    this.init();
  }

  init() {
    this.createFloatingButton();
    this.setupCTAButtons();
  }

  createFloatingButton() {
    const floatingBtn = document.createElement("div");
    floatingBtn.innerHTML = `
                    <a href="#" id="wa-float" style="
                        position: fixed;
                        bottom: 30px;
                        right: 30px;
                        width: 60px;
                        height: 60px;
                        background: #25D366;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 24px;
                        box-shadow: 0 10px 30px rgba(37, 211, 102, 0.3);
                        z-index: 1000;
                        transition: all 0.3s ease;
                        text-decoration: none;
                    " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fab fa-whatsapp"></i>
                    </a>
                `;
    document.body.appendChild(floatingBtn);

    document.getElementById("wa-float").addEventListener("click", (e) => {
      e.preventDefault();
      this.openWhatsApp(
        "Halo, saya tertarik dengan layanan RawatBayi.id. Bisa tolong berikan informasi lebih lanjut?"
      );
    });
  }

  setupCTAButtons() {
    const ctaButtons = document.querySelectorAll('a[href="#contact"]');
    ctaButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openWhatsApp(
          "Halo, saya ingin konsultasi mengenai layanan perawatan bayi."
        );
      });
    });
  }

  openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${this.phoneNumber.replace(
      "+",
      ""
    )}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }
}

// ==================== PERFORMANCE OPTIMIZATION ====================
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.optimizeScrollEvents();
    this.preloadCriticalResources();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  optimizeScrollEvents() {
    const scrollHandler = Utils.throttle(() => {
      // Throttled scroll operations here
    }, 16); // ~60fps

    window.addEventListener("scroll", scrollHandler, { passive: true });
  }

  preloadCriticalResources() {
    // Preload critical fonts or images if needed
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/woff2";
    link.crossorigin = "anonymous";
    document.head.appendChild(link);
  }
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all modules
  const navigation = new Navigation();
  const animations = new AnimationController();
  const forms = new FormController();
  const whatsapp = new WhatsAppIntegration();
  const performance = new PerformanceOptimizer();

  // Add loading complete class
  document.body.classList.add("loaded");

  // Console greeting
  console.log(`
                🍼 RawatBayi.id - Landing Page
                ================================
                Built with ❤️ for Indonesian families
                
                Features:
                ✅ Responsive Design
                ✅ Smooth Animations  
                ✅ WhatsApp Integration
                ✅ Performance Optimized
                ✅ SEO Friendly
            `);
});

// ==================== ERROR HANDLING ====================
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error);
  // Could send to analytics or error tracking service
});

// ==================== SERVICE WORKER (PWA READY) ====================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment when service worker is ready
    // navigator.serviceWorker.register('/sw.js');
  });
}
