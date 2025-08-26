// HelioFlux Interactive Website JavaScript
// Handles navigation, animations, scroll effects, and user interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initChartAnimations();
    initParallaxEffects();
    initSmoothScrolling();
    initMobileMenu();
    initTypingEffect();
    initCounterAnimations();
    initLazyLoading();
    initCalculator();
    init3DModel();
    initPowerRace();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
   
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
       
        // Update active navigation link based on scroll position
        updateActiveNavLink();
    });
   
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
           
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Update active navigation link based on current section
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
   
    let current = '';
   
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
       
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
   
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
   
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
   
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Scroll animations for elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
   
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
               
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('chart-bar')) {
                    animateChartBar(entry.target);
                }
               
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
   
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(`
        .feature-card,
        .problem-stat,
        .material-card,
        .team-member,
        .study-stat,
        .calc-item,
        .comparison-card,
        .chart-bar,
        .stat-item
    `);
   
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Chart animation functionality
function initChartAnimations() {
    const chartBars = document.querySelectorAll('.chart-bar');
   
    chartBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        const fill = bar.querySelector('.bar-fill');
       
        // Set initial width to 0
        fill.style.width = '0%';
       
        // Store the percentage for later animation
        bar.dataset.targetPercentage = percentage;
    });
}

function animateChartBar(chartBar) {
    const fill = chartBar.querySelector('.bar-fill');
    const targetPercentage = chartBar.dataset.targetPercentage;
   
    setTimeout(() => {
        fill.style.width = targetPercentage + '%';
    }, 200);
}

// Counter animation for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
   
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent.replace(/[^\d.]/g, ''));
        const suffix = counter.textContent.replace(/[\d.]/g, '');
        counter.dataset.target = target;
        counter.dataset.suffix = suffix;
        counter.textContent = '0' + suffix;
    });
}

function animateCounter(statItem) {
    const counter = statItem.querySelector('.stat-number');
    if (!counter || counter.dataset.animated) return;
   
    const target = parseFloat(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
   
    const timer = setInterval(() => {
        current += increment;
        step++;
       
        if (step >= steps || current >= target) {
            current = target;
            clearInterval(timer);
            counter.dataset.animated = 'true';
        }
       
        // Format the number based on its value
        let displayValue;
        if (current >= 1000) {
            displayValue = (current / 1000).toFixed(1) + 'K';
        } else if (current % 1 === 0) {
            displayValue = Math.round(current).toString();
        } else {
            displayValue = current.toFixed(1);
        }
       
        counter.textContent = displayValue + suffix;
    }, duration / steps);
}

// Parallax effects for hero section
function initParallaxEffects() {
    const heroBackground = document.querySelector('.hero-background');
    const solarParticles = document.querySelector('.solar-particles');
   
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const rate2 = scrolled * -0.3;
       
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
       
        if (solarParticles) {
            solarParticles.style.transform = `translateY(${rate2}px)`;
        }
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
   
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
           
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const titleLines = document.querySelectorAll('.hero-title-line');
   
    titleLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(20px)';
       
        setTimeout(() => {
            line.style.transition = 'all 0.8s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 300);
    });
   
    // Animate highlight text
    const highlight = document.querySelector('.hero-title-highlight');
    if (highlight) {
        setTimeout(() => {
            highlight.style.transition = 'all 1s ease';
            highlight.style.opacity = '1';
            highlight.style.transform = 'scale(1.05)';
        }, 1200);
    }
}

// Lazy loading for images and heavy content
function initLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
   
    const lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
               
                // Load lazy content
                if (element.dataset.lazy === 'content') {
                    element.classList.add('loaded');
                }
               
                lazyObserver.unobserve(element);
            }
        });
    });
   
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// Enhanced hover effects for interactive elements
function initHoverEffects() {
    const cards = document.querySelectorAll(`
        .feature-card,
        .material-card,
        .team-member,
        .problem-stat,
        .comparison-card
    `);
   
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
       
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Initialize enhanced hover effects
document.addEventListener('DOMContentLoaded', initHoverEffects);

// Utility function to debounce scroll events
function debounce(func, wait) {
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    updateActiveNavLink();
   
    // Additional scroll-based functionality can be added here
    const scrolled = window.pageYOffset;
   
    // Add dynamic styling based on scroll position
    if (scrolled > 200) {
        document.body.classList.add('scrolled-down');
    } else {
        document.body.classList.remove('scrolled-down');
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Video placeholder interaction
function initVideoPlaceholder() {
    const playButton = document.querySelector('.play-button');
    const videoPlaceholder = document.querySelector('.video-placeholder');
   
    if (playButton && videoPlaceholder) {
        playButton.addEventListener('click', function() {
            // Placeholder for video integration
            showVideoModal();
        });
    }
}

function showVideoModal() {
    // This function would handle video modal/embed
    alert('Video integration placeholder - YouTube/Vimeo embed will be added here');
}

// Initialize video placeholder
document.addEventListener('DOMContentLoaded', initVideoPlaceholder);

// Form validation and interaction (for future contact forms)
function initFormHandling() {
    const forms = document.querySelectorAll('form');
   
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
           
            // Validate form
            if (validateForm(this)) {
                submitForm(this);
            }
        });
    });
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
   
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
   
    return isValid;
}

