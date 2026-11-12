
/* =========================
   MOBILE NAVIGATION
========================= */

const nav = document.querySelector("nav");
const header = document.querySelector("header");

const menuBtn = document.createElement("button");
menuBtn.innerHTML = "☰";
menuBtn.className = "menu-btn";

menuBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 28px;
    cursor: pointer;
    display: none;
`;

header.appendChild(menuBtn);

function updateMenuButton() {
    menuBtn.style.display =
        window.innerWidth <= 768 ? "block" : "none";
}

updateMenuButton();
window.addEventListener("resize", updateMenuButton);

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuBtn.innerHTML =
        nav.classList.contains("active") ? "✕" : "☰";
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuBtn.innerHTML = "☰";
    });
});


/* =========================
   TYPING ANIMATION
========================= */

const typingText = document.querySelector(".hero h2");

const roles = [
    "Web Developer",
    "Frontend Developer",
    "Programmer",
    "Creative Designer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (deleting) {
        typingText.textContent =
            currentRole.substring(0, charIndex--);
    } else {
        typingText.textContent =
            currentRole.substring(0, charIndex++);
    }

    let speed = deleting ? 60 : 100;

    if (!deleting && charIndex === currentRole.length + 1) {
        deleting = true;
        speed = 1200;
    }

    if (deleting && charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
    ".about, .skill, .project, .contact, .heading"
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "all 0.7s ease";
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    observer.observe(element);
});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/* =========================
   HEADER SCROLL EFFECT
========================= */

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 25px #00000055";
    } else {
        header.style.boxShadow = "none";
    }
});


/* =========================
   CURRENT YEAR
========================= */

const footer = document.querySelector("footer");

if (footer) {
    footer.innerHTML =
        `<p>© ${new Date().getFullYear()} Your Name | All Rights Reserved.</p>`;
}


/* =========================
   PROJECT HOVER EFFECT
========================= */

document.querySelectorAll(".project").forEach(project => {
    project.addEventListener("mouseenter", () => {
        project.style.transform = "translateY(-10px)";
    });

    project.addEventListener("mouseleave", () => {
        project.style.transform = "translateY(0)";
    });
});


/* =========================
   BACK TO TOP BUTTON
========================= */

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    background: #8b5cf6;
    color: white;
    font-size: 25px;
    cursor: pointer;
    display: none;
    z-index: 99;
`;

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    topButton.style.display =
        window.scrollY > 300 ? "block" : "none";
});

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

console.log("Portfolio JavaScript Loaded Successfully!");
