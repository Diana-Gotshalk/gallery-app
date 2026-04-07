import { useEffect, useMemo, useState } from 'react'
import FilterBar from './components/FilterBar'
import SearchBar from './components/SearchBar'
import Carousel from './components/Carousel'
import ShotGrid from './components/ShotGrid'
import ShotForm from './components/ShotForm'
import './App.css'

const initialShots = [
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

const emptyForm = {
  title: '',
  category: '',
  mood: '',
  location: '',
  full: '',
  thumb: '',
  description: '',
}

function App() {
  const [shots, setShots] = useState(initialShots)
  const [activeCategory, setActiveCategory] = useState('Все')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const categories = useMemo(
    () => ['Все', ...new Set(shots.map((shot) => shot.category))],
    [shots],
  )

  const countsByCategory = useMemo(() => {
    const counts = shots.reduce((acc, shot) => {
      acc[shot.category] = (acc[shot.category] || 0) + 1
      return acc
    }, {})
    counts['Все'] = shots.length
    return counts
  }, [shots])

  const filteredShots = useMemo(() => {
    const query = search.trim().toLowerCase()
    return shots.filter((shot) => {
      const byCategory = activeCategory === 'Все' || shot.category === activeCategory
      const bySearch =
        !query ||
        shot.title.toLowerCase().includes(query) ||
        shot.description.toLowerCase().includes(query) ||
        shot.location.toLowerCase().includes(query)
      return byCategory && bySearch
    })
  }, [shots, activeCategory, search])

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCategory, search, shots.length])

  const currentShot = filteredShots[currentIndex] || null

  const handleChangeSlide = (direction) => {
    if (!filteredShots.length) return
    setCurrentIndex((prev) => {
      const next = prev + direction
      if (next < 0) return filteredShots.length - 1
      if (next >= filteredShots.length) return 0
      return next
    })
  }

  const handleSelectCard = (index) => {
    setCurrentIndex(index)
  }

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData(emptyForm)
  }

  const handleEditStart = () => {
    if (!currentShot) return
    setEditingId(currentShot.id)
    setFormData({
      title: currentShot.title,
      category: currentShot.category,
      mood: currentShot.mood,
      location: currentShot.location,
      full: currentShot.full,
      thumb: currentShot.thumb,
      description: currentShot.description,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = {
      ...formData,
      thumb: formData.thumb || formData.full,
    }
    if (
      !payload.title ||
      !payload.category ||
      !payload.mood ||
      !payload.location ||
      !payload.full ||
      !payload.thumb
    ) {
      return
    }

    if (editingId) {
      setShots((prev) =>
        prev.map((shot) => (shot.id === editingId ? { ...shot, ...payload } : shot)),
      )
      setEditingId(null)
    } else {
      const newShot = { ...payload, id: Date.now() }
      setShots((prev) => [newShot, ...prev])
      setActiveCategory(payload.category || 'Все')
      setCurrentIndex(0)
    }
    setFormData(emptyForm)
  }

  const handleDelete = (idToDelete) => {
    setShots((prev) => prev.filter((shot) => shot.id !== idToDelete))
    setEditingId((prevId) => (prevId === idToDelete ? null : prevId))
    setFormData(emptyForm)
    setCurrentIndex(0)
  }

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Галерея + карусель</p>
          <h1>Снимки под любое настроение</h1>
          <p className="lead">
            Фильтруй, листай карусель, добавляй свои кадры и редактируй существующие.
          </p>
        </div>
        <div className="hero-stat">
          <p className="stat-label">Снимков в базе</p>
          <p className="stat-value">{shots.length}</p>
          <p className="stat-note">Фильтрация, поиск и CRUD</p>
        </div>
      </header>

      <div className="actions-row">
        <FilterBar
          categories={categories}
          counts={countsByCategory}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="layout">
        <div className="layout-main">
          {currentShot ? (
            <Carousel
              shot={currentShot}
              index={currentIndex}
              total={filteredShots.length}
              onPrev={() => handleChangeSlide(-1)}
              onNext={() => handleChangeSlide(1)}
              onEdit={handleEditStart}
              onDelete={() => handleDelete(currentShot.id)}
            />
          ) : (
            <div className="empty">Нет снимков по текущему фильтру/поиску</div>
          )}

          <ShotGrid
            shots={filteredShots}
            currentIndex={currentIndex}
            onSelect={handleSelectCard}
            onDelete={handleDelete}
          />
        </div>

        <ShotForm
          data={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onReset={resetForm}
          isEditing={Boolean(editingId)}
        />
      </div>
    </div>
  )
}

export default App
