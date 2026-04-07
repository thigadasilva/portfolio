(() => {
    const canvas = document.getElementById('starfield-canvas');
    const ctx = canvas.getContext('2d');

    let stars = [];
    let animationId;

    // Layer configurations
    const LAYERS = [
        { count: 180, minSize: 0.3, maxSize: 0.7, minAlpha: 0.15, maxAlpha: 0.45, speed: 0.0004 }, // base: many small, faint
        { count: 60,  minSize: 0.7, maxSize: 1.2, minAlpha: 0.35, maxAlpha: 0.65, speed: 0.0006 }, // mid: fewer, medium
        { count: 18,  minSize: 1.2, maxSize: 2.0, minAlpha: 0.55, maxAlpha: 0.90, speed: 0.0008 }, // top: few, bright with glow
    ];

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function buildStars() {
        stars = [];
        const w = canvas.width;
        const h = canvas.height;
        LAYERS.forEach((layer, layerIdx) => {
            for (let i = 0; i < layer.count; i++) {
                stars.push({
                    x: rand(0, w),
                    y: rand(0, h),
                    size: rand(layer.minSize, layer.maxSize),
                    baseAlpha: rand(layer.minAlpha, layer.maxAlpha),
                    alpha: rand(layer.minAlpha, layer.maxAlpha),
                    // twinkle offset so they're all out-of-phase
                    phase: rand(0, Math.PI * 2),
                    speed: layer.speed * rand(0.5, 1.5),
                    layerIdx,
                });
            }
        });
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        buildStars();
    }

    function draw(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            // Subtle twinkle
            star.alpha = star.baseAlpha + Math.sin(timestamp * star.speed + star.phase) * (star.baseAlpha * 0.4);
            star.alpha = Math.max(0.05, Math.min(1, star.alpha));

            ctx.save();
            // Glow only for top-layer stars
            if (star.layerIdx === 2) {
                ctx.shadowBlur = star.size * 6;
                ctx.shadowColor = `rgba(200, 220, 255, ${star.alpha * 0.6})`;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220, 230, 255, ${star.alpha})`;
            ctx.fill();
            ctx.restore();
        });

        animationId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animationId);
        resize();
        animationId = requestAnimationFrame(draw);
    });

    resize();
    animationId = requestAnimationFrame(draw);
})();
