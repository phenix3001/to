import {
  KeyboardEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import { Language } from '../lib/i18n';
import { usePrefersReducedMotion } from '../lib/reducedMotion';
import { RealSuitcase } from '../lib/realSuitcases';
import { hasWebGLSupport } from '../lib/webgl';
import { LuggageContents } from './LuggageContents';
import '../styles/luggage-opening.css';
import '../styles/luggage-split.css';

interface SuitcaseViewerProps {
  isOpen: boolean;
  language: Language;
  number: number;
  contentsId: string;
  suitcase: RealSuitcase;
  title: string;
  view: '3d' | '2d';
}

interface ViewerMaterial {
  pbrMetallicRoughness: {
    setBaseColorFactor: (color: string) => void;
  };
}

interface ViewerElement extends HTMLElement {
  animationName: string;
  currentTime: number;
  model?: { materials: ViewerMaterial[] };
  pause?: () => void;
  play?: (options?: { repetitions?: number }) => void;
}

type SuitcaseAxis = 'x' | 'y' | 'z';
type AxisDirection = 'positive' | 'negative';

const axisOrbits: Record<SuitcaseAxis, Record<AxisDirection, string>> = {
  x: { positive: '90deg 90deg auto', negative: '-90deg 90deg auto' },
  y: { positive: '0deg 1deg auto', negative: '0deg 179deg auto' },
  z: { positive: '0deg 90deg auto', negative: '180deg 90deg auto' },
};

export function SuitcaseViewer({
  isOpen,
  language,
  number,
  contentsId,
  suitcase,
  title,
  view,
}: SuitcaseViewerProps) {
  const modelRef = useRef<ViewerElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [axis, setAxis] = useState<SuitcaseAxis>('z');
  const [direction, setDirection] = useState<AxisDirection>('positive');
  const prefersReducedMotion = usePrefersReducedMotion();
  const showModel = view === '3d' && hasWebGLSupport();
  const canUseNativeAnimation = Boolean(
    suitcase.animations
    && showModel
    && !prefersReducedMotion,
  );

  useEffect(() => {
    if (hasWebGLSupport()) void import('@google/model-viewer');
  }, []);

  const playNativeAnimation = useCallback(() => {
    const viewer = modelRef.current;
    if (
      !viewer
      || typeof viewer.play !== 'function'
      || !suitcase.animations
      || !canUseNativeAnimation
    ) {
      viewer?.pause?.();
      return;
    }
    viewer.animationName = isOpen
      ? suitcase.animations.open
      : suitcase.animations.close;
    viewer.currentTime = 0;
    viewer.play({ repetitions: 1 });
  }, [canUseNativeAnimation, isOpen, suitcase.animations]);

  useEffect(() => {
    playNativeAnimation();
  }, [playNativeAnimation]);

  function handleModelLoad() {
    if (suitcase.tint) {
      modelRef.current?.model?.materials.forEach((material) => {
        material.pbrMetallicRoughness.setBaseColorFactor(suitcase.tint!);
      });
    }
    playNativeAnimation();
  }

  function openingStyle() {
    if (/(backpack|hiking-pack)/.test(suitcase.id)) return 'opens-flap';
    if (/(bag|purse|tote)/.test(suitcase.id)) return 'opens-zipper';
    return 'opens-hinged';
  }

  function chooseAxis(nextAxis: SuitcaseAxis) {
    if (nextAxis === axis) {
      setDirection((current) =>
        current === 'positive' ? 'negative' : 'positive');
      return;
    }

    setAxis(nextAxis);
    setDirection('positive');
  }

  function chooseDirectionalView(
    nextAxis: SuitcaseAxis,
    requestedDirection: AxisDirection,
  ) {
    if (nextAxis !== axis) {
      setAxis(nextAxis);
      setDirection(requestedDirection);
      return;
    }

    setDirection((current) =>
      current === requestedDirection
        ? (current === 'positive' ? 'negative' : 'positive')
        : requestedDirection);
  }

  function handleArrowKey(event: KeyboardEvent<HTMLDivElement>) {
    const views: Partial<Record<string, [SuitcaseAxis, AxisDirection]>> = {
      ArrowDown: ['y', 'negative'],
      ArrowUp: ['y', 'positive'],
      ArrowLeft: ['x', 'negative'],
      ArrowRight: ['x', 'positive'],
      PageDown: ['z', 'negative'],
      PageUp: ['z', 'positive'],
    };
    const nextView = views[event.key];
    if (!nextView) return;

    event.preventDefault();
    chooseDirectionalView(nextView[0], nextView[1]);
  }

  const stageClass = [
    'luggage-stage',
    openingStyle(),
    isOpen ? 'is-open' : '',
    canUseNativeAnimation ? 'has-native-animation' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={stageRef}
      className={stageClass}
      tabIndex={showModel ? 0 : undefined}
      aria-label={showModel
        ? `${title}. ${language === 'ru'
          ? 'Стрелки переключают оси X и Y, Page Up и Page Down переключают ось Z'
          : 'Arrow keys switch X and Y views; Page Up and Page Down switch Z views'}`
        : undefined}
      onKeyDown={handleArrowKey}
      onPointerDown={() => stageRef.current?.focus()}
    >
      <div className="luggage-stage__visual">
        {showModel ? (
          <model-viewer
            ref={modelRef}
            src={suitcase.modelUrl}
            poster={suitcase.imageUrl}
            alt={title}
            camera-orbit={axisOrbits[axis][direction]}
            shadow-intensity="1"
            exposure="1"
            loading="lazy"
            onLoad={handleModelLoad}
          />
        ) : (
          <img
            className="real-suitcase-card__image"
            src={suitcase.imageUrl}
            alt={`${title} — 2D`}
            loading="lazy"
          />
        )}
      </div>
      {showModel && (
        <div
          className="luggage-axis-controls"
          role="group"
          aria-label={language === 'ru' ? 'Ось просмотра' : 'View axis'}
        >
          {(Object.keys(axisOrbits) as SuitcaseAxis[]).map((axisName) => (
            <button
              type="button"
              className={axis === axisName ? 'is-active' : ''}
              aria-pressed={axis === axisName}
              aria-label={`${axisName.toUpperCase()} ${
                axis === axisName && direction === 'negative' ? '−' : '+'
              }. ${language === 'ru'
                ? 'Нажмите повторно для обратного ракурса'
                : 'Press again for the opposite view'}`}
              onClick={() => chooseAxis(axisName)}
              key={axisName}
            >
              {axisName.toUpperCase()}
              {axis === axisName && (direction === 'positive' ? '+' : '−')}
            </button>
          ))}
        </div>
      )}
      {!canUseNativeAnimation && (
        <div className="luggage-stage__split" aria-hidden="true">
          <div className="luggage-stage__split-base">
            <img
              src={suitcase.imageUrl}
              alt=""
              decoding="async"
              loading="lazy"
            />
          </div>
          <div className="luggage-stage__split-lid">
            <img
              src={suitcase.imageUrl}
              alt=""
              decoding="async"
              loading="lazy"
            />
          </div>
        </div>
      )}
      <LuggageContents
        id={contentsId}
        isOpen={isOpen}
        language={language}
        number={number}
      />
    </div>
  );
}
