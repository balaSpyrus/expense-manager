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
            value={cache[type] || ""}
            onChange={(value) => {
              onCategoryChange(type as FilterAttrType, value);
              cache[type] = value;
            }}
            renderValue={(value) => (
              <>{value === "" ? "All" : toTitleCase(value as string)}</>
            )}
            displayEmpty
            emptyRenderValue="All"
            options={["", ...options]}
          />
        </label>
      ))}
    </div>
  );
};
