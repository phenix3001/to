import { ArrivalSchedule, createRandomArrivalSchedule } from './arrivalSchedule';

export type VisitStage = 'day-transition' | 'reception' | 'room' | 'complete';

export interface VisitFlowState {
  arrivalSchedule: ArrivalSchedule;
  dayIndex: number;
  visitorIndex: number;
  stage: VisitStage;
  dialoguePath: readonly string[];
}

export type VisitFlowAction =
  | { type: 'finish-day-transition' }
  | { type: 'admit-to-room' }
  | { type: 'choose-dialogue-option'; choiceId: string }
  | { type: 'complete-visit' }
  | { type: 'restart'; arrivalSchedule: ArrivalSchedule };

export function createVisitFlowState(): VisitFlowState {
  return {
    arrivalSchedule: createRandomArrivalSchedule(),
    dayIndex: 0,
    visitorIndex: 0,
    stage: 'day-transition',
    dialoguePath: [],
  };
}

export function visitFlowReducer(
  state: VisitFlowState,
  action: VisitFlowAction,
): VisitFlowState {
  if (action.type === 'finish-day-transition') {
    return state.stage === 'day-transition' ? { ...state, stage: 'reception' } : state;
  }

  if (action.type === 'admit-to-room') {
    return state.stage === 'reception' ? { ...state, stage: 'room' } : state;
  }

  if (action.type === 'choose-dialogue-option') {
    if (state.stage !== 'room' || state.dialoguePath.length >= 4) return state;
    return {
      ...state,
      dialoguePath: [...state.dialoguePath, action.choiceId],
    };
  }

  if (action.type === 'complete-visit') {
    if (state.stage !== 'room') return state;
    const arrivals = state.arrivalSchedule[state.dayIndex] ?? [];
    const hasNextVisitor = state.visitorIndex < arrivals.length - 1;
    if (hasNextVisitor) {
      return {
        ...state,
        visitorIndex: state.visitorIndex + 1,
        stage: 'reception',
        dialoguePath: [],
      };
    }

    const nextDayIndex = state.dayIndex + 1;
    return {
      ...state,
      dayIndex: nextDayIndex,
      visitorIndex: 0,
      stage: nextDayIndex >= state.arrivalSchedule.length ? 'complete' : 'day-transition',
      dialoguePath: [],
    };
  }

  return {
    arrivalSchedule: action.arrivalSchedule,
    dayIndex: 0,
    visitorIndex: 0,
    stage: 'day-transition',
    dialoguePath: [],
  };
}
