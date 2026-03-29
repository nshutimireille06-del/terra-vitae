import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const constellations = [
  { id: 'orion', name: 'Orion', unlockAt: 20, stars: [[300,80],[280,110],[320,110],[260,140],[340,140],[275,170],[325,170]], desc: 'The Hunter. Visible in Mentedore skies during harvest season.' },
  { id: 'southcross', name: 'Southern Cross', unlockAt: 30, stars: [[450,100],[430,130],[470,130],[450,160],[450,85]], desc: 'The guiding star of Mentedore sailors navigating the harbor.' },
  { id: 'scorpius', name: 'Scorpius', unlockAt: 40, stars: [[150,120],[170,110],[190,120],[200,140],[190,160],[180,175],[170,185],[165,200]], desc: 'The Scorpion. Rises over Mentedore in the dry season.' },
  { id: 'leo', name: 'Leo', unlockAt: 55, stars: [[520,90],[540,80],[560,90],[575,110],[560,130],[520,130],[500,150]], desc: 'The Lion. Symbol of strength — carved above Castle Mentedore gate.' },
  { id: 'pleiades', name: 'Pleiades', unlockAt: 70, stars: [[350,50],[365,45],[375,55],[360,65],[345,65],[335,58],[355,72]], desc: 'The Seven Sisters. Farmers of Mentedore plant by their rising.' },
]

const discoveries = [
  { name: 'The Mentedore Comet', date: 'Year 1, Month 4', desc: 'A bright comet visible for 3 nights. Considered a good omen.', unlockAt: 25 },
  { name: 'Twin Moons Phenomenon', date: 'Year 1, Month 8', desc: 'Two moons appeared close together. Scholars still debate the cause.', unlockAt: 40 },
  { name: 'The Red Star', date: 'Year 2, Month 1', desc: 'A star turned red for seven days. Linked to the great harvest.', unlockAt: 55 },
  { name: 'Solar Eclipse of Mentedore', date: 'Year 2, Month 6', desc: 'Total darkness for 4 minutes. The kingdom fell silent.', unlockAt: 70 },
]

const researchProjects = [
  { name: 'Lunar Calendar', progress: 80, desc: 'Mapping the moons cycle for Mentedore farming seasons', partner: null },
  { name: 'Star Navigation System', progress: 55, desc: 'Creating star charts for harbor ships', partner: null },
  { name: 'Weather Prediction Model', progress: 35, desc: 'Joint project with the Tech House using signal tower data', partner: 'Tech House' },
  { name: 'Telescope Improvement', progress: 20, desc: 'Joint project with Tech House — advanced lens grinding', partner: 'Tech House' },
]

