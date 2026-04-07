import { useEffect, useMemo, useState } from 'react'
import './App.css'

const shots = [
  {
    id: 1,
    title: 'Неон после дождя',
    category: 'Город',
    mood: 'Неон',
    location: 'Токио, Япония',
    full:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    description: 'Пестрые огни на блестящих после дождя улицах мегаполиса.',
  },
  {
    id: 2,
    title: 'Утро на вершине',
    category: 'Природа',
    mood: 'Тишина',
    location: 'Доломиты, Италия',
    full:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    description: 'Мягкий туман, теплый свет и рельефные горные хребты.',
  },
  {
    id: 3,
    title: 'Сердце мегаполиса',
    category: 'Город',
    mood: 'Ритм',
    location: 'Нью-Йорк, США',
    full:
      'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?auto=format&fit=crop&w=1400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?auto=format&fit=crop&w=800&q=80',
    description: 'Равномерный поток машин и холодные оттенки стекла.',
  },
  {
    id: 4,
    title: 'Лесной просвет',
    category: 'Природа',
    mood: 'Свежесть',
    location: 'Йосемити, США',
    full:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    description: 'Мягкий луч в глубине хвойного леса и утренний туман.',
  },
  {
    id: 5,
    title: 'Сияние стекла',
    category: 'Архитектура',
    mood: 'Гладкость',
    location: 'Бильбао, Испания',
    full:
      'https://images.unsplash.com/photo-1529429617124-aee711a911e0?auto=format&fit=crop&w=1400&q=80',
    thumb:
      'https://images.unsplash.com/photo-1529429617124-aee711a911e0?auto=format&fit=crop&w=800&q=80',
    description: 'Изогнутые формы, отражения и минималистичная геометрия.',
  },
  {
    id: 6,
    title: 'Песочный ветер',
    category: 'Путешествия',
    mood: 'Тепло',
    location: 'Сахара, Марокко',
    full:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80&sat=-20&h=900',
    thumb:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80&sat=-20&h=600',
    description: 'Перекаты дюн, длинные тени и мерцающий горячий воздух.',
  },
  {
    id: 7,
    title: 'Морской минимализм',
    category: 'Минимализм',
    mood: 'Чистота',
    location: 'Рейкьявик, Исландия',
    full:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80&sat=-40&h=900',
    thumb:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80&sat=-40&h=600',
    description: 'Ветер, линия горизонта и одинокий силуэт маяка.',
  },
  {
    id: 8,
    title: 'Портрет в движении',
    category: 'Портрет',
    mood: 'Импульс',
    location: 'Берлин, Германия',
    full:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80&sat=-20&h=900',
    thumb:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80&sat=-20&h=600',
    description: 'Нечеткие блики, скорость и яркий цвет в кадре.',
  },
  {
    id: 9,
    title: 'Полосы заката',
    category: 'Путешествия',
    mood: 'Мягкость',
    location: 'Санторини, Греция',
    full:
      'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?auto=format&fit=crop&w=1400&q=80&sat=10&h=900',
    thumb:
      'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?auto=format&fit=crop&w=800&q=80&sat=10&h=600',
    description: 'Терассы, белые стены и полосы персикового неба.',
  },
  {
    id: 10,
    title: 'Арт-облака',
    category: 'Минимализм',
    mood: 'Эксперимент',
    location: 'Копенгаген, Дания',
    full:
      'https://images.unsplash.com/photo-1529429617124-aee711a911e0?auto=format&fit=crop&w=1400&q=80&sat=-25&h=900',
    thumb:
      'https://images.unsplash.com/photo-1529429617124-aee711a911e0?auto=format&fit=crop&w=800&q=80&sat=-25&h=600',
    description: 'Облачные формы на фоне чистого неба и стекла.',
  },
]

const categories = ['Все', ...new Set(shots.map((shot) => shot.category))]

function App() {
  const [activeCategory, setActiveCategory] = useState('Все')
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredShots = useMemo(() => {
    return activeCategory === 'Все'
      ? shots
      : shots.filter((shot) => shot.category === activeCategory)
  }, [activeCategory])

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCategory])

  const changeSlide = (direction) => {
    if (!filteredShots.length) return
    setCurrentIndex((prev) => {
      const next = prev + direction
      if (next < 0) return filteredShots.length - 1
      if (next >= filteredShots.length) return 0
      return next
    })
  }

  const currentShot = filteredShots[currentIndex]

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Галерея + карусель</p>
          <h1>Снимки под любое настроение</h1>
          <p className="lead">
            Переключайте фильтры и листайте карусель, чтобы быстро собрать свой
            сет из разных настроений и жанров.
          </p>
          <div className="legend">
            <span className="dot"></span>
            <span>Фильтр оставляет только нужные кадры</span>
            <span className="dot accent"></span>
            <span>Карусель листает внутри выбранного фильтра</span>
          </div>
        </div>
        <div className="hero-stat">
          <p className="stat-label">Снимков в базе</p>
          <p className="stat-value">{shots.length}</p>
          <p className="stat-note">Все категории и быстрый предпросмотр</p>
        </div>
      </header>

      <div className="filter-bar" role="toolbar" aria-label="Фильтр по жанру">
        {categories.map((category) => {
          const count =
            category === 'Все'
              ? shots.length
              : shots.filter((shot) => shot.category === category).length
          return (
            <button
              key={category}
              className={`filter ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              <span>{category}</span>
              <span className="count">{count}</span>
            </button>
          )
        })}
      </div>

      {currentShot ? (
        <section
          className="carousel"
          aria-label="Карусель карточек внутри выбранной категории"
        >
          <div className="frame">
            <img src={currentShot.full} alt={currentShot.title} />
            <div className="gradient"></div>
            <div className="controls">
              <button
                className="nav"
                onClick={() => changeSlide(-1)}
                aria-label="Предыдущий кадр"
              >
                ‹
              </button>
              <button
                className="nav"
                onClick={() => changeSlide(1)}
                aria-label="Следующий кадр"
              >
                ›
              </button>
            </div>
            <div className="counter">
              {currentIndex + 1} / {filteredShots.length}
            </div>
          </div>
          <div className="meta">
            <div className="meta-top">
              <span className="pill">{currentShot.category}</span>
              <span className="badge">{currentShot.mood}</span>
            </div>
            <h2>{currentShot.title}</h2>
            <p className="description">{currentShot.description}</p>
            <div className="meta-grid">
              <div>
                <p className="label">Локация</p>
                <p className="value">{currentShot.location}</p>
              </div>
              <div>
                <p className="label">Кадр</p>
                <p className="value">
                  {currentIndex + 1} из {filteredShots.length}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="empty">Нет снимков для выбранного фильтра</div>
      )}

      <section className="grid" aria-label="Сетка превью">
        {filteredShots.map((shot, index) => (
          <button
            key={shot.id}
            className={`card ${index === currentIndex ? 'card-active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          >
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
        ))}
      </section>
    </div>
  )
}

export default App
