import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const announcements = [
  { title: 'Harvest Festival This Weekend', type: 'event', emoji: '🎉' },
  { title: 'New trade ship arrives from Kingdom of Zara', type: 'trade', emoji: '⚓' },
  { title: 'School enrollment open for new term', type: 'notice', emoji: '🏫' },
  { title: 'Library receives 12 new books', type: 'notice', emoji: '📚' },
  { title: 'Market stalls open at dawn daily', type: 'notice', emoji: '🛒' },
  { title: 'Castle guard recruitment underway', type: 'notice', emoji: '⚔️' },
]

const festivals = [
  { name: 'Harvest Festival', emoji: '🌾', desc: 'The kingdom celebrates a bountiful harvest. Drums, dancing and food fill the square.' },
  { name: 'Founders Day', emoji: '👑', desc: 'Mentedore celebrates its founding. The throne room opens to all citizens.' },
  { name: 'River Festival', emoji: '🌊', desc: 'A celebration of the lake and harbor. Boats are decorated and races are held.' },
  { name: 'Starlight Night', emoji: '🌟', desc: 'The Observatory opens to all. Constellations are named and stories told.' },
]

const unrestEvents = [
  { name: 'Market Protests', emoji: '✊', desc: 'Citizens gather to protest rising prices in the market.' },
  { name: 'Guard Walkout', emoji: '⚠️', desc: 'Castle guards have abandoned their posts. The square is unsafe at night.' },
  { name: 'Food Shortage Rally', emoji: '🍞', desc: 'Hungry citizens demand the bakery reopen. Tension is high.' },
]

const places = [
  { id: 'library', name: 'Library', emoji: '📚', direction: 'North' },
  { id: 'market', name: 'Market', emoji: '🛒', direction: 'East' },
  { id: 'school', name: 'School', emoji: '🏫', direction: 'West' },
  { id: 'harbor', name: 'Harbor', emoji: '⚓', direction: 'South' },
  { id: 'castle', name: 'Castle', emoji: '🏰', direction: 'North-East' },
  { id: 'healing', name: 'Healing House', emoji: '🏥', direction: 'North-West' },
  { id: 'artgallery', name: 'Art Gallery', emoji: '🎨', direction: 'South-East' },
  { id: 'garden', name: 'Garden', emoji: '🌿', direction: 'South-West' },
]

