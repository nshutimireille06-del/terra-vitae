import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const plants = [
  { id: 'roses', name: 'Royal Roses', emoji: '🌹', unlockAt: 20, desc: 'Deep crimson roses planted at the kingdom founding.', season: 'All Year' },
  { id: 'baobab', name: 'Ancient Baobab', emoji: '🌳', unlockAt: 10, desc: 'The oldest tree in Mentedore. Said to hold the kingdom memory.', season: 'All Year' },
  { id: 'sunflowers', name: 'Sunflower Field', emoji: '🌻', unlockAt: 30, desc: 'Faces the eastern sunrise. Symbol of Mentedore prosperity.', season: 'Summer' },
  { id: 'herbs', name: 'Healing Herb Beds', emoji: '🌿', unlockAt: 25, desc: 'Supplies the Healing House with moringa, neem and basil.', season: 'All Year' },
  { id: 'lotus', name: 'Lotus Pond', emoji: '🪷', unlockAt: 50, desc: 'A small pond filled with lotus flowers. A place of quiet reflection.', season: 'Spring' },
  { id: 'mango', name: 'Mango Grove', emoji: '🥭', unlockAt: 40, desc: 'Three ancient mango trees. Their fruit feeds the school children.', season: 'Summer' },
  { id: 'vegetables', name: 'Vegetable Beds', emoji: '🥬', unlockAt: 15, desc: 'Feeds the bakery and market with fresh produce daily.', season: 'All Year' },
  { id: 'fountain', name: 'Stone Fountain', emoji: '⛲', unlockAt: 60, desc: 'Carved from river stone. Water flows when the kingdom thrives.', season: 'All Year' },
]

const gardeners = [
  { name: 'Elder Nana', role: 'Head Gardener', specialty: 'Medicinal herbs' },
  { name: 'Young Kwabena', role: 'Apprentice', specialty: 'Vegetable beds' },
  { name: 'Maame Ama', role: 'Botanist', specialty: 'Rare plants' },
]

