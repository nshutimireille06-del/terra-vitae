import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const weapons = [
  { id: 'spear', name: 'Zulu Spear', emoji: '🏹', type: 'Traditional', power: 75, desc: 'Crafted in the tradition of great African warriors. Light and deadly.' },
  { id: 'shield', name: 'Kente Shield', emoji: '🛡️', type: 'Defense', power: 80, desc: 'Woven kente patterns over hardwood. Ceremonial and functional.' },
  { id: 'bow', name: 'Savanna Bow', emoji: '🏹', type: 'Ranged', power: 65, desc: 'Carved from acacia wood. Used by Mentedore scouts.' },
  { id: 'sword', name: 'River Iron Sword', emoji: '⚔️', type: 'Melee', power: 85, desc: 'Forged from iron ore found along the Mentedore river.' },
  { id: 'staff', name: 'Elder\'s War Staff', emoji: '🪄', type: 'Traditional', power: 70, desc: 'Carved with ancestral symbols. Carried by senior commanders.' },
  { id: 'axe', name: 'Bronze War Axe', emoji: '🪓', type: 'Melee', power: 78, desc: 'Heavy bronze head, hardwood handle. Forged in the castle armory.' },
  { id: 'armor', name: 'Leather Battle Armor', emoji: '🥋', type: 'Defense', power: 72, desc: 'Layered buffalo leather, reinforced at joints.' },
  { id: 'helmet', name: 'Iron War Helmet', emoji: '⛑️', type: 'Defense', power: 68, desc: 'Hammered iron with engraved Mentedore crest.' },
]

const soldiers = [
  { name: 'Commander Kwesi', rank: 'Commander', specialty: 'Cavalry', status: 'active' },
  { name: 'Captain Adaeze', rank: 'Captain', specialty: 'Archers', status: 'active' },
  { name: 'Sergeant Tunde', rank: 'Sergeant', specialty: 'Infantry', status: 'active' },
  { name: 'Sergeant Amara', rank: 'Sergeant', specialty: 'Scouts', status: 'training' },
  { name: 'Guard Kofi', rank: 'Guard', specialty: 'Castle Gate', status: 'active' },
  { name: 'Guard Fatima', rank: 'Guard', specialty: 'Harbor Watch', status: 'active' },
  { name: 'Guard Emeka', rank: 'Guard', specialty: 'Market Patrol', status: 'injured' },
  { name: 'Recruit Zara', rank: 'Recruit', specialty: 'Infantry', status: 'training' },
]

const battleLog = [
  { event: 'Border Patrol', outcome: 'Clear', date: 'Day 3', desc: 'Eastern hills patrol. No threats found.' },
  { event: 'Raid Repelled', outcome: 'Victory', date: 'Day 7', desc: 'Small raiding party driven back at the market gates.' },
  { event: 'Harbor Incident', outcome: 'Resolved', date: 'Day 12', desc: 'Dispute between sailors resolved without combat.' },
  { event: 'Night Watch Alert', outcome: 'False Alarm', date: 'Day 15', desc: 'Shadows on the castle wall. Turned out to be traders.' },
]

const forgeItems = [
  { name: 'Short Sword', time: '2 days', material: 'Iron + Coal', qty: 3 },
  { name: 'Arrow Bundle ×20', time: '1 day', material: 'Wood + Feathers', qty: 8 },
  { name: 'Shield Repair', time: '4 hours', material: 'Leather + Wood', qty: 12 },
  { name: 'War Helmet', time: '3 days', material: 'Iron + Bronze', qty: 2 },
]

