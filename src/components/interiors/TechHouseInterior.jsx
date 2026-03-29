import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const inventions = [
  { id: 'waterwheel', name: 'Water Wheel', emoji: '⚙️', unlockAt: 20, desc: 'Harnesses river flow to power the mill. Boosts food production.', status: 'blueprint', field: 'Engineering' },
  { id: 'printing', name: 'Printing Press', emoji: '📰', unlockAt: 35, desc: 'Spreads knowledge across Mentedore. Doubles library output.', status: 'blueprint', field: 'Communication' },
  { id: 'aqueduct', name: 'Aqueduct System', emoji: '🏗️', unlockAt: 45, desc: 'Channels water from the lake to all districts. Water +10.', status: 'blueprint', field: 'Infrastructure' },
  { id: 'telescope', name: 'Advanced Telescope', emoji: '🔭', unlockAt: 55, desc: 'Built in partnership with the Observatory. Unlocks star charts.', status: 'blueprint', field: 'Astronomy' },
  { id: 'medicine', name: 'Herbal Medicine Lab', emoji: '⚗️', unlockAt: 60, desc: 'Synthesizes cures from garden herbs. Health +15.', status: 'blueprint', field: 'Medicine' },
  { id: 'forge', name: 'Advanced Forge', emoji: '🔥', unlockAt: 65, desc: 'Smelts stronger metals for weapons and tools. Defense +10.', status: 'blueprint', field: 'Metallurgy' },
  { id: 'clocktower', name: 'Clock Tower', emoji: '🕰️', unlockAt: 70, desc: 'Synchronizes the whole kingdom. All stat decay slows by 20%.', status: 'blueprint', field: 'Timekeeping' },
  { id: 'radio', name: 'Signal Tower', emoji: '📡', unlockAt: 80, desc: 'Connects Mentedore to distant kingdoms. Trade routes +2.', status: 'blueprint', field: 'Communication' },
]

const experiments = [
  { id: 'e1', name: 'Water Purification', progress: 75, field: 'Chemistry', desc: 'Testing filtration methods using sand and charcoal layers.' },
  { id: 'e2', name: 'Solar Drying', progress: 40, field: 'Physics', desc: 'Optimizing food preservation using directed sunlight.' },
  { id: 'e3', name: 'Crop Rotation Study', progress: 90, field: 'Agriculture', desc: 'Mapping which crops restore soil nutrients most efficiently.' },
  { id: 'e4', name: 'Bridge Load Testing', progress: 20, field: 'Engineering', desc: 'Calculating maximum weight for the new harbor bridge.' },
]

const blueprints = [
  { name: 'Harbor Bridge', field: 'Engineering', date: 'Year 1, Month 3' },
  { name: 'School Extension', field: 'Architecture', date: 'Year 1, Month 5' },
  { name: 'Market Drainage', field: 'Infrastructure', date: 'Year 1, Month 7' },
  { name: 'Observatory Dome', field: 'Astronomy', date: 'Year 1, Month 9' },
  { name: 'Water Mill', field: 'Engineering', date: 'Year 2, Month 1' },
]

const codeProjects = [
  { name: 'Kingdom Census System', lang: 'Scroll Script', progress: 60, desc: 'Tracks population across all districts' },
  { name: 'Trade Route Calculator', lang: 'Abacus Logic', progress: 85, desc: 'Optimizes cargo loads for harbor ships' },
  { name: 'Weather Prediction Model', lang: 'Star Algebra', progress: 30, desc: 'Uses Observatory data to forecast rainfall' },
]

