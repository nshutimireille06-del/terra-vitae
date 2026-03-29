import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const rooms = [
  { id: 'throne', name: 'Throne Room', emoji: '👑', desc: 'The heart of Mentedore. The carved wooden throne sits beneath kente banners.' },
  { id: 'greathall', name: 'Great Hall', emoji: '🍖', desc: 'Where the people feast. Long tables of ebony wood, firelight, and drums.' },
  { id: 'warroom', name: 'War Room', emoji: '🗺️', desc: 'Maps of Mentedore and beyond. Battle plans carved into stone tablets.' },
  { id: 'treasury', name: 'Treasury', emoji: '💰', desc: 'Gold, ivory, kente cloth and trade goods. Guarded day and night.' },
  { id: 'chambers', name: 'Royal Chambers', emoji: '🛏️', desc: 'The private quarters of the ruler. Adorned with masks, sculptures and ancestral relics.' },
  { id: 'dungeon', name: 'Dungeon', emoji: '⛓️', desc: 'Below the castle. Dark, cold, and rarely empty when defense is low.' },
]

const battleHistory = [
  { name: 'The First Raid', result: 'Victory', year: 'Year 1', desc: 'Bandits from the eastern hills repelled at the castle gate.' },
  { name: 'The River Dispute', result: 'Draw', year: 'Year 1', desc: 'A neighboring clan contested the lake border. Resolved by council.' },
  { name: 'The Night Siege', result: 'Victory', year: 'Year 2', desc: 'A surprise attack at dusk. The castle walls held. 12 defenders lost.' },
]

const royalDecrees = [
  'All citizens must contribute one task per week to the kingdom.',
  'The harbor is open to trade ships from all peaceful kingdoms.',
  'Knowledge is the highest virtue. The library shall never close.',
  'No person shall go hungry while the bakery has grain.',
]

