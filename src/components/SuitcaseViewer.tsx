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
  cameraOrbit: string;
  currentTime: number;
  getCameraOrbit?: () => {
    phi: number;
    radius: number;
    theta: number;
  };
  model?: { materials: ViewerMaterial[] };
  pause?: () => void;
  play?: (options?: { repetitions?: number }) => void;
}

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
  const [cameraWasMoved, setCameraWasMoved] = useState(false);
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

  function handleArrowKey(event: KeyboardEvent<HTMLDivElement>) {
    const viewer = modelRef.current;
    const orbit = viewer?.getCameraOrbit?.();
    if (!viewer || !orbit || !event.key.startsWith('Arrow')) return;

    const angleStep = Math.PI / 18;
    const nextTheta = orbit.theta + (
      event.key === 'ArrowLeft' ? -angleStep
        : event.key === 'ArrowRight' ? angleStep
          : 0
    );
    const nextPhi = Math.min(
      Math.PI - 0.08,
      Math.max(
        0.08,
        orbit.phi + (
          event.key === 'ArrowUp' ? -angleStep
            : event.key === 'ArrowDown' ? angleStep
              : 0
        ),
      ),
    );

    event.preventDefault();
    setCameraWasMoved(true);
    viewer.cameraOrbit = `${nextTheta}rad ${nextPhi}rad ${orbit.radius}m`;
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
          ? 'Поворачивайте модель клавишами со стрелками'
          : 'Rotate the model with the arrow keys'}`
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
            camera-controls
            auto-rotate={
              isOpen || prefersReducedMotion || cameraWasMoved ? undefined : true
            }
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
