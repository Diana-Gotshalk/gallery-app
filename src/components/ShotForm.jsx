function ShotForm({ data, onChange, onSubmit, onReset, isEditing }) {
  const handleChange = (field) => (event) => {
    onChange(field, event.target.value)
  }

  return (
    <form className="panel form" onSubmit={onSubmit}>
      <div className="form-head">
        <div>
          <p className="eyebrow small">Управление</p>
          <h3>{isEditing ? 'Редактирование' : 'Добавление кадра'}</h3>
        </div>
        <div className="form-actions">
          <button type="submit" className="primary">
            {isEditing ? 'Сохранить' : 'Добавить'}
          </button>
          <button type="button" className="ghost" onClick={onReset}>
            Очистить
          </button>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Название
          <input
            type="text"
            value={data.title}
            onChange={handleChange('title')}
            placeholder="Например, Неон после дождя"
          />
        </label>
        <label>
          Категория
          <input
            type="text"
            value={data.category}
            onChange={handleChange('category')}
            placeholder="Город, Природа, ..."
          />
        </label>
        <label>
          Настроение
          <input
            type="text"
            value={data.mood}
            onChange={handleChange('mood')}
            placeholder="Ритм, Тишина и т.п."
          />
        </label>
        <label>
          Локация
          <input
            type="text"
            value={data.location}
            onChange={handleChange('location')}
            placeholder="Страна, город"
          />
        </label>
        <label className="wide">
          URL изображения (крупное)
          <input
            type="url"
            value={data.full}
            onChange={handleChange('full')}
            placeholder="https://images.unsplash.com/..."
          />
        </label>
        <label className="wide">
          URL превью (если пусто, возьмется крупное)
          <input
            type="url"
            value={data.thumb}
            onChange={handleChange('thumb')}
            placeholder="https://images.unsplash.com/..."
          />
        </label>
        <label className="wide">
          Описание
          <textarea
            value={data.description}
            onChange={handleChange('description')}
            placeholder="Пара предложений о кадре"
            rows={3}
          />
        </label>
      </div>
    </form>
  )
}

export default ShotForm