export default function TechHouseInterior() {
  const knowledge = useGameStore((state) => state.stats.knowledge)
  const [view, setView] = useState('main')

  const unlockedInventions = inventions.filter(inv => knowledge >= inv.unlockAt)
  const lockedInventions = inventions.filter(inv => knowledge < inv.unlockAt)

  if (view === 'lab') {
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setView('main')}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#30c0c022', color: '#30c0c0' }}>
          ← Back to Tech House
        </button>
        <div className="rounded-2xl p-5" style={{ background: '#0a1a1a', border: '1px solid #30c0c040' }}>
          <h2 className="text-xl font-bold text-teal-400">⚗️ The Research Lab</h2>
          <p className="text-stone-400 text-sm mt-1">Active experiments — progress tied to knowledge stat</p>
        </div>
        {/* Lab SVG */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#080f0f' }}>
          <svg width="100%" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="200" fill="#080f0f"/>
            <rect x="0" y="160" width="600" height="40" fill="#0d1515"/>
            {/* Lab benches */}
            <rect x="20" y="100" width="560" height="60" rx="4" fill="#1a2a2a"/>
            <rect x="20" y="95" width="560" height="10" rx="3" fill="#223535"/>
            {/* Flasks and equipment */}
            {[0,1,2,3,4,5,6].map(i => (
              <g key={i}>
                <rect x={40+i*80} y="70" width="12" height="30" rx="6"
                  fill={['#30c0c0','#c03060','#c0c030','#3060c0','#c08030','#30c060','#a030c0'][i]}
                  opacity={knowledge > 50 ? 0.8 : 0.3}/>
                <ellipse cx={46+i*80} cy="100" rx="10" ry="4"
                  fill={['#30c0c0','#c03060','#c0c030','#3060c0','#c08030','#30c060','#a030c0'][i]}
                  opacity="0.5"/>
              </g>
            ))}
            {/* Microscope */}
            <rect x="490" y="60" width="30" height="40" rx="3" fill="#3a3a3a"/>
            <circle cx="505" cy="58" r="12" fill="#2a2a2a" stroke="#30c0c0" strokeWidth="1"/>
            {/* Bubbling effects */}
            {knowledge >= 50 && [0,1,2].map(i => (
              <circle key={i} cx={46+i*160} cy={60+i*5} r="3"
                fill={['#30c0c0','#c03060','#c0c030'][i]} opacity="0.5"/>
            ))}
            <text x="300" y="185" textAnchor="middle" fontSize="9"
              fill="#30c0c0" opacity="0.5">Knowledge level: {knowledge}/100</text>
          </svg>
        </div>
        {/* Experiments */}
        <div className="flex flex-col gap-3">
          {experiments.map(exp => (
            <div key={exp.id} className="rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-stone-200 text-sm font-medium">{exp.name}</p>
                <span className="text-xs rounded-full px-2 py-0.5"
                  style={{ background: '#30c0c022', color: '#30c0c0' }}>{exp.field}</span>
              </div>
              <p className="text-stone-500 text-xs mb-3">{exp.desc}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-stone-800 rounded-full h-2">
                  <div className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${exp.progress}%`, background: '#30c0c0' }}/>
                </div>
                <span className="text-xs text-stone-400">{exp.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (view === 'coding') {
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setView('main')}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#30c0c022', color: '#30c0c0' }}>
          ← Back to Tech House
        </button>
        <div className="rounded-2xl p-5" style={{ background: '#0a1a1a', border: '1px solid #30c0c040' }}>
          <h2 className="text-xl font-bold text-teal-400">💻 The Coding Room</h2>
          <p className="text-stone-400 text-sm mt-1">Where Mentedore's logic systems are built</p>
        </div>
        {/* Coding room SVG */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#050a0a' }}>
          <svg width="100%" viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="180" fill="#050a0a"/>
            <rect x="0" y="140" width="600" height="40" fill="#0a1010"/>
            {/* Desks with screens */}
            {[0,1,2].map(i => (
              <g key={i}>
                <rect x={30+i*190} y="80" width="150" height="60" rx="3" fill="#0d1a1a"/>
                <rect x={40+i*190} y="50" width="130" height="35" rx="4" fill="#0a1515"
                  stroke="#30c0c0" strokeWidth="1" opacity="0.8"/>
                {/* Screen content */}
                {[0,1,2,3].map(j => (
                  <rect key={j} x={45+i*190+j*5} y={55+j*7} width={80-j*10} height="3"
                    rx="1" fill="#30c0c0" opacity={0.3+j*0.1}/>
                ))}
                <rect x={50+i*190} y="85" width="120" height="8" rx="2" fill="#1a2a2a"/>
              </g>
            ))}
            <text x="300" y="170" textAnchor="middle" fontSize="9"
              fill="#30c0c0" opacity="0.4">The Coding Room — Mentedore Logic Systems</text>
          </svg>
        </div>
        {/* Projects */}
        <div className="flex flex-col gap-3">
          {codeProjects.map(proj => (
            <div key={proj.name} className="rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-stone-200 text-sm font-medium">{proj.name}</p>
                <span className="text-xs text-stone-600">{proj.lang}</span>
              </div>
              <p className="text-stone-500 text-xs mb-3">{proj.desc}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-stone-800 rounded-full h-2">
                  <div className="h-2 rounded-full"
                    style={{ width: `${proj.progress}%`, background: '#30c0c0' }}/>
                </div>
                <span className="text-xs text-stone-400">{proj.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (view === 'blueprints') {
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setView('main')}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#30c0c022', color: '#30c0c0' }}>
          ← Back to Tech House
        </button>
        <div className="rounded-2xl p-5" style={{ background: '#0a1a1a', border: '1px solid #30c0c040' }}>
          <h2 className="text-xl font-bold text-teal-400">📐 Blueprint Archive</h2>
          <p className="text-stone-400 text-sm mt-1">{blueprints.length} blueprints filed</p>
        </div>
        <div className="flex flex-col gap-2">
          {blueprints.map((bp, i) => (
            <div key={i} className="rounded-xl px-4 py-3 flex items-center justify-between"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div>
                <p className="text-stone-200 text-sm">📐 {bp.name}</p>
                <p className="text-stone-500 text-xs mt-0.5">{bp.field}</p>
              </div>
              <p className="text-stone-600 text-xs">{bp.date}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Tech House scene SVG */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#080f0f' }}>
        <svg width="100%" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="700" height="240" fill="#080f0f"/>
          <rect x="0" y="190" width="700" height="50" fill="#0d1515"/>
          {[0,1,2,3,4,5,6].map(i => (
            <rect key={i} x={i*100} y="190" width="100" height="50"
              fill={i%2===0 ? '#0d1515' : '#0a1212'}/>
          ))}
          {/* Back wall with blueprints */}
          <rect x="0" y="0" width="700" height="192" fill="#080f0f"/>
          {[0,1,2,3,4].map(i => (
            <g key={i}>
              <rect x={30+i*130} y="20" width="90" height="65" rx="2"
                fill="#0a1a2a" stroke="#30c0c0" strokeWidth="1" opacity="0.6"/>
              {[0,1,2,3].map(j => (
                <line key={j} x1={38+i*130} y1={30+j*12} x2={108+i*130} y2={30+j*12}
                  stroke="#30c0c0" strokeWidth="0.5" opacity="0.4"/>
              ))}
              <line x1={75+i*130} y1="22" x2={75+i*130} y2="83"
                stroke="#30c0c0" strokeWidth="0.5" opacity="0.3"/>
            </g>
          ))}
          {/* Main workbench */}
          <rect x="80" y="130" width="540" height="60" rx="4" fill="#1a2a2a"/>
          <rect x="80" y="125" width="540" height="10" rx="3" fill="#223535"/>
          {/* Tools on bench */}
          {['⚙️','🔧','🔨','📏','🪛','⚗️','🔬'].map((tool, i) => (
            <text key={i} x={100+i*75} y="165" fontSize="20">{tool}</text>
          ))}
          {/* Gear decorations */}
          {[50,650].map(x => (
            <g key={x}>
              <circle cx={x} cy="150" r="30" fill="none"
                stroke="#30c0c0" strokeWidth="2" opacity="0.2"/>
              <circle cx={x} cy="150" r="15" fill="none"
                stroke="#30c0c0" strokeWidth="1" opacity="0.2"/>
            </g>
          ))}
          {/* Knowledge indicator */}
          <text x="350" y="228" textAnchor="middle" fontSize="10"
            fill="#30c0c0" opacity="0.6">
            {knowledge < 40 ? '⚠ Low knowledge — most inventions locked'
              : knowledge < 70 ? `${unlockedInventions.length} inventions unlocked`
              : `${unlockedInventions.length} inventions active — Tech House thriving`}
          </text>
          <text x="350" y="15" textAnchor="middle" fontSize="12"
            fill="#30c0c0" fontWeight="500" opacity="0.8">
            The Tech House of Mentedore
          </text>
        </svg>
      </div>

      {/* Knowledge stat */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-300 w-24">Knowledge</span>
          <div className="flex-1 bg-stone-800 rounded-full h-2.5">
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${knowledge}%`, background: knowledge < 40 ? '#e05020' : knowledge < 70 ? '#c8a040' : '#30c0c0' }}/>
          </div>
          <span className="text-sm text-stone-400 w-8 text-right">{knowledge}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { id: 'lab', label: 'Research Lab', emoji: '⚗️', color: '#30c0c0' },
          { id: 'coding', label: 'Coding Room', emoji: '💻', color: '#30c0c0' },
          { id: 'blueprints', label: 'Blueprint Archive', emoji: '📐', color: '#30c0c0' },
        ].map(room => (
          <button key={room.id} onClick={() => setView(room.id)}
            className="rounded-xl p-3 text-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${room.color}30` }}>
            <p className="text-lg mb-1">{room.emoji}</p>
            <p className="text-xs" style={{ color: room.color }}>{room.label}</p>
          </button>
        ))}
      </div>

      {/* Inventions board */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">
          ⚙️ Inventions Board — {unlockedInventions.length}/{inventions.length} unlocked
        </p>

        {/* Unlocked */}
        <div className="flex flex-col gap-2 mb-4">
          {unlockedInventions.map(inv => (
            <div key={inv.id} className="rounded-xl px-4 py-3"
              style={{ background: 'rgba(48,192,192,0.08)', border: '1px solid rgba(48,192,192,0.2)' }}>
              <div className="flex items-center justify-between">
                <p className="text-teal-300 text-sm font-medium">{inv.emoji} {inv.name}</p>
                <span className="text-xs rounded-full px-2 py-0.5"
                  style={{ background: '#30c0c022', color: '#30c0c0' }}>{inv.field}</span>
              </div>
              <p className="text-stone-500 text-xs mt-1">{inv.desc}</p>
            </div>
          ))}
        </div>

        {/* Locked */}
        {lockedInventions.length > 0 && (
          <>
            <p className="text-xs text-stone-600 mb-2">🔒 Locked — increase knowledge to unlock</p>
            <div className="flex flex-col gap-2">
              {lockedInventions.map(inv => (
                <div key={inv.id} className="rounded-xl px-4 py-3 opacity-40"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center justify-between">
                    <p className="text-stone-500 text-sm">🔒 {inv.name}</p>
                    <span className="text-xs text-stone-600">Requires {inv.unlockAt} knowledge</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Observatory partnership */}
      <div className="rounded-2xl p-4"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(154,112,224,0.2)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">🔭 Observatory Partnership</p>
        <p className="text-stone-400 text-sm">
          {knowledge >= 55
            ? 'Active collaboration with the Observatory. Star data feeds into the Weather Prediction Model.'
            : 'Reach knowledge level 55 to unlock joint research with the Observatory.'}
        </p>
        {knowledge >= 55 && (
          <div className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: 'rgba(154,112,224,0.1)' }}>
            <span className="text-purple-400 text-xs">📡 Signal active — data syncing with Observatory</span>
          </div>
        )}
      </div>

    </div>
  )
}