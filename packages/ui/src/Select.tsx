"use client";
import {
  SelectItem,
  SelectContent,
  Select as SelectPrimitive,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export const Select = ({
  options,
  onSelect,
}: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}) => {
  return (
    <SelectPrimitive
      onValueChange={(value) => {
        onSelect(value);
      }}
    >
      <SelectTrigger className="w-full bg-gray-50">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="w-full bg-gray-50">
        {options.map((option) => (
          <SelectItem value={option.key}>{option.value}</SelectItem>
        ))}
      </SelectContent>
    </SelectPrimitive>
  );
};
