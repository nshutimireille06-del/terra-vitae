import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const tradeShips = [
  { name: 'The Golden Tide', origin: 'Kingdom of Zara', cargo: 'Spices, silk, ivory', status: 'docked' },
  { name: 'Mwamba wa Bahari', origin: 'The Southern Shores', cargo: 'Fish, pearls, coconuts', status: 'arriving' },
  { name: 'Desert Wind', origin: 'The Eastern Sands', cargo: 'Gold, dates, pottery', status: 'departing' },
]

const fishingLogs = [
  { date: 'Day 1', catch: 'Tilapia × 12, Catfish × 8', water: 80 },
  { date: 'Day 2', catch: 'Nile Perch × 6, Shrimp × 20', water: 75 },
  { date: 'Day 3', catch: 'Tilapia × 4, nothing else', water: 45 },
  { date: 'Day 4', catch: 'Barely anything. Rivers low.', water: 25 },
]

const tavernMenu = [
  { name: 'Salted Fish Stew', price: 5, emoji: '🍲' },
  { name: 'Grilled Tilapia', price: 8, emoji: '🐟' },
  { name: 'Palm Wine', price: 3, emoji: '🍶' },
  { name: 'Coconut Brew', price: 4, emoji: '🥥' },
  { name: 'Sailor\'s Bread', price: 2, emoji: '🍞' },
]

const tradeRoutes = [
  { from: 'Mentedore', to: 'Kingdom of Zara', goods: 'Grain, cloth', distance: '3 days' },
  { from: 'Mentedore', to: 'Southern Shores', goods: 'Tools, pottery', distance: '5 days' },
  { from: 'Mentedore', to: 'Eastern Sands', goods: 'Books, medicine', distance: '8 days' },
  { from: 'Mentedore', to: 'Northern Isles', goods: 'Livestock, wood', distance: '12 days' },
]

