import type { JSX } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type HexColor = `#${string}`;

interface Props {
    color: HexColor;
}

const DisplayColor = ({ color }: Props) => (
    <div
        className="size-12 rounded-lg ring-[0.5px] ring-neutral-400"
        style={{
            backgroundColor: color,
            color: color,
        }}
    ></div>
);

export default function FilterColors(): JSX.Element {
    return (
        <>
            <ToggleGroup
                className="flex flex-wrap"
                type="multiple"
                variant="colors-filter"
                size="filter"
                spacing={3}
                defaultValue={['']}
            >
                <ToggleGroupItem value="#EBE7E9">
                    <DisplayColor color="#EBE7E9" />
                </ToggleGroupItem>

                <ToggleGroupItem value="#794B33">
                    <DisplayColor color="#794B33" />
                </ToggleGroupItem>

                <ToggleGroupItem value="#747682">
                    <DisplayColor color="#747682" />
                </ToggleGroupItem>

                <ToggleGroupItem value="#B6A496">
                    <DisplayColor color="#B6A496" />
                </ToggleGroupItem>

                <ToggleGroupItem value="#353336">
                    <DisplayColor color="#353336" />
                </ToggleGroupItem>

                <ToggleGroupItem value="#C9CCC6">
                    <DisplayColor color="#C9CCC6" />
                </ToggleGroupItem>
            </ToggleGroup>
        </>
    );
}
