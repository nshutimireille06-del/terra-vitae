import useGameStore from './store/gameStore'
import StatBar from './components/StatBar'
import TaskPanel from './components/TaskPanel'
import CrisisEvent from './components/CrisisEvent'
import WorldMap from './components/WorldMap'
import PlaceView from './components/PlaceView'
import eras from './data/eras'

export default function App() {
  const { stats, totalTasksCompleted } = useGameStore()
  const currentPlace = useGameStore((state) => state.currentPlace)

  const currentEra = eras.reduce((best, era) => {
    return totalTasksCompleted >= era.unlockTasks ? era : best
  }, eras[0])

  if (currentPlace) return <PlaceView />

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-400 tracking-wide">🌍 Terra Vitae</h1>
          <p className="text-stone-400 text-sm mt-1">Your life powers your civilization</p>
          <div className="mt-3 inline-block bg-stone-800 rounded-full px-4 py-1">
            <span className="text-amber-300 text-sm">
              {currentEra.emoji} {currentEra.name} — {currentEra.description}
            </span>
          </div>
        </div>

        {/* World Map */}
        <WorldMap />

        {/* Crises */}
        <CrisisEvent />

        {/* Stats */}
        <div className="bg-stone-800 rounded-2xl p-5 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider">Civilization Stats</h2>
          {Object.entries(stats).map(([key, value]) => (
            <StatBar key={key} statKey={key} value={value} />
          ))}
        </div>

        {/* Tasks */}
        <div className="bg-stone-800 rounded-2xl p-5">
          <TaskPanel />
        </div>

        {/* Footer */}
        <p className="text-center text-stone-600 text-xs">
          {totalTasksCompleted} tasks completed · Your land remembers
        </p>

      </div>
    </div>
  )
}