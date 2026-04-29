import { useEffect, useMemo, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import { emptyForm, seedShots } from './data/seedShots'
import GalleryPage from './pages/GalleryPage'
import ApiPage from './pages/ApiPage'

const STORAGE_KEY = 'gallery-app-local-shots'
const API_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=8'
const ALL_CATEGORY = 'Все'

function App() {
  const [shots, setShots] = useState(() => {
    if (typeof window === 'undefined') {
      return seedShots
    }

    try {
      const savedShots = window.localStorage.getItem(STORAGE_KEY)
      if (!savedShots) {
        return seedShots
      }

      const parsedShots = JSON.parse(savedShots)
      return Array.isArray(parsedShots) && parsedShots.length ? parsedShots : seedShots
    } catch {
      return seedShots
    }
  })

  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [remoteShots, setRemoteShots] = useState([])
  const [apiStatus, setApiStatus] = useState('idle')
  const [apiError, setApiError] = useState('')
  const [lastSync, setLastSync] = useState('')

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(shots))
  }, [shots])

  useEffect(() => {
    let isCancelled = false

    async function loadRemoteShots() {
      setApiStatus('loading')
      setApiError('')

      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()
        if (isCancelled) {
          return
        }

        const mappedShots = data.map((item) => ({
          id: `api-${item.id}`,
          title: item.title.slice(0, 1).toUpperCase() + item.title.slice(1),
          category: 'API',
          mood: `Альбом ${item.albumId}`,
          location: 'JSONPlaceholder',
          full: item.url,
          thumb: item.thumbnailUrl,
          description:
            'Карточка получена через fetch из внешнего API и может быть перенесена в локальную галерею.',
        }))

        setRemoteShots(mappedShots)
        setApiStatus('success')
        setLastSync(
          new Date().toLocaleString('ru-RU', {
            dateStyle: 'short',
            timeStyle: 'medium',
          }),
        )
      } catch (error) {
        if (isCancelled) {
          return
        }

        setApiStatus('error')
        setApiError(error instanceof Error ? error.message : 'Неизвестная ошибка')
      }
    }

    loadRemoteShots()

    return () => {
      isCancelled = true
    }
  }, [])

  const categories = useMemo(
    () => [ALL_CATEGORY, ...new Set(shots.map((shot) => shot.category))],
    [shots],
  )

  const countsByCategory = useMemo(() => {
    const counts = shots.reduce((accumulator, shot) => {
      accumulator[shot.category] = (accumulator[shot.category] || 0) + 1
      return accumulator
    }, {})

    counts[ALL_CATEGORY] = shots.length
    return counts
  }, [shots])

  const filteredShots = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase()

    return shots.filter((shot) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || shot.category === activeCategory
      const matchesSearch =
        !normalizedQuery ||
        shot.title.toLowerCase().includes(normalizedQuery) ||
        shot.description.toLowerCase().includes(normalizedQuery) ||
        shot.location.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesSearch
    })
  }, [shots, activeCategory, search])

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCategory, search, shots.length])

  const currentShot = filteredShots[currentIndex] || null

  const handleChangeSlide = (direction) => {
    if (!filteredShots.length) {
      return
    }

    setCurrentIndex((previousIndex) => {
      const nextIndex = previousIndex + direction
      if (nextIndex < 0) {
        return filteredShots.length - 1
      }

      if (nextIndex >= filteredShots.length) {
        return 0
      }

      return nextIndex
    })
  }

  const handleSelectCard = (index) => {
    setCurrentIndex(index)
  }

  const handleFormChange = (field, value) => {
    setFormData((previousData) => ({ ...previousData, [field]: value }))
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData(emptyForm)
  }

  const handleEditStart = () => {
    if (!currentShot) {
      return
    }

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

  const handlePrefillFromRemote = (shot) => {
    setEditingId(null)
    setFormData({
      title: shot.title,
      category: 'Вдохновение',
      mood: shot.mood,
      location: shot.location,
      full: shot.full,
      thumb: shot.thumb,
      description: shot.description,
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
      setShots((previousShots) =>
        previousShots.map((shot) =>
          shot.id === editingId ? { ...shot, ...payload } : shot,
        ),
      )
      setEditingId(null)
    } else {
      const newShot = { ...payload, id: Date.now() }
      setShots((previousShots) => [newShot, ...previousShots])
      setActiveCategory(ALL_CATEGORY)
      setCurrentIndex(0)
    }

    setFormData(emptyForm)
  }

  const handleDelete = (idToDelete) => {
    setShots((previousShots) =>
      previousShots.filter((shot) => shot.id !== idToDelete),
    )
    setEditingId((previousId) => (previousId === idToDelete ? null : previousId))
    setFormData(emptyForm)
    setCurrentIndex(0)
  }

  const navigationClassName = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link-active' : ''}`

  return (
    <div className="page">
      <header className="app-header panel">
        <div>
          <p className="eyebrow">Gallery App</p>
          <h2>React: useEffect, API, Routing, Sharing State</h2>
        </div>

        <nav className="main-nav" aria-label="Основная навигация">
          <NavLink to="/" className={navigationClassName} end>
            Галерея
          </NavLink>
          <NavLink to="/api" className={navigationClassName}>
            API-страница
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <GalleryPage
              shots={shots}
              categories={categories}
              countsByCategory={countsByCategory}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              search={search}
              onSearchChange={setSearch}
              currentShot={currentShot}
              currentIndex={currentIndex}
              filteredShots={filteredShots}
              onPrev={() => handleChangeSlide(-1)}
              onNext={() => handleChangeSlide(1)}
              onEditCurrent={handleEditStart}
              onDeleteShot={handleDelete}
              onSelectCard={handleSelectCard}
              formData={formData}
              onFormChange={handleFormChange}
              onSubmit={handleSubmit}
              onReset={resetForm}
              isEditing={Boolean(editingId)}
            />
          }
        />
        <Route
          path="/api"
          element={
            <ApiPage
              remoteShots={remoteShots}
              apiStatus={apiStatus}
              apiError={apiError}
              lastSync={lastSync}
              onPrefillFromRemote={handlePrefillFromRemote}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
