'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// typing animation
const typedText = document.getElementById("typed-text");
const phrases = ["Software Developer Engineer", "Competitive Programmer", "Full-Stack Developer", "Problem Solver"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();


// dark/light mode toggle
const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });






// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// handle form submission via fetch (no redirect)
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append("access_key", "558887d0-8de2-4f43-aea9-d5c3d7fe6c4d");
  formData.append("subject", "New Contact Form Submission - Portfolio");
  formData.append("from_name", "Portfolio Contact Form");

  const btnText = formBtn.querySelector("span");
  btnText.textContent = "Sending...";
  formBtn.setAttribute("disabled", "");

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      btnText.textContent = "Message Sent!";
      form.reset();
      setTimeout(() => { btnText.textContent = "Send Message"; }, 3000);
    } else {
      btnText.textContent = "Failed. Try Again.";
      setTimeout(() => { btnText.textContent = "Send Message"; }, 3000);
    }
  })
  .catch(() => {
    btnText.textContent = "Failed. Try Again.";
    setTimeout(() => { btnText.textContent = "Send Message"; }, 3000);
  });
});



// scroll reveal animation
const revealElements = document.querySelectorAll(".service-item, .achievement-card, .timeline-item, .skills-item, .project-item, .clients-item, .about-text, .service-title, .mapbox, .contact-form");

revealElements.forEach(el => el.classList.add("scroll-reveal"));

const revealOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealOnScroll.observe(el));


// back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



// glass pill navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const glassPill = document.getElementById("navGlassPill");

function moveGlassPill(target) {
  const navList = document.querySelector(".navbar-list");
  const navRect = navList.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  glassPill.style.left = (targetRect.left - navRect.left) + "px";
  glassPill.style.width = targetRect.width + "px";
}

// position pill on load
window.addEventListener("load", function () {
  const activeLink = document.querySelector(".navbar-link.active");
  if (activeLink) moveGlassPill(activeLink);
});

// reposition on resize
window.addEventListener("resize", function () {
  const activeLink = document.querySelector(".navbar-link.active");
  if (activeLink) moveGlassPill(activeLink);
});

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    moveGlassPill(this);

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}