export default function ArmoryInterior() {
  const defense = useGameStore((state) => state.stats.defense)
  const [view, setView] = useState('main')
  const [selectedWeapon, setSelectedWeapon] = useState(null)

  const activeSoldiers = soldiers.filter(s => s.status === 'active').length
  const avgPower = Math.floor(weapons.reduce((sum, w) => sum + w.power, 0) / weapons.length)

  if (view === 'training') {
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setView('main')}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#c0404022', color: '#c04040' }}>
          ← Back to Armory
        </button>
        <div className="rounded-2xl p-5" style={{ background: '#1a0505', border: '1px solid #c0404040' }}>
          <h2 className="text-xl font-bold text-red-400">🏋️ Training Yard</h2>
          <p className="text-stone-400 text-sm mt-1">
            {defense >= 60 ? 'Soldiers drill at dawn. The yard echoes with the clash of steel.'
              : defense >= 30 ? 'Training continues but morale is low.'
              : 'The training yard is nearly empty. Few soldiers remain.'}
          </p>
        </div>
        {/* Training yard SVG */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0f0505' }}>
          <svg width="100%" viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="220" fill="#0f0505"/>
            <rect x="0" y="170" width="600" height="50" fill="#1a0a05"/>
            {/* Ground */}
            {[0,1,2,3,4,5].map(i => (
              <rect key={i} x={i*100} y="170" width="100" height="50"
                fill={i%2===0 ? '#1a0a05' : '#150805'}/>
            ))}
            {/* Training dummies */}
            {defense >= 30 && [0,1,2,3].map(i => (
              <g key={i}>
                <rect x={80+i*130} y="90" width="20" height="50" rx="3" fill="#5a3510"/>
                <circle cx={90+i*130} cy="82" r="16" fill="#3a2008"
                  stroke="#c04040" strokeWidth="1.5" opacity="0.7"/>
                <line x1={70+i*130} y1="110" x2={110+i*130} y2="110"
                  stroke="#5a3510" strokeWidth="3"/>
              </g>
            ))}
            {/* Weapon racks */}
            <rect x="20" y="60" width="40" height="110" rx="3" fill="#2a1505"/>
            {['⚔️','🏹','🪓','🛡️'].map((w, i) => (
              <text key={i} x="40" y={80+i*25} textAnchor="middle" fontSize="16">{w}</text>
            ))}
            {/* Sparring soldiers */}
            {defense >= 50 && <>
              <circle cx="400" cy="130" r="12" fill="#c8a070"/>
              <rect x="392" y="142" width="16" height="28" rx="3" fill="#2a2a4a"/>
              <circle cx="460" cy="130" r="12" fill="#c8a070"/>
              <rect x="452" y="142" width="16" height="28" rx="3" fill="#c84020"/>
              <line x1="408" y1="138" x2="452" y2="138"
                stroke="#8a8ab0" strokeWidth="2" opacity="0.6"/>
            </>}
            <text x="300" y="210" textAnchor="middle" fontSize="9"
              fill="#c04040" opacity="0.5">Training Yard — {activeSoldiers} active soldiers</text>
          </svg>
        </div>
        {/* Soldier roster */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Soldier Roster</p>
          <div className="flex flex-col gap-2">
            {soldiers.map(soldier => (
              <div key={soldier.name} className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: '#c0404022' }}>
                    <span className="text-xs">⚔️</span>
                  </div>
                  <div>
                    <p className="text-stone-200 text-sm">{soldier.name}</p>
                    <p className="text-stone-600 text-xs">{soldier.rank} · {soldier.specialty}</p>
                  </div>
                </div>
                <span className="text-xs rounded-full px-2 py-0.5"
                  style={{
                    background: soldier.status === 'active' ? '#1a3a1a' : soldier.status === 'training' ? '#1a2a3a' : '#3a1a1a',
                    color: soldier.status === 'active' ? '#50c050' : soldier.status === 'training' ? '#4a90d9' : '#e05020'
                  }}>
                  {soldier.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (view === 'forge') {
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setView('main')}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#c0404022', color: '#c04040' }}>
          ← Back to Armory
        </button>
        <div className="rounded-2xl p-5" style={{ background: '#1a0505', border: '1px solid #c0404040' }}>
          <h2 className="text-xl font-bold text-red-400">🔥 The Forge</h2>
          <p className="text-stone-400 text-sm mt-1">
            {defense >= 50 ? 'The forge burns hot. New weapons are being crafted.' : 'The forge burns low. Defense tasks needed to fuel it.'}
          </p>
        </div>
        {/* Forge SVG */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0a0505' }}>
          <svg width="100%" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="200" fill="#0a0505"/>
            <rect x="0" y="160" width="600" height="40" fill="#120808"/>
            {/* Forge furnace */}
            <rect x="230" y="50" width="140" height="110" rx="6" fill="#2a1010"/>
            <rect x="240" y="60" width="120" height="80" rx="4" fill="#1a0808"/>
            {defense >= 40 && <>
              <ellipse cx="300" cy="100" rx="45" ry="35" fill="#e06020" opacity="0.5"/>
              <ellipse cx="300" cy="95" rx="30" ry="25" fill="#e08020" opacity="0.5"/>
              <ellipse cx="300" cy="88" rx="18" ry="18" fill="#ffe066" opacity="0.4"/>
            </>}
            <rect x="240" y="140" width="120" height="12" rx="3" fill="#3a1a10"/>
            {/* Anvil */}
            <rect x="100" y="110" width="80" height="30" rx="4" fill="#3a3a4a"/>
            <rect x="110" y="100" width="60" height="14" rx="3" fill="#4a4a5a"/>
            <rect x="120" y="138" width="40" height="20" rx="2" fill="#2a2a3a"/>
            {/* Hammer */}
            <rect x="108" y="85" width="30" height="18" rx="3" fill="#5a5a6a"/>
            <rect x="118" y="65" width="10" height="24" rx="2" fill="#3a2010"/>
            {/* Cooling barrel */}
            <rect x="430" y="100" width="50" height="60" rx="4" fill="#1a2a3a"/>
            <ellipse cx="455" cy="100" rx="25" ry="10" fill="#2a3a4a"/>
            <ellipse cx="455" cy="100" rx="20" ry="7" fill="#1a3a5a" opacity="0.5"/>
            {/* Sparks */}
            {defense >= 50 && [0,1,2,3,4].map(i => (
              <circle key={i} cx={270+i*20} cy={60+i*8} r="2"
                fill="#ffe066" opacity="0.7"/>
            ))}
            <text x="300" y="190" textAnchor="middle" fontSize="9"
              fill="#c04040" opacity="0.5">The Royal Forge of Mentedore</text>
          </svg>
        </div>
        {/* Forge queue */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Production Queue</p>
          <div className="flex flex-col gap-2">
            {forgeItems.map(item => (
              <div key={item.name} className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div>
                  <p className="text-stone-200 text-sm">{item.name}</p>
                  <p className="text-stone-500 text-xs">{item.material}</p>
                </div>
                <div className="text-right">
                  <p className="text-red-400 text-xs">{item.time}</p>
                  <p className="text-stone-600 text-xs">×{item.qty} in stock</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Armory scene SVG */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#0f0505' }}>
        <svg width="100%" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="700" height="240" fill="#0f0505"/>
          <rect x="0" y="190" width="700" height="50" fill="#150808"/>
          {[0,1,2,3,4,5,6].map(i => (
            <rect key={i} x={i*100} y="190" width="100" height="50"
              fill={i%2===0 ? '#150808' : '#120606'}/>
          ))}
          {/* Stone walls */}
          <rect x="0" y="0" width="700" height="192" fill="#0f0505"/>
          {/* Weapon racks on walls */}
          {[0,1,2,3,4,5].map(i => (
            <g key={i}>
              <rect x={20+i*110} y="20" width="80" height="8" rx="2"
                fill="#3a2010" opacity="0.8"/>
              <line x1={30+i*110} y1="28" x2={30+i*110} y2="80"
                stroke="#5a3510" strokeWidth="1.5" opacity="0.6"/>
              <line x1={90+i*110} y1="28" x2={90+i*110} y2="80"
                stroke="#5a3510" strokeWidth="1.5" opacity="0.6"/>
              {/* Weapons hanging */}
              <text x={40+i*110} y="60" fontSize="18">
                {['⚔️','🛡️','🏹','🪓','⛑️','🥋'][i]}
              </text>
              <text x={68+i*110} y="55" fontSize="14">
                {['🗡️','🛡️','🏹','⚔️','🪄','🥷'][i]}
              </text>
            </g>
          ))}
          {/* Central display armor stand */}
          <rect x="315" y="90" width="70" height="100" rx="4" fill="#2a2a3a"/>
          <ellipse cx="350" cy="88" rx="28" ry="20" fill="#3a3a4a"/>
          <text x="350" y="145" textAnchor="middle" fontSize="24">🥋</text>
          {/* Forge glow */}
          {defense >= 40 && (
            <ellipse cx="650" cy="150" rx="40" ry="30" fill="#e06020" opacity="0.15"/>
          )}
          {/* Defense warning */}
          {defense < 30 && (
            <text x="350" y="230" textAnchor="middle" fontSize="10"
              fill="#e05020" opacity="0.8">⚠ Defense critical — armory is understocked</text>
          )}
          <text x="350" y="18" textAnchor="middle" fontSize="12"
            fill="#c04040" fontWeight="500" opacity="0.8">
            The Royal Armory of Mentedore
          </text>
        </svg>
      </div>

      {/* Defense stat */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-300 w-20">Defense</span>
          <div className="flex-1 bg-stone-800 rounded-full h-2.5">
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${defense}%`, background: defense < 30 ? '#e05020' : defense < 60 ? '#c8a040' : '#c04040' }}/>
          </div>
          <span className="text-sm text-stone-400 w-8 text-right">{defense}</span>
        </div>
        <p className="text-stone-500 text-xs mt-2 italic">
          {defense < 30 ? 'The armory is bare. Mentedore is vulnerable.'
            : defense < 60 ? `${activeSoldiers} soldiers armed. Average weapon power: ${avgPower}.`
            : `Full armory. ${activeSoldiers} soldiers ready. Mentedore is well defended.`}
        </p>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setView('training')}
          className="rounded-xl p-4 text-left"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(192,64,64,0.2)' }}>
          <p className="text-lg mb-1">🏋️</p>
          <p className="text-red-400 text-sm font-medium">Training Yard</p>
          <p className="text-stone-500 text-xs mt-1">{activeSoldiers} active soldiers</p>
        </button>
        <button onClick={() => setView('forge')}
          className="rounded-xl p-4 text-left"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(192,64,64,0.2)' }}>
          <p className="text-lg mb-1">🔥</p>
          <p className="text-red-400 text-sm font-medium">The Forge</p>
          <p className="text-stone-500 text-xs mt-1">{defense >= 40 ? 'Burning hot' : 'Cold'}</p>
        </button>
      </div>

      {/* Weapons display */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">⚔️ Weapons & Armor</p>
        <div className="grid grid-cols-2 gap-3">
          {weapons.map(weapon => (
            <button key={weapon.id}
              onClick={() => setSelectedWeapon(selectedWeapon === weapon.id ? null : weapon.id)}
              className="rounded-xl p-3 text-left transition-all"
              style={{
                background: selectedWeapon === weapon.id ? 'rgba(192,64,64,0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selectedWeapon === weapon.id ? 'rgba(192,64,64,0.4)' : 'rgba(255,255,255,0.06)'}`,
                opacity: defense < 30 ? 0.4 : 1
              }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl">{weapon.emoji}</span>
                <span className="text-xs text-stone-600">{weapon.type}</span>
              </div>
              <p className="text-stone-200 text-xs font-medium">{weapon.name}</p>
              {selectedWeapon === weapon.id && (
                <div className="mt-2">
                  <p className="text-stone-500 text-xs leading-relaxed">{weapon.desc}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-stone-600">Power</span>
                    <div className="flex-1 bg-stone-800 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full"
                        style={{ width: `${weapon.power}%`, background: '#c04040' }}/>
                    </div>
                    <span className="text-xs text-red-400">{weapon.power}</span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Battle log */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">📋 Battle Log</p>
        <div className="flex flex-col gap-2">
          {battleLog.map((entry, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div>
                <p className="text-stone-200 text-sm">{entry.event}</p>
                <p className="text-stone-600 text-xs mt-0.5">{entry.desc}</p>
              </div>
              <div className="text-right ml-3">
                <span className="text-xs rounded-full px-2 py-0.5 block mb-1"
                  style={{
                    background: entry.outcome === 'Victory' ? '#1a3a1a' : '#1a1a2a',
                    color: entry.outcome === 'Victory' ? '#50c050' : '#8a8ab0'
                  }}>{entry.outcome}</span>
                <span className="text-xs text-stone-600">{entry.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}