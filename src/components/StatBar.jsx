const statConfig = {
  water:     { label: 'Water',     emoji: '💧', color: 'bg-blue-400' },
  food:      { label: 'Food',      emoji: '🌾', color: 'bg-yellow-400' },
  knowledge: { label: 'Knowledge', emoji: '📚', color: 'bg-purple-400' },
  health:    { label: 'Health',    emoji: '❤️',  color: 'bg-red-400' },
  defense:   { label: 'Defense',   emoji: '⚔️',  color: 'bg-gray-400' },
  morale:    { label: 'Morale',    emoji: '😊', color: 'bg-green-400' },
}

export default function StatBar({ statKey, value }) {
  const { label, emoji, color } = statConfig[statKey]
  const isLow = value < 20
  const isMedium = value >= 20 && value < 40

  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-lg w-6">{emoji}</span>
      <span className="text-sm text-stone-300 w-20">{label}</span>
      <div className="flex-1 bg-stone-700 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-700 ${
            isLow ? 'bg-red-500' : isMedium ? 'bg-yellow-400' : color
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={`text-sm w-8 text-right ${isLow ? 'text-red-400' : 'text-stone-400'}`}>
        {value}
      </span>
    </div>
  )
}