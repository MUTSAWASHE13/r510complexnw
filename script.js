document.addEventListener('DOMContentLoaded', () => {
    const MASTER_STORAGE_KEY = 'r510_master_data';
    
    // --- Default Data Structure with ALL stores and Hawkers info ---
    const defaultMasterData = {
        stores: [
           
            { id: 4, title: "R2 Shandis", description: "Shop R2. Contact: 076 310 6472", image: '' },
            { id: 5, title: "Eyespot Optometrist", description: "Shop R3. Specialist eye care and vision solutions. Contact: 064 538 5715", image: 'eye.jpeg' },
            { id: 6, title: "PATITSO FOOD PARLOR", description: "Shop R8. Delicious meals and takeaways. Contact: 074 968 9747", image: 'food.jpeg' },
            { id: 7, title: "Khumalo All In One Shop", description: "General retail and essentials. Contact: +27 82 577 6407", image: '' },
            { id: 1, title: "Glamorous Glow Fashion", description: "Shop L1. Style and trends for every occasion. Open 09:00 - 17:00. Contact: 078 348 1878", image: '' },
            { id: 2, title: "NDA & DAUGHTER BEAUTY SALON", description: "Shop R7. Full range of beauty and hair services. Contact: 063 679 5462", image: '' },
            { id: 3, title: "Marabasta Cellular", description: "Mobile phones, accessories, and repairs. Contact: 061 309 6882", image: '' },
            { id: 8, title: "FM Furnishers", description: "Store R6. Contact: +27790834250", image: 'furn.jpeg' },
            { id: 9, title: "TC Beauty", description: "Cosmetic Botique shop. STORE L6. Contact: +27791008068", image: 'cosmetic.jpeg' },
            { id:10, title: "We Clean Rite Laundry", description: "Open 07:30 - 17:30. Contact: +27799507851", image: '' },
            { id: 11, title: "Jeffin Services", description: "Open 07:30 - 17:30. Contact: +27 (82) 310-3815, +263794489081", image: '' }
        ],
        events: [
            { id: 101, title: "Grand Opening", date: "October 25, 2025", description: "We're thrilled to invite you to the Grand Opening of the R510 Shopping Complex!", image: 'r510.jpeg' },
            { id: 101, title: "★Grand Opening Space PROMO★", date: "October 25, 2025", description: "Vending space for the grand opening is R350★", image: 'r510.jpeg' }
            
        ],
        services: [
            { id: 205, title: "Hawker/Vending Space", description: "Space available for hawkers. R500 per store.", image: '★' }, 
            { id: 201, title: "Free Wi-Fi", description: "Available throughout the complex.", image: '★' },
            { id: 202, title: "Customer Service Office", description: "Located on room 7.", image: '★' },
            { id: 203, title: "Ample Parking", description: "Parking available.", image: '★' },
            { id: 204, title: "Restrooms", description: "Easily accessible.", image: '★' }
        ]
    };
    
    // Load data from localStorage
    let masterData = JSON.parse(localStorage.getItem(MASTER_STORAGE_KEY));
    if (!masterData) {
        // Initialize localStorage with defaults if it's empty
        localStorage.setItem(MASTER_STORAGE_KEY, JSON.stringify(defaultMasterData));
        masterData = defaultMasterData;
    }

    // --- Dynamic Render Functions ---

    const renderStores = () => {
        const container = document.querySelector('#stores .store-grid');
        if (!container) return;
        container.innerHTML = ''; 

        // Sort stores alphabetically by title
        masterData.stores.sort((a, b) => a.title.localeCompare(b.title)).forEach(store => {
            const storeCard = document.createElement('div');
            storeCard.className = 'store-card';
            
            // Add image if available
            const imageHTML = store.image 
                ? `<img src="${store.image}" alt="${store.title} image" style="width:100%; height:150px; object-fit:cover; margin-bottom:15px; border-radius:4px;">`
                : ''; 
            
            storeCard.innerHTML = `
                ${imageHTML}
                <h3>${store.title}</h3>
                <p>${store.description}</p>
                <a href="#" class="btn-link">View Store</a>
            `;
            container.appendChild(storeCard);
        });
    };

    const renderEvents = () => {
        const container = document.querySelector('#events .event-list');
        if (!container) return;
        container.innerHTML = ''; 

        masterData.events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            
            // Add image if available
            const imageHTML = event.image 
                ? `<img src="${event.image}" alt="${event.title} image" style="width:100%; height:120px; object-fit:cover; margin-bottom:15px; border-radius:4px;">`
                : ''; 

            eventItem.innerHTML = `
                ${imageHTML}
                <h3>${event.title}</h3>
                <p>Date: ${event.date}</p>
                <p>${event.description}</p>
                <a href="#" class="btn-link">Details</a>
            `;
            container.appendChild(eventItem);
        });
    };

    const renderServices = () => {
        const container = document.querySelector('#services .service-list ul');
        if (!container) return;
        container.innerHTML = '';

        masterData.services.forEach(service => {
            const serviceItem = document.createElement('li');
            
            // Image handling: if Base64, use an <img> tag. If '★' (default), use a <span>.
            let iconHTML = '';
            if (service.image.startsWith('data:')) {
                iconHTML = `<img src="${service.image}" alt="Service Icon" style="height:1em; width:1em; object-fit:contain; margin-right:10px;">`;
            } else {
                iconHTML = `<span class="gold-icon">${service.image}</span>`;
            }

            serviceItem.innerHTML = `${iconHTML} ${service.title} - ${service.description}`;
            container.appendChild(serviceItem);
        });
    };
    
    // Execute rendering to display all data
    renderStores();
    renderEvents();
    renderServices();
    // ----------------------------------------


    // --- Existing Navigation & Animation Logic ---
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll-based animation
    const sections = document.querySelectorAll('section');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });
});

