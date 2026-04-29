function RemoteGallery({ shots, status, error, lastSync, onPrefill }) {
  return (
    <section className="panel remote-panel" aria-labelledby="remote-gallery-title">
      <div className="section-head">
        <div>
          <p className="eyebrow small">API</p>
          <h3 id="remote-gallery-title">Подборка из внешнего API</h3>
        </div>
        <p className="section-note">
          {status === 'success' && lastSync
            ? `Обновлено: ${lastSync}`
            : 'Источник: JSONPlaceholder Photos'}
        </p>
      </div>

      {status === 'loading' && <div className="empty">Загрузка данных из API...</div>}
      {status === 'error' && <div className="empty">Ошибка загрузки: {error}</div>}

      {status === 'success' && (
        <div className="remote-grid">
          {shots.map((shot) => (
            <article key={shot.id} className="remote-card">
              <div className="remote-image">
                <img src={shot.thumb} alt={shot.title} />
              </div>
              <div className="remote-body">
                <div className="card-top">
                  <span className="pill">API</span>
                  <span className="badge subtle">{shot.mood}</span>
                </div>
                <p className="card-title">{shot.title}</p>
                <p className="card-sub">{shot.location}</p>
                <button className="ghost" type="button" onClick={() => onPrefill(shot)}>
                  Перенести в форму
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default RemoteGallery