export default function CastleInterior() {
  const defense = useGameStore((state) => state.stats.defense)
  const knowledge = useGameStore((state) => state.stats.knowledge)
  const morale = useGameStore((state) => state.stats.morale)
  const [currentRoom, setCurrentRoom] = useState(null)

  const guardCount = Math.floor(5 + (defense / 100) * 25)
  const treasuryLevel = defense < 40 ? 'depleted' : defense < 70 ? 'moderate' : 'full'

  if (currentRoom) {
    const room = rooms.find(r => r.id === currentRoom)
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setCurrentRoom(null)}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#8a8ab022', color: '#8a8ab0' }}>
          ← Back to Castle
        </button>

        {/* Room SVG */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0a0a12' }}>
          <svg width="100%" viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="260" fill="#0a0a12"/>
            <rect x="0" y="200" width="600" height="60" fill="#12121a"/>
            {[0,1,2,3,4,5].map(i => (
              <rect key={i} x={i*100} y="200" width="100" height="60"
                fill={i%2===0 ? '#12121a' : '#0e0e16'}/>
            ))}

            {currentRoom === 'throne' && <>
              {/* Kente banners */}
              {[0,1,2,3].map(i => (
                <g key={i}>
                  <rect x={30+i*170} y="0" width="25" height="80" rx="2"
                    fill={['#c8a040','#c84020','#2a6a2a','#2a2a8a'][i]} opacity="0.7"/>
                  {[0,1,2,3].map(j => (
                    <rect key={j} x={30+i*170} y={j*20} width="25" height="5"
                      fill={['#2a2a8a','#2a6a2a','#c84020','#c8a040'][j]} opacity="0.5"/>
                  ))}
                </g>
              ))}
              {/* Throne */}
              <rect x="250" y="100" width="100" height="100" rx="4" fill="#5a3510"/>
              <rect x="240" y="80" width="120" height="25" rx="4" fill="#6a4520"/>
              {/* Carved symbols on throne */}
              <circle cx="300" cy="92" r="8" fill="none" stroke="#c8a040" strokeWidth="1.5"/>
              <text x="300" y="97" textAnchor="middle" fontSize="10" fill="#c8a040">✦</text>
              {[0,1,2,3].map(i => (
                <rect key={i} x={255+i*22} y="108" width="16" height="16" rx="2"
                  fill={['#c84020','#2a6a2a','#c8a040','#2a2a8a'][i]} opacity="0.6"/>
              ))}
              {/* Royal cushion */}
              <ellipse cx="300" cy="155" rx="35" ry="15" fill="#8B0000" opacity="0.8"/>
              {/* Torches */}
              {[80,520].map(x => (
                <g key={x}>
                  <rect x={x-4} y="60" width="8" height="30" rx="2" fill="#5a3510"/>
                  <ellipse cx={x} cy="58" rx="8" ry="12" fill="#e06020" opacity="0.7"/>
                  <ellipse cx={x} cy="52" rx="5" ry="8" fill="#ffe066" opacity="0.6"/>
                </g>
              ))}
              <text x="300" y="240" textAnchor="middle" fontSize="9"
                fill="#c8a040" opacity="0.6">The Throne of Mentedore</text>
            </>}

            {currentRoom === 'greathall' && <>
              {/* Long tables */}
              {[0,1].map(i => (
                <g key={i}>
                  <rect x="60" y={80+i*80} width="480" height="30" rx="3" fill="#3a2010"/>
                  <rect x="55" y={75+i*80} width="490" height="8" rx="2" fill="#4a2a18"/>
                  {/* Food on table */}
                  {[0,1,2,3,4,5,6].map(j => (
                    <text key={j} x={80+j*65} y={100+i*80} fontSize="16">
                      {['🍖','🍲','🥘','🍠','🌽','🥜','🍯'][j]}
                    </text>
                  ))}
                </g>
              ))}
              {/* Fire pit */}
              <ellipse cx="300" cy="195" rx="40" ry="15" fill="#8B3a1a" opacity="0.7"/>
              <ellipse cx="300" cy="188" rx="20" ry="25" fill="#e06020" opacity="0.5"/>
              <ellipse cx="300" cy="180" rx="12" ry="18" fill="#ffe066" opacity="0.4"/>
              {/* Drums */}
              {[120,480].map(x => (
                <g key={x}>
                  <ellipse cx={x} cy="175" rx="18" ry="8" fill="#5a3510"/>
                  <rect x={x-18} y="175" width="36" height="25" rx="4" fill="#4a2808"/>
                  <ellipse cx={x} cy="200" rx="18" ry="8" fill="#3a2010"/>
                </g>
              ))}
              <text x="300" y="248" textAnchor="middle" fontSize="9"
                fill="#c8a040" opacity="0.6">The Great Hall — {morale >= 60 ? 'A feast is underway' : 'The hall is quiet'}</text>
            </>}

            {currentRoom === 'warroom' && <>
              {/* Large map table */}
              <rect x="100" y="80" width="400" height="120" rx="4" fill="#3a2a10"/>
              <rect x="95" y="75" width="410" height="10" rx="3" fill="#4a3520"/>
              {/* Map on table */}
              <rect x="110" y="85" width="380" height="108" rx="3" fill="#c8b078" opacity="0.3"/>
              {/* Map details */}
              <ellipse cx="300" cy="140" rx="60" ry="40" fill="#2a6a2a" opacity="0.4"/>
              <ellipse cx="300" cy="140" rx="30" ry="20" fill="#1a5a1a" opacity="0.5"/>
              <text x="300" y="144" textAnchor="middle" fontSize="8" fill="#c8a040">Mentedore</text>
              {/* Surrounding kingdoms */}
              {[{x:160,y:100,n:'Zara'},{x:430,y:110,n:'Sands'},{x:200,y:175,n:'Shores'},{x:400,y:170,n:'Isles'}].map(k => (
                <g key={k.n}>
                  <ellipse cx={k.x} cy={k.y} rx="25" ry="15" fill="#1a3a1a" opacity="0.4"/>
                  <text x={k.x} y={k.y+4} textAnchor="middle" fontSize="7" fill="#c8a96e" opacity="0.7">{k.n}</text>
                  <line x1={k.x} y1={k.y} x2="300" y2="140" stroke="#c8a040" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3"/>
                </g>
              ))}
              {/* Weapon markers */}
              {[0,1,2].map(i => (
                <text key={i} x={150+i*100} y="145" fontSize="12">⚔️</text>
              ))}
              <text x="300" y="240" textAnchor="middle" fontSize="9"
                fill="#c8a040" opacity="0.6">War Room — {defense >= 60 ? 'Borders secured' : 'Borders at risk'}</text>
            </>}

            {currentRoom === 'treasury' && <>
              {/* Shelves */}
              {[0,1,2].map(i => (
                <rect key={i} x="60" y={60+i*55} width="480" height="8" rx="2" fill="#4a3020"/>
              ))}
              {/* Treasure items */}
              {treasuryLevel !== 'depleted' && [0,1,2,3,4,5,6,7].map(i => (
                <g key={i}>
                  <rect x={70+i*60} y="30" width="40" height="35" rx="3"
                    fill={['#c8a040','#8B3a1a','#2a2a6a','#c8a040','#5a3a1a','#c8a040','#2a6a2a','#8B0000'][i]}
                    opacity={treasuryLevel === 'full' ? 0.9 : 0.5}/>
                  <text x={90+i*60} y="52" textAnchor="middle" fontSize="16">
                    {['💰','🏺','📜','⚱️','🪬','🥇','💎','👑'][i]}
                  </text>
                </g>
              ))}
              {treasuryLevel === 'depleted' && (
                <text x="300" y="120" textAnchor="middle" fontSize="12"
                  fill="#e05020" opacity="0.6">Treasury nearly empty</text>
              )}
              {/* Gold coins scattered */}
              {defense >= 50 && [0,1,2,3,4].map(i => (
                <circle key={i} cx={80+i*120} cy={100+i*20} r="8"
                  fill="#c8a040" opacity="0.6"/>
              ))}
              <text x="300" y="240" textAnchor="middle" fontSize="9"
                fill="#c8a040" opacity="0.6">Royal Treasury — {treasuryLevel}</text>
            </>}

            {currentRoom === 'chambers' && <>
              {/* Bed */}
              <rect x="180" y="80" width="240" height="100" rx="6" fill="#3a1a1a"/>
              <rect x="175" y="75" width="250" height="20" rx="4" fill="#4a2a2a"/>
              <rect x="185" y="85" width="230" height="90" rx="4" fill="#8B0000" opacity="0.6"/>
              {/* Pillows */}
              <ellipse cx="240" cy="100" rx="35" ry="18" fill="#c8a0a0" opacity="0.5"/>
              <ellipse cx="360" cy="100" rx="35" ry="18" fill="#c8a0a0" opacity="0.5"/>
              {/* Ancestral masks on wall */}
              {[0,1,2,3].map(i => (
                <g key={i}>
                  <ellipse cx={80+i*145} cy="50" rx="20" ry="28" fill="#5a3510"/>
                  <ellipse cx={80+i*145} cy="50" rx="15" ry="22" fill="#3a2008"/>
                  <ellipse cx={80+i*145} cy="44" rx="6" ry="4" fill="#1a0a00"/>
                  <ellipse cx={80+i*145} cy="56" rx="8" ry="3" fill="#1a0a00"/>
                </g>
              ))}
              {/* Kente cloth hanging */}
              <rect x="500" y="40" width="80" height="120" rx="2"
                fill="#c8a040" opacity="0.5"/>
              {[0,1,2,3,4,5].map(i => (
                <rect key={i} x="500" y={40+i*20} width="80" height="10"
                  fill={['#c84020','#2a2a8a','#c8a040','#2a6a2a','#8B0000','#c8a040'][i]}
                  opacity="0.4"/>
              ))}
              <text x="300" y="240" textAnchor="middle" fontSize="9"
                fill="#c8a040" opacity="0.6">Royal Chambers — Private quarters</text>
            </>}

            {currentRoom === 'dungeon' && <>
              {/* Dark dungeon */}
              <rect x="0" y="0" width="600" height="260" fill="#050508"/>
              {/* Stone walls */}
              {[0,1,2,3,4,5].map(i => (
                <g key={i}>
                  <rect x={i*100} y="0" width="100" height="260"
                    fill="none" stroke="#1a1a20" strokeWidth="1"/>
                  {[0,1,2].map(j => (
                    <rect key={j} x={5+i*100} y={20+j*80} width="90" height="35" rx="2"
                      fill="#0a0a10" stroke="#1a1a20" strokeWidth="0.5"/>
                  ))}
                </g>
              ))}
              {/* Torch */}
              <rect x="296" y="40" width="8" height="20" rx="2" fill="#5a3510"/>
              <ellipse cx="300" cy="38" rx="8" ry="12" fill="#e06020" opacity="0.5"/>
              {/* Chains */}
              {[150, 450].map(x => (
                <g key={x}>
                  <line x1={x} y1="0" x2={x} y2="80" stroke="#5a5a6a" strokeWidth="2" strokeDasharray="8 4"/>
                  <circle cx={x} cy="85" r="10" fill="none" stroke="#5a5a6a" strokeWidth="2"/>
                </g>
              ))}
              {/* Cell bars */}
              {[0,1].map(i => (
                <g key={i}>
                  <rect x={80+i*350} y="100" width="120" height="100" rx="2"
                    fill="none" stroke="#5a5a6a" strokeWidth="1.5"/>
                  {[0,1,2,3].map(j => (
                    <line key={j} x1={88+j*28+i*350} y1="100" x2={88+j*28+i*350} y2="200"
                      stroke="#5a5a6a" strokeWidth="1.5"/>
                  ))}
                </g>
              ))}
              <text x="300" y="248" textAnchor="middle" fontSize="9"
                fill="#5a5a6a" opacity="0.6">
                The Dungeon — {defense < 30 ? 'Overcrowded' : 'Quiet'}
              </text>
            </>}

          </svg>
        </div>

        {/* Room description */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-stone-300 text-sm leading-relaxed">{room.desc}</p>
          {currentRoom === 'throne' && (
            <div className="mt-4">
              <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">Royal Decrees</p>
              {royalDecrees.map((decree, i) => (
                <div key={i} className="flex gap-2 mt-2">
                  <span className="text-amber-600 text-xs">📜</span>
                  <p className="text-stone-400 text-xs">{decree}</p>
                </div>
              ))}
            </div>
          )}
          {currentRoom === 'warroom' && (
            <div className="mt-4">
              <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">Battle History</p>
              {battleHistory.map((battle, i) => (
                <div key={i} className="flex items-center justify-between mt-2 rounded-lg px-3 py-2"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div>
                    <p className="text-stone-300 text-xs font-medium">{battle.name}</p>
                    <p className="text-stone-600 text-xs">{battle.desc}</p>
                  </div>
                  <span className="text-xs rounded-full px-2 py-0.5 ml-2"
                    style={{
                      background: battle.result === 'Victory' ? '#1a3a1a' : '#3a3a1a',
                      color: battle.result === 'Victory' ? '#50c050' : '#c8c840'
                    }}>{battle.result}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Castle exterior SVG */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#0a0a12' }}>
        <svg width="100%" viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="700" height="280" fill="#0a0a12"/>
          {/* Sky */}
          <rect x="0" y="0" width="700" height="180" fill="#0a0a18"/>
          {/* Stars */}
          {[...Array(30)].map((_, i) => (
            <circle key={i} cx={Math.sin(i*137.5)*350+350} cy={Math.sin(i*97)*80+60}
              r="1" fill="white" opacity="0.3"/>
          ))}
          {/* Ground */}
          <rect x="0" y="220" width="700" height="60" fill="#1a1205"/>
          {/* Castle walls */}
          <rect x="100" y="80" width="500" height="145" fill="#2a2a3a"/>
          {/* Battlements */}
          {[0,1,2,3,4,5,6,7,8,9].map(i => (
            <rect key={i} x={100+i*50} y="60" width="30" height="25" rx="2" fill="#2a2a3a"/>
          ))}
          {/* Main tower */}
          <rect x="290" y="20" width="120" height="205" fill="#252535"/>
          {/* Tower battlements */}
          {[0,1,2,3,4].map(i => (
            <rect key={i} x={290+i*24} y="0" width="18" height="24" rx="2" fill="#252535"/>
          ))}
          {/* Kente banner on tower */}
          <rect x="340" y="25" width="20" height="40" rx="1" fill="#c8a040" opacity="0.8"/>
          {[0,1,2,3].map(i => (
            <rect key={i} x="340" y={25+i*10} width="20" height="5"
              fill={['#c84020','#2a2a8a','#2a6a2a','#c8a040'][i]} opacity="0.7"/>
          ))}
          {/* Gate */}
          <rect x="310" y="160" width="80" height="65" rx="4" fill="#0a0a10"/>
          <ellipse cx="350" cy="160" rx="40" ry="20" fill="#0a0a10"/>
          {/* Gate portcullis */}
          {[0,1,2,3].map(i => (
            <line key={i} x1={318+i*18} y1="145" x2={318+i*18} y2="225"
              stroke="#4a4a5a" strokeWidth="2"/>
          ))}
          {[0,1,2].map(i => (
            <line key={i} x1="310" y1={155+i*20} x2="390" y2={155+i*20}
              stroke="#4a4a5a" strokeWidth="1.5"/>
          ))}
          {/* Side towers */}
          {[100,500].map(x => (
            <g key={x}>
              <rect x={x} y="50" width="80" height="175" fill="#222232"/>
              {[0,1,2].map(i => (
                <rect key={i} x={x+i*26} y="32" width="20" height="22" rx="2" fill="#222232"/>
              ))}
              {/* Arrow slits */}
              {[0,1,2].map(i => (
                <rect key={i} x={x+32} y={80+i*40} width="10" height="20" rx="1" fill="#0a0a10"/>
              ))}
            </g>
          ))}
          {/* Guards on walls */}
          {defense >= 40 && [150,250,450,550].map(x => (
            <g key={x}>
              <circle cx={x} cy="72" r="7" fill="#c8a070"/>
              <rect x={x-5} y="79" width="10" height="15" rx="2" fill="#2a2a4a"/>
              <line x1={x+8} y1="83" x2={x+18} y2="75"
                stroke="#5a5a7a" strokeWidth="1.5"/>
            </g>
          ))}
          {/* Defense warning */}
          {defense < 30 && (
            <text x="350" y="270" textAnchor="middle" fontSize="10"
              fill="#e05020" opacity="0.8">⚠ Defense critical — castle walls weakening</text>
          )}
          <text x="350" y="18" textAnchor="middle" fontSize="12"
            fill="#8a8ab0" fontWeight="500" opacity="0.8">Castle Mentedore</text>
        </svg>
      </div>

      {/* Defense stat */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-300 w-20">Defense</span>
          <div className="flex-1 bg-stone-800 rounded-full h-2.5">
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${defense}%`, background: defense < 30 ? '#e05020' : defense < 60 ? '#c8a040' : '#8a8ab0' }}/>
          </div>
          <span className="text-sm text-stone-400 w-8 text-right">{defense}</span>
        </div>
        <p className="text-stone-500 text-xs mt-2 italic">
          {defense < 30 ? 'The castle is vulnerable. Guards have deserted.'
            : defense < 60 ? `${guardCount} guards on duty. The walls hold.`
            : `${guardCount} guards active. Castle Mentedore is impregnable.`}
        </p>
      </div>

      {/* Room doors */}
      <div>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Castle Rooms</p>
        <div className="grid grid-cols-2 gap-3">
          {rooms.map(room => (
            <button key={room.id} onClick={() => setCurrentRoom(room.id)}
              className="flex items-center gap-3 rounded-xl p-4 text-left transition-all hover:opacity-90"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(138,138,176,0.2)' }}>
              <span className="text-2xl">{room.emoji}</span>
              <div>
                <p className="text-stone-200 text-sm font-medium">{room.name}</p>
                <p className="text-stone-600 text-xs mt-0.5 leading-tight">{room.desc.slice(0,40)}...</p>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}