function submitForm(form) {
    // Handle form submission
    const formData = new FormData(form);
   
    // Show loading state
    form.classList.add('loading');
   
    // Simulate form submission
    setTimeout(() => {
        form.classList.remove('loading');
        showNotification('Message sent successfully!', 'success');
        form.reset();
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
   
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'
    });
   
    document.body.appendChild(notification);
   
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
   
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Accessibility enhancements
function initAccessibility() {
    // Keyboard navigation for cards
    const interactiveElements = document.querySelectorAll(`
        .feature-card,
        .material-card,
        .team-member,
        .cta-button
    `);
   
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
       
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
   
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
   
    Object.assign(skipLink.style, {
        position: 'absolute',
        top: '-40px',
        left: '6px',
        background: 'var(--primary-blue)',
        color: 'white',
        padding: '8px',
        zIndex: '10001',
        textDecoration: 'none',
        borderRadius: '4px',
        transition: 'top 0.3s ease'
    });
   
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
   
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
   
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// Calculator functionality
function initCalculator() {
    const form = document.getElementById('calculatorForm');
    const resultDiv = document.getElementById('calculatorResult');
   
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculatePrice();
        });
    }
   
    // Add real-time updates on input change
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (resultDiv.style.display !== 'none') {
                calculatePrice();
            }
        });
    });
}

function calculatePrice() {
    const numUnits = parseInt(document.getElementById('numUnits').value) || 1;
    const maintenancePlan = document.getElementById('maintenancePlan').value;
    const numItems = parseInt(document.getElementById('numItems').value) || 1;
    const hasItems = document.querySelector('input[name="hasItems"]:checked')?.value;
   
    // Validate inputs
    if (!hasItems) {
        alert('Please select whether you have the required items at home.');
        return;
    }
   
    // Calculate costs
    const unitPrice = 325;
    const setupFee = 50;
   
    // Calculate unit cost with bulk discount
    let unitCost = unitPrice * numUnits;
    let discount = 0;
    if (numUnits >= 10) {
        discount = unitCost * 0.1;
        unitCost = unitCost - discount;
    }
   
    // Calculate maintenance cost
    let maintenanceCost = 0;
    if (maintenancePlan === 'monthly') {
        maintenanceCost = 150;
    }
    // Standard plan has no upfront cost (50 AED per visit as needed)
   
    // Calculate total
    const total = unitCost + setupFee + maintenanceCost;
   
    // Display results
    displayCalculatorResult({
        numUnits,
        unitPrice,
        unitCost,
        discount,
        setupFee,
        maintenancePlan,
        maintenanceCost,
        hasItems,
        numItems,
        total
    });
}

