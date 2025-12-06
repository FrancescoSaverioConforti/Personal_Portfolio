import { useEffect, useRef } from "react";

const NeuralBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let particles = [];
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove);

        class Particle {
            constructor() {
                this.reset();
                this.baseX = this.x;
                this.baseY = this.y;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 3 + 1;
                this.depth = Math.random();
                this.baseSize = this.size;
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.pulseSpeed = 0.001 + Math.random() * 0.002;

                const colorVariant = Math.random();
                if (colorVariant < 0.3) {
                    this.hue = 190; // Cyan
                } else if (colorVariant < 0.6) {
                    this.hue = 220; // Blue
                } else {
                    this.hue = 290; // Magenta
                }
                this.saturation = 80 + Math.random() * 20;
                this.lightness = 50 + Math.random() * 20;
            }

            update(currentTime) {
                const dx = mouseRef.current.x - this.x;
                const dy = mouseRef.current.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 200;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * force * 5;
                    this.y -= Math.sin(angle) * force * 5;
                } else {
                    this.x += (this.baseX - this.x) * 0.03;
                    this.y += (this.baseY - this.y) * 0.03;
                }

                this.baseX += this.vx;
                this.baseY += this.vy;

                if (this.baseX < 0 || this.baseX > canvas.width) this.vx *= -1;
                if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1;

                const pulse = Math.sin(currentTime * this.pulseSpeed + this.pulsePhase);
                this.size = this.baseSize * (1 + pulse * 0.5);
            }

            draw(currentTime) {
                ctx.save();

                const pulse = Math.sin(currentTime * this.pulseSpeed + this.pulsePhase);
                const alpha = 0.7 + pulse * 0.3;

                // Multi-layer glow
                const glowSize = this.size * (2 + this.depth);
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, glowSize
                );

                gradient.addColorStop(0, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${alpha})`);
                gradient.addColorStop(0.4, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${alpha * 0.5})`);
                gradient.addColorStop(1, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
                ctx.fill();

                // Core
                ctx.fillStyle = `hsla(${this.hue}, 100%, 80%, ${alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(Math.floor(window.innerWidth / 8), 100);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const drawConnections = (currentTime) => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 100;

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.6;

                        ctx.save();

                        // Animated gradient
                        const gradient = ctx.createLinearGradient(
                            particles[i].x, particles[i].y,
                            particles[j].x, particles[j].y
                        );

                        const offset = (currentTime * 0.0005) % 1;
                        gradient.addColorStop(0, `hsla(190, 100%, 60%, ${opacity})`);
                        gradient.addColorStop(offset, `hsla(220, 100%, 70%, ${opacity * 1.5})`);
                        gradient.addColorStop(1, `hsla(290, 100%, 65%, ${opacity})`);

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 2;
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = `hsla(200, 100%, 60%, ${opacity})`;

                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();

                        // Energy pulses
                        const pulsePos = (currentTime * 0.001) % 1;
                        const pulseX = particles[i].x + (particles[j].x - particles[i].x) * pulsePos;
                        const pulseY = particles[i].y + (particles[j].y - particles[i].y) * pulsePos;

                        const pulseGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 8);
                        pulseGradient.addColorStop(0, `hsla(180, 100%, 70%, ${opacity * 2})`);
                        pulseGradient.addColorStop(1, `hsla(180, 100%, 70%, 0)`);

                        ctx.fillStyle = pulseGradient;
                        ctx.beginPath();
                        ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.restore();
                    }
                }
            }
        };

        const animate = (timestamp) => {
            time = timestamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dynamic background
            const bgGradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width * 0.8
            );
            bgGradient.addColorStop(0, "#0a0a1f");
            bgGradient.addColorStop(0.5, "#050510");
            bgGradient.addColorStop(1, "#000000");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawConnections(time);

            particles.forEach((particle) => {
                particle.update(time);
                particle.draw(time);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        initParticles();
        animate(0);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
            style={{ pointerEvents: "none" }}
        />
    );
};

export default NeuralBackground;
