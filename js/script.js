/**
 * Main Interactive Website Controller
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Config Data into DOM Elements
    injectConfigData();

    // 2. Initialize Modules
    if (window.weddingMusicPlayer) {
        window.weddingMusicPlayer.init('music-toggle-btn');
    }
    if (window.liveCountdownTimer) {
        window.liveCountdownTimer.init();
    }
    if (window.scratchRevealCard) {
        window.scratchRevealCard.init('scratch-canvas', 'scratch-card-container');
    }

    // 3. Falling Petals Particle Canvas Animation
    initPetalRainCanvas();

    // 4. Full-screen Intersection Observer for Section Entrance Animations
    initSectionObserver();

    // 5. Progress Dots Navigation
    initDotNavigation();

    // 6. Cover Open Interaction ("Tap to Begin")
    const coverOpenBtn = document.getElementById('cover-open-btn');
    const coverCard = document.getElementById('welcome-card');
    if (coverOpenBtn && coverCard) {
        coverOpenBtn.addEventListener('click', () => {
            coverCard.classList.add('card-opened');
            // Play music on first interaction
            if (window.weddingMusicPlayer && !window.weddingMusicPlayer.isPlaying) {
                window.weddingMusicPlayer.play();
            }
            // Scroll smoothly to next section
            setTimeout(() => {
                const nextSection = document.getElementById('screen-couple');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 600);
        });
    }

    // 7. Handle Google Maps directions button & Alila Meadows venue links
    const alilaMeadowsMapsUrl = window.weddingDetails?.venue?.mapsUrl || "https://www.google.com/maps?q=Alila+Meadows,+19/5,+Bilijaji,+Hesaraghatta,+Bengaluru,+Karnataka+560088&ftid=0x3bae23007780365b:0x9bb463de8255f9cc&entry=gps&shh=CAE&lucs=,94297699,100826475,94231188,94280568,100821559,47071704,94218641,94282134,94286869,100820247,100822504&g_ep=CAISEjI2LjMzLjEuOTYxODkxNDMyMBgAIIgnKmcsOTQyOTc2OTksMTAwODI2NDc1LDk0MjMxMTg4LDk0MjgwNTY4LDEwMDgyMTU1OSw0NzA3MTcwNCw5NDIxODY0MSw5NDI4MjEzNCw5NDI4Njg2OSwxMDA4MjAyNDcsMTAwODIyNTA0QgJJTg%3D%3D&skid=0ed668c7-2845-4617-ba2a-625ae33ab2d4&g_st=iw";

    function openAlilaDirections() {
        const mapsUrl = window.weddingDetails?.venue?.mapsUrl || alilaMeadowsMapsUrl;
        window.open(mapsUrl, '_blank');
    }

    const directionsBtn = document.getElementById('get-directions-btn');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', openAlilaDirections);
    }

    // Alila Meadows location text: open directions to Alila Meadows when clicked
    const venueNameEl = document.getElementById('venue-name');
    if (venueNameEl) {
        venueNameEl.style.cursor = 'pointer';
        venueNameEl.title = 'Open directions to Alila Meadows on Google Maps';
        venueNameEl.addEventListener('click', openAlilaDirections);
    }

    const venueAddressEl = document.getElementById('venue-address');
    if (venueAddressEl) {
        venueAddressEl.style.cursor = 'pointer';
        venueAddressEl.title = 'Open directions to Alila Meadows on Google Maps';
        venueAddressEl.addEventListener('click', openAlilaDirections);
    }

    // 8. Initialize Floating 3D Event Flip Cards
    initEventCards();
});

/**
 * Populate template placeholders from js/config.js
 */
