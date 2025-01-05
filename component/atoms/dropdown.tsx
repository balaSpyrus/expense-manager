"use client";
import { toTitleCase } from "@/utils";
import clsx from "clsx";
import React, { FC, HTMLProps, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./dropdown.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props extends Omit<HTMLProps<HTMLUListElement>, "onChange"> {
  options: string[];
  value?: string;
  titleCase?: boolean;
  onChange?: (value: string) => void;
}

const Dropdown: FC<Props> = ({
  options,
  value,
  onChange,
  className,
  id,
  style,
  titleCase = false,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current?.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={styles.dropdownBtn}
      >
        {titleCase ? toTitleCase(value ?? "") : value}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <ul
            className={clsx(styles.dropdownMenu, className)}
            id={id}
            style={{
              ...style,
              top: `${position.top + 4}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
            }}
            {...rest}
          >
            {options.map((option, index) => (
              <li
                role="button"
                key={index}
                className={styles.dropdownItem} // Use CSS module
                onClick={() => {
                  onChange?.(option);
                  setIsOpen(false);
                }}
              >
                {titleCase ? toTitleCase(option) : option}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  );
};

export default Dropdown;
