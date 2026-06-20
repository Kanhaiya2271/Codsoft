// Toggle mobile menu
function toggleMenu() {
    var navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
        var navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('active');
    });
});

// Handle contact form submission
function handleSubmit(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    alert('Thank you, ' + name + '! Your message has been received. I will get back to you soon.');

    // Clear the form
    document.getElementById('contact-form').reset();
}
