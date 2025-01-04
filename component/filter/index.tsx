import { CATEGORIES, PAYMENT_MODES } from "@/constant";
import { FilterAttrType } from "@/types";
import { toTitleCase } from "@/utils";
import styles from "./filter.module.css";
import EMSelect from "../atoms/select";

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
          <EMSelect
            titleCase
            id={type}
            onChange={(value) =>
              onCategoryChange(type as FilterAttrType, value)
            }
            options={["", ...options]}
          />
        </label>
      ))}
    </div>
  );
};
