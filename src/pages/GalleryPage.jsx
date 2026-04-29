import Carousel from '../components/Carousel'
import FilterBar from '../components/FilterBar'
import SearchBar from '../components/SearchBar'
import ShotForm from '../components/ShotForm'
import ShotGrid from '../components/ShotGrid'

function GalleryPage({
  shots,
  categories,
  countsByCategory,
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  currentShot,
  currentIndex,
  filteredShots,
  onPrev,
  onNext,
  onEditCurrent,
  onDeleteShot,
  onSelectCard,
  formData,
  onFormChange,
  onSubmit,
  onReset,
  isEditing,
}) {
  return (
    <>
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Мини-проект React</p>
          <h1>Галерея снимков с поиском, фильтрацией и редактированием</h1>
          <p className="lead">
            Главная страница работает с локальной коллекцией карточек. Общее состояние
            хранится в родительском компоненте и передается дочерним через props.
          </p>
        </div>
        <div className="hero-stat">
          <p className="stat-label">Карточек в коллекции</p>
          <p className="stat-value">{shots.length}</p>
          <p className="stat-note">Поиск, фильтрация, добавление, изменение и удаление</p>
        </div>
      </header>

      <div className="actions-row">
        <FilterBar
          categories={categories}
          counts={countsByCategory}
          activeCategory={activeCategory}
          onSelect={onCategoryChange}
        />
        <SearchBar value={search} onChange={onSearchChange} />
      </div>

      <div className="layout">
        <div className="layout-main">
          {currentShot ? (
            <Carousel
              shot={currentShot}
              index={currentIndex}
              total={filteredShots.length}
              onPrev={onPrev}
              onNext={onNext}
              onEdit={onEditCurrent}
              onDelete={() => onDeleteShot(currentShot.id)}
            />
          ) : (
            <div className="empty">По текущему фильтру ничего не найдено.</div>
          )}

          <ShotGrid
            shots={filteredShots}
            currentIndex={currentIndex}
            onSelect={onSelectCard}
            onDelete={onDeleteShot}
          />
        </div>

        <ShotForm
          data={formData}
          onChange={onFormChange}
          onSubmit={onSubmit}
          onReset={onReset}
          isEditing={isEditing}
        />
      </div>
    </>
  )
}

export default GalleryPage
