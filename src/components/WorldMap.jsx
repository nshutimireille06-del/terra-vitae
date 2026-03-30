import useGameStore from '../store/gameStore'

const places = [
  { id: 'library',     label: 'Library',        emoji: '📚', x: 80,  y: 120, w: 100, h: 80,  stat: 'knowledge', side: 'top' },
  { id: 'school',      label: 'School',          emoji: '🏫', x: 220, y: 100, w: 120, h: 100, stat: 'knowledge', side: 'top' },
  { id: 'observatory', label: 'Observatory',     emoji: '🔭', x: 390, y: 80,  w: 110, h: 110, stat: 'knowledge', side: 'top' },
  { id: 'castle',      label: 'Castle',          emoji: '🏰', x: 550, y: 60,  w: 130, h: 130, stat: 'defense',   side: 'top' },
  { id: 'artgallery',  label: 'Art Gallery',     emoji: '🎨', x: 730, y: 100, w: 110, h: 90,  stat: 'morale',    side: 'top' },
  { id: 'techhouse',   label: 'Tech House',      emoji: '💻', x: 880, y: 110, w: 100, h: 80,  stat: 'knowledge', side: 'top' },
  { id: 'healing',     label: 'Healing House',   emoji: '🏥', x: 80,  y: 380, w: 100, h: 80,  stat: 'health',    side: 'bottom' },
  { id: 'garden',      label: 'Garden',          emoji: '🌿', x: 220, y: 370, w: 110, h: 90,  stat: 'health',    side: 'bottom' },
  { id: 'market',      label: 'Market',          emoji: '🛒', x: 380, y: 360, w: 120, h: 100, stat: 'food',      side: 'bottom' },
  { id: 'bakery',      label: 'Bakery',          emoji: '🍞', x: 550, y: 375, w: 100, h: 80,  stat: 'food',      side: 'bottom' },
  { id: 'clothes',     label: 'Clothes Shop',    emoji: '👗', x: 690, y: 365, w: 110, h: 90,  stat: 'morale',    side: 'bottom' },
  { id: 'harbor',      label: 'Harbor',          emoji: '⚓', x: 840, y: 355, w: 120, h: 105, stat: 'water',     side: 'bottom' },
  { id: 'armory',      label: 'Armory',          emoji: '⚔️', x: 1000,y: 370, w: 100, h: 80,  stat: 'defense',   side: 'bottom' },
  { id: 'prison',      label: 'Prison',          emoji: '🔒', x: 1130,y: 380, w: 90,  h: 70,  stat: 'defense',   side: 'bottom' },
  { id: 'townsquare',  label: 'Town Square',     emoji: '🎭', x: 440, y: 230, w: 120, h: 80,  stat: 'morale',    side: 'center' },
]

const STREET_W = 1280
const STREET_H = 520

