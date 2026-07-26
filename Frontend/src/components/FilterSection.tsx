import type { SortField, SortOrder } from "../types/contact";
import "./FilterSection.css";

interface FilterSectionProps {
  dateFilter: string;
  onDateChange: (value: string) => void;
  sortBy: SortField;
  order: SortOrder;
  onSortChange: (sortBy: SortField, order: SortOrder) => void;
}

function FilterSection({
  dateFilter,
  onDateChange,
  sortBy,
  order,
  onSortChange,
}: FilterSectionProps) {
  const currentSortValue = `${sortBy}-${order}`;

  const handleSortSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, dir] = e.target.value.split("-") as [SortField, SortOrder];
    onSortChange(field, dir);
  };

  return (
    <div className="filter-section">
      <div className="filter-item">
        <label htmlFor="date-filter">Filter by Date</label>
        <input
          id="date-filter"
          type="date"
          value={dateFilter}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>

      <div className="filter-item">
        <label htmlFor="sort-select">Sort by</label>
        <select id="sort-select" value={currentSortValue} onChange={handleSortSelect}>
          <option value="createdAt-DESC">Newest first</option>
          <option value="createdAt-ASC">Oldest first</option>
          <option value="name-ASC">Name (A-Z)</option>
          <option value="name-DESC">Name (Z-A)</option>
        </select>
      </div>

      {dateFilter && (
        <button className="filter-clear" onClick={() => onDateChange("")}>
          Clear date
        </button>
      )}
    </div>
  );
}

export default FilterSection;
