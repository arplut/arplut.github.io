import { useEffect, useRef } from 'react';

/**
 * Canvas-based particle animation matching the Three.js background from UI_REFERENCE/index.html.
 * 700 green brand-colored particles rotating slowly in 3D space with mouse parallax.
 */
const HeroParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouseX = 0;
    let mouseY = 0;
    let angle = 0;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();

    // 700 particles spread randomly in a sphere-like volume (matching Three.js spread of 15 units)
    const count = 700;
    const spread = Math.min(canvas.width, canvas.height) * 0.7;
    const particles = Array.from({ length: count }, () => ({
      ox: (Math.random() - 0.5) * spread,
      oy: (Math.random() - 0.5) * spread,
      oz: (Math.random() - 0.5) * spread,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    document.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      angle += 0.001;
      const rotY = angle + mouseX * 0.05;
      const rotX = 0.001 * (animId % 6283) + mouseY * 0.05; // slow X drift

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const cx = w / 2;
      const cy = h / 2;
      const fov = Math.max(w, h) * 0.8;

      for (const p of particles) {
        // Rotate around Y axis
        const x1 = p.ox * cosY + p.oz * sinY;
        const z1 = -p.ox * sinY + p.oz * cosY;
        // Rotate around X axis
        const y1 = p.oy * cosX - z1 * sinX;
        const z2 = p.oy * sinX + z1 * cosX;

        // Perspective projection
        const scale = fov / (fov + z2 + spread * 0.5);
        if (scale <= 0) continue;

        const sx = cx + x1 * scale;
        const sy = cy + y1 * scale;

        // Skip particles outside canvas
        if (sx < -4 || sx > w + 4 || sy < -4 || sy > h + 4) continue;

        const alpha = Math.min(0.85, scale * 0.7) * 0.7;
        const radius = Math.min(2.5, 1.5 * scale);

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,197,94,${alpha.toFixed(2)})`; // brand green #22c55e
        ctx.fill();
      }
    };

    animate();

    const onResize = () => { setSize(); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
      aria-hidden="true"
    />
  );
};

export default HeroParticles;