export default function WorldMap() {
  const stats = useGameStore((state) => state.stats)
  const setCurrentPlace = useGameStore((state) => state.setCurrentPlace)

  const morale = stats.morale
  const health = stats.health
  const defense = stats.defense
  const water = stats.water

  // Sky color based on morale
  const skyColor = morale < 30 ? '#1a0a0a' : morale < 60 ? '#0a0a1a' : '#0a1a2a'
  const groundColor = health < 30 ? '#2a1a08' : '#1a2a08'

  // People count based on stats
  const citizenCount = Math.floor((morale / 100) * 8)
  const guardCount = Math.floor((defense / 100) * 4)
  const childCount = Math.floor((health / 100) * 4)

  const citizens = Array.from({ length: citizenCount }, (_, i) => ({
    x: 150 + i * 140,
    y: 295 + (i % 3) * 12,
    color: [`#c8a070`,`#b89060`,`#d4aa80`,`#a07850`,`#c8b080`,`#d0a870`,`#b88050`,`#c09060`][i % 8],
    clothes: [`#c84020`,`#2a6a2a`,`#2a2a8a`,`#c8a040`,`#8a2a4a`,`#2a8a7a`,`#5a2a8a`,`#c86020`][i % 8],
    dir: i % 2 === 0 ? 1 : -1,
  }))

  const guards = Array.from({ length: guardCount }, (_, i) => ({
    x: 300 + i * 280,
    y: 288,
    color: '#c8a070',
  }))

  const children = Array.from({ length: childCount }, (_, i) => ({
    x: 230 + i * 80,
    y: 300 + (i % 2) * 8,
    color: [`#d4aa80`,`#c8a070`,`#b89060`,`#d0b080`][i % 4],
    clothes: [`#e07030`,`#3070c0`,`#c040a0`,`#30c070`][i % 4],
  }))

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-stone-700"
      style={{ background: skyColor }}>
      <div className="overflow-x-auto">
        <svg width={STREET_W} height={STREET_H}
          viewBox={`0 0 ${STREET_W} ${STREET_H}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', minWidth: STREET_W }}>

          {/* Sky */}
          <rect x="0" y="0" width={STREET_W} height={STREET_H} fill={skyColor}/>

          {/* Sun or moon */}
          {morale >= 50 ? (
            <circle cx="1200" cy="60" r="35" fill="#e0c040" opacity="0.5"/>
          ) : (
            <circle cx="1200" cy="60" r="25" fill="#f0e8c0" opacity="0.3"/>
          )}

          {/* Stars when morale is low */}
          {morale < 50 && [...Array(20)].map((_, i) => (
            <circle key={i} cx={Math.sin(i*137.5)*640+640} cy={Math.sin(i*97)*40+30}
              r="1" fill="white" opacity="0.4"/>
          ))}

          {/* Background hills */}
          <ellipse cx="640" cy="180" rx="700" ry="120" fill={health < 40 ? '#1a1a10' : '#152510'} opacity="0.5"/>

          {/* Main street ground */}
          <rect x="0" y="270" width={STREET_W} height="180" fill={groundColor}/>
          {/* Cobblestone pattern */}
          {[...Array(26)].map((_, i) => (
            [...Array(4)].map((_, j) => (
              <rect key={`${i}-${j}`} x={i*50} y={275+j*22} width="46" height="18"
                rx="2" fill={groundColor} stroke="#1a1808" strokeWidth="1" opacity="0.8"/>
            ))
          ))}

          {/* Pavement */}
          <rect x="0" y="268" width={STREET_W} height="8" fill="#2a2a18" opacity="0.8"/>
          <rect x="0" y="438" width={STREET_W} height="8" fill="#2a2a18" opacity="0.8"/>

          {/* BUILDINGS — Top row */}
          {places.filter(p => p.side === 'top').map(place => {
            const statVal = stats[place.stat]
            const isLow = statVal < 40
            return (
              <g key={place.id} style={{ cursor: 'pointer' }}
                onClick={() => setCurrentPlace(place.id)}>
                {/* Building shadow */}
                <rect x={place.x + 4} y={place.y + 4} width={place.w} height={place.h}
                  rx="4" fill="black" opacity="0.3"/>
                {/* Building body */}
                <rect x={place.x} y={place.y} width={place.w} height={place.h}
                  rx="4" fill={isLow ? '#1a1a1a' : '#2a2a3a'}
                  stroke={isLow ? '#e05020' : '#4a4a6a'} strokeWidth="1.5"/>
                {/* Roof */}
                <rect x={place.x} y={place.y} width={place.w} height="16" rx="4"
                  fill={isLow ? '#2a1010' : '#3a3a5a'}/>
                {/* Windows */}
                <rect x={place.x + 12} y={place.y + 22} width="20" height="18" rx="2"
                  fill={isLow ? '#1a1a1a' : statVal > 60 ? '#ffe066' : '#2a2a4a'} opacity="0.9"/>
                {place.w > 100 && (
                  <rect x={place.x + place.w - 32} y={place.y + 22} width="20" height="18" rx="2"
                    fill={isLow ? '#1a1a1a' : statVal > 60 ? '#ffe066' : '#2a2a4a'} opacity="0.9"/>
                )}
                {/* Door */}
                <rect x={place.x + place.w/2 - 10} y={place.y + place.h - 28} width="20" height="28"
                  rx="2" fill={isLow ? '#0a0a0a' : '#1a1020'}/>
                {/* Emoji sign */}
                <text x={place.x + place.w/2} y={place.y + place.h/2 + 5}
                  textAnchor="middle" fontSize="22">{place.emoji}</text>
                {/* Label */}
                <text x={place.x + place.w/2} y={place.y + place.h + 14}
                  textAnchor="middle" fontSize="8" fill={isLow ? '#e05020' : '#c8a96e'} opacity="0.9">
                  {place.label}
                </text>
                {/* Warning dot */}
                {isLow && (
                  <circle cx={place.x + place.w - 6} cy={place.y + 6} r="6" fill="#e05020"/>
                )}
                {isLow && (
                  <text x={place.x + place.w - 6} y={place.y + 10}
                    textAnchor="middle" fontSize="7" fill="white">!</text>
                )}
                {/* Shop owner at door when stat is good */}
                {statVal >= 50 && (
                  <g>
                    <circle cx={place.x + place.w/2} cy={place.y + place.h - 38} r="6"
                      fill="#c8a070"/>
                    <rect x={place.x + place.w/2 - 4} cy={place.y + place.h - 32}
                      y={place.y + place.h - 32} width="8" height="12" rx="2"
                      fill="#4a3a8a" opacity="0.8"/>
                  </g>
                )}
              </g>
            )
          })}

          {/* BUILDINGS — Bottom row */}
          {places.filter(p => p.side === 'bottom').map(place => {
            const statVal = stats[place.stat]
            const isLow = statVal < 40
            return (
              <g key={place.id} style={{ cursor: 'pointer' }}
                onClick={() => setCurrentPlace(place.id)}>
                <rect x={place.x + 4} y={place.y + 4} width={place.w} height={place.h}
                  rx="4" fill="black" opacity="0.3"/>
                <rect x={place.x} y={place.y} width={place.w} height={place.h}
                  rx="4" fill={isLow ? '#1a1a1a' : '#2a3a2a'}
                  stroke={isLow ? '#e05020' : '#4a6a4a'} strokeWidth="1.5"/>
                <rect x={place.x} y={place.y} width={place.w} height="16" rx="4"
                  fill={isLow ? '#1a1010' : '#3a5a3a'}/>
                <rect x={place.x + 12} y={place.y + 22} width="20" height="18" rx="2"
                  fill={isLow ? '#1a1a1a' : statVal > 60 ? '#ffe066' : '#2a3a2a'} opacity="0.9"/>
                {place.w > 100 && (
                  <rect x={place.x + place.w - 32} y={place.y + 22} width="20" height="18" rx="2"
                    fill={isLow ? '#1a1a1a' : statVal > 60 ? '#ffe066' : '#2a3a2a'} opacity="0.9"/>
                )}
                <rect x={place.x + place.w/2 - 10} y={place.y + place.h - 28} width="20" height="28"
                  rx="2" fill={isLow ? '#0a0a0a' : '#0a1a0a'}/>
                <text x={place.x + place.w/2} y={place.y + place.h/2 + 5}
                  textAnchor="middle" fontSize="22">{place.emoji}</text>
                <text x={place.x + place.w/2} y={place.y - 6}
                  textAnchor="middle" fontSize="8" fill={isLow ? '#e05020' : '#c8a96e'} opacity="0.9">
                  {place.label}
                </text>
                {isLow && (
                  <circle cx={place.x + place.w - 6} cy={place.y + 6} r="6" fill="#e05020"/>
                )}
                {isLow && (
                  <text x={place.x + place.w - 6} y={place.y + 10}
                    textAnchor="middle" fontSize="7" fill="white">!</text>
                )}
                {/* Market vendor */}
                {place.id === 'market' && statVal >= 50 && (
                  <g>
                    <circle cx={place.x + place.w/2} cy={place.y - 16} r="6" fill="#c8a070"/>
                    <rect x={place.x + place.w/2 - 4} y={place.y - 10} width="8" height="12"
                      rx="2" fill="#c84020" opacity="0.8"/>
                  </g>
                )}
              </g>
            )
          })}

          {/* TOWN SQUARE — center */}
          {(() => {
            const ts = places.find(p => p.id === 'townsquare')
            const statVal = stats[ts.stat]
            const isLow = statVal < 40
            return (
              <g style={{ cursor: 'pointer' }} onClick={() => setCurrentPlace('townsquare')}>
                {/* Plaza */}
                <ellipse cx={ts.x + ts.w/2} cy={ts.y + ts.h/2} rx="80" ry="50"
                  fill={morale >= 60 ? '#2a2a18' : '#1a1a10'} opacity="0.8"/>
                {/* Fountain */}
                <ellipse cx={ts.x + ts.w/2} cy={ts.y + ts.h/2} rx="30" ry="18"
                  fill={water >= 50 ? '#1a2a3a' : '#1a1a1a'}/>
                {water >= 50 && (
                  <ellipse cx={ts.x + ts.w/2} cy={ts.y + ts.h/2} rx="15" ry="9"
                    fill="#2a5a8a" opacity="0.5"/>
                )}
                {/* Festival banners */}
                {morale >= 60 && [0,1,2,3].map(i => (
                  <g key={i}>
                    <line x1={ts.x + ts.w/2 - 60 + i*40} y1={ts.y + 10}
                      x2={ts.x + ts.w/2 - 40 + i*40} y2={ts.y + 30}
                      stroke="#c8a040" strokeWidth="1" opacity="0.5"/>
                    <polygon
                      points={`${ts.x + ts.w/2 - 50 + i*40},${ts.y + 15} ${ts.x + ts.w/2 - 42 + i*40},${ts.y + 28} ${ts.x + ts.w/2 - 58 + i*40},${ts.y + 28}`}
                      fill={['#c84020','#c8a040','#2a6a2a','#2a2a8a'][i]} opacity="0.8"/>
                  </g>
                ))}
                {/* Unrest fires */}
                {morale < 30 && [0,1].map(i => (
                  <ellipse key={i} cx={ts.x + 20 + i*80} cy={ts.y + ts.h - 10}
                    rx="10" ry="6" fill="#e05020" opacity="0.4"/>
                ))}
                <text x={ts.x + ts.w/2} y={ts.y + ts.h/2 + 5}
                  textAnchor="middle" fontSize="20">{ts.emoji}</text>
                <text x={ts.x + ts.w/2} y={ts.y + ts.h + 14}
                  textAnchor="middle" fontSize="8" fill="#c8a96e" opacity="0.9">
                  {ts.label}
                </text>
              </g>
            )
          })()}

          {/* WALKING CITIZENS */}
          {citizens.map((c, i) => (
            <g key={i}>
              <circle cx={c.x} cy={c.y - 10} r="7" fill={c.color}/>
              <rect x={c.x - 5} y={c.y - 3} width="10" height="14" rx="2"
                fill={c.clothes} opacity="0.9"/>
              <line x1={c.x - 7} y1={c.y + 1} x2={c.x + 7} y2={c.y + 1}
                stroke={c.clothes} strokeWidth="1.5" opacity="0.7"/>
            </g>
          ))}

          {/* GUARDS */}
          {guards.map((g, i) => (
            <g key={i}>
              <circle cx={g.x} cy={g.y - 10} r="7" fill={g.color}/>
              <rect x={g.x - 5} y={g.y - 3} width="10" height="14" rx="2"
                fill="#2a2a4a" opacity="0.9"/>
              <line x1={g.x + 8} y1={g.y - 5} x2={g.x + 16} y2={g.y - 18}
                stroke="#8a8ab0" strokeWidth="1.5"/>
            </g>
          ))}

          {/* CHILDREN near school */}
          {children.map((c, i) => (
            <g key={i}>
              <circle cx={c.x} cy={c.y - 8} r="5" fill={c.color}/>
              <rect x={c.x - 3} y={c.y - 3} width="7" height="10" rx="1"
                fill={c.clothes} opacity="0.9"/>
            </g>
          ))}

          {/* Kingdom name */}
          <text x={STREET_W/2} y="30" textAnchor="middle" fontSize="16"
            fill="#c8a040" fontWeight="bold" opacity="0.9">
            🌍 Mentedore, Kingdom of Flat Hills
          </text>

          {/* Water — harbor area at bottom */}
          <rect x="820" y="440" width="200" height="80" rx="4"
            fill={water < 30 ? '#3a2a10' : '#0a1a2a'} opacity="0.6"/>
          {water >= 40 && [0,1].map(i => (
            <ellipse key={i} cx={870+i*60} cy="465" rx="25" ry="10"
              fill={water < 30 ? '#5a3510' : '#1a4a7a'} opacity="0.7"/>
          ))}

        </svg>
      </div>

      {/* Scroll hint */}
      <div className="text-center py-2">
        <p className="text-stone-600 text-xs">← scroll to explore Mentedore →</p>
      </div>
    </div>
  )
}