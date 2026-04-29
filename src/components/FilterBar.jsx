function FilterBar({ categories, counts, activeCategory, onSelect }) {
  return (
    <div className="filter-bar" role="toolbar" aria-label="Фильтр по категориям">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`filter ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onSelect(category)}
        >
          <span>{category}</span>
          <span className="count">{counts?.[category] ?? 0}</span>
        </button>
      ))}
    </div>
  )
}

export default FilterBar
