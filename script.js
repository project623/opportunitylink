// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu after clicking a link
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Mobile menu toggle functionality
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Features tab functionality
const seekerTab = document.getElementById('seeker-tab');
const providerTab = document.getElementById('provider-tab');
const seekerContent = document.getElementById('seeker-content');
const providerContent = document.getElementById('provider-content');

seekerTab.addEventListener('click', () => {
    seekerContent.classList.remove('hidden');
    seekerContent.classList.add('grid');
    providerContent.classList.add('hidden');
    providerContent.classList.remove('grid');
    seekerTab.classList.add('bg-indigo-600', 'text-white');
    seekerTab.classList.remove('bg-gray-200', 'text-gray-700');
    providerTab.classList.remove('bg-indigo-600', 'text-white');
    providerTab.classList.add('bg-gray-200', 'text-gray-700');
});

providerTab.addEventListener('click', () => {
    providerContent.classList.remove('hidden');
    providerContent.classList.add('grid');
    seekerContent.classList.add('hidden');
    seekerContent.classList.remove('grid');
    providerTab.classList.add('bg-indigo-600', 'text-white');
    providerTab.classList.remove('bg-gray-200', 'text-gray-700');
    seekerTab.classList.remove('bg-indigo-600', 'text-white');
    seekerTab.classList.add('bg-gray-200', 'text-gray-700');
});

// Meet OpportunityLink image change on scroll (Intersection Observer)
const meetImage = document.getElementById('meet-image');
const meetContentBlocks = document.querySelectorAll('.meet-content');

const imageSources = {
    'point-1': 'https://placehold.co/400x400/e0e7ff/4338ca?text=Diverse+Talent', // Placeholder for diverse talent
    'point-2': 'https://placehold.co/400x400/d1e7dd/28a745?text=Connection+Model', // Placeholder for connection model
    'point-3': 'https://placehold.co/400x400/ffe0b2/ff9800?text=Problem+Solved', // Placeholder for problem solving
    'point-4': 'https://placehold.co/400x400/c2e0ff/007bff?text=Empowerment+Diagram' // Placeholder for empowerment diagram
};

const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px 0px -50% 0px', // Trigger when 50% of the element is visible
    threshold: 0 // As soon as any part of the element enters the viewport
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const pointId = entry.target.id;
            if (imageSources[pointId]) {
                // Add a class for fade out
                meetImage.classList.add('opacity-0');
                setTimeout(() => {
                    meetImage.src = imageSources[pointId];
                    meetImage.alt = entry.target.querySelector('h3').textContent; // Update alt text
                    // Remove class for fade in
                    meetImage.classList.remove('opacity-0');
                }, 300); // Match this duration with the transition-opacity duration
            }
            // Optional: Highlight the active text block
            meetContentBlocks.forEach(block => {
                block.classList.remove('bg-indigo-50', 'shadow-lg');
            });
            entry.target.classList.add('bg-indigo-50', 'shadow-lg');
        }
    });
}, observerOptions);

meetContentBlocks.forEach(block => {
    observer.observe(block);
});

// Initialize first point as active on load
document.addEventListener('DOMContentLoaded', () => {
    const firstPoint = document.getElementById('point-1');
    if (firstPoint) {
        firstPoint.classList.add('bg-indigo-50', 'shadow-lg');
        meetImage.src = imageSources['point-1'];
        meetImage.alt = firstPoint.querySelector('h3').textContent;
    }
});