"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CircleCheck, Frown, Ruler, Smile, SwatchBook } from "lucide-react";

const options = [
  {
    label: "Healthy with no history of any other related cancer disease",
    value: "colors",
    icon: Smile,
    defaultChecked: true,
  },
  {
    label: "Emojis",
    value: "emojis",
    icon: Frown,
  },
];

const PatientStatusCheckbox = () => {
  return (
    <div className="w-[500px] max-w-sm grid grid-cols-2 gap-3 ">
      {options.map((option) => (
        <CheckboxPrimitive.Root
          key={option.value}
          defaultChecked={option.defaultChecked}
          className="relative ring-[1px] ring-border rounded-lg px-4 py-3 text-start text-muted-foreground data-[state=checked]:ring-2 data-[state=checked]:ring-primary data-[state=checked]:text-primary data-[state=checked]:bg-green-100"
        >
          <option.icon className="mb-3" />
          <span className="font-medium tracking-tight">{option.label}</span>

          <CheckboxPrimitive.Indicator className="absolute top-2 right-2">
            <CircleCheck className="fill-primary text-primary-foreground" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      ))}
    </div>
  );
};

export default PatientStatusCheckbox;
