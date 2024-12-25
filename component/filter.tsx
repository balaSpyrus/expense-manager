export const Filter = ({
  categorywiseInfo,
  onCategoryChange,
}: {
  onCategoryChange: (category: string) => void;
  categorywiseInfo: Record<
    string,
    { amount: number; color: string; label: string }
  >;
}) => {
  return (
    <div className="filter">
      <label htmlFor="category">
        Filter by Category :
        <select
          id="category"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All</option>
          {Object.entries(categorywiseInfo).map(([value, { label }]) => (
            <option value={value} key={label}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
