document.addEventListener("DOMContentLoaded", () => {
    // Loading Animation
    gsap.to("#loader", {
      opacity: 0,
      duration: 1.5,
      delay: 2,
      ease: "power3.out",
      onComplete: () => {
        document.getElementById("loader").style.display = "none";
        document.body.style.overflow = "auto";
      },
    });
  
        // Welcome Animation (New Holographic Wave Effect)
    const welcome = document.getElementById("welcome");
    if (welcome && !sessionStorage.getItem("welcomeShown")) {
      welcome.classList.add("active");
      sessionStorage.setItem("welcomeShown", "true");
    
      const welcomeText = document.querySelector(".welcome-text");
      const text = "Welcome\nto\nWEMCO";
    
      // Split text into characters, handling line breaks
      welcomeText.innerHTML = text
        .split("")
        .map((char) => 
          char === "\n" ? "<br>" : `<span class="letter">${char === " " ? " " : char}</span>`
        )
        .join("");
    
      // Holographic Wave Animation
      gsap.from(".letter", {
        opacity: 0,
        y: 150,
        scale: 0.5,
        duration: 1.5,
        stagger: 0.05,
        ease: "power4.out",
        onStart: () => {
          gsap.to(".letter", {
            keyframes: [
              { textShadow: "0 0 20px #ff007a", duration: 0.5 },
              { textShadow: "0 0 40px #00ffcc", duration: 0.5 },
              { textShadow: "0 0 60px #ffcc00", duration: 0.5 },
            ],
            repeat: 2,
            yoyo: true,
          });
        },
      });
      
      // Canvas Wave Effect
      const canvas = document.getElementById("welcome-canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      let time = 0;
      function drawWaves() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.05;
  
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${255 - i * 50}, ${i * 50}, 255, ${0.5 - i * 0.1})`;
          ctx.lineWidth = 2;
  
          for (let x = 0; x < canvas.width; x++) {
            const y = canvas.height / 2 + Math.sin(x * 0.01 + time + i) * 100 * (1 - i * 0.2);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        requestAnimationFrame(drawWaves);
      }
      drawWaves();
  
      gsap.to(welcome, {
        opacity: 0,
        delay: 5,
        duration: 1.5,
        ease: "power3.in",
        onComplete: () => (welcome.style.display = "none"),
      });
    } else if (welcome) {
      welcome.style.display = "none";
    }
  
    // Navbar Scroll Effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  
    // Dark Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });
  
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
    }
  
    // Hero Section Animations
    gsap.from(".hero-content h1", { opacity: 0, y: 120, duration: 1.8, ease: "power4.out", delay: 0.5 });
    gsap.from(".hero-content p", { opacity: 0, y: 60, duration: 1.5, ease: "power4.out", delay: 1 });
    gsap.from(".hero-btn", { opacity: 0, scale: 0.7, duration: 1.2, ease: "back.out(2)", delay: 1.5 });
  
    // Hero Slider
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    function showSlide(index) {
      slides.forEach((slide, i) => {
        const overlay = slide.querySelector(".slide-overlay");
        gsap.to(slide, { opacity: i === index ? 0.9 : 0, duration: 1.5, ease: "power3.inOut" });
        gsap.to(overlay, { opacity: i === index ? 1 : 0, y: i === index ? 0 : 50, duration: 1, ease: "power2.out" });
      });
    }
    showSlide(currentSlide);
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  
    // About Slider
    const aboutSlides = document.querySelectorAll(".about-slide");
    if (aboutSlides.length > 0) {
      let currentAboutSlide = 0;
      function showAboutSlide(index) {
        aboutSlides.forEach((slide, i) => {
          gsap.to(slide, { opacity: i === index ? 1 : 0, duration: 1.5, ease: "power3.inOut" });
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
        scrollTrigger: { trigger: section, start: "top 80%" },
        opacity: 0,
        y: 60,
        duration: 1.5,
        ease: "power4.out",
      });
  
      gsap.from(section.querySelector(".intro-text"), {
        scrollTrigger: { trigger: section, start: "top 80%" },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.3,
      });
  
      gsap.from(section.querySelectorAll(".service-item, .mission-item, .satisfaction-circle, .timeline-item"), {
        scrollTrigger: { trigger: section, start: "top 80%" },
        opacity: 0,
        y: 60,
        scale: 0.9,
        stagger: 0.2,
        duration: 1.5,
        ease: "back.out(2)",
      });
    });
  
    // Number Counter Animation
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      gsap.fromTo(
        counter,
        { innerHTML: 0 },
        {
          innerHTML: target,
          duration: 2.5,
          scrollTrigger: { trigger: counter, start: "top 80%" },
          ease: "power2.out",
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
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      gsap.fromTo(
        ".nav-links.active a",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }
      );
    });
  
    // Clients Slider Infinite Loop
    const clientsInner = document.querySelector(".clients-inner");
    if (clientsInner) {
      clientsInner.style.animationPlayState = "running";
      clientsInner.addEventListener("mouseenter", () => (clientsInner.style.animationPlayState = "paused"));
      clientsInner.addEventListener("mouseleave", () => (clientsInner.style.animationPlayState = "running"));
    }
  });
