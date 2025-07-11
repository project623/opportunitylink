// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default and smooth scroll if on the same page
        if (this.pathname === window.location.pathname) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Close mobile menu after clicking a link
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Mobile menu toggle functionality
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Meet OpportunityLink image change on scroll (Intersection Observer)
const meetImage = document.getElementById('meet-image');
const meetContentBlocks = document.querySelectorAll('.meet-content');

// Only run this script if the elements exist (i.e., on the homepage)
if (meetImage && meetContentBlocks.length > 0) {
    // Updated image sources for Meet OpportunityLink section using provided images and cache-busting
    const imageSources = {
        'point-1': 'images/Diverse & Verified Talent Pool.png?v=14', // Provided image
        'point-2': 'images/Seamless Connection Model .png?v=14', // Provided image
        'point-3': 'images/Solving Your Connection Challenges.png?v=14', // Provided image
        'point-4': 'images/Driven by Empowerment.png?v=14' // Provided image
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
}

// How It Works Modal functionality
const howItWorksButtons = document.querySelectorAll('.how-it-works-tab-button');
const modal = document.getElementById('how-it-works-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalButton = document.getElementById('modal-button');
const closeModalButton = document.getElementById('close-modal');

// Data for each step's modal content
const stepData = {
    1: {
        title: '1. Initial Consultation & Profile Matching',
        description: 'Begin with a personalized consultation to understand your unique needs. For seekers, we help refine your profile. For providers, we identify your talent requirements. Our system then intelligently matches you with the most relevant opportunities or candidates.',
        buttonText: 'Find Talent',
        buttonLink: 'find-talent.html'
    },
    2: {
        title: '2. Facilitated Connections & Interviews',
        description: 'Once matches are made, we facilitate seamless introductions. Providers can conduct interviews with pre-vetted candidates, while seekers can connect directly with mentors or pitch their ideas to investors. We ensure a smooth communication flow.',
        buttonText: 'Find Work',
        buttonLink: 'find-work.html'
    },
    3: {
        title: '3. Onboarding & Integration Support',
        description: 'For successful matches, we offer resources and support to ensure a smooth transition. This includes guidance for new hires, tips for effective mentorship relationships, or advice for integrating new investments into your venture.',
        buttonText: 'Post an Opportunity',
        buttonLink: 'providers.html'
    },
    4: {
        title: '4. Ongoing Growth & Community Access',
        description: 'Our commitment extends beyond the initial connection. Benefit from ongoing support, access to community events, and resources designed to foster continuous growth and long-term success for all members of the OpportunityLink network.',
        buttonText: 'Explore More',
        buttonLink: 'explore-opportunities.html'
    }
};

howItWorksButtons.forEach(button => {
    button.addEventListener('click', () => {
        const step = button.dataset.step;
        const data = stepData[step];

        if (data) {
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modalButton.textContent = data.buttonText;
            modalButton.href = data.buttonLink;
            modal.classList.remove('hidden');

            // Deactivate all buttons and activate the clicked one
            howItWorksButtons.forEach(btn => {
                btn.classList.remove('active'); // Remove 'active' class
            });
            button.classList.add('active'); // Add 'active' class to the clicked button
        }
    });
});

closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden');
    // Reset button styling when modal is closed
    howItWorksButtons.forEach(btn => {
        btn.classList.remove('active'); // Remove 'active' class
    });
});

// Close modal if clicking outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        // Reset button styling when modal is closed
        howItWorksButtons.forEach(btn => {
            btn.classList.remove('active'); // Remove 'active' class
        });
    }
});

// Initialize the first button as active on load
document.addEventListener('DOMContentLoaded', () => {
    const firstHowItWorksButton = document.querySelector('.how-it-works-tab-button[data-step="1"]');
    if (firstHowItWorksButton) {
        firstHowItWorksButton.classList.add('active'); // Add 'active' class
    }
});


// Explore Key Features tab functionality
const seekerTab = document.getElementById('seeker-tab');
const providerTab = document.getElementById('provider-tab');
const seekerContent = document.getElementById('seeker-content');
const providerContent = document.getElementById('provider-content');

if (seekerTab && providerTab && seekerContent && providerContent) {
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
}