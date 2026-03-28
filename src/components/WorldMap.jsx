import useGameStore from '../store/gameStore'

export default function WorldMap() {
const stats = useGameStore((state) => state.stats)

  const w = stats.water
  const f = stats.food
  const k = stats.knowledge
  const h = stats.health
  const d = stats.defense
  const m = stats.morale
  console.log('stats:', stats)

// Color helpers — more sensitive thresholds
  const waterColor = w < 40 ? '#7a5c2e' : w < 65 ? '#4a90d9' : '#1a6eb5'
  const lakeColor  = w < 40 ? '#c8a96e' : w < 65 ? '#5ba3e0' : '#2980b9'
  const farmColor  = f < 40 ? '#c8955a' : f < 65 ? '#a8c56a' : '#5a9e2f'
  const soilColor  = f < 40 ? '#8B4513' : '#6b8e3a'

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-stone-700" style={{ background: '#1a3a5c' }}>
      <svg width="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">

        {/* Ocean background */}
        <rect x="0" y="0" width="800" height="500" fill={waterColor} opacity="0.6"/>
        <rect x="0" y="0" width="800" height="500" fill="#0d2b45"/>

        {/* Ocean waves */}
        {[1,2,3,4,5].map(i => (
          <ellipse key={i} cx={i*160-40} cy={450} rx="120" ry="8"
            fill="none" stroke="#1a6eb5" strokeWidth="1.5" opacity="0.3"/>
        ))}

        {/* Island base */}
        <ellipse cx="400" cy="260" rx="320" ry="200" fill="#8B6914"/>
        <ellipse cx="400" cy="255" rx="300" ry="185" fill="#7a9e4a"/>

        {/* Sandy beach ring */}
        <ellipse cx="400" cy="260" rx="320" ry="200" fill="none"
          stroke="#c8a96e" strokeWidth="18" opacity="0.5"/>
        {/* Lake — shrinks when water is low */}
        <ellipse cx="250" cy="300" rx={w < 40 ? 20 : w < 65 ? 45 : 65}
          ry={w < 40 ? 12 : w < 65 ? 28 : 40} fill={lakeColor} opacity="0.9"/>
        <ellipse cx="250" cy="295" rx={w < 40 ? 10 : w < 65 ? 25 : 40}
          ry={w < 40 ? 5 : w < 65 ? 12 : 18} fill="#a8d8f0" opacity="0.4"/>

        {/* Farmlands — green or cracked */}
        <rect x="480" y="300" width="140" height="80" rx="8" fill={farmColor} opacity="0.85"/>
        <rect x="490" y="310" width="35" height="55" rx="4" fill={soilColor} opacity="0.6"/>
        <rect x="533" y="310" width="35" height="55" rx="4" fill={soilColor} opacity="0.6"/>
        <rect x="576" y="310" width="35" height="55" rx="4" fill={soilColor} opacity="0.6"/>

        {/* Crop rows — only show if food is healthy */}
        {f >= 40 && [0,1,2,3,4].map(i => (
          <line key={i} x1={495 + i*14} y1="315" x2={495 + i*14} y2="360"
            stroke="#2d5a1b" strokeWidth="2" opacity="0.7"/>
        ))}

        {/* Cracked soil lines when food is low */}
        {f < 30 && <>
          <line x1="490" y1="320" x2="610" y2="370" stroke="#5a3010" strokeWidth="1" opacity="0.6"/>
          <line x1="530" y1="305" x2="560" y2="375" stroke="#5a3010" strokeWidth="1" opacity="0.6"/>
          <line x1="570" y1="310" x2="500" y2="365" stroke="#5a3010" strokeWidth="1" opacity="0.6"/>
        </>}
        {/* Library — glowing when knowledge is high */}
        <rect x="340" y="170" width="70" height="55" rx="4" fill={k < 20 ? '#3a3020' : '#8B6914'}/>
        <rect x="345" y="160" width="60" height="15" rx="2" fill={k < 20 ? '#2a2010' : '#a07820'}/>
        {/* Library windows */}
        <rect x="350" y="180" width="14" height="18" rx="2"
          fill={k < 20 ? '#1a1a1a' : k > 60 ? '#ffe066' : '#c8a040'} opacity="0.9"/>
        <rect x="372" y="180" width="14" height="18" rx="2"
          fill={k < 20 ? '#1a1a1a' : k > 60 ? '#ffe066' : '#c8a040'} opacity="0.9"/>
        <rect x="394" y="180" width="14" height="18" rx="2"
          fill={k < 20 ? '#1a1a1a' : k > 60 ? '#ffe066' : '#c8a040'} opacity="0.9"/>
        {/* Library glow when knowledge is high */}
        {k > 60 && <ellipse cx="375" cy="200" rx="45" ry="30"
          fill="#ffe066" opacity="0.12"/>}
        {/* Library label */}
        <text x="375" y="238" textAnchor="middle"
          fontSize="9" fill="#c8a96e" opacity="0.8">Library</text>

        {/* Houses — populated or abandoned based on health */}
        {[0,1,2,3,4].map(i => (
          <g key={i} opacity={h < 20 ? 0.3 : h < 50 ? 0.6 + i*0.05 : 1}>
            <rect x={155 + i*38} y="280" width="28" height="24" rx="2"
              fill={h < 30 ? '#5a4a3a' : '#c8955a'}/>
            <polygon points={`${155+i*38},280 ${169+i*38},262 ${183+i*38},280`}
              fill={h < 30 ? '#3a2a1a' : '#8B3a1a'}/>
            <rect x={163+i*38} y="290" width="8" height="14" rx="1"
              fill={h < 30 ? '#1a1a1a' : '#4a2a0a'}/>
            {/* Lit windows when health is good */}
            {h >= 50 && <rect x={156+i*38} y="283" width="7" height="6" rx="1"
              fill="#ffe066" opacity="0.8"/>}
          </g>
        ))}
        <text x="200" y="318" textAnchor="middle"
          fontSize="9" fill="#c8a96e" opacity="0.8">Village</text>
          {/* Castle — strong or crumbling based on defense */}
        <rect x="420" y="175" width="80" height="60" rx="3"
          fill={d < 20 ? '#4a4a4a' : '#6a6a8a'}/>
        {/* Castle towers */}
        <rect x="415" y="160" width="22" height="35" rx="2"
          fill={d < 20 ? '#3a3a3a' : '#5a5a7a'}/>
        <rect x="483" y="160" width="22" height="35" rx="2"
          fill={d < 20 ? '#3a3a3a' : '#5a5a7a'}/>
        {/* Tower battlements */}
        {[0,1,2].map(i => (
          <rect key={i} x={416+i*7} y="156" width="5" height="7" rx="1"
            fill={d < 20 ? '#2a2a2a' : '#4a4a6a'}/>
        ))}
        {[0,1,2].map(i => (
          <rect key={i} x={484+i*7} y="156" width="5" height="7" rx="1"
            fill={d < 20 ? '#2a2a2a' : '#4a4a6a'}/>
        ))}
        {/* Castle gate */}
        <rect x="448" y="205" width="24" height="30" rx="3"
          fill={d < 20 ? '#1a1a1a' : '#2a2a3a'}/>
        {/* Castle flag */}
        {d >= 50 && <>
          <line x1="460" y1="160" x2="460" y2="140" stroke="#c8a96e" strokeWidth="1.5"/>
          <polygon points="460,140 475,147 460,154" fill="#c84040" opacity="0.9"/>
        </>}
        {/* Crumbling effect */}
        {d < 30 && <>
          <line x1="420" y1="180" x2="430" y2="200" stroke="#2a2a2a" strokeWidth="2" opacity="0.7"/>
          <line x1="490" y1="175" x2="480" y2="195" stroke="#2a2a2a" strokeWidth="2" opacity="0.7"/>
        </>}
        <text x="460" y="248" textAnchor="middle"
          fontSize="9" fill="#c8a96e" opacity="0.8">Castle</text>

        {/* Town square — festival or unrest based on morale */}
        <ellipse cx="370" cy="310" rx="35" ry="22" fill={m < 20 ? '#3a2a1a' : '#c8a050'} opacity="0.5"/>
        {/* Festival banners when morale is high */}
        {m >= 60 && [0,1,2,3].map(i => (
          <g key={i}>
            <line x1={345+i*18} y1="295" x2={345+i*18} y2="310"
              stroke="#c8a96e" strokeWidth="1"/>
            <polygon points={`${345+i*18},295 ${355+i*18},300 ${345+i*18},305`}
              fill={['#e05050','#50a050','#5050e0','#e0a050'][i]} opacity="0.9"/>
          </g>
        ))}
        {/* Unrest fires when morale is low */}
        {m < 30 && [0,1].map(i => (
          <g key={i}>
            <ellipse cx={355+i*25} cy="308" rx="5" ry="3" fill="#e05020" opacity="0.7"/>
            <ellipse cx={355+i*25} cy="304" rx="3" ry="4" fill="#e08020" opacity="0.6"/>
          </g>
        ))}
        <text x="370" y="342" textAnchor="middle"
          fontSize="9" fill="#c8a96e" opacity="0.8">Town Square</text>

    {/* Stat indicators on the map */}
        {w < 20 && <text x="250" y="270" textAnchor="middle"
          fontSize="10" fill="#e05020" fontWeight="bold">⚠ Drought!</text>}
        {f < 20 && <text x="550" y="295" textAnchor="middle"
          fontSize="10" fill="#e05020" fontWeight="bold">⚠ Famine!</text>}
        {k < 20 && <text x="375" y="155" textAnchor="middle"
          fontSize="10" fill="#e05020" fontWeight="bold">⚠ Dark Age!</text>}
        {h < 20 && <text x="200" y="258" textAnchor="middle"
          fontSize="10" fill="#e05020" fontWeight="bold">⚠ Plague!</text>}
        {d < 20 && <text x="460" y="148" textAnchor="middle"
          fontSize="10" fill="#e05020" fontWeight="bold">⚠ Raiders!</text>}
        {m < 20 && <text x="370" y="290" textAnchor="middle"
          fontSize="10" fill="#e05020" fontWeight="bold">⚠ Uprising!</text>}

        {/* Map title */}
        <text x="400" y="30" textAnchor="middle"
          fontSize="13" fill="#c8a96e" fontWeight="bold" opacity="0.8">
          Your Kingdom
        </text>

      </svg>
    </div>
  )
}