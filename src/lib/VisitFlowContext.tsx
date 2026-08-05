import {
  createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer,
} from 'react';
import { getPassengerEncounterNumber } from './arrivalSchedule';
import { gameDays, GameDay } from './gameDays';
import { useGameProgress } from './GameProgressContext';
import { Passenger, passengersById } from './passengers';
import {
  createVisitFlowState, visitFlowReducer, VisitStage,
} from './visitFlowState';

export interface ActiveVisit {
  day: GameDay;
  passenger: Passenger;
  encounterNumber: number;
  visitKey: string;
}

interface VisitFlowContextValue {
  currentVisit: ActiveVisit | null;
  stage: VisitStage;
  dialoguePath: readonly string[];
  finishDayTransition: () => void;
  admitToRoom: () => void;
  chooseDialogueOption: (choiceId: string) => void;
  completeVisit: () => void;
  restart: () => void;
}

const VisitFlowContext = createContext<VisitFlowContextValue | null>(null);

export function VisitFlowProvider({ children }: { children: ReactNode }) {
  const { unlockAchievement } = useGameProgress();
  const [state, dispatch] = useReducer(
    visitFlowReducer,
    undefined,
    createVisitFlowState,
  );

  const currentVisit = useMemo<ActiveVisit | null>(() => {
    const day = gameDays[state.dayIndex];
    if (!day) return null;
    const passengerId = state.arrivalSchedule[state.dayIndex]?.[state.visitorIndex];
    if (!passengerId) throw new Error(`Missing visitor for day ${day.number}`);
    const passenger = passengersById.get(passengerId);
    if (!passenger) throw new Error(`Missing passenger: ${passengerId}`);
    const encounterNumber = getPassengerEncounterNumber(
      state.arrivalSchedule,
      state.dayIndex,
      state.visitorIndex,
      passengerId,
    );
    return {
      day,
      passenger,
      encounterNumber,
      visitKey: `${state.dayIndex}-${state.visitorIndex}-${passengerId}`,
    };
  }, [state.arrivalSchedule, state.dayIndex, state.visitorIndex]);

  useEffect(() => {
    if (state.stage === 'complete') unlockAchievement('shift-complete');
  }, [state.stage, unlockAchievement]);

  const finishDayTransition = useCallback(() => {
    dispatch({ type: 'finish-day-transition' });
  }, []);
  const admitToRoom = useCallback(() => dispatch({ type: 'admit-to-room' }), []);
  const chooseDialogueOption = useCallback((choiceId: string) => {
    dispatch({ type: 'choose-dialogue-option', choiceId });
  }, []);
  const completeVisit = useCallback(() => dispatch({ type: 'complete-visit' }), []);
  const restart = useCallback(() => {
    dispatch({ type: 'restart', arrivalSchedule: createVisitFlowState().arrivalSchedule });
  }, []);

  return (
    <VisitFlowContext.Provider value={{
      currentVisit,
      stage: state.stage,
      dialoguePath: state.dialoguePath,
      finishDayTransition,
      admitToRoom,
      chooseDialogueOption,
      completeVisit,
      restart,
    }}>
      {children}
    </VisitFlowContext.Provider>
  );
}

export function useVisitFlow() {
  const context = useContext(VisitFlowContext);
  if (!context) throw new Error('useVisitFlow must be used inside VisitFlowProvider');
  return context;
}
