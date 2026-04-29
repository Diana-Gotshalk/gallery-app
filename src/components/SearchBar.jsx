function SearchBar({ value, onChange }) {
  return (
    <label className="search">
      <span>Поиск</span>
      <input
        type="text"
        placeholder="Название, описание или локация"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default SearchBar
