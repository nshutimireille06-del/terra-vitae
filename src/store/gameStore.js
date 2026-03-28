import { create } from 'zustand/react'
import { persist } from 'zustand/middleware'

const initialStats = {
  water: 70,
  food: 70,
  knowledge: 70,
  health: 70,
  defense: 70,
  morale: 70,
}

const useGameStore = create(
  persist(
    (set, get) => ({
      stats: initialStats,
      tasks: [],
      crises: [],
      totalTasksCompleted: 0,
    era: 'Settlement',
      books: [],
      addBook: (title, status) => set((state) => ({
        books: [...state.books, { id: Date.now(), title, status }]
      })),
      updateBookStatus: (id, status) => set((state) => ({
        books: state.books.map(b => b.id === id ? { ...b, status } : b)
      })),
     currentPlace: null,
      setCurrentPlace: (place) => set({ currentPlace: place }),
      exitPlace: () => set({ currentPlace: null }),

      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: Date.now(), completed: false }]
      })),

      completeTask: (taskId) => set((state) => {
        const task = state.tasks.find(t => t.id === taskId)
        if (!task) return state

        const statKey = task.statKey
        const newStats = {
          ...state.stats,
          [statKey]: Math.min(100, state.stats[statKey] + 10),
        }

        return {
          tasks: state.tasks.map(t => t.id === taskId ? { ...t, completed: true } : t),
          stats: newStats,
          totalTasksCompleted: state.totalTasksCompleted + 1,
        }
      }),

      failTask: (taskId) => set((state) => {
        const task = state.tasks.find(t => t.id === taskId)
        if (!task) return state

        const statKey = task.statKey
        const newValue = Math.max(0, state.stats[statKey] - 15)
        const newStats = { ...state.stats, [statKey]: newValue }

        const newCrises = newValue < 20
          ? [...state.crises, { statKey, triggeredAt: Date.now() }]
          : state.crises

        return {
          tasks: state.tasks.map(t => t.id === taskId ? { ...t, failed: true } : t),
          stats: newStats,
          crises: newCrises,
        }
      }),

      resolveCrisis: (statKey) => set((state) => ({
        crises: state.crises.filter(c => c.statKey !== statKey)
      })),
    }),
    { name: 'terra-vitae-save' }
  )
)

export default useGameStore