function SearchBar({ value, onChange }) {
  return (
    <label className="search">
      <span>Поиск</span>
      <input
        type="text"
        placeholder="Название, описание или локация"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

export default SearchBar
