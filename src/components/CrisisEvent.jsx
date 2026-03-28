import useGameStore from '../store/gameStore'
import crisisEvents from '../data/crisisEvents'

export default function CrisisEvent() {
  const { crises, resolveCrisis } = useGameStore()

  if (crises.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      {crises.map((crisis, i) => {
        const event = crisisEvents[crisis.statKey]
        if (!event) return null

        return (
          <div
            key={i}
            className="border border-red-700 bg-red-950 rounded-xl px-4 py-3 flex flex-col gap-1"
          >
            <div className="flex items-center justify-between">
              <p className="text-red-400 font-semibold text-sm">⚠️ {event.name}</p>
              <button
                onClick={() => resolveCrisis(crisis.statKey)}
                className="text-xs text-red-400 hover:text-red-300 underline"
              >
                Resolve
              </button>
            </div>
            <p className="text-red-300 text-xs italic">{event.description}</p>
            <p className="text-stone-400 text-xs">{event.resolution}</p>
          </div>
        )
      })}
    </div>
  )
}