export default function ObservatoryInterior() {
  const knowledge = useGameStore((state) => state.stats.knowledge)
  const [view, setView] = useState('main')
  const [selectedConstellation, setSelectedConstellation] = useState(null)

  const unlockedConstellations = constellations.filter(c => knowledge >= c.unlockAt)
  const unlockedDiscoveries = discoveries.filter(d => knowledge >= d.unlockAt)

  if (view === 'dome') {
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setView('main')}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#9a70e022', color: '#9a70e0' }}>
          ← Back to Observatory
        </button>
        <div className="rounded-2xl p-5" style={{ background: '#05050f', border: '1px solid #9a70e040' }}>
          <h2 className="text-xl font-bold text-purple-400">🔭 The Stargazing Dome</h2>
          <p className="text-stone-400 text-sm mt-1">
            {unlockedConstellations.length} of {constellations.length} constellations charted
          </p>
        </div>

        {/* Star dome SVG */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#02020a' }}>
          <svg width="100%" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="340" fill="#02020a"/>
            {/* Dome outline */}
            <ellipse cx="300" cy="340" rx="290" ry="310" fill="none"
              stroke="#9a70e0" strokeWidth="1" opacity="0.2"/>
            <ellipse cx="300" cy="340" rx="220" ry="240" fill="none"
              stroke="#9a70e0" strokeWidth="0.5" opacity="0.1"/>
            {/* Background stars */}
            {[...Array(80)].map((_, i) => (
              <circle key={i}
                cx={Math.sin(i * 137.5) * 280 + 300}
                cy={Math.cos(i * 97.3) * 150 + 160}
                r={Math.random() > 0.8 ? 1.5 : 0.8}
                fill="white" opacity={0.2 + (i % 5) * 0.1}/>
            ))}
            {/* Constellations */}
            {unlockedConstellations.map(con => (
              <g key={con.id} style={{ cursor: 'pointer' }}
                onClick={() => setSelectedConstellation(con.id === selectedConstellation ? null : con.id)}>
                {/* Lines between stars */}
                {con.stars.slice(0,-1).map((star, i) => (
                  <line key={i}
                    x1={star[0]} y1={star[1]}
                    x2={con.stars[i+1][0]} y2={con.stars[i+1][1]}
                    stroke={selectedConstellation === con.id ? '#9a70e0' : '#5a4a80'}
                    strokeWidth="0.8" opacity="0.6"/>
                ))}
                {/* Stars */}
                {con.stars.map((star, i) => (
                  <circle key={i} cx={star[0]} cy={star[1]}
                    r={i === 0 ? 3 : 2}
                    fill={selectedConstellation === con.id ? '#c0a0ff' : '#9a8ab0'}
                    opacity="0.9"/>
                ))}
                {/* Name label */}
                <text x={con.stars[0][0]} y={con.stars[0][1] - 8}
                  textAnchor="middle" fontSize="8"
                  fill={selectedConstellation === con.id ? '#c0a0ff' : '#7a6a90'}
                  opacity="0.8">{con.name}</text>
              </g>
            ))}
            {/* Locked constellations hint */}
            {constellations.filter(c => knowledge < c.unlockAt).map((con, i) => (
              <text key={con.id} x={100+i*120} y={280-i*20}
                textAnchor="middle" fontSize="7" fill="#333" opacity="0.5">
                🔒 {con.name}
              </text>
            ))}
            {/* Telescope crosshair */}
            <circle cx="300" cy="170" r="40" fill="none"
              stroke="#9a70e0" strokeWidth="0.5" opacity="0.2"/>
            <line x1="300" y1="140" x2="300" y2="200"
              stroke="#9a70e0" strokeWidth="0.5" opacity="0.2"/>
            <line x1="270" y1="170" x2="330" y2="170"
              stroke="#9a70e0" strokeWidth="0.5" opacity="0.2"/>
          </svg>
        </div>

        {/* Selected constellation info */}
        {selectedConstellation && (
          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(154,112,224,0.08)', border: '1px solid rgba(154,112,224,0.3)' }}>
            {(() => {
              const con = constellations.find(c => c.id === selectedConstellation)
              return (
                <>
                  <p className="text-purple-300 font-medium">{con.name}</p>
                  <p className="text-stone-400 text-sm mt-1">{con.desc}</p>
                </>
              )
            })()}
          </div>
        )}

        {/* Constellation list */}
        <div className="flex flex-col gap-2">
          {constellations.map(con => (
            <div key={con.id} className="rounded-xl px-4 py-3 flex items-center justify-between"
              style={{ background: 'rgba(255,255,255,0.03)', opacity: knowledge >= con.unlockAt ? 1 : 0.3 }}>
              <div>
                <p className="text-stone-200 text-sm">{knowledge >= con.unlockAt ? '⭐' : '🔒'} {con.name}</p>
                {knowledge >= con.unlockAt && <p className="text-stone-500 text-xs mt-0.5">{con.desc}</p>}
              </div>
              {knowledge < con.unlockAt && (
                <span className="text-xs text-stone-600">Requires {con.unlockAt}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (view === 'research') {
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setView('main')}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#9a70e022', color: '#9a70e0' }}>
          ← Back to Observatory
        </button>
        <div className="rounded-2xl p-5" style={{ background: '#05050f', border: '1px solid #9a70e040' }}>
          <h2 className="text-xl font-bold text-purple-400">🔬 Research Lab</h2>
          <p className="text-stone-400 text-sm mt-1">Active research projects — some in partnership with the Tech House</p>
        </div>
        {/* Research lab SVG */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#030308' }}>
          <svg width="100%" viewBox="0 0 600 160" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="160" fill="#030308"/>
            <rect x="0" y="120" width="600" height="40" fill="#080810"/>
            {/* Desks */}
            {[0,1,2].map(i => (
              <g key={i}>
                <rect x={30+i*190} y="60" width="150" height="60" rx="3" fill="#0a0a18"/>
                <rect x={40+i*190} y="30" width="130" height="35" rx="4"
                  fill="#080815" stroke="#9a70e0" strokeWidth="1" opacity="0.6"/>
                {[0,1,2].map(j => (
                  <rect key={j} x={45+i*190} y={35+j*9} width={60+j*15} height="3"
                    rx="1" fill="#9a70e0" opacity={0.2+j*0.1}/>
                ))}
              </g>
            ))}
            {/* Star charts on wall */}
            {[0,1].map(i => (
              <g key={i}>
                <rect x={20+i*320} y="5" width="80" height="55" rx="2"
                  fill="#050510" stroke="#9a70e0" strokeWidth="1" opacity="0.5"/>
                {[...Array(8)].map((_, j) => (
                  <circle key={j}
                    cx={30+i*320+j*9} cy={15+j*5}
                    r="1.5" fill="white" opacity="0.5"/>
                ))}
              </g>
            ))}
            <text x="300" y="148" textAnchor="middle" fontSize="9"
              fill="#9a70e0" opacity="0.4">Observatory Research Lab — Mentedore</text>
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          {researchProjects.map(proj => (
            <div key={proj.name} className="rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-stone-200 text-sm font-medium">{proj.name}</p>
                {proj.partner && (
                  <span className="text-xs rounded-full px-2 py-0.5"
                    style={{ background: '#30c0c022', color: '#30c0c0' }}>
                    🤝 {proj.partner}
                  </span>
                )}
              </div>
              <p className="text-stone-500 text-xs mb-3">{proj.desc}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-stone-800 rounded-full h-2">
                  <div className="h-2 rounded-full"
                    style={{ width: `${proj.progress}%`, background: '#9a70e0' }}/>
                </div>
                <span className="text-xs text-stone-400">{proj.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Observatory scene */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#02020a' }}>
        <svg width="100%" viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="700" height="260" fill="#02020a"/>
          {/* Night sky */}
          {[...Array(60)].map((_, i) => (
            <circle key={i}
              cx={Math.sin(i*137.5)*350+350}
              cy={Math.cos(i*97)*100+80}
              r={i%7===0 ? 2 : 1}
              fill="white" opacity={0.1+i%5*0.08}/>
          ))}
          {/* Moon */}
          <circle cx="80" cy="60" r="30" fill="#f0e8c0" opacity="0.7"/>
          <circle cx="92" cy="52" r="24" fill="#02020a"/>
          {/* Observatory building */}
          <rect x="230" y="120" width="240" height="140" rx="4" fill="#1a1a2a"/>
          {/* Dome */}
          <ellipse cx="350" cy="120" rx="120" ry="60" fill="#2a2a4a"/>
          <ellipse cx="350" cy="120" rx="120" ry="60" fill="none"
            stroke="#9a70e0" strokeWidth="1.5" opacity="0.5"/>
          {/* Dome slit */}
          <rect x="340" y="62" width="20" height="58" rx="2" fill="#050510"/>
          {/* Telescope poking out */}
          {knowledge >= 40 && (
            <line x1="350" y1="80" x2="380" y2="40"
              stroke="#9a70e0" strokeWidth="3" opacity="0.8"/>
          )}
          {/* Building windows */}
          <rect x="255" y="150" width="35" height="50" rx="2" fill="#050510"
            stroke="#9a70e0" strokeWidth="1" opacity="0.6"/>
          <rect x="410" y="150" width="35" height="50" rx="2" fill="#050510"
            stroke="#9a70e0" strokeWidth="1" opacity="0.6"/>
          {knowledge >= 50 && <>
            <rect x="257" y="152" width="31" height="46" rx="1" fill="#9a70e0" opacity="0.15"/>
            <rect x="412" y="152" width="31" height="46" rx="1" fill="#9a70e0" opacity="0.15"/>
          </>}
          {/* Door */}
          <rect x="330" y="210" width="40" height="50" rx="2" fill="#050510"
            stroke="#9a70e0" strokeWidth="1" opacity="0.5"/>
          {/* Ground */}
          <rect x="0" y="220" width="700" height="40" fill="#0a0a15"/>
          {/* Stars unlocked indicator */}
          <text x="350" y="248" textAnchor="middle" fontSize="10"
            fill="#9a70e0" opacity="0.6">
            {knowledge < 30 ? '⚠ Low knowledge — dome is dark'
              : `${unlockedConstellations.length} constellations charted`}
          </text>
          <text x="350" y="15" textAnchor="middle" fontSize="12"
            fill="#9a70e0" fontWeight="500" opacity="0.8">
            The Observatory of Mentedore
          </text>
        </svg>
      </div>

      {/* Knowledge stat */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-300 w-24">Knowledge</span>
          <div className="flex-1 bg-stone-800 rounded-full h-2.5">
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${knowledge}%`, background: knowledge < 40 ? '#e05020' : knowledge < 70 ? '#c8a040' : '#9a70e0' }}/>
          </div>
          <span className="text-sm text-stone-400 w-8 text-right">{knowledge}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setView('dome')}
          className="rounded-xl p-4 text-left"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(154,112,224,0.2)' }}>
          <p className="text-lg mb-1">🔭</p>
          <p className="text-purple-400 text-sm font-medium">Stargazing Dome</p>
          <p className="text-stone-500 text-xs mt-1">{unlockedConstellations.length} constellations</p>
        </button>
        <button onClick={() => setView('research')}
          className="rounded-xl p-4 text-left"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(154,112,224,0.2)' }}>
          <p className="text-lg mb-1">🔬</p>
          <p className="text-purple-400 text-sm font-medium">Research Lab</p>
          <p className="text-stone-500 text-xs mt-1">{researchProjects.length} active projects</p>
        </button>
      </div>

      {/* Discoveries log */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">
          📜 Discoveries Log — {unlockedDiscoveries.length} recorded
        </p>
        <div className="flex flex-col gap-2">
          {discoveries.map(disc => (
            <div key={disc.name}
              className="rounded-xl px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.03)', opacity: knowledge >= disc.unlockAt ? 1 : 0.3 }}>
              <div className="flex items-center justify-between">
                <p className="text-stone-200 text-sm">
                  {knowledge >= disc.unlockAt ? '⭐' : '🔒'} {disc.name}
                </p>
                {knowledge >= disc.unlockAt && (
                  <span className="text-xs text-stone-600">{disc.date}</span>
                )}
              </div>
              {knowledge >= disc.unlockAt && (
                <p className="text-stone-500 text-xs mt-1">{disc.desc}</p>
              )}
              {knowledge < disc.unlockAt && (
                <p className="text-stone-700 text-xs mt-1">Requires knowledge {disc.unlockAt}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tech House partnership */}
      <div className="rounded-2xl p-4"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(48,192,192,0.2)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">💻 Tech House Partnership</p>
        <p className="text-stone-400 text-sm">
          {knowledge >= 55
            ? '2 joint research projects active. Signal tower data feeding into weather models.'
            : 'Reach knowledge level 55 to activate joint research with the Tech House.'}
        </p>
      </div>

    </div>
  )
}