import type { JSX } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function FilterCategories(): JSX.Element {
    return (
        <>
            <ToggleGroup
                className="flex flex-wrap"
                type="multiple"
                variant="categories-filter"
                size="filter"
                defaultValue={['tops', 'abayas']}
                spacing={3}
            >
                <ToggleGroupItem value="dresses">Dresses</ToggleGroupItem>
                <ToggleGroupItem value="sets">Sets</ToggleGroupItem>
                <ToggleGroupItem value="tops">Tops</ToggleGroupItem>
                <ToggleGroupItem value="vests">Vests</ToggleGroupItem>
                <ToggleGroupItem value="abayas">Abayas</ToggleGroupItem>
                <ToggleGroupItem value="everyday_Wear">Everyday Wear</ToggleGroupItem>
                <ToggleGroupItem
                    value="pullovers"
                    disabled
                >
                    Pullovers
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    );
}
