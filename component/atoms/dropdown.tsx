"use client";
import { toTitleCase } from "@/utils";
import { FormControl, MenuItem, Select, SelectProps } from "@mui/material";
import clsx from "clsx";
import { FC, ReactNode } from "react";

interface Props extends Omit<SelectProps, "onChange"> {
  options: string[];
  titleCase?: boolean;
  emptyRenderValue?: ReactNode;
  onChange?: (value: string) => void;
}

const Dropdown: FC<Props> = ({
  options,
  value,
  onChange,
  className,
  id,
  style,
  name,
  emptyRenderValue,
  titleCase = false,
  ...rest
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} style={style}>
      <Select
        id={id}
        sx={{
          p: 0.2,
          border: "1px solid",
          borderColor: "primary.main",
          "& .MuiSelect-icon": {
            color: "primary.main",
          },
        }}
        name={name ?? id}
        className={clsx(className)}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value as string);
        }}
        style={{
          maxHeight: 36,
        }}
        {...rest}
      >
        {options.map((option, index) => (
          <MenuItem value={option} key={index}>
            {emptyRenderValue && !option
              ? emptyRenderValue
              : titleCase
              ? toTitleCase(option)
              : option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
