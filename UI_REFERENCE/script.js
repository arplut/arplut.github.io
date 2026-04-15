document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
            navbar.classList.remove('py-2');
        } else {
            navbar.classList.remove('shadow-sm');
            navbar.classList.add('py-2');
        }
    });

    // ==========================================
    // 3D SCENE (Three.js)
    // ==========================================
    const initThreeJS = () => {
        const container = document.getElementById('canvas-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Create Particles (representing data points/citizens)
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 700;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            // Spread particles in a wide area
            posArray[i] = (Math.random() - 0.5) * 15;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Brand colors for particles
        const material = new THREE.PointsMaterial({
            size: 0.03,
            color: 0x22c55e, // Brand green
            transparent: true,
            opacity: 0.8,
        });

        // Create a mesh (Globe-like structure)
        const sphereGeometry = new THREE.SphereGeometry(3, 64, 64);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x16a34a,
            wireframe: true,
            transparent: true,
            opacity: 0.05
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        // Add some floating geometric shapes
        const geometry2 = new THREE.IcosahedronGeometry(1, 0);
        const material2 = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, wireframe: true, transparent: true, opacity: 0.2 });
        const shape = new THREE.Mesh(geometry2, material2);
        shape.position.set(3, 2, -2);
        scene.add(shape);

        camera.position.z = 5;

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX / window.innerWidth - 0.5;
            mouseY = event.clientY / window.innerHeight - 0.5;
        });

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.001;

            sphere.rotation.y -= 0.002;

            shape.rotation.x += 0.01;
            shape.rotation.y += 0.01;

            // Parallax effect
            particlesMesh.rotation.y += mouseX * 0.05;
            particlesMesh.rotation.x += mouseY * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        // Handle Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    initThreeJS();

    // ==========================================
    // GSAP ANIMATIONS
    // ==========================================

    // Hero Animations
    const heroTl = gsap.timeline();
    heroTl.from("#home h1", { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
        .from("#home p", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from("#home .flex a", { y: 20, opacity: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" }, "-=0.4")
        .from("#home .relative.rounded-2xl", { y: 100, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.4");

    // Feature Cards Stagger
    gsap.fromTo("#features .group",
        { y: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: "#features",
                start: "top 80%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all"
        }
    );

    // How It Works Steps
    gsap.fromTo(".grid-cols-1.md\\:grid-cols-4 > div",
        { y: 30, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".grid-cols-1.md\\:grid-cols-4",
                start: "top 75%",
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)",
            clearProps: "all"
        }
    );

    // Four Elements
    gsap.fromTo("#about .grid-cols-2 > div",
        { scale: 0.8, opacity: 0 },
        {
            scrollTrigger: {
                trigger: "#about",
                start: "top 70%",
            },
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all"
        }
    );


    // ==========================================
    // MAP & REPORTS
    // ==========================================

    // ==========================================
    // MAP & REPORTS
    // ==========================================

    // Mock Data for Reports (Updated based on user input)
    const reports = [
        {
            id: 1,
            type: 'Open Dump',
            location: 'Koramangala, Bengaluru, Karnataka',
            date: '1 day ago',
            status: 'pending',
            tags: ['open_dump'],
            lat: 12.9716,
            lng: 77.5946,
            description: 'Large pile of mixed waste dumped on roadside, causing foul odor and attracting stray animals',
            image: 'https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2Ff9MrlFVNO4WAdDcB1fs0FfQO4hq1%2FDSuqyqEy8EsarXV1QNhM%2FDSuqyqEy8EsarXV1QNhM.jpg?alt=media&token=4f746f51-aa35-4ef7-a7c1-7438a0d78816'
        },
        {
            id: 2,
            type: 'Construction Debris',
            location: 'Thimmaiah Road, Indiranagar, Bengaluru, Karnataka',
            date: '19 days ago',
            status: 'pending',
            tags: ['construction_debris'],
            lat: 12.9850,
            lng: 77.6000,
            description: 'Construction materials and debris blocking pedestrian pathway, including broken bricks and cement bags',
            image: 'https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2F4Cz24BAKBw3Xay2MMm2U%2F4Cz24BAKBw3Xay2MMm2U.jpg?alt=media&token=2da9986a-5849-48b1-9c63-b37aa29bc881'
        },
        {
            id: 3,
            type: 'Plant Waste',
            location: '8th A Main Road, Vasanthnagar, Bengaluru, Karnataka',
            date: '19 days ago',
            status: 'pending',
            tags: ['plant_waste'],
            lat: 12.9600,
            lng: 77.5800,
            description: 'Ambedkar Stadium, lot of litter and uncollected plant waste in back corner of the park',
            image: 'https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2FnnAA74Orikkva811hWhe%2FnnAA74Orikkva811hWhe.jpg?alt=media&token=0d161cc7-e0df-4ef4-af13-b9f4b7c7eb23'
        },
        {
            id: 4,
            type: 'Litter',
            location: 'HSR Layout Sector 1, Bengaluru, Karnataka',
            date: '1 month ago',
            status: 'pending',
            tags: ['littering'],
            lat: 12.9700,
            lng: 77.6100,
            description: 'Plastic bottles, food wrappers and other litter scattered at street corner near bus stop',
            image: 'https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FpSvdMPWh29cGxu3Mq1WCbVTMjh63%2FtnLrEBtDLTSpyMr7ummJ%2FtnLrEBtDLTSpyMr7ummJ.jpg?alt=media&token=f7b41591-3eba-4d29-a0cc-2959f55986c3'
        },
        {
            id: 5,
            type: 'Garbage Accumulation',
            location: 'Malleshwaram Park, Bengaluru, Karnataka',
            date: '3 months ago',
            status: 'pending',
            tags: ['garbage'],
            lat: 12.9906,
            lng: 77.5393,
            description: 'Park has no visible dustbin, leading to garbage accumulation. Visitors leaving trash on benches and pathways',
            image: 'https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/4Q0QUygXtx17Xxeqb21D/lat 12.990650875105773 long 77.53938680514693 1756010119609.jpg'
        },
        {
            id: 6,
            type: 'Garbage Blackspot',
            location: 'Rajajinagar 3rd Block, Bengaluru, Karnataka',
            date: '6 months ago',
            status: 'pending',
            tags: ['garbage'],
            lat: 12.9844,
            lng: 77.5550,
            description: 'Persistent garbage dumping spot with mixed waste including plastic, paper, and organic waste creating health hazard',
            image: 'https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/79oB43VDshuADbEvpQF4/lat 12.984468091039652 long 77.55500698462129 1747472716116.jpg'
        }
    ];

    // Initialize Leaflet Map
    // Start with a zoomed out view for the "Fly-in" effect
    const map = L.map('map', {
        zoomControl: false, // Hide default zoom control for cleaner look
        scrollWheelZoom: true // Enable scroll zoom
    }).setView([12.9716, 77.5946], 12); // Start at Bangalore level

    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Layer Group for Markers
    const markersLayer = L.layerGroup().addTo(map);

    // Custom Icon
    const createCustomIcon = (type) => {
        let color = '#ef4444'; // red default
        let iconClass = 'fa-trash-can';

        if (type === 'Construction Debris') {
            color = '#f59e0b'; // orange
            iconClass = 'fa-trowel-bricks';
        } else if (type === 'Burning Garbage') {
            color = '#dc2626'; // dark red
            iconClass = 'fa-fire';
        }

        return L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
                    <i class="fa-solid ${iconClass}" style="color: white; font-size: 14px;"></i>
                   </div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });
    };

    // Map Fly-in Animation using ScrollTrigger
    // Map Fly-in Animation removed for better UX on refresh
    // ScrollTrigger.create({ ... });


    // Helpers
    function getStatusColorHex(status) {
        if (status === 'verified') return '#16a34a'; // green-600
        if (status === 'resolved') return '#2563eb'; // blue-600
        return '#ef4444'; // red-500
    }

    function getStatusColor(status) {
        if (status === 'verified') return 'text-green-600';
        if (status === 'resolved') return 'text-blue-600';
        return 'text-yellow-600';
    }

    function getStatusBg(status) {
        if (status === 'verified') return 'bg-green-100 text-green-700';
        if (status === 'resolved') return 'bg-blue-100 text-blue-700';
        return 'bg-yellow-100 text-yellow-700';
    }

    // Filter functionality
    const reportsList = document.getElementById('reports-list');

    function renderReports(filterType = 'all') {
        reportsList.innerHTML = '';
        markersLayer.clearLayers(); // Clear existing markers

        const filteredReports = filterType === 'all'
            ? reports
            : reports.filter(report => {
                const filterMap = {
                    'garbage': ['garbage', 'open_dump', 'littering', 'plant_waste'],
                    'debris': ['construction_debris'],
                    'burning': ['burning']
                };
                return report.tags.some(tag => filterMap[filterType]?.includes(tag));
            });

        if (filteredReports.length === 0) {
            reportsList.innerHTML = '<div class="flex items-center justify-center h-32 text-slate-400">No reports found for this filter</div>';
            return;
        }

        filteredReports.forEach(report => {
            // Add Marker
            const marker = L.marker([report.lat, report.lng], {
                icon: createCustomIcon(report.type)
            }).addTo(markersLayer);

            const popupContent = `
                <div class="flex flex-col">
                    <div class="h-32 w-full bg-gray-200 relative">
                        <img src="${report.image}" class="w-full h-full object-cover" alt="${report.type}">
                        <div class="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-bold shadow-sm ${getStatusColor(report.status)}">
                            ${report.status.toUpperCase()}
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="font-bold text-slate-900 text-lg mb-1">${report.type}</h3>
                        <p class="text-slate-500 text-xs mb-2"><i class="fa-solid fa-location-dot mr-1"></i> ${report.location}</p>
                        <p class="text-slate-600 text-sm mb-3 line-clamp-2">${report.description || 'No description provided'}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-slate-400 text-xs">${report.date}</span>
                            <button class="text-brand-600 text-sm font-semibold hover:underline">View Details</button>
                        </div>
                    </div>
                </div>
            `;
            marker.bindPopup(popupContent);

            // Create List Item (Horizontal Card)
            const item = document.createElement('div');
            item.className = 'rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden report-card cursor-pointer hover:shadow-md transition-all hover:border-brand-200 group';

            const statusBg = getStatusBg(report.status);

            item.innerHTML = `
                <div class="flex h-full">
                    <div class="w-1/3 min-w-[120px] relative">
                        <img alt="${report.type}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" src="${report.image}">
                        <div class="absolute top-2 left-2">
                            <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-bold bg-white/90 backdrop-blur-sm shadow-sm text-slate-700">
                                <i class="fa-solid fa-camera"></i>
                            </span>
                        </div>
                    </div>
                    <div class="w-2/3 p-4 flex flex-col justify-between">
                        <div>
                            <div class="flex items-start justify-between mb-2">
                                <h3 class="font-bold text-slate-900 leading-tight group-hover:text-brand-600 transition-colors">${report.type}</h3>
                                <span class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusBg}">
                                    ${report.status}
                                </span>
                            </div>
                            
                            <p class="text-xs text-slate-500 mb-2 flex items-center gap-1">
                                <i class="fa-solid fa-location-dot text-brand-500"></i>
                                <span class="truncate">${report.location}</span>
                            </p>
                            
                            <p class="text-sm text-slate-600 line-clamp-2 mb-3 leading-relaxed">${report.description || 'No description provided'}</p>
                        </div>
                        
                        <div class="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                            <div class="flex items-center gap-3 text-xs text-slate-400">
                                <span class="flex items-center gap-1"><i class="fa-regular fa-clock"></i> ${report.date}</span>
                                <span class="flex items-center gap-1"><i class="fa-solid fa-thumbs-up"></i> 0</span>
                            </div>
                            <button class="text-xs font-bold text-brand-600 uppercase tracking-wider hover:text-brand-700 flex items-center gap-1">
                                Details <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            item.addEventListener('click', () => {
                map.flyTo([report.lat, report.lng], 16, {
                    animate: true,
                    duration: 1.5
                });
                marker.openPopup();
                if (window.innerWidth < 1024) {
                    document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });

            reportsList.appendChild(item);
        });
    }

    // Initial render
    renderReports('all');

    // Setup filter button event listeners
    const filterButtons = document.querySelectorAll('.flex.gap-2.overflow-x-auto span');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-brand-100', 'text-brand-700');
                btn.classList.add('bg-slate-100', 'text-slate-600');
            });

            // Add active class to clicked button
            button.classList.remove('bg-slate-100', 'text-slate-600');
            button.classList.add('bg-brand-100', 'text-brand-700');

            // Get filter type from data attribute
            const filterType = button.dataset.filter;
            console.log('Filtering by:', filterType);
            renderReports(filterType);
        });
    });

    // View Toggles (Mobile/Tablet mostly, or just visual preference)
    const btnMapView = document.getElementById('btn-map-view');
    const btnListView = document.getElementById('btn-list-view');

    if (btnMapView && btnListView) {
        btnMapView.addEventListener('click', () => {
            btnMapView.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
            btnMapView.classList.remove('text-slate-500');

            btnListView.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
            btnListView.classList.add('text-slate-500');
        });

        btnListView.addEventListener('click', () => {
            btnListView.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
            btnListView.classList.remove('text-slate-500');

            btnMapView.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
            btnMapView.classList.add('text-slate-500');
        });
    }
});
