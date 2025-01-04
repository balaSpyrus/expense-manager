"use client";
import { toTitleCase } from "@/utils";
import clsx from "clsx";
import React, { FC, HTMLProps } from "react";

interface Props extends Omit<HTMLProps<HTMLSelectElement>, "onChange"> {
  options: string[];
  value?: string;
  titleCase?: boolean;
  onChange?: (value: string) => void;
}

const EMSelect: FC<Props> = ({
  options,
  value,
  onChange,
  className,
  name,
  id,
  titleCase = false,
  ...rest
}) => {
  return (
    <div className={clsx("em-select", className)}>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        id={id}
        name={name ?? id}
        {...rest}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {titleCase ? toTitleCase(option) : option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EMSelect;
