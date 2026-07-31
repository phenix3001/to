import { CSSProperties, useEffect, useMemo, useState } from 'react';

interface AtmosphereStyle extends CSSProperties {
  '--light-x': string;
  '--light-y': string;
}

interface ParticleStyle extends CSSProperties {
  '--dust-drift-x': string;
  '--dust-drift-y': string;
  '--dust-rotation': string;
}

export function AnimatedAtmosphere() {
  const [isLampFlickering, setIsLampFlickering] = useState(false);

  const scene = useMemo(() => {
    const particleCount = 52 + Math.floor(Math.random() * 14);
    const particles = Array.from({ length: particleCount }, (_, index) => {
      const directionRoll = Math.random();
      const direction = directionRoll < .35 ? 'fall' : directionRoll < .82 ? 'rise' : 'side';
      const isFalling = direction === 'fall';
      const isSideways = direction === 'side';

      return {
        id: index,
        direction,
        left: `${Math.round(Math.random() * 100)}%`,
        top: isFalling
          ? `${-5 + Math.round(Math.random() * 42)}%`
          : `${55 + Math.round(Math.random() * 43)}%`,
        size: .8 + Math.random() * 3.2,
        duration: 3 + Math.random() * 5.5,
        delay: -(Math.random() * 9),
        driftX: isSideways
          ? (Math.random() > .5 ? 1 : -1) * (90 + Math.random() * 150)
          : -55 + Math.random() * 110,
        driftY: isFalling
          ? 110 + Math.random() * 190
          : -(isSideways ? 15 + Math.random() * 55 : 55 + Math.random() * 130),
        rotation: -120 + Math.random() * 240,
      };
    });

    return {
      particles,
      lightX: `${12 + Math.round(Math.random() * 18)}%`,
      lightY: `${62 + Math.round(Math.random() * 15)}%`,
      delay: -(Math.random() * 4),
    };
  }, []);

  const atmosphereStyle: AtmosphereStyle = {
    '--light-x': scene.lightX,
    '--light-y': scene.lightY,
    animationDelay: `${scene.delay}s`,
  };

  useEffect(() => {
    let flickerTimeout: number | undefined;
    const flickerInterval = window.setInterval(() => {
      if (Math.random() >= .4) return;

      setIsLampFlickering(false);
      window.requestAnimationFrame(() => setIsLampFlickering(true));
      flickerTimeout = window.setTimeout(() => setIsLampFlickering(false), 1100);
    }, 8500);

    return () => {
      window.clearInterval(flickerInterval);
      if (flickerTimeout !== undefined) window.clearTimeout(flickerTimeout);
    };
  }, []);

  return (
    <div
      className={`home-menu__atmosphere${isLampFlickering ? ' is-lamp-flickering' : ''}`}
      style={atmosphereStyle}
      aria-hidden="true"
    >
      {scene.particles.map((particle) => {
        const style: ParticleStyle = {
          left: particle.left,
          top: particle.top,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          animationDuration: `${particle.duration}s`,
          animationDelay: `${particle.delay}s`,
          '--dust-drift-x': `${particle.driftX}px`,
          '--dust-drift-y': `${particle.driftY}px`,
          '--dust-rotation': `${particle.rotation}deg`,
        };

        return (
          <span
            className={`atmosphere-particle atmosphere-particle--${particle.direction}`}
            style={style}
            key={particle.id}
          />
        );
      })}
    </div>
  );
}
