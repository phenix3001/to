import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { usePrefersReducedMotion } from '../lib/reducedMotion';
import '../styles/warehouse-atmosphere.css';

type WarehouseEvent = 'shadow' | 'steam';

interface DustStyle extends CSSProperties {
  '--dust-drift': string;
}

const EVENTS: WarehouseEvent[] = ['shadow', 'steam'];
const EVENT_DURATION: Record<WarehouseEvent, number> = {
  shadow: 2900,
  steam: 3400,
};

export function WarehouseAtmosphere() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeEvent, setActiveEvent] = useState<WarehouseEvent | null>(null);

  const dust = useMemo(() => Array.from({ length: 18 }, (_, id) => ({
    id,
    left: `${6 + Math.random() * 88}%`,
    top: `${8 + Math.random() * 82}%`,
    size: 1 + Math.random() * 2.4,
    duration: 8 + Math.random() * 10,
    delay: -(Math.random() * 14),
    drift: `${-32 + Math.random() * 64}px`,
  })), []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveEvent(null);
      return undefined;
    }

    let eventIndex = 0;
    let eventTimer: number | undefined;
    let pauseTimer: number | undefined;

    const runNextEvent = () => {
      const nextEvent = EVENTS[eventIndex % EVENTS.length];
      eventIndex += 1;
      setActiveEvent(nextEvent);

      eventTimer = window.setTimeout(() => {
        setActiveEvent(null);
        pauseTimer = window.setTimeout(runNextEvent, 3500 + Math.random() * 3500);
      }, EVENT_DURATION[nextEvent]);
    };

    pauseTimer = window.setTimeout(runNextEvent, 1800);

    return () => {
      if (eventTimer !== undefined) window.clearTimeout(eventTimer);
      if (pauseTimer !== undefined) window.clearTimeout(pauseTimer);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className={`warehouse-atmosphere${activeEvent ? ` event-${activeEvent}` : ''}`}
      aria-hidden="true"
    >
      <div className="warehouse-atmosphere__light" />
      <div className="warehouse-atmosphere__shadow" />
      <div className="warehouse-atmosphere__steam">
        <span />
        <span />
        <span />
      </div>
      <div className="warehouse-atmosphere__dust">
        {dust.map((particle) => {
          const style: DustStyle = {
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            '--dust-drift': particle.drift,
          };

          return <span key={particle.id} style={style} />;
        })}
      </div>
    </div>
  );
}