export default function GardenInterior() {
  const health = useGameStore((state) => state.stats.health)
  const knowledge = useGameStore((state) => state.stats.knowledge)
  const [selectedPlant, setSelectedPlant] = useState(null)

  const unlockedPlants = plants.filter(p => health >= p.unlockAt)
  const lockedPlants = plants.filter(p => health < p.unlockAt)

  const gardenColor = health < 30 ? '#1a1a0a' : health < 60 ? '#1a2a0a' : '#0a2a0a'
  const grassColor = health < 30 ? '#2a2a10' : health < 60 ? '#2a4a10' : '#1a4a10'

  return (
    <div className="flex flex-col gap-5">

      {/* Garden scene SVG */}
      <div className="rounded-2xl overflow-hidden" style={{ background: gardenColor }}>
        <svg width="100%" viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
          {/* Sky */}
          <rect x="0" y="0" width="700" height="140" fill={health >= 50 ? '#0a1a2a' : '#1a1a1a'}/>
          {/* Sun or clouds */}
          {health >= 60 ? (
            <circle cx="600" cy="50" r="30" fill="#e0c040" opacity="0.6"/>
          ) : (
            <ellipse cx="600" cy="50" rx="50" ry="25" fill="#2a2a2a" opacity="0.5"/>
          )}
          {/* Ground */}
          <rect x="0" y="140" width="700" height="120" fill={grassColor}/>
          {/* Grass texture */}
          {health >= 40 && [0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i => (
            <line key={i} x1={25+i*50} y1="140" x2={20+i*50} y2="120"
              stroke="#2a5a1a" strokeWidth="1.5" opacity="0.5"/>
          ))}
          {/* Garden path */}
          <ellipse cx="350" cy="200" rx="120" ry="40" fill="#3a2a10" opacity="0.5"/>
          {/* Ancient Baobab */}
          <rect x="80" y="80" width="30" height="80" rx="8" fill="#5a3a10"/>
          <circle cx="95" cy="72" r="40" fill={health >= 40 ? '#2a5a1a' : '#2a2a10'} opacity="0.9"/>
          <circle cx="75" cy="80" r="25" fill={health >= 40 ? '#1a4a10' : '#1a1a0a'} opacity="0.8"/>
          <circle cx="115" cy="78" r="22" fill={health >= 40 ? '#2a5a1a' : '#1a1a0a'} opacity="0.8"/>
          <text x="95" y="172" textAnchor="middle" fontSize="8" fill="#c8a96e" opacity="0.6">Ancient Baobab</text>
          {/* Flower beds */}
          {health >= 20 && (
            <g>
              <ellipse cx="250" cy="185" rx="60" ry="25" fill="#1a3a10" opacity="0.7"/>
              {['🌹','🌻','🌷','🌸','🌺'].map((f, i) => (
                <text key={i} x={215+i*18} y="188" fontSize="14">{f}</text>
              ))}
            </g>
          )}
          {/* Herb beds */}
          {health >= 25 && (
            <g>
              <rect x="430" y="165" width="120" height="45" rx="4" fill="#1a3a10" opacity="0.7"/>
              {['🌿','🌱','🍃','🌿'].map((h, i) => (
                <text key={i} x={445+i*28} y="192" fontSize="16">{h}</text>
              ))}
              <text x="490" y="222" textAnchor="middle" fontSize="8" fill="#50a050" opacity="0.6">Herb Beds</text>
            </g>
          )}
          {/* Lotus pond */}
          {health >= 50 && (
            <g>
              <ellipse cx="560" cy="185" rx="50" ry="25" fill="#1a2a3a" opacity="0.8"/>
              <ellipse cx="560" cy="185" rx="40" ry="18" fill="#0a1a2a" opacity="0.9"/>
              {['🪷','🪷','🪷'].map((l, i) => (
                <text key={i} x={535+i*22} y="190" fontSize="14">{l}</text>
              ))}
              <text x="560" y="218" textAnchor="middle" fontSize="8" fill="#4a90d9" opacity="0.6">Lotus Pond</text>
            </g>
          )}
          {/* Stone fountain */}
          {health >= 60 && (
            <g>
              <ellipse cx="350" cy="165" rx="30" ry="15" fill="#2a3a4a" opacity="0.8"/>
              <rect x="338" y="148" width="24" height="20" rx="3" fill="#2a3a4a"/>
              <ellipse cx="350" cy="148" rx="8" ry="5" fill="#4a90d9" opacity="0.5"/>
              <text x="350" y="190" textAnchor="middle" fontSize="8" fill="#4a90d9" opacity="0.6">⛲ Fountain</text>
            </g>
          )}
          {/* Mango trees */}
          {health >= 40 && [0,1,2].map(i => (
            <g key={i}>
              <rect x={580+i*30} y="110" width="12" height="50" rx="3" fill="#5a3510"/>
              <circle cx={586+i*30} cy="100" r="22" fill="#2a5a1a" opacity="0.8"/>
              {health >= 50 && <text x={586+i*30} y="105" textAnchor="middle" fontSize="12">🥭</text>}
            </g>
          ))}
          {/* Low health wilting */}
          {health < 30 && (
            <text x="350" y="250" textAnchor="middle" fontSize="10"
              fill="#e05020" opacity="0.8">⚠ Garden neglected — plants are wilting</text>
          )}
          <text x="350" y="18" textAnchor="middle" fontSize="12"
            fill={health >= 50 ? '#50c050' : '#888'} fontWeight="500" opacity="0.8">
            The Royal Garden of Mentedore
          </text>
        </svg>
      </div>

      {/* Health stat */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-300 w-16">Health</span>
          <div className="flex-1 bg-stone-800 rounded-full h-2.5">
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${health}%`, background: health < 30 ? '#e05020' : health < 60 ? '#c8a040' : '#50c050' }}/>
          </div>
          <span className="text-sm text-stone-400 w-8 text-right">{health}</span>
        </div>
        <p className="text-stone-500 text-xs mt-2 italic">
          {health < 30 ? 'The garden is dying. Weeds choke the flower beds.'
            : health < 60 ? `${unlockedPlants.length} plants growing. The garden needs more care.`
            : `${unlockedPlants.length} plants in full bloom. The garden is magnificent.`}
        </p>
      </div>

      {/* Plant collection */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">
          🌿 Garden Plants — {unlockedPlants.length}/{plants.length} growing
        </p>
        <div className="grid grid-cols-2 gap-3">
          {plants.map(plant => {
            const unlocked = health >= plant.unlockAt
            return (
              <button key={plant.id}
                onClick={() => setSelectedPlant(selectedPlant === plant.id ? null : plant.id)}
                className="rounded-xl p-3 text-left"
                style={{
                  background: selectedPlant === plant.id ? 'rgba(80,192,80,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selectedPlant === plant.id ? 'rgba(80,192,80,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  opacity: unlocked ? 1 : 0.3
                }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">{plant.emoji}</span>
                  <span className="text-xs text-stone-600">{plant.season}</span>
                </div>
                <p className="text-stone-200 text-xs font-medium">
                  {unlocked ? plant.name : `🔒 Requires health ${plant.unlockAt}`}
                </p>
                {selectedPlant === plant.id && unlocked && (
                  <p className="text-stone-500 text-xs mt-2 leading-relaxed">{plant.desc}</p>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Gardeners */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">👨‍🌾 Gardeners</p>
        <div className="flex flex-col gap-2">
          {gardeners.map(g => (
            <div key={g.name} className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: '#50a05022' }}>
                  <span className="text-sm">🌿</span>
                </div>
                <div>
                  <p className="text-stone-200 text-sm">{g.name}</p>
                  <p className="text-stone-600 text-xs">{g.role} · {g.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}