function displayCalculatorResult(calculation) {
    const resultDiv = document.getElementById('calculatorResult');
    const totalAmountSpan = document.getElementById('totalAmount');
    const breakdownDiv = document.getElementById('costBreakdown');
    const contactNote = document.getElementById('contactNote');
   
    // Update total amount
    totalAmountSpan.textContent = calculation.total.toLocaleString();
   
    // Create breakdown HTML
    let breakdownHTML = '';
   
    // Units cost
    breakdownHTML += `
        <div class="breakdown-item">
            <span>${calculation.numUnits} Unit${calculation.numUnits > 1 ? 's' : ''} (${calculation.unitPrice} AED each)</span>
            <span>${(calculation.unitPrice * calculation.numUnits).toLocaleString()} AED</span>
        </div>
    `;
   
    // Bulk discount
    if (calculation.discount > 0) {
        breakdownHTML += `
            <div class="breakdown-item">
                <span>Bulk Discount (10% off)</span>
                <span>-${calculation.discount.toLocaleString()} AED</span>
            </div>
        `;
    }
   
    // Setup fee
    breakdownHTML += `
        <div class="breakdown-item">
            <span>Initial Setup Fee</span>
            <span>${calculation.setupFee} AED</span>
        </div>
    `;
   
    // Maintenance plan
    if (calculation.maintenancePlan === 'monthly') {
        breakdownHTML += `
            <div class="breakdown-item">
                <span>Monthly Maintenance Plan</span>
                <span>${calculation.maintenanceCost} AED</span>
            </div>
        `;
    } else {
        breakdownHTML += `
            <div class="breakdown-item">
                <span>Standard Maintenance Plan</span>
                <span>Included (50 AED per visit)</span>
            </div>
        `;
    }
   
    // Total
    breakdownHTML += `
        <div class="breakdown-item">
            <span><strong>Total Cost</strong></span>
            <span><strong>${calculation.total.toLocaleString()} AED</strong></span>
        </div>
    `;
   
    breakdownDiv.innerHTML = breakdownHTML;
   
    // Show/hide contact note based on whether they have items
    if (calculation.hasItems === 'no') {
        contactNote.style.display = 'block';
    } else {
        contactNote.style.display = 'none';
    }
   
    // Show result with animation
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
   
    // Add animation class
    setTimeout(() => {
        resultDiv.style.opacity = '0';
        resultDiv.style.transform = 'translateY(20px)';
        resultDiv.style.transition = 'all 0.5s ease';
       
        setTimeout(() => {
            resultDiv.style.opacity = '1';
            resultDiv.style.transform = 'translateY(0)';
        }, 50);
    }, 100);
}

