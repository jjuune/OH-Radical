import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: 'radical' | 'h2o' | 'virus';
  alpha: number;
  pulseSpeed?: number;
  angle?: number;
}

export default function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 55;
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Helper: Generate a particle for Light Theme
    const createParticle = (x?: number, y?: number, typeOverride?: 'radical' | 'h2o' | 'virus'): Particle => {
      const types: ('radical' | 'h2o' | 'virus')[] = ['radical', 'h2o', 'radical', 'h2o', 'virus'];
      const type = typeOverride || types[Math.floor(Math.random() * types.length)];
      
      let color = '210, 80%, 45%'; // High contrast light blue
      let size = Math.random() * 3 + 2;

      if (type === 'radical') {
        color = '205, 85%, 45%'; // Royal Blue
        size = Math.random() * 4 + 3.5;
      } else if (type === 'h2o') {
        color = '185, 75%, 50%'; // Clear Aqua
        size = Math.random() * 3 + 1.5;
      } else if (type === 'virus') {
        color = '0, 65%, 55%'; // Muted Red (Pollution/Virus) for high visibility on light BG
        size = Math.random() * 6 + 5;
      }

      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size,
        color,
        type,
        alpha: Math.random() * 0.4 + 0.2,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        angle: Math.random() * Math.PI * 2,
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Light background space atmosphere
      ctx.fillStyle = 'rgba(248, 250, 252, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          
          if (p.type === 'virus') {
            // Repelled by mouse (sanitization field)
            p.x -= Math.cos(angle) * force * 1.8;
            p.y -= Math.sin(angle) * force * 1.8;
          } else {
            // Radical & Water molecules are attracted to mouse
            p.x += Math.cos(angle) * force * 1.0;
            p.y += Math.sin(angle) * force * 1.0;
          }
        }

        // Inter-particle Sanitization Collision (Radical + Virus = Clean H2O)
        if (p.type === 'radical') {
          particles.forEach((other) => {
            if (other.type === 'virus') {
              const odx = other.x - p.x;
              const ody = other.y - p.y;
              const odist = Math.sqrt(odx * odx + ody * ody);
              if (odist < p.size + other.size + 15) {
                // Collided! Instantly sanitize the virus
                // Create glowing splash effect (turn virus into clear H2O)
                other.type = 'h2o';
                other.color = '185, 75%, 50%';
                other.vx = (Math.random() - 0.5) * 1.2;
                other.vy = (Math.random() - 0.5) * 1.2;
                
                // Reposition radical to keep loop going
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
              }
            }
          });
        }

        // Pulse Alpha
        if (p.angle !== undefined && p.pulseSpeed !== undefined) {
          p.angle += p.pulseSpeed;
          p.alpha = 0.2 + Math.sin(p.angle) * 0.15;
        }

        // Render Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = p.type === 'radical' ? 8 : 0;
        ctx.shadowColor = p.type === 'radical' ? 'rgba(0, 112, 192, 0.4)' : 'transparent';
        ctx.fill();

        // Draw connections for nearby H2O & Radical particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p2.type !== 'virus' && p.type !== 'virus') {
            const cdx = p2.x - p.x;
            const cdy = p2.y - p.y;
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

            if (cdist < 110) {
              const alpha = (110 - cdist) / 110 * 0.06;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(0, 112, 192, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
