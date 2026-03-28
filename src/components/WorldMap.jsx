import useGameStore from '../store/gameStore'

const places = [
  { id: 'library',     label: 'Library',      emoji: '📚', x: 320, y: 175, stat: 'knowledge' },
  { id: 'school',      label: 'School',        emoji: '🏫', x: 210, y: 175, stat: 'knowledge' },
  { id: 'observatory', label: 'Observatory',   emoji: '🔭', x: 480, y: 150, stat: 'knowledge' },
  { id: 'castle',      label: 'Castle',        emoji: '🏰', x: 530, y: 220, stat: 'defense'   },
  { id: 'armory',      label: 'Armory',        emoji: '⚔️', x: 580, y: 300, stat: 'defense'   },
  { id: 'healing',     label: 'Healing House', emoji: '🏥', x: 160, y: 270, stat: 'health'    },
  { id: 'garden',      label: 'Garden',        emoji: '🌿', x: 200, y: 340, stat: 'health'    },
  { id: 'artgallery',  label: 'Art Gallery',   emoji: '🎨', x: 310, y: 330, stat: 'morale'    },
  { id: 'townsquare',  label: 'Town Square',   emoji: '🎭', x: 400, y: 310, stat: 'morale'    },
  { id: 'market',      label: 'Market',        emoji: '🛒', x: 460, y: 360, stat: 'food'      },
  { id: 'bakery',      label: 'Bakery',        emoji: '🍞', x: 370, y: 390, stat: 'food'      },
  { id: 'clothes',     label: 'Clothes Shop',  emoji: '👗', x: 260, y: 390, stat: 'morale'    },
  { id: 'harbor',      label: 'Harbor',        emoji: '⚓', x: 490, y: 420, stat: 'water'     },
  { id: 'techhouse',   label: 'Tech House',    emoji: '💻', x: 160, y: 195, stat: 'knowledge' },
  { id: 'prison',      label: 'Prison',        emoji: '🔒', x: 590, y: 380, stat: 'defense'   },
]

export default function WorldMap() {
  const stats = useGameStore((state) => state.stats)
  const setCurrentPlace = useGameStore((state) => state.setCurrentPlace)

  const statColor = (val) => val < 40 ? '#e05020' : val < 65 ? '#e0a020' : '#5a9e2f'
  const isLow = (val) => val < 40

  const w = stats.water
  const f = stats.food
  const k = stats.knowledge
  const h = stats.health
  const d = stats.defense
  const m = stats.morale

  const lakeRx = w < 40 ? 18 : w < 65 ? 38 : 55
  const lakeRy = w < 40 ? 10 : w < 65 ? 22 : 32
  const lakeColor = w < 40 ? '#c8a96e' : w < 65 ? '#5ba3e0' : '#2980b9'

  return (
    <div
      className="w-full rounded-2xl overflow-hidden border border-stone-700 cursor-pointer"
      style={{ background: '#0d2b45' }}
    >
      <svg width="100%" viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">

        {/* Ocean */}
        <rect x="0" y="0" width="800" height="520" fill="#0d2b45"/>
        {[1,2,3,4,5].map(i => (
          <ellipse key={i} cx={i*160-40} cy={480} rx="120" ry="8"
            fill="none" stroke="#1a6eb5" strokeWidth="1" opacity="0.25"/>
        ))}

        {/* Island */}
        <ellipse cx="400" cy="290" rx="340" ry="210" fill="#8B6914"/>
        <ellipse cx="400" cy="285" rx="320" ry="195" fill={h < 40 ? '#6b7a3a' : '#7a9e4a'}/>
        <ellipse cx="400" cy="290" rx="340" ry="210" fill="none"
          stroke="#c8a96e" strokeWidth="16" opacity="0.45"/>

        {/* Lake */}
        <ellipse cx="105" cy="350" rx={lakeRx} ry={lakeRy} fill={lakeColor} opacity="0.9"/>
        <ellipse cx="105" cy="346" rx={lakeRx * 0.6} ry={lakeRy * 0.5}
          fill="#a8d8f0" opacity="0.35"/>
        {w >= 65 && <text x="105" y="395" textAnchor="middle" fontSize="10">⛵</text>}
        <text x="105" y="408" textAnchor="middle" fontSize="8" fill="#c8a96e" opacity="0.7">Lake</text>

        {/* Farmlands */}
        <rect x="90" y="420" width="120" height="55" rx="6"
          fill={f < 40 ? '#c8955a' : '#5a9e2f'} opacity="0.7"/>
        {f >= 50 && [0,1,2,3,4,5].map(i => (
          <line key={i} x1={96+i*18} y1="425" x2={96+i*18} y2="470"
            stroke="#2d5a1b" strokeWidth="1.5" opacity="0.6"/>
        ))}
        <text x="150" y="490" textAnchor="middle" fontSize="8" fill="#c8a96e" opacity="0.7">Farmlands</text>

        {/* Kingdom title */}
        <text x="400" y="38" textAnchor="middle" fontSize="14"
          fill="#c8a96e" fontWeight="bold" opacity="0.9">
          🌍 Mentedore, Kingdom of Flat Hills
        </text>

        {/* Place markers */}
        {places.map(place => {
          const statVal = stats[place.stat]
          const low = isLow(statVal)
          return (
            <g key={place.id} style={{ cursor: 'pointer' }}
              onClick={() => setCurrentPlace(place.id)}>
              {/* Glow ring when stat is low */}
              {low && <circle cx={place.x} cy={place.y} r="20"
                fill="#e05020" opacity="0.2"/>}
              {/* Building circle */}
              <circle cx={place.x} cy={place.y} r="16"
                fill={low ? '#3a1a0a' : '#2a3a1a'}
                stroke={low ? '#e05020' : '#c8a96e'}
                strokeWidth="1.5" opacity="0.9"/>
              {/* Emoji */}
              <text x={place.x} y={place.y + 5} textAnchor="middle" fontSize="14">
                {place.emoji}
              </text>
              {/* Label */}
              <text x={place.x} y={place.y + 28} textAnchor="middle"
                fontSize="7.5" fill="#c8a96e" opacity="0.85">
                {place.label}
              </text>
              {/* Warning dot */}
              {low && <circle cx={place.x + 12} cy={place.y - 12} r="5"
                fill="#e05020"/>}
              {low && <text x={place.x + 12} y={place.y - 9} textAnchor="middle"
                fontSize="7" fill="white">!</text>}
            </g>
          )
        })}

      </svg>
    </div>
  )
}