export default function HarborInterior() {
  const water = useGameStore((state) => state.stats.water)
  const [view, setView] = useState('main')

  const boatCount = water < 30 ? 1 : water < 60 ? 3 : 6
  const waterColor = water < 30 ? '#7a5c2e' : water < 60 ? '#2a6a9a' : '#1a5a8a'
  const waterOpacity = water < 30 ? 0.4 : water < 60 ? 0.7 : 1

  if (view === 'tavern') {
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setView('main')}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#c8703022', color: '#c87030' }}>
          ← Back to Harbor
        </button>
        <div className="rounded-2xl p-5" style={{ background: '#1a0a05', border: '1px solid #c8703040' }}>
          <h2 className="text-xl font-bold text-amber-400">⚓ The Sailor's Tavern</h2>
          <p className="text-stone-400 text-sm mt-1">
            {water < 30 ? 'The tavern is quiet. Few sailors remain.' : 'Sailors trade stories over plates of fish and cups of palm wine.'}
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#120805' }}>
          <svg width="100%" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="200" fill="#120805"/>
            <rect x="0" y="160" width="600" height="40" fill="#1a0e08"/>
            {[0,1,2,3,4,5].map(i => (
              <rect key={i} x={i*100} y="160" width="100" height="40"
                fill={i%2===0 ? '#1a0e08' : '#150c06'}/>
            ))}
            {/* Bar counter */}
            <rect x="30" y="100" width="200" height="60" rx="4" fill="#5a3510"/>
            <rect x="25" y="95" width="210" height="12" rx="3" fill="#6a4520"/>
            {/* Bottles */}
            {[0,1,2,3,4].map(i => (
              <g key={i}>
                <rect x={40+i*35} y="70" width="12" height="28" rx="3"
                  fill={['#8B3a1a','#1a5a1a','#c8a040','#1a1a5a','#5a1a1a'][i]} opacity="0.9"/>
                <rect x={44+i*35} y="66" width="4" height="6" rx="1"
                  fill={['#8B3a1a','#1a5a1a','#c8a040','#1a1a5a','#5a1a1a'][i]}/>
              </g>
            ))}
            {/* Tables */}
            {[0,1].map(i => (
              <g key={i}>
                <ellipse cx={350+i*140} cy="150" rx="50" ry="20" fill="#4a2a10"/>
                <rect x={346+i*140} y="150" width="8" height="30" fill="#3a2010"/>
              </g>
            ))}
            {/* Candles */}
            {[350,490].map(x => (
              <g key={x}>
                <rect x={x-3} y="128" width="6" height="14" rx="1" fill="#f0e8d0"/>
                <ellipse cx={x} cy="127" rx="4" ry="5" fill="#ffe066" opacity="0.8"/>
              </g>
            ))}
            <text x="300" y="20" textAnchor="middle" fontSize="11"
              fill="#c87030" opacity="0.8">The Sailor's Tavern</text>
          </svg>
        </div>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Today's Menu</p>
          <div className="flex flex-col gap-2">
            {tavernMenu.map(item => (
              <div key={item.name} className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className="text-stone-300 text-sm">{item.emoji} {item.name}</span>
                <span className="text-amber-400 text-sm">{item.price} coins</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (view === 'trademap') {
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setView('main')}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#2a6a9a22', color: '#4a90d9' }}>
          ← Back to Harbor
        </button>
        <div className="rounded-2xl p-5" style={{ background: '#05101a', border: '1px solid #4a90d940' }}>
          <h2 className="text-xl font-bold text-blue-400">🗺️ Trade Routes of Mentedore</h2>
          <p className="text-stone-400 text-sm mt-1">
            Active routes: {water >= 50 ? tradeRoutes.length : water >= 30 ? 2 : 1}
          </p>
        </div>
        {/* Map SVG */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#05101a' }}>
          <svg width="100%" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="300" fill="#05101a"/>
            {/* Ocean */}
            <rect x="0" y="0" width="600" height="300" fill="#0a1a2a" opacity="0.8"/>
            {/* Mentedore */}
            <ellipse cx="300" cy="150" rx="40" ry="30" fill="#2a5a2a"/>
            <text x="300" y="154" textAnchor="middle" fontSize="9"
              fill="#c8a040" fontWeight="500">Mentedore</text>
            {/* Other kingdoms */}
            {[
              { name: 'Kingdom of Zara', x: 100, y: 80 },
              { name: 'Southern Shores', x: 480, y: 220 },
              { name: 'Eastern Sands', x: 520, y: 80 },
              { name: 'Northern Isles', x: 150, y: 240 },
            ].map((kingdom, i) => (
              <g key={kingdom.name}>
                <ellipse cx={kingdom.x} cy={kingdom.y} rx="35" ry="22"
                  fill={i < (water >= 50 ? 4 : water >= 30 ? 2 : 1) ? '#1a3a2a' : '#1a1a1a'}
                  opacity={i < (water >= 50 ? 4 : water >= 30 ? 2 : 1) ? 0.9 : 0.3}/>
                <text x={kingdom.x} y={kingdom.y + 4} textAnchor="middle" fontSize="7"
                  fill={i < (water >= 50 ? 4 : water >= 30 ? 2 : 1) ? '#c8a96e' : '#555'}
                  opacity={i < (water >= 50 ? 4 : water >= 30 ? 2 : 1) ? 0.9 : 0.3}>
                  {kingdom.name.split(' ')[0]}
                </text>
                {i < (water >= 50 ? 4 : water >= 30 ? 2 : 1) && (
                  <line x1="300" y1="150" x2={kingdom.x} y2={kingdom.y}
                    stroke="#4a90d9" strokeWidth="1" strokeDasharray="5 3" opacity="0.5"/>
                )}
              </g>
            ))}
            {water < 50 && (
              <text x="300" y="285" textAnchor="middle" fontSize="9"
                fill="#e05020" opacity="0.8">⚠ Low water — some routes closed</text>
            )}
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          {tradeRoutes.map((route, i) => {
            const active = i < (water >= 50 ? 4 : water >= 30 ? 2 : 1)
            return (
              <div key={i} className="rounded-xl px-4 py-3 flex items-center justify-between"
                style={{ background: 'rgba(255,255,255,0.03)', opacity: active ? 1 : 0.3 }}>
                <div>
                  <p className="text-stone-300 text-sm">{route.from} → {route.to}</p>
                  <p className="text-stone-500 text-xs mt-0.5">Exports: {route.goods}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 text-xs">{route.distance}</p>
                  <p className="text-xs mt-0.5" style={{ color: active ? '#50c050' : '#e05020' }}>
                    {active ? 'Active' : 'Closed'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Harbor scene SVG */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#0a1a2a' }}>
        <svg width="100%" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">

          {/* Sky */}
          <rect x="0" y="0" width="700" height="160" fill="#0a1a2a"/>
          {/* Stars */}
          {[...Array(20)].map((_, i) => (
            <circle key={i} cx={Math.sin(i*137.5)*350+350} cy={Math.sin(i*97)*60+40}
              r="1" fill="white" opacity="0.4"/>
          ))}
          {/* Moon */}
          <circle cx="80" cy="50" r="25" fill="#f0e8c0" opacity="0.8"/>
          <circle cx="90" cy="44" r="20" fill="#0a1a2a"/>

          {/* Water */}
          <rect x="0" y="160" width="700" height="140"
            fill={waterColor} opacity={waterOpacity}/>
          {/* Water ripples */}
          {water >= 40 && [1,2,3,4,5].map(i => (
            <ellipse key={i} cx={i*140-40} cy={200+i*8} rx="80" ry="6"
              fill="none" stroke="#5a9ab0" strokeWidth="1" opacity="0.3"/>
          ))}
          {/* Cracked mud when water is low */}
          {water < 30 && [0,1,2,3].map(i => (
            <line key={i} x1={100+i*150} y1="170" x2={150+i*150} y2="220"
              stroke="#5a3a1a" strokeWidth="2" opacity="0.5"/>
          ))}

          {/* Dock/pier */}
          <rect x="150" y="150" width="400" height="20" rx="3" fill="#5a3510" opacity="0.9"/>
          {[0,1,2,3,4,5,6,7].map(i => (
            <rect key={i} x={165+i*50} y="170" width="8" height="60" rx="2"
              fill="#4a2a08" opacity="0.8"/>
          ))}
          <rect x="150" y="145" width="400" height="8" rx="2" fill="#6a4520"/>

          {/* Lighthouse */}
          <rect x="590" y="60" width="40" height="100" rx="4" fill="#d0c8b0"/>
          <polygon points="585,60 635,60 610,30" fill="#c84040"/>
          <rect x="598" y="75" width="24" height="20" rx="2" fill="#ffe066" opacity="0.8"/>
          <ellipse cx="610" cy="65" rx="15" ry="8" fill="#ffe066" opacity="0.3"/>
          <text x="610" y="175" textAnchor="middle" fontSize="8"
            fill="#c8a96e" opacity="0.7">Lighthouse</text>

          {/* Boats */}
          {Array.from({ length: boatCount }).map((_, i) => {
            const x = 180 + i * 80
            const bobY = water < 30 ? 175 : 155
            return (
              <g key={i}>
                <ellipse cx={x} cy={bobY + 15} rx="30" ry="10"
                  fill={['#c84020','#4a8a2a','#2a4a8a','#c8a020','#8a2a4a','#2a8a7a'][i]}/>
                <polygon points={`${x-28},${bobY+10} ${x+28},${bobY+10} ${x+20},${bobY-5} ${x-20},${bobY-5}`}
                  fill={['#a03018','#3a6a1a','#1a3a6a','#a08018','#6a1a3a','#1a6a5a'][i]}/>
                {/* Mast */}
                <line x1={x} y1={bobY-5} x2={x} y2={bobY-35}
                  stroke="#5a3510" strokeWidth="2"/>
                {water >= 50 && (
                  <polygon points={`${x},${bobY-35} ${x+20},${bobY-20} ${x},${bobY-20}`}
                    fill={['#e04020','#50a030','#3060c0','#e0b020','#a03060','#30a090'][i]}
                    opacity="0.8"/>
                )}
              </g>
            )
          })}

          {/* Boat repair yard */}
          <rect x="20" y="130" width="100" height="50" rx="4" fill="#3a2010" opacity="0.8"/>
          <text x="70" y="158" textAnchor="middle" fontSize="8"
            fill="#c8a96e" opacity="0.7">⚒ Repair Yard</text>

          {/* Fish market stalls on dock */}
          {water >= 40 && [0,1,2].map(i => (
            <g key={i}>
              <rect x={200+i*110} y="125" width="80" height="30" rx="3"
                fill="#2a5a2a" opacity="0.8"/>
              <text x={240+i*110} y="143" textAnchor="middle" fontSize="10">
                {['🐟','🦐','🐠'][i]}
              </text>
            </g>
          ))}

          {/* Water level indicator */}
          <text x="350" y="290" textAnchor="middle" fontSize="10"
            fill={water < 30 ? '#e05020' : '#4a90d9'} opacity="0.8">
            {water < 30 ? '⚠ Harbor nearly dry — complete hydration tasks'
              : water < 60 ? '⚓ Harbor operating at reduced capacity'
              : '⚓ Harbor full and thriving'}
          </text>

          <text x="350" y="18" textAnchor="middle" fontSize="12"
            fill="#4a90d9" fontWeight="500" opacity="0.8">
            Mentedore Harbor
          </text>

        </svg>
      </div>

      {/* Water stat */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-300 w-12">Water</span>
          <div className="flex-1 bg-stone-800 rounded-full h-2.5">
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${water}%`, background: water < 30 ? '#e05020' : water < 60 ? '#c8a040' : '#2a80c0' }}/>
          </div>
          <span className="text-sm text-stone-400 w-8 text-right">{water}</span>
        </div>
        <p className="text-stone-500 text-xs mt-2 italic">
          {water < 30 ? 'The harbor is nearly dry. Boats rest on cracked mud.'
            : water < 60 ? `${boatCount} boats are docked. Trade is limited.`
            : `${boatCount} boats active. Trade ships arrive from distant lands.`}
        </p>
      </div>

      {/* Trade ships */}
      {water >= 40 && (
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">🚢 Trade Ships</p>
          <div className="flex flex-col gap-2">
            {tradeShips.slice(0, water >= 60 ? 3 : 1).map(ship => (
              <div key={ship.name} className="rounded-xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center justify-between">
                  <p className="text-stone-200 text-sm font-medium">{ship.name}</p>
                  <span className="text-xs rounded-full px-2 py-0.5"
                    style={{
                      background: ship.status === 'docked' ? '#1a3a1a' : ship.status === 'arriving' ? '#1a2a3a' : '#3a1a0a',
                      color: ship.status === 'docked' ? '#50c050' : ship.status === 'arriving' ? '#4a90d9' : '#c87030'
                    }}>
                    {ship.status}
                  </span>
                </div>
                <p className="text-stone-500 text-xs mt-1">From: {ship.origin}</p>
                <p className="text-stone-500 text-xs">Cargo: {ship.cargo}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fishing logs */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">📋 Fishing Logs</p>
        <div className="flex flex-col gap-2">
          {fishingLogs.map((log, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl px-4 py-2"
              style={{ background: 'rgba(255,255,255,0.03)', opacity: log.water <= water ? 1 : 0.4 }}>
              <div>
                <p className="text-stone-400 text-xs font-medium">{log.date}</p>
                <p className="text-stone-500 text-xs">{log.catch}</p>
              </div>
              <div className="w-12 h-1.5 rounded-full bg-stone-800">
                <div className="h-1.5 rounded-full"
                  style={{ width: `${log.water}%`, background: '#2a80c0' }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setView('tavern')}
          className="rounded-xl p-4 text-left"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,112,48,0.2)' }}>
          <p className="text-amber-400 text-sm font-medium">⚓ Sailor's Tavern</p>
          <p className="text-stone-500 text-xs mt-1">Food, drink & stories</p>
        </button>
        <button onClick={() => setView('trademap')}
          className="rounded-xl p-4 text-left"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(74,144,217,0.2)' }}>
          <p className="text-blue-400 text-sm font-medium">🗺️ Trade Routes</p>
          <p className="text-stone-500 text-xs mt-1">Map of active routes</p>
        </button>
      </div>

    </div>
  )
}