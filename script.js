document.addEventListener('DOMContentLoaded', () => {

    // 1. STICKY HEADER TRANSITION
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    const floatingMenu = document.getElementById('floating-menu');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        // Header Background
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Floating Menu Visibility (Show after Hero)
        if (scrollY > heroHeight - 200) {
            floatingMenu.classList.remove('hidden');
        } else {
            floatingMenu.classList.add('hidden');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // 2. SCROLL REVEAL ANIMATIONS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Keep observing if we want re-trigger (optional)
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // 3. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. HIGHLIGHT ACTIVE LINK IN PILL MENU
    const pillLinks = document.querySelectorAll('.pill-link');
    const sections = Array.from(pillLinks).map(link => {
        const id = link.getAttribute('href').substring(1);
        return document.getElementById(id);
    }).filter(s => s !== null);

    const updateActivePill = () => {
        let currentSection = null;
        const scrollY = window.scrollY + 200; // Offset

        sections.forEach(section => {
            if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                currentSection = section;
            }
        });

        pillLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href') === '#' + currentSection.id) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActivePill);

    // 5. MODAL FUNCTIONALITY
    const modal = document.getElementById('pricingModal');
    const openBtn = document.getElementById('openPricingModal');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    if (modal && openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        const closeModal = () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);

        // Close on outside click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    console.log("Digismart Script Loaded (v2)");
    // --- CATEGORY SECTION LOGIC ---
    const categoryData = {
        "time-saving": {
            description: "In a world where speed and efficiency are essential, our solutions help you optimize every minute of your day.",
            features: [
                "Order and payment automation",
                "Real-time tracking",
                "Simplified planning",
                "Human error elimination",
                "Simplified operations management"
            ]
        },
        "sales-simplification": {
            description: "Boost your revenue with a smooth and effortless customer experience.",
            features: [
                "Accessible online ordering system",
                "Automated customer communication",
                "Improved user experience",
                "Staff time savings for other tasks"
            ]
        },
        "complete-customization": {
            description: "Tailor-made solutions to reflect your company's values.",
            features: [
                "Customized interface",
                "Modular features",
                "Guaranteed scalability",
                "Custom visual identity",
                "Adaptability to internal processes",
                "Access level customization"
            ]
        },
        "digital-content": {
            description: "Showcase your business with a professional and engaging online presence.",
            features: [
                "Impactful social media posts",
                "Adapted content strategy",
                "Analytics tools",
                "SEO-optimized content",
                "Various and innovative formats",
                "Target audience customization",
                "Custom editorial calendar"
            ]
        }
    };

    const categoryItems = document.querySelectorAll('.category-item');
    const contentArea = document.getElementById('category-content-area');

    function updateCategoryContent(categoryId) {
        const data = categoryData[categoryId];
        if (!data) return;

        // Create HTML for features list
        const featuresHtml = data.features.map(feature => `<li>${feature}</li>`).join('');

        // Update content with fade animation
        contentArea.innerHTML = `
            <div class="animate-fade-in">
                <p class="category-description-text">${data.description}</p>
                <ul class="category-features-list">
                    ${featuresHtml}
                </ul>
            </div>
        `;
    }

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            categoryItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked
            item.classList.add('active');

            // Update content
            const categoryId = item.getAttribute('data-category');
            updateCategoryContent(categoryId);
        });
    });

    // Initialize with first category
    if (categoryItems.length > 0) {
        const firstCategory = categoryItems[0].getAttribute('data-category');
        updateCategoryContent(firstCategory);
    }

    console.log("Digismart Script with Category Logic Loaded (v3)");
});
