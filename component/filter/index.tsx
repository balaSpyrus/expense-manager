import { CATEGORIES, PAYMENT_MODES } from "@/constant";
import { FilterAttrType } from "@/types";
import { toTitleCase } from "@/utils";
import Dropdown from "../atoms/dropdown";
import styles from "./filter.module.css";

const filterConfig = [
  {
    type: "category",
    options: CATEGORIES,
  },
  {
    type: "payment_mode",
    options: PAYMENT_MODES,
  },
];

const cache: Record<string, string> = {};

export const Filter = ({
  onCategoryChange,
}: {
  onCategoryChange: (attr: FilterAttrType, value: string) => void;
}) => {
  return (
    <div className={styles.filter}>
      {filterConfig.map(({ type, options }) => (
        <label key={type} htmlFor={type}>
          <span>Filter by {toTitleCase(type)} :</span>
          <Dropdown
            titleCase
            id={type}
            value={cache[type] || "all"}
            onChange={(value) => {
              const val = value === "all" ? "" : value;
              onCategoryChange(type as FilterAttrType, val);
              cache[type] = val;
            }}
            options={["all", ...options]}
          />
        </label>
      ))}
    </div>
  );
};
