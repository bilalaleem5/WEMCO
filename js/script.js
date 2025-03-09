document.addEventListener("DOMContentLoaded", () => {
    // Loading Animation
    const loader = document.getElementById("loader");
    if (loader) {
      gsap.to(loader, {
        opacity: 0,
        duration: 1.5,
        delay: 2,
        ease: "power3.out",
        onComplete: () => {
          loader.style.display = "none";
          document.body.style.overflow = "auto";
        },
      });
  
      gsap.from(".loader-ring", {
        rotation: 0,
        duration: 1,
        repeat: -1,
        ease: "linear",
      });
  
      gsap.from(".loader-text", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });
    }
  
    // Welcome Animation
    const welcome = document.getElementById("welcome");
    if (welcome) {
      if (!sessionStorage.getItem("welcomeShown")) {
        welcome.classList.add("active");
        sessionStorage.setItem("welcomeShown", "true");
  
        const welcomeText = document.querySelector(".welcome-text");
        const text = "Welcome to WEMCO";
        welcomeText.innerHTML = text
          .split("")
          .map((char) => `<span class="letter">${char === " " ? " " : char}</span>`)
          .join("");
  
        gsap.from(".letter", {
          opacity: 0,
          y: 50,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out",
        });
  
        gsap.to(welcome, {
          opacity: 0,
          delay: 4,
          duration: 1,
          onComplete: () => (welcome.style.display = "none"),
        });
      } else {
        welcome.style.display = "none";
      }
    }
  
    // Navbar Scroll Effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  
    // Hero Slider
    const slides = document.querySelectorAll(".slide");
    if (slides.length > 0) {
      let currentSlide = 0;
  
      function showSlide(index) {
        slides.forEach((slide, i) => {
          const overlay = slide.querySelector(".slide-overlay");
          gsap.to(slide, {
            opacity: i === index ? 0.85 : 0,
            duration: 1.5,
            ease: "power3.inOut",
          });
          gsap.to(overlay, {
            opacity: i === index ? 1 : 0,
            y: i === index ? 0 : 30,
            duration: 1,
            ease: "power2.out",
          });
        });
      }
  
      showSlide(currentSlide);
      setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }, 5000);
    }
  
    // About Slider
    const aboutSlides = document.querySelectorAll(".about-slide");
    if (aboutSlides.length > 0) {
      let currentAboutSlide = 0;
  
      function showAboutSlide(index) {
        aboutSlides.forEach((slide, i) => {
          gsap.to(slide, {
            opacity: i === index ? 1 : 0,
            duration: 1.5,
            ease: "power3.inOut",
          });
        });
      }
  
      showAboutSlide(currentAboutSlide);
      setInterval(() => {
        currentAboutSlide = (currentAboutSlide + 1) % aboutSlides.length;
        showAboutSlide(currentAboutSlide);
      }, 5000);
    }
  
    // Scroll Animations
    gsap.utils.toArray(".section").forEach((section) => {
      gsap.from(section.querySelector("h2"), {
        scrollTrigger: section,
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
      });
  
      gsap.from(section.querySelectorAll(".service-item, .mission-item, .satisfaction-circle, .about-card, .contact-item, .contact-form"), {
        scrollTrigger: section,
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
    });
  
    // Number Counter Animation for Guaranteed Client Satisfaction
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      gsap.fromTo(
        counter,
        { innerHTML: 0 },
        {
          innerHTML: target,
          duration: 2,
          scrollTrigger: counter,
          ease: "power1.out",
          snap: { innerHTML: 1 },
          onUpdate: function () {
            counter.innerHTML = Math.ceil(this.targets()[0].innerHTML);
          },
        }
      );
    });
  
    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        gsap.from(".nav-links.active a", {
          opacity: 0,
          y: -20,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    }
  
    // Clients Slider Sync
    const clientsInner = document.querySelector(".clients-inner");
    if (clientsInner) {
      clientsInner.style.animationPlayState = "running";
      clientsInner.addEventListener("mouseenter", () => (clientsInner.style.animationPlayState = "paused"));
      clientsInner.addEventListener("mouseleave", () => (clientsInner.style.animationPlayState = "running"));
    }
  });