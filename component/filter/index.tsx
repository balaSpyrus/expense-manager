import { CATEGORIES, PAYMENT_MODES } from "@/constant";
import { FilterAttrType } from "@/types";
import { toTitleCase } from "@/utils";
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

export const Filter = ({
  onCategoryChange,
}: {
  onCategoryChange: (attr: FilterAttrType, value: string) => void;
}) => {
  return (
    <div className={styles.filter}>
      {filterConfig.map(({ type, options }) => (
        <label key={type} htmlFor={type}>
          Filter by {toTitleCase(type)} :
          <select
            id={type}
            onChange={(e) =>
              onCategoryChange(type as FilterAttrType, e.target.value)
            }
          >
            <option value="">All</option>
            {options.map((value) => (
              <option value={value} key={value}>
                {toTitleCase(value)}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
};
