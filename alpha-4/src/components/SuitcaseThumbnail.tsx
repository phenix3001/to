import { CSSProperties } from 'react';
import { SuitcaseConfig } from '../lib/suitcases';
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
      role="img"
      aria-label={label ?? suitcase.label.ru}
      style={style}
    >
      <span className="suitcase-model__feature feature-a" />
      <span className="suitcase-model__feature feature-b" />
      <span className="suitcase-model__feature feature-c" />
    </div>
  );
}
