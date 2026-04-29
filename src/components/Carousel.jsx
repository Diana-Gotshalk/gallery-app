function Carousel({ shot, index, total, onPrev, onNext, onEdit, onDelete }) {
  return (
    <section className="carousel" aria-label="Карусель карточек галереи">
      <div className="frame">
        <img src={shot.full} alt={shot.title} />
        <div className="gradient"></div>
        <div className="controls">
          <button className="nav" type="button" onClick={onPrev} aria-label="Предыдущий кадр">
            {'<'}
          </button>
          <button className="nav" type="button" onClick={onNext} aria-label="Следующий кадр">
            {'>'}
          </button>
        </div>
        <div className="counter">
          {index + 1} / {total}
        </div>
      </div>

      <div className="meta">
        <div className="meta-top">
          <span className="pill">{shot.category}</span>
          <span className="badge">{shot.mood}</span>
        </div>
        <h2>{shot.title}</h2>
        <p className="description">{shot.description}</p>

        <div className="meta-grid">
          <div>
            <p className="label">Локация</p>
            <p className="value">{shot.location}</p>
          </div>
          <div>
            <p className="label">Кадр</p>
            <p className="value">
              {index + 1} из {total}
            </p>
          </div>
        </div>

        <div className="meta-actions">
          <button className="ghost" type="button" onClick={onEdit}>
            Редактировать
          </button>
          <button className="danger" type="button" onClick={onDelete}>
            Удалить
          </button>
        </div>
      </div>
    </section>
  )
}

export default Carousel
