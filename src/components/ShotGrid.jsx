function ShotGrid({ shots, currentIndex, onSelect, onDelete }) {
  return (
    <section className="grid" aria-label="Сетка превью">
      {shots.map((shot, index) => (
        <div
          key={shot.id}
          className={`card ${index === currentIndex ? 'card-active' : ''}`}
        >
          <button className="card-hit" onClick={() => onSelect(index)}>
            <div className="card-image">
              <img src={shot.thumb} alt={shot.title} />
            </div>
            <div className="card-body">
              <div className="card-top">
                <span className="pill">{shot.category}</span>
                <span className="badge subtle">{shot.mood}</span>
              </div>
              <p className="card-title">{shot.title}</p>
              <p className="card-sub">{shot.location}</p>
            </div>
          </button>
          <button className="card-delete" type="button" onClick={() => onDelete(shot.id)}>
            Удалить
          </button>
        </div>
      ))}
      {!shots.length && <div className="empty">Ничего не найдено</div>}
    </section>
  )
}

export default ShotGrid
