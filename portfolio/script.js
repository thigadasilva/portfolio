// Preloader
window.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const loadingBar = document.querySelector('.loading-bar');
    
    if (preloader && loadingBar) {
        let progress = 0;
        
        // Simular o progresso do carregamento
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 8) + 3; // incrementos aleatórios
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                loadingBar.style.width = `${progress}%`;
                
                // Aguarda um pequeno delay ao chegar em 100% para sumir com o preloader
                setTimeout(() => {
                    preloader.classList.add('preloader-hidden');
                    
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500); // 500ms é o tempo da transição no CSS
                }, 300);
            } else {
                loadingBar.style.width = `${progress}%`;
            }
        }, 30);
    }
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const bars = document.querySelectorAll('.mobile-menu-btn .bar');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active-mobile-menu');
        
        // Simple hamburger to X animation
        if (navLinks.classList.contains('active-mobile-menu')) {
            bars[0].style.transform = 'translateY(8px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Subtle parallax effect on background based on mouse movement
document.addEventListener('mousemove', (e) => {
    const bgElements = document.querySelector('.background-elements');
    
    // Calculate offset based on mouse proximity to center
    // Division by 60 for a very subtle, smooth effect
    const x = (window.innerWidth / 2 - e.clientX) / 100;
    const y = (window.innerHeight / 2 - e.clientY) / 100;
    
    if (bgElements) {
        bgElements.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// Project Card Interaction
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});

// Smooth scroll for anchor links

// --- Stylized Glowing Abstract Diamond (No Background) ---
function init3DScene() {
    const container = document.getElementById('3d-scene-container');
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7); // Centered camera

    // Alpha: true with NO PostProcessing guarantees a 100% transparent background!
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0); // Pure transparent
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const diamondGroup = new THREE.Group();
    // Alinhando o diamante à linha inferior da palavra "Você"
    diamondGroup.position.y = 0.45;
    scene.add(diamondGroup);

    // --- Abstract Diamond Geometry (Brilliant Cut) ---
    // Perfect, mathematically sharp diamond facets instead of a long prism
    const lathePoints = [
        new THREE.Vector2(0, -1.0),      // Culet (ponta inferior)
        new THREE.Vector2(1.3, 0.1),     // Pavilion angle (base do cinto horizontal)
        new THREE.Vector2(1.3, 0.2),     // Girdle (topo do cinto horizontal)
        new THREE.Vector2(0.75, 0.65),   // Crown angle (borda da face superior plana)
        new THREE.Vector2(0, 0.65)       // Table (centro do topo plano)
    ];
    // 16 segmentos entrega o detalhamento exato da imagem enviada
    let geo = new THREE.LatheGeometry(lathePoints, 16);
    geo = geo.toNonIndexed(); // Apply flat facets
    geo.computeVertexNormals();

    // Stylized glowing material (No realistic physics)
    const mat = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,       // Deep purple base
        emissive: 0x4c1d95,    // Glowing core
        emissiveIntensity: 0.6, 
        roughness: 0.2,        
        metalness: 0.8,        // Sharp highlights on the cuts
        flatShading: true,
        transparent: true,
        opacity: 0.95          // Very slight glass feel
    });

    const diamond = new THREE.Mesh(geo, mat);
    diamond.scale.set(1.2, 1.2, 1.2); // Escala refinada para as novas dimensões grandes
    diamondGroup.add(diamond);

    // --- Fake Bloom / Glow Aura (Natively transparent) ---
    // (Aura removida a pedido do usuário)

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Rim light for sharp styling
    const rimLight = new THREE.DirectionalLight(0xffbbf2, 3.0);
    rimLight.position.set(5, 5, -5);
    scene.add(rimLight);

    // Purple fill light
    const fillLight = new THREE.DirectionalLight(0x7c3aed, 2.0);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    const pointLight = new THREE.PointLight(0xa855f7, 5.0, 10);
    pointLight.position.set(0, -3, 0);
    scene.add(pointLight);

    const clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        const time = clock.getElapsedTime();
        
        // ONLY rotating the diamond (removed up/down floating and tilting)
        diamondGroup.rotation.y = time * 0.2;
        
        renderer.render(scene, camera);
    }
    
    animate();

    window.addEventListener('resize', () => {
        if (!container.clientWidth || !container.clientHeight) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
}

// Ensure the Three.js is loaded, then init scene
window.addEventListener('load', () => {
    setTimeout(init3DScene, 100);
});
