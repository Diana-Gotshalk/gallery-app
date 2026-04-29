import RemoteGallery from '../components/RemoteGallery'

function ApiPage({
  remoteShots,
  apiStatus,
  apiError,
  lastSync,
  onPrefillFromRemote,
}) {
  return (
    <section className="report-page">
      <header className="report-hero panel">
        <div>
          <p className="eyebrow">API</p>
          <h1>Внешняя подборка изображений</h1>
        </div>
        <p className="lead">
          Эта страница показывает данные, которые приложение получает через `fetch`.
          Любую карточку можно перенести в форму и затем добавить в локальную галерею.
        </p>
      </header>

      <RemoteGallery
        shots={remoteShots}
        status={apiStatus}
        error={apiError}
        lastSync={lastSync}
        onPrefill={onPrefillFromRemote}
      />
    </section>
  )
}

export default ApiPage
