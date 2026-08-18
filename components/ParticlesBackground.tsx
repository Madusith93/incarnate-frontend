'use client';

import React, { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse position tracking for cursor glow effect
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let step = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position interpolation (Ease-out effect)
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // 1. Dynamic Cursor Spotlight Glow
      const radialGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        420
      );
      radialGlow.addColorStop(0, 'rgba(16, 185, 129, 0.15)'); // Emerald Accent
      radialGlow.addColorStop(0.5, 'rgba(20, 184, 166, 0.04)'); // Teal Ambient
      radialGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Animated Fluid Ribbon Waves
      step += 0.006;
      const linesCount = 6;

      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1.2;

        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
        gradient.addColorStop(
          0.5,
          `rgba(16, 185, 129, ${0.12 + (i % 2) * 0.08})`
        );
        gradient.addColorStop(1, 'rgba(20, 184, 166, 0)');
        ctx.strokeStyle = gradient;

        for (let x = 0; x < width; x += 20) {
          const y =
            height * 0.5 +
            Math.sin(x * 0.0025 + step + i * 0.7) * (40 + i * 10) +
            Math.cos(x * 0.0015 + step * 0.6) * 30 +
            (mouse.y - height / 2) * 0.06 * ((i + 1) / linesCount);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80 dark:opacity-100 transition-opacity"
    />
  );
}