import { useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_DIALOGUE_CHARACTERS_PER_SECOND } from '../lib/dialogueTyping';
import { usePrefersReducedMotion } from '../lib/reducedMotion';

interface TypewriterTextProps {
  text: string;
  charactersPerSecond?: number;
  onComplete?: () => void;
}

interface TypingState {
  text: string;
  visibleCharacterCount: number;
}

export function TypewriterText({
  text,
  charactersPerSecond = DEFAULT_DIALOGUE_CHARACTERS_PER_SECOND,
  onComplete,
}: TypewriterTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const onCompleteRef = useRef(onComplete);
  const completedTextRef = useRef<string | null>(null);
  const characters = useMemo(() => Array.from(text), [text]);
  const [typingState, setTypingState] = useState<TypingState>(() => ({
    text,
    visibleCharacterCount: prefersReducedMotion ? characters.length : 0,
  }));
  const visibleCharacterCount = typingState.text === text
    ? typingState.visibleCharacterCount
    : prefersReducedMotion ? characters.length : 0;

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (completedTextRef.current !== text) completedTextRef.current = null;
    let isCancelled = false;
    const completeTyping = () => {
      if (isCancelled || completedTextRef.current === text) return;
      completedTextRef.current = text;
      onCompleteRef.current?.();
    };

    if (prefersReducedMotion || characters.length === 0) {
      setTypingState({ text, visibleCharacterCount: characters.length });
      completeTyping();
      return undefined;
    }

    setTypingState({ text, visibleCharacterCount: 0 });
    let nextCharacterCount = 0;
    const intervalId = window.setInterval(() => {
      nextCharacterCount += 1;
      setTypingState({ text, visibleCharacterCount: nextCharacterCount });
      if (nextCharacterCount >= characters.length) {
        window.clearInterval(intervalId);
        completeTyping();
      }
    }, 1000 / Math.max(1, charactersPerSecond));

    return () => {
      isCancelled = true;
      window.clearInterval(intervalId);
    };
  }, [characters, charactersPerSecond, prefersReducedMotion, text]);

  return (
    <>
      <span aria-hidden="true">
        {characters.slice(0, visibleCharacterCount).join('')}
        <span className="typewriter-text__pending">
          {characters.slice(visibleCharacterCount).join('')}
        </span>
      </span>
      <span className="typewriter-text__accessible">{text}</span>
    </>
  );
}
