import React from "react";
import { Checkbox } from "./ui/checkbox";

interface CheckboxCategoryProps {
  id: number;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxCategory: React.FC<CheckboxCategoryProps> = ({ id, label, onChange }) => (
  <div className="flex items-center space-x-2">
    <Checkbox id={`category-${id}`} onCheckedChange={onChange as any} />
    <label
      htmlFor={`category-${id}`}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {label}
    </label>
  </div>
);

export default CheckboxCategory;
