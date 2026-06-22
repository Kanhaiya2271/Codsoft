// ===== Mobile Menu Toggle =====

let menuBtn = document.getElementById("menuBtn");
let navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// close menu when a link is clicked (for mobile)
navLinks.addEventListener("click", function () {
    navLinks.classList.remove("active");
});


// ===== Number Counter Animation =====
// this makes the stats count up when they come into view

let countersStarted = false;

function startCounting() {
    let counters = document.querySelectorAll(".stat-number");

    counters.forEach(function (counter) {
        let target = parseInt(counter.getAttribute("data-target"));
        let current = 0;
        let increment = Math.ceil(target / 80); // controls speed

        let timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                counter.textContent = target + "+";
                clearInterval(timer);
            } else {
                counter.textContent = current;
            }
        }, 20);
    });
}

// use IntersectionObserver to detect when stats section is visible
let statsSection = document.querySelector(".about-stats");

if (statsSection) {
    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                startCounting();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}


// ===== Contact Form Handling =====

let adoptForm = document.getElementById("adoptForm");
let formMsg = document.getElementById("formMsg");

adoptForm.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page from refreshing

    // show a success message
    formMsg.textContent = "Thanks! We've received your inquiry. We'll reach out to you soon 🐾";
    adoptForm.reset(); // clear the form

    // hide message after 5 seconds
    setTimeout(function () {
        formMsg.textContent = "";
    }, 5000);
});