function injectConfigData() {
    const details = window.weddingDetails;
    if (!details) return;

    // Bride & Groom Names
    document.querySelectorAll('.conf-bride-name').forEach(el => el.textContent = details.brideName);
    document.querySelectorAll('.conf-groom-name').forEach(el => el.textContent = details.groomName);
    document.querySelectorAll('.conf-bride-parents').forEach(el => el.textContent = details.brideParents);
    document.querySelectorAll('.conf-groom-parents').forEach(el => el.textContent = details.groomParents);

    // Formatted Dates & Hashtag
    document.querySelectorAll('.conf-wedding-date').forEach(el => el.textContent = details.weddingDateFormatted);
    document.querySelectorAll('.conf-hashtag').forEach(el => el.textContent = details.hashtag);

    // Dynamic Injection for All Events
    if (details.events) {
        Object.keys(details.events).forEach(key => {
            const ev = details.events[key];
            if (!ev) return;
            setText(`#${key}-date`, ev.date);
            setText(`#${key}-time`, ev.time);
            if (ev.venue) setText(`#${key}-venue`, ev.venue);
            if (ev.venueAddress) setText(`#${key}-venue-address`, ev.venueAddress);
            if (ev.tagline) setText(`#${key}-tagline`, ev.tagline);
            if (key === 'sangeeth') {
                setText('#sangeet-date', ev.date);
                setText('#sangeet-time', ev.time);
                if (ev.venue) setText('#sangeet-venue', ev.venue);
                if (ev.tagline) setText('#sangeet-tagline', ev.tagline);
            }
        });
    }

    // Families
    if (details.families) {
        setText('#bride-family-title', details.families.brideFamilyTitle);
        setText('#bride-family-names', details.families.brideFamilyNames);
        setText('#groom-family-title', details.families.groomFamilyTitle);
        setText('#groom-family-names', details.families.groomFamilyNames);
    }

    // Venue
    if (details.venue) {
        setText('#venue-name', details.venue.name);
        setText('#venue-address', details.venue.fullAddress);
        if (details.venue.mapsUrl) {
            const mapLink = document.querySelector('.map-illustration-link');
            if (mapLink) {
                mapLink.setAttribute('href', details.venue.mapsUrl);
            }
        }
    }
}

function setText(selector, text) {
    const el = document.querySelector(selector);
    if (el && text) el.textContent = text;
}

/**
 * Falling Petals Particle Canvas
 */
function initPetalRainCanvas() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petalCount = 28;
    const petals = [];
    const colors = ['#C5838D', '#D9949C', '#E8B4B8', '#DFC486', '#F5E2B5', '#8EA895', '#ADC2B3'];

    for (let i = 0; i < petalCount; i++) {
        petals.push({
            x: Math.random() * width,
            y: Math.random() * height - height,
            size: Math.random() * 8 + 6,
            speedY: Math.random() * 1.5 + 0.8,
            speedX: Math.random() * 1 - 0.5,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.7 + 0.3
        });
    }

    function animatePetals() {
        ctx.clearRect(0, 0, width, height);

        petals.forEach(p => {
            p.y += p.speedY;
            p.x += Math.sin(p.y * 0.01) * 0.8;
            p.rotation += p.rotationSpeed;

            if (p.y > height) {
                p.y = -20;
                p.x = Math.random() * width;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;

            // Draw organic rose petal shape
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(p.size, -p.size, p.size * 1.5, 0);
            ctx.quadraticCurveTo(p.size, p.size, 0, 0);
            ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(animatePetals);
    }

    animatePetals();
}

/**
 * Scroll Section Observer for reveal animations & active dot update
 */
function initSectionObserver() {
    const sections = document.querySelectorAll('.invitation-screen');
    const cards = document.querySelectorAll('.event-flip-card');
    const dots = document.querySelectorAll('.nav-dot');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('screen-active');
                
                // Active dot update
                if (entry.target.classList.contains('invitation-screen')) {
                    const id = entry.target.id;
                    dots.forEach(dot => {
                        if (dot.getAttribute('data-target') === id) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                }
            }
        });
    }, { threshold: 0.25 });

    sections.forEach(sec => observer.observe(sec));
    cards.forEach(card => observer.observe(card));
}

/**
 * Side Navigation Dots Click Handler
 */
function initDotNavigation() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.getAttribute('data-target');
            const targetSec = document.getElementById(targetId);
            if (targetSec) {
                targetSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * 3D Event Flip Cards Interaction
 * Tapping or clicking any event card toggles its 3D flip to show/hide details.
 * Works repeatedly. Supports touch, click and keyboard navigation.
 */
function initEventCards() {
    const cards = document.querySelectorAll('.event-flip-card');
    cards.forEach(card => {
        // Click & Tap Interaction
        card.addEventListener('click', (e) => {
            // If user clicked on a link or button inside the card, do not flip
            if (e.target.closest('a') || e.target.closest('button')) return;
            card.classList.toggle('is-flipped');
        });

        // Keyboard Accessibility (Enter or Space to flip)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('is-flipped');
            }
        });
    });

    // Also support tapping the gentle hint below the card
    const hints = document.querySelectorAll('.event-flip-hint');
    hints.forEach(hint => {
        hint.addEventListener('click', () => {
            const card = hint.previousElementSibling;
            if (card && card.classList.contains('event-flip-card')) {
                card.classList.toggle('is-flipped');
            }
        });
    });
}