function resetCalculator() {
    const form = document.getElementById('calculatorForm');
    const resultDiv = document.getElementById('calculatorResult');
   
    // Reset form
    form.reset();
   
    // Reset to default values
    document.getElementById('numUnits').value = 1;
    document.getElementById('numItems').value = 1;
    document.getElementById('maintenancePlan').value = 'standard';
   
    // Hide result
    resultDiv.style.display = 'none';
   
    // Scroll back to form
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// 3D Model functionality
function init3DModel() {
    const model3d = document.getElementById('model3d');
    const components = document.querySelectorAll('.component');
    const componentInfo = document.getElementById('componentInfo');
    const componentName = document.getElementById('componentName');
    const componentDescription = document.getElementById('componentDescription');
    const rotateBtn = document.getElementById('rotateBtn');
    const explodeBtn = document.getElementById('explodeBtn');
    const resetBtn = document.getElementById('resetBtn');
   
    if (!model3d) return;
   
    // Component descriptions
    const componentDescriptions = {
        'Brushed Stainless Steel Sheet': 'Top protective layer providing durability and weather resistance. Made from high-grade 304 stainless steel.',
        'Spring Steel Platform': 'Magnetic base platform that provides flexibility and easy maintenance access. 135x75mm dimensions.',
        'Thermal Grizzly Aeronaut Paste': 'High-performance thermal paste ensuring optimal heat transfer between components.',
        'TEC1-12706 Thermoelectric Cooler': 'Core Peltier module that converts temperature differences into electrical energy with maximum efficiency.',
        'Aluminum Heat Sinks': '40x20x40mm cooler fins that dissipate heat effectively, maintaining optimal operating temperatures.',
        '40mm Cooling Fan': '5V brushless cooling fan (5000 RPM) with foam padding for enhanced heat management.',
        'MT3608 LM2577 DC-DC Boost Converter': 'Voltage regulator that steps up power from 2V-24V to 5V-28V for optimal energy distribution.',
        '1N5819 Schottky Barrier Rectifiers': 'Low-loss current flow diodes ensuring efficient power conversion and protection.',
        'User Device Connections': 'Connection point where electrician connects user devices and appliances to the HelioFlux unit.'
    };
   
    // Mouse interaction for model rotation
    let isRotating = false;
    let rotationX = -15;
    let rotationY = 15;
    let startX, startY;
   
    model3d.addEventListener('mousedown', function(e) {
        isRotating = true;
        startX = e.clientX;
        startY = e.clientY;
        model3d.style.cursor = 'grabbing';
    });
   
    document.addEventListener('mousemove', function(e) {
        if (!isRotating) return;
       
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
       
        rotationY += deltaX * 0.5;
        rotationX -= deltaY * 0.5;
       
        // Limit rotation to prevent flipping
        rotationX = Math.max(-60, Math.min(60, rotationX));
       
        updateModelRotation();
       
        startX = e.clientX;
        startY = e.clientY;
    });
   
    document.addEventListener('mouseup', function() {
        isRotating = false;
        model3d.style.cursor = 'grab';
    });
   
    function updateModelRotation() {
        if (!model3d.classList.contains('rotating')) {
            model3d.style.transform = `translate(-50%, -50%) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        }
    }
   
    // Component button interactions
    const componentButtons = document.querySelectorAll('.component-btn');
   
    componentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const componentType = this.dataset.component;
           
            // Remove active state from all buttons
            componentButtons.forEach(btn => btn.classList.remove('active'));
           
            // Add active state to clicked button
            this.classList.add('active');
           
            // Remove highlight from all components
            components.forEach(c => c.classList.remove('highlighted'));
           
            // Find and highlight matching component
            const matchingComponent = document.querySelector(`.component[data-component="${componentType}"]`);
            if (matchingComponent) {
                matchingComponent.classList.add('highlighted');
            }
           
            // Update info panel
            componentName.textContent = componentType;
            componentDescription.textContent = componentDescriptions[componentType] || 'High-quality component essential for HelioFlux operation.';
        });
    });
   
    // Control button functionality
    let isAutoRotating = false;
    let isExploded = false;
   
    rotateBtn.addEventListener('click', function() {
        isAutoRotating = !isAutoRotating;
       
        if (isAutoRotating) {
            model3d.classList.add('rotating');
            this.classList.add('active');
            this.textContent = '⏸ Stop Rotation';
        } else {
            model3d.classList.remove('rotating');
            this.classList.remove('active');
            this.textContent = '🔄 Auto Rotate';
            updateModelRotation();
        }
    });
   
    explodeBtn.addEventListener('click', function() {
        isExploded = !isExploded;
       
        if (isExploded) {
            model3d.classList.add('exploded');
            this.classList.add('active');
            this.textContent = '🔧 Assemble View';
        } else {
            model3d.classList.remove('exploded');
            this.classList.remove('active');
            this.textContent = '💥 Exploded View';
        }
    });
   
    resetBtn.addEventListener('click', function() {
        // Reset all states
        isAutoRotating = false;
        isExploded = false;
        rotationX = -15;
        rotationY = 15;
       
        // Reset classes and buttons
        model3d.classList.remove('rotating', 'exploded');
        rotateBtn.classList.remove('active');
        explodeBtn.classList.remove('active');
        rotateBtn.textContent = '🔄 Auto Rotate';
        explodeBtn.textContent = '💥 Exploded View';
       
        // Reset component highlights
        components.forEach(c => c.classList.remove('highlighted'));
       
        // Reset info panel
        componentName.textContent = 'Select a component above';
        componentDescription.textContent = 'Click on any component button to see details and highlight it in the 3D model.';
       
        // Reset model position
        updateModelRotation();
    });
   
    // Touch support for mobile
    let touchStartX, touchStartY;
   
    model3d.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    });
   
    model3d.addEventListener('touchmove', function(e) {
        if (e.touches.length === 1) {
            e.preventDefault();
           
            const deltaX = e.touches[0].clientX - touchStartX;
            const deltaY = e.touches[0].clientY - touchStartY;
           
            rotationY += deltaX * 0.5;
            rotationX -= deltaY * 0.5;
           
            rotationX = Math.max(-60, Math.min(60, rotationX));
           
            updateModelRotation();
           
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    });
   
    // Initialize model cursor
    model3d.style.cursor = 'grab';
}



// Power Race functionality
function initPowerRace() {
    const raceStartBtn = document.getElementById('raceStartBtn');
    const heliofluxProgress = document.getElementById('heliofluxProgress');
    const traditionalProgress = document.getElementById('traditionalProgress');
    const heliofluxOutput = document.getElementById('heliofluxOutput');
    const traditionalOutput = document.getElementById('traditionalOutput');
    const raceResults = document.getElementById('raceResults');
   
    if (!raceStartBtn) return;
   
    let raceInProgress = false;
   
    raceStartBtn.addEventListener('click', function() {
        if (raceInProgress) return;
       
        startRace();
    });
   
    function startRace() {
        raceInProgress = true;
        raceStartBtn.disabled = true;
        raceStartBtn.textContent = '🏃 Racing...';
       
        // Hide results
        raceResults.classList.remove('show');
       
        // Reset progress bars
        const heliofluxFill = heliofluxProgress.querySelector('.progress-fill');
        const traditionalFill = traditionalProgress.querySelector('.progress-fill');
        const heliofluxLabel = heliofluxProgress.querySelector('.progress-label');
        const traditionalLabel = traditionalProgress.querySelector('.progress-label');
       
        heliofluxFill.style.width = '0%';
        traditionalFill.style.width = '0%';
        heliofluxLabel.textContent = '0%';
        traditionalLabel.textContent = '0%';
        heliofluxOutput.textContent = '0.0 kWh';
        traditionalOutput.textContent = '0.0 kWh';
       
        // Animation parameters
        const totalDuration = 5000; // 5 seconds total
        const updateInterval = 50; // Update every 50ms
        const totalSteps = totalDuration / updateInterval;
       
        let currentStep = 0;
       
        const raceInterval = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
           
            // HelioFlux progresses faster due to multiple energy sources
            const heliofluxMultiplier = 1.67; // 67% faster
            const heliofluxProgress = Math.min(100, progress * 100 * heliofluxMultiplier);
            const traditionalProgress = Math.min(100, progress * 100);
           
            // Update progress bars
            heliofluxFill.style.width = `${heliofluxProgress}%`;
            traditionalFill.style.width = `${traditionalProgress}%`;
            heliofluxLabel.textContent = `${Math.round(heliofluxProgress)}%`;
            traditionalLabel.textContent = `${Math.round(traditionalProgress)}%`;
           
            // Calculate energy output (max 22.7 kWh for HelioFlux, 15 kWh for traditional)
            const heliofluxEnergy = (heliofluxProgress / 100) * 22.7;
            const traditionalEnergy = (traditionalProgress / 100) * 15;
           
            heliofluxOutput.textContent = `${heliofluxEnergy.toFixed(1)} kWh`;
            traditionalOutput.textContent = `${traditionalEnergy.toFixed(1)} kWh`;
           
            // Check if HelioFlux reaches 100% first
            if (heliofluxProgress >= 100 || currentStep >= totalSteps) {
                clearInterval(raceInterval);
                finishRace();
            }
        }, updateInterval);
    }
   
    function finishRace() {
        raceInProgress = false;
       
        // Show results after a brief delay
        setTimeout(() => {
            raceResults.classList.add('show');
           
            // Reset button
            raceStartBtn.disabled = false;
            raceStartBtn.textContent = '🚀 Start Race';
        }, 1000);
    }
}

// Add mobile responsiveness for new sections
function addMobileResponsiveness() {
    const componentSelector = document.getElementById('componentSelector');
   
    // Make component selector responsive on mobile
    if (window.innerWidth <= 768 && componentSelector) {
        componentSelector.style.position = 'static';
        componentSelector.style.width = '100%';
        componentSelector.style.margin = '1rem';
        componentSelector.style.maxWidth = 'none';
    }
}

// Call on window resize
window.addEventListener('resize', addMobileResponsiveness);

// Performance optimization
function initPerformanceOptimizations() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
   
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
   
    images.forEach(img => imageObserver.observe(img));
   
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap'
    ];
   
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);

// Error handling and fallbacks
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
   
    // Graceful fallback for critical functionality
    if (e.error.message.includes('IntersectionObserver')) {
        // Fallback for browsers without IntersectionObserver support
        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
        elementsToAnimate.forEach(el => el.classList.add('animated'));
    }
});

// Service worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for global access
window.HelioFlux = {
    scrollToSection,
    showNotification,
    validateForm,
    animateCounter
};

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body initially
    document.body.classList.add('loading');
   
    // Remove loading class after everything is initialized
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 500);
});
