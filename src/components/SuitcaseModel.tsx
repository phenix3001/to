import { CSSProperties } from 'react';
import {
  SuitcaseConfig,
  SuitcaseFaceConfig,
  SuitcaseFaceIndex,
  SuitcaseTone,
} from '../lib/suitcases';
import '../styles/suitcase-model.css';

const faceRotations: Record<SuitcaseFaceIndex, string> = {
  0: 'rotateX(-7deg) rotateY(0deg)',
  1: 'rotateX(-7deg) rotateY(-90deg)',
  2: 'rotateX(-7deg) rotateY(-180deg)',
  3: 'rotateX(-7deg) rotateY(-270deg)',
  4: 'rotateX(-90deg) rotateY(0deg)',
  5: 'rotateX(90deg) rotateY(0deg)',
};

interface ModelStyle extends CSSProperties {
  '--case-width': string;
  '--case-height': string;
  '--case-depth': string;
  '--case-edge': string;
  '--case-hardware': string;
  '--case-rotation': string;
}

interface FaceStyle extends CSSProperties {
  '--face-color': string;
  '--case-accent': string;
}

export interface SuitcaseModelProps {
  suitcase: SuitcaseConfig;
  face: SuitcaseFaceIndex;
  className?: string;
  label?: string;
}

function faceColor(suitcase: SuitcaseConfig, tone: SuitcaseTone) {
  return suitcase.colors[tone];
}

function SuitcaseFace({
  face,
  suitcase,
}: {
  face: SuitcaseFaceConfig;
  suitcase: SuitcaseConfig;
}) {
  const style: FaceStyle = {
    '--face-color': faceColor(suitcase, face.tone),
    '--case-accent': suitcase.colors.accent,
  };

  return (
    <div
      className={`suitcase-model__face suitcase-model__face--${face.name}`}
      data-detail={face.detail}
      data-pattern={face.pattern}
      style={style}
    >
      <span className="suitcase-model__feature feature-a" />
      <span className="suitcase-model__feature feature-b" />
      <span className="suitcase-model__feature feature-c" />
    </div>
  );
}

export function SuitcaseModel({
  suitcase,
  face,
  className = '',
  label,
}: SuitcaseModelProps) {
  const { width, height, depth } = suitcase.dimensions;
  const style: ModelStyle = {
    '--case-width': `${width}px`,
    '--case-height': `${height}px`,
    '--case-depth': `${depth}px`,
    '--case-edge': suitcase.colors.edge,
    '--case-hardware': suitcase.colors.hardware,
    '--case-rotation': faceRotations[face],
  };

  return (
    <div
      className={`suitcase-model ${className}`.trim()}
      data-trim={suitcase.trim}
      role="img"
      aria-label={label ?? suitcase.label.ru}
      style={style}
    >
      <div className="suitcase-model__body">
        {suitcase.faces.map((faceConfig) => (
          <SuitcaseFace
            key={faceConfig.name}
            face={faceConfig}
            suitcase={suitcase}
          />
        ))}
      </div>
    </div>
  );
}
