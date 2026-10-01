/**
 * 716QX Lounge OS 3.5 — Apex Edition
 * High-Performance Hardware-Accelerated 3D Space Canvas Engine
 * Locked 60 FPS | Dynamic Parallax | Perspective Depth Field
 */

(function () {
    'use strict';

    class SpaceEngine {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) return;

            this.ctx = this.canvas.getContext('2d', { alpha: true, desynchronized: true });
            if (!this.ctx) return;

            this.width = 0;
            this.height = 0;
            this.dpr = Math.min(window.devicePixelRatio || 1, 2);

            this.focalLength = 650;
            this.starCount = 55;
            this.stars = [];
            this.meteors = [];
            this.lastMeteorTime = 0;

            this.mouse = { x: 0, y: 0 };
            this.targetMouse = { x: 0, y: 0 };
            this.isRunning = false;
            this.animationFrameId = null;

            this.init();
        }

        init() {
            try {
                this.resize();
                this.mouse.x = this.width / 2;
                this.mouse.y = this.height / 2;
                this.targetMouse.x = this.width / 2;
                this.targetMouse.y = this.height / 2;

                this.initStars();
                this.bindEvents();
                this.start();
            } catch (err) {
                console.error('[3D-Space Engine] Initialization Failure:', err);
            }
        }

        bindEvents() {
            window.addEventListener('resize', () => this.resize(), { passive: true });

            window.addEventListener('pointermove', (e) => {
                this.targetMouse.x = e.clientX;
                this.targetMouse.y = e.clientY;
            }, { passive: true });

            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.stop();
                } else {
                    this.start();
                }
            });
        }

        resize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width * this.dpr;
            this.canvas.height = this.height * this.dpr;
            this.ctx.scale(this.dpr, this.dpr);
        }

        initStars() {
            this.stars = Array.from({ length: this.starCount }, () => ({
                x: (Math.random() - 0.5) * 1800,
                y: (Math.random() - 0.5) * 1100,
                z: Math.random() * 900 + 80,
                dx: (Math.random() - 0.5) * 0.22,
                dy: (Math.random() - 0.5) * 0.22,
                dz: (Math.random() - 0.5) * 0.85,
                radius: Math.random() * 2.2 + 0.8,
                pulse: Math.random() * Math.PI * 2
            }));
        }

        spawnMeteor() {
            const startX = Math.random() * this.width * 1.2;
            const startY = -40;
            const length = Math.random() * 120 + 80;
            const speed = Math.random() * 9 + 11;
            const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;

            this.meteors.push({
                x: startX,
                y: startY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                length: length,
                alpha: 1,
                decay: Math.random() * 0.015 + 0.01
            });
        }

        drawPolygon(x, y, radius, sides, rotation, strokeStyle, alpha) {
            const ctx = this.ctx;
            ctx.beginPath();
            for (let i = 0; i <= sides; i++) {
                const angle = rotation + (i * Math.PI * 2) / sides;
                const px = x + Math.cos(angle) * radius;
                const py = y + Math.sin(angle) * radius;
                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }
            ctx.closePath();
            ctx.strokeStyle = strokeStyle.replace('ALPHA', alpha.toFixed(3));
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        render(timestamp) {
            if (!this.isRunning) return;

            const ctx = this.ctx;
            ctx.clearRect(0, 0, this.width, this.height);

            // Smooth Mouse Interpolation (Parallax LERP)
            this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.045;
            this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.045;

            const t = timestamp * 0.00025;
            const offsetX = (this.mouse.x / this.width - 0.5) * 26;
            const offsetY = (this.mouse.y / this.height - 0.5) * 18;
            const centerX = this.width * 0.5 + offsetX * 3.8;
            const centerY = this.height * 0.38 + offsetY * 2.8;

            // 1. Cyber Orbital Ellipses (Central Core Projection)
            for (let i = 0; i < 4; i++) {
                const scaleFactor = 1 + i * 0.36;
                const radius = 54 * scaleFactor;
                const ringOffset = centerY + Math.sin(t * 2 + i) * 10 * scaleFactor;
                const rot = t * (i % 2 === 0 ? 0.35 : -0.45);

                ctx.save();
                ctx.translate(centerX, ringOffset);
                ctx.rotate(rot);

                ctx.beginPath();
                ctx.ellipse(0, 0, radius, radius * 0.34, 0, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(6, 182, 212, ${(0.16 - i * 0.025).toFixed(3)})`;
                ctx.lineWidth = i === 0 ? 1.4 : 0.8;
                ctx.stroke();

                ctx.restore();
            }

            // 2. Orbital Constellation Nodes & Connecting Laser Lattice
            const nodeCount = 9;
            for (let i = 0; i < nodeCount; i++) {
                const angle = t * 0.7 + (i / nodeCount) * Math.PI * 2;
                const dist = 175 + (i % 3) * 48;
                const distortion = 0.72 + (i % 4) * 0.08;

                const nodeX = centerX + Math.cos(angle) * dist * distortion;
                const nodeY = centerY + Math.sin(angle) * dist * 0.34 * distortion;
                const hexRadius = 10 + (i % 3) * 4;

                this.drawPolygon(nodeX, nodeY, hexRadius, 6, -angle, 'rgba(139, 92, 246, ALPHA)', 0.26 - i * 0.012);

                // Laser connection back to the core
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(nodeX, nodeY);
                ctx.strokeStyle = `rgba(139, 92, 246, ${(0.035 + (i % 2) * 0.018).toFixed(3)})`;
                ctx.lineWidth = 0.65;
                ctx.stroke();
            }

            // 3. 3D Projected Starfield
            for (let i = 0; i < this.stars.length; i++) {
                const star = this.stars[i];

                star.x += star.dx;
                star.y += star.dy;
                star.z += star.dz;
                star.pulse += 0.02;

                if (star.x < -900 || star.x > 900) star.dx *= -1;
                if (star.y < -550 || star.y > 550) star.dy *= -1;
                if (star.z < 70 || star.z > 1000) star.dz *= -1;

                const k = this.focalLength / (this.focalLength + star.z);
                const projX = this.width / 2 + (star.x + offsetX * (1 - k)) * k;
                const projY = this.height / 2 + (star.y + offsetY * (1 - k)) * k;
                const projRadius = Math.max(0.4, star.radius * k * 1.6);
                const twinkle = Math.sin(star.pulse) * 0.15;
                const alpha = Math.min(1, Math.max(0.1, (1 - star.z / 1000) * 0.65 + twinkle));

                ctx.beginPath();
                ctx.arc(projX, projY, projRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 92, 246, ${alpha.toFixed(3)})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(6, 182, 212, 0.5)';
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // 4. Subtle Meteor Streaks
            if (timestamp - this.lastMeteorTime > 4500 && Math.random() < 0.35) {
                this.spawnMeteor();
                this.lastMeteorTime = timestamp;
            }

            for (let i = this.meteors.length - 1; i >= 0; i--) {
                const m = this.meteors[i];
                m.x += m.vx;
                m.y += m.vy;
                m.alpha -= m.decay;

                if (m.alpha <= 0 || m.x > this.width + 100 || m.y > this.height + 100) {
                    this.meteors.splice(i, 1);
                    continue;
                }

                const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.length;
                const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.length;

                const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
                grad.addColorStop(0, `rgba(6, 182, 212, ${(m.alpha * 0.85).toFixed(3)})`);
                grad.addColorStop(0.3, `rgba(139, 92, 246, ${(m.alpha * 0.4).toFixed(3)})`);
                grad.addColorStop(1, 'rgba(139, 92, 246, 0)');

                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(tailX, tailY);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }

            this.animationFrameId = requestAnimationFrame((ts) => this.render(ts));
        }

        start() {
            if (this.isRunning) return;
            this.isRunning = true;
            this.animationFrameId = requestAnimationFrame((ts) => this.render(ts));
        }

        stop() {
            this.isRunning = false;
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
        }
    }

    // Safe Engine Bootstrap
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.spaceEngineInstance = new SpaceEngine('interactive-canvas');
        });
    } else {
        window.spaceEngineInstance = new SpaceEngine('interactive-canvas');
    }
})();
