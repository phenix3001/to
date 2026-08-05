import type { CSSProperties } from 'react';
import { suitcaseWearLabels } from '../lib/suitcases';
import type { SuitcaseConfig } from '../lib/suitcases';
import '../styles/luggage-wear.css';
import '../styles/suitcase-model.css';

interface ThumbnailStyle extends CSSProperties {
  '--face-color': string;
  '--case-accent': string;
  '--case-edge': string;
  '--case-hardware': string;
  '--thumbnail-height': string;
}

export interface SuitcaseThumbnailProps {
  suitcase: SuitcaseConfig;
  size?: number;
  className?: string;
  label?: string;
}

export function SuitcaseThumbnail({
  suitcase,
  size = 88,
  className = '',
  label,
}: SuitcaseThumbnailProps) {
  const accessibleLabel = label
    ?? `${suitcase.label.ru}, ${suitcaseWearLabels[suitcase.wear].ru}`;
  const front = suitcase.faces[0];
  const ratio = suitcase.dimensions.width / suitcase.dimensions.height;
  const style: ThumbnailStyle = {
    '--face-color': suitcase.colors.shell,
    '--case-accent': suitcase.colors.accent,
    '--case-edge': suitcase.colors.edge,
    '--case-hardware': suitcase.colors.hardware,
    '--thumbnail-height': `${size}px`,
    width: `${Math.round(size * ratio)}px`,
  };

  return (
    <div
      className={`suitcase-thumbnail ${className}`.trim()}
      data-detail={front.detail}
      data-pattern={front.pattern}
      data-trim={suitcase.trim}
      data-wear={suitcase.wear}
      role="img"
      aria-label={accessibleLabel}
      style={style}
    >
      <span className="suitcase-model__feature feature-a" />
      <span className="suitcase-model__feature feature-b" />
      <span className="suitcase-model__feature feature-c" />
    </div>
  );
}
