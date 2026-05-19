"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { TechStackRow } from "@/lib/portfolio-queries";

type Props = {
  stacks: TechStackRow[];
  value: number[];
  onChange: (ids: number[]) => void;
  label?: string;
};

export function TechMultiSelect({ stacks, value, onChange, label }: Props) {
  const toggle = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {label}
        </Label>
      )}
      <div className="grid max-h-48 gap-2 overflow-y-auto rounded-md border border-border/70 p-3 sm:grid-cols-2">
        {stacks.map((stack) => (
          <label
            key={stack.id}
            className="flex cursor-pointer items-center gap-2 text-sm"
          >
            <Checkbox
              checked={value.includes(stack.id)}
              onCheckedChange={() => toggle(stack.id)}
            />
            <span>{stack.name}</span>
          </label>
        ))}
        {stacks.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Add technologies in the Tech catalog tab first.
          </p>
        )}
      </div>
    </div>
  );
}