export default function TownSquareInterior() {
  const morale = useGameStore((state) => state.stats.morale)
  const setCurrentPlace = useGameStore((state) => state.setCurrentPlace)
  const [view, setView] = useState('main')

  const isFestival = morale >= 60
  const isUnrest = morale < 30
  const currentEvent = isFestival
    ? festivals[Math.floor(morale / 25) % festivals.length]
    : isUnrest
    ? unrestEvents[Math.floor((30 - morale) / 10) % unrestEvents.length]
    : null

  return (
    <div className="flex flex-col gap-5">

      {/* Town Square scene SVG */}
      <div className="rounded-2xl overflow-hidden"
        style={{ background: isFestival ? '#0a1a0a' : isUnrest ? '#1a0a0a' : '#0f0f0a' }}>
        <svg width="100%" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">

          {/* Sky */}
          <rect x="0" y="0" width="700" height="300"
            fill={isFestival ? '#0a1a0a' : isUnrest ? '#1a0505' : '#0a0a0f'}/>

          {/* Time of day based on morale */}
          {isFestival ? (
            <circle cx="350" cy="40" r="25" fill="#e0c040" opacity="0.5"/>
          ) : isUnrest ? (
            <circle cx="80" cy="50" r="20" fill="#f0e8c0" opacity="0.4"/>
          ) : (
            <circle cx="600" cy="40" r="20" fill="#e0c040" opacity="0.3"/>
          )}

          {/* Ground — cobblestones */}
          <rect x="0" y="160" width="700" height="140"
            fill={isFestival ? '#2a2a18' : isUnrest ? '#1a1010' : '#1e1e14'}/>
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            [0,1,2,3].map(j => (
              <rect key={`${i}-${j}`} x={i*70+j*2} y={165+j*25} width="65" height="20"
                rx="2" fill={isFestival ? '#2a2a18' : '#1a1a10'} stroke="#2a2a18" strokeWidth="1"/>
            ))
          ))}

          {/* Streets going outward */}
          {/* North street */}
          <rect x="310" y="0" width="80" height="160" fill="#1a1a10" opacity="0.6"/>
          {/* South street */}
          <rect x="310" y="220" width="80" height="80" fill="#1a1a10" opacity="0.6"/>
          {/* East street */}
          <rect x="480" y="180" width="220" height="60" fill="#1a1a10" opacity="0.6"/>
          {/* West street */}
          <rect x="0" y="180" width="200" height="60" fill="#1a1a10" opacity="0.6"/>

          {/* Central fountain */}
          <ellipse cx="350" cy="195" rx="60" ry="30"
            fill={morale >= 50 ? '#1a2a3a' : '#1a1a1a'}/>
          <ellipse cx="350" cy="195" rx="45" ry="22"
            fill={morale >= 50 ? '#0a1a2a' : '#0a0a0a'}/>
          {morale >= 50 && <>
            <ellipse cx="350" cy="190" rx="15" ry="8" fill="#4a90d9" opacity="0.4"/>
            <line x1="350" y1="175" x2="350" y2="168" stroke="#4a90d9" strokeWidth="2" opacity="0.5"/>
          </>}
          <rect x="344" y="175" width="12" height="25" rx="3" fill="#3a3a4a"/>
          <text x="350" y="225" textAnchor="middle" fontSize="8"
            fill={morale >= 50 ? '#4a90d9' : '#3a3a4a'} opacity="0.6">
            {morale >= 50 ? '⛲ Fountain' : '⛲ Dry'}
          </text>

          {/* Buildings around the square */}
          {/* North buildings */}
          <rect x="80" y="60" width="120" height="100" rx="4" fill="#1a1a2a" stroke="#3a3a4a" strokeWidth="1"/>
          <text x="140" y="115" textAnchor="middle" fontSize="9" fill="#8a8ab0">📚 Library</text>
          <rect x="500" y="60" width="120" height="100" rx="4" fill="#1a1a2a" stroke="#3a3a4a" strokeWidth="1"/>
          <text x="560" y="115" textAnchor="middle" fontSize="9" fill="#8a8ab0">🏰 Castle</text>

          {/* West buildings */}
          <rect x="10" y="175" width="100" height="60" rx="4" fill="#1a1a2a" stroke="#3a3a4a" strokeWidth="1"/>
          <text x="60" y="210" textAnchor="middle" fontSize="8" fill="#8a8ab0">🏫 School</text>

          {/* East buildings */}
          <rect x="590" y="175" width="100" height="60" rx="4" fill="#1a1a2a" stroke="#3a3a4a" strokeWidth="1"/>
          <text x="640" y="210" textAnchor="middle" fontSize="8" fill="#8a8ab0">🛒 Market</text>

          {/* South buildings */}
          <rect x="80" y="235" width="110" height="55" rx="4" fill="#1a1a2a" stroke="#3a3a4a" strokeWidth="1"/>
          <text x="135" y="267" textAnchor="middle" fontSize="8" fill="#8a8ab0">🌿 Garden</text>
          <rect x="510" y="235" width="110" height="55" rx="4" fill="#1a1a2a" stroke="#3a3a4a" strokeWidth="1"/>
          <text x="565" y="267" textAnchor="middle" fontSize="8" fill="#8a8ab0">⚓ Harbor</text>

          {/* Festival decorations */}
          {isFestival && <>
            {/* Bunting */}
            {[0,1,2,3,4,5,6].map(i => (
              <g key={i}>
                <line x1={i*116} y1="160" x2={(i+1)*116} y2="155"
                  stroke="#c8a040" strokeWidth="1" opacity="0.4"/>
                <polygon points={`${58+i*116},165 ${68+i*116},155 ${78+i*116},165`}
                  fill={['#c84020','#c8a040','#2a6a2a','#2a2a8a','#c84020','#c8a040','#2a6a2a'][i]}
                  opacity="0.7"/>
              </g>
            ))}
            {/* Market stalls */}
            {[0,1,2].map(i => (
              <g key={i}>
                <rect x={180+i*100} y="240" width="70" height="40" rx="3"
                  fill={['#c84020','#2a6a2a','#c8a040'][i]} opacity="0.5"/>
                <text x={215+i*100} y="265" textAnchor="middle" fontSize="14">
                  {['🎪','🎭','🎶'][i]}
                </text>
              </g>
            ))}
          </>}

          {/* Unrest fires */}
          {isUnrest && <>
            {[150,400,550].map(x => (
              <g key={x}>
                <ellipse cx={x} cy="225" rx="15" ry="8" fill="#e05020" opacity="0.4"/>
                <ellipse cx={x} cy="215" rx="8" ry="12" fill="#e08020" opacity="0.3"/>
              </g>
            ))}
          </>}

          {/* Noticeboard */}
          <rect x="460" y="155" width="80" height="55" rx="3" fill="#2a1a08"
            stroke="#c8a040" strokeWidth="1" opacity="0.8"/>
          <text x="500" y="172" textAnchor="middle" fontSize="7" fill="#c8a040">📋 Notices</text>
          {[0,1,2].map(i => (
            <rect key={i} x="468" y={178+i*10} width="55" height="5" rx="1"
              fill="#c8a040" opacity="0.2"/>
          ))}

          {/* Morale indicator */}
          <text x="350" y="292" textAnchor="middle" fontSize="10"
            fill={isFestival ? '#50c050' : isUnrest ? '#e05020' : '#c8a040'} opacity="0.8">
            {isFestival ? `🎉 ${currentEvent?.name} — the square is alive!`
              : isUnrest ? `⚠ ${currentEvent?.name}`
              : '🏛️ The Town Square of Mentedore'}
          </text>

        </svg>
      </div>

      {/* Morale stat */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-300 w-16">Morale</span>
          <div className="flex-1 bg-stone-800 rounded-full h-2.5">
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${morale}%`, background: morale < 30 ? '#e05020' : morale < 60 ? '#c8a040' : '#50c050' }}/>
          </div>
          <span className="text-sm text-stone-400 w-8 text-right">{morale}</span>
        </div>
        <p className="text-stone-500 text-xs mt-2 italic">
          {morale < 30 ? 'Unrest grips the square. Citizens are angry and afraid.'
            : morale < 60 ? 'The square is quiet. Life continues cautiously.'
            : 'The square is full of life. Music, laughter and the smell of food.'}
        </p>
      </div>

      {/* Current event */}
      {currentEvent && (
        <div className="rounded-2xl p-5"
          style={{
            background: isFestival ? 'rgba(80,192,80,0.08)' : 'rgba(224,80,32,0.08)',
            border: `1px solid ${isFestival ? 'rgba(80,192,80,0.3)' : 'rgba(224,80,32,0.3)'}`
          }}>
          <p className="text-xs uppercase tracking-wider mb-2"
            style={{ color: isFestival ? '#50c050' : '#e05020' }}>
            {isFestival ? '🎉 Festival Underway' : '⚠ Civil Unrest'}
          </p>
          <p className="font-medium" style={{ color: isFestival ? '#50c050' : '#e05020' }}>
            {currentEvent.emoji} {currentEvent.name}
          </p>
          <p className="text-stone-400 text-sm mt-1">{currentEvent.desc}</p>
        </div>
      )}

      {/* Navigate to places */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">
          🗺️ From the Town Square — navigate to
        </p>
        <div className="grid grid-cols-2 gap-2">
          {places.map(place => (
            <button key={place.id}
              onClick={() => setCurrentPlace(place.id)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,169,110,0.15)' }}>
              <span className="text-lg">{place.emoji}</span>
              <div>
                <p className="text-stone-200 text-xs font-medium">{place.name}</p>
                <p className="text-stone-600 text-xs">{place.direction}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Noticeboard */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">📋 Town Noticeboard</p>
        <div className="flex flex-col gap-2">
          {announcements.map((note, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span>{note.emoji}</span>
              <p className="text-stone-400 text-xs">{note.title}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}