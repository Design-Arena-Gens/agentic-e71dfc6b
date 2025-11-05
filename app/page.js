'use client';

import { useEffect, useRef } from 'react';
import styles from './page.module.css';

export default function Home() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation parameters
    let frame = 0;
    const animate = () => {
      frame++;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Clear with ambient background
      ctx.clearRect(0, 0, width, height);

      // Draw glowing particles around banana
      const particleCount = 40;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + frame * 0.01;
        const radius = 100 + Math.sin(frame * 0.02 + i) * 20;
        const x = width / 2 + Math.cos(angle) * radius;
        const y = height / 2 + Math.sin(angle) * radius;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
        gradient.addColorStop(0, 'rgba(255, 220, 100, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 220, 100, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x - 15, y - 15, 30, 30);
      }

      // Draw glass refraction effects
      ctx.save();
      ctx.translate(width / 2, height / 2);

      for (let i = 0; i < 3; i++) {
        ctx.rotate(0.002);
        const gradient = ctx.createRadialGradient(0, 0, 50 + i * 30, 0, 0, 150 + i * 30);
        gradient.addColorStop(0, `rgba(255, 230, 120, ${0.15 - i * 0.04})`);
        gradient.addColorStop(0.5, `rgba(255, 200, 80, ${0.08 - i * 0.02})`);
        gradient.addColorStop(1, 'rgba(255, 180, 60, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(-200, -100, 400, 200);
      }

      ctx.restore();

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.scene}>
        <div className={styles.spotlight}></div>

        <div className={styles.cuttingBoard}>
          <div className={styles.woodGrain}></div>
        </div>

        <div className={styles.banana}>
          <div className={styles.bananaInner}>
            <div className={styles.glowCore}></div>
            <div className={styles.highlight1}></div>
            <div className={styles.highlight2}></div>
            <div className={styles.highlight3}></div>
          </div>
          <div className={styles.reflection}></div>
        </div>

        <div className={styles.knifeContainer}>
          <div className={styles.knife}>
            <div className={styles.blade}>
              <div className={styles.bladeEdge}></div>
              <div className={styles.bladeGleam}></div>
            </div>
            <div className={styles.handle}></div>
          </div>
          <div className={styles.glove}>
            <div className={styles.thumb}></div>
            <div className={styles.fingers}></div>
          </div>
        </div>

        <div className={styles.ambientGlow}></div>
      </div>
    </div>
  );
}
