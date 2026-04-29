import type { StageConfig, StageID } from '@/features/shop/checkout/components/stages/checkout-stages-config';

export type Stage = Omit<StageConfig, 'id'> & { id: StageID };

export type State = {
    stages: Stage[];
    activeStageID: StageID;
    isEditing: boolean;
    hasReachedReview: boolean;
};

export type Action =
    | { type: 'CONFIRM_STAGE'; payload: { currentID: StageID; nextID: StageID } }
    | { type: 'EDIT_STAGE'; payload: { stageID: StageID } }
    | { type: 'SYNC_LOGIN_STATE'; isLoggedIn: boolean };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'CONFIRM_STAGE': {
            const lastStageID = state.stages.slice(-1)[0].id;
            const resolvedNextID = state.hasReachedReview ? lastStageID : action.payload.nextID;

            const nextStageExists = state.stages.some((s) => s.id === resolvedNextID);
            const isNavigatingToReview = resolvedNextID === lastStageID;

            const nextStage = state.stages.find((s) => s.id === action.payload.nextID);

            if (nextStage?.disabled) {
                throw new Error(`CheckoutFlow: cannot navigate to disabled stage "${action.payload.nextID}".`);
            }

            return {
                ...state,
                isEditing: false,
                hasReachedReview: state.hasReachedReview || isNavigatingToReview,
                activeStageID: nextStageExists ? resolvedNextID : state.activeStageID,

                stages: state.stages.map((stage) =>
                    stage.id === action.payload.currentID ? { ...stage, valid: true } : stage,
                ),
            };
        }

        case 'EDIT_STAGE': {
            if (state.isEditing) {
                return state;
            }

            const nextStage = state.stages.find((s) => s.id === action.payload.stageID);

            if (nextStage?.disabled) {
                throw new Error(`CheckoutFlow: cannot navigate to disabled stage "${action.payload.stageID}".`);
            }

            return {
                ...state,
                isEditing: true,
                activeStageID: action.payload.stageID,
                stages: state.stages.map((stage) =>
                    stage.id === action.payload.stageID ? { ...stage, valid: false } : stage,
                ),
            };
        }

        case 'SYNC_LOGIN_STATE': {
            const { isLoggedIn } = action;

            const updatedStages = state.stages.map((s) => {
                if (!s.disableOnLogin) {
                    return s;
                }

                return { ...s, disabled: isLoggedIn, valid: isLoggedIn };
            });

            return {
                ...state,
                stages: updatedStages,
                activeStageID: updatedStages.find((s) => !s.disabled)?.id ?? state.activeStageID,
            };
        }

        default:
            return state;
    }
};
