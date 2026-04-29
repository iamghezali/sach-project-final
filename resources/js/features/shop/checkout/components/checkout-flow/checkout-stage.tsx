import { CheckIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { useCheckoutFlow } from './checkout-context';
import type { Stage } from './checkout-reducer';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';

type CheckoutStageProps = {
    stage: Stage;
    children: ReactNode;
    ref?: React.Ref<HTMLDivElement>;
};

export const CheckoutStage = ({ stage, children, ref }: CheckoutStageProps) => {
    const { state, editStage } = useCheckoutFlow();

    const isActive = state.activeStageID === stage.id && !stage.disabled;

    const stageIndex = state.stages.findIndex((s) => s.id === stage.id) + 1;
    const isLastStage = stageIndex === state.stages.length;

    const showEditButton = !stage.disabled && stage.valid && !isActive && !isLastStage;

    return (
        <Collapsible
            ref={ref}
            open={isActive}
            className="border"
        >
            <div className="flex items-center justify-between p-4">
                <h2 className="flex items-center gap-2 text-2xl font-medium">
                    {stage.valid ? <CheckIcon className="text-green-500" /> : <span>{`${stageIndex} .`}</span>}
                    {stage.label}
                </h2>
                {showEditButton && (
                    <Button
                        variant="ghost"
                        disabled={state.isEditing}
                        onClick={() => editStage(stage.id)}
                    >
                        Edit
                    </Button>
                )}
            </div>

            <CollapsibleContent>
                <div className="px-4 pb-7">{children}</div>
            </CollapsibleContent>
        </Collapsible>
    );
};
