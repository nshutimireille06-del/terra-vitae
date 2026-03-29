import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const herbs = [
  { name: 'Aloe Vera', emoji: '🌿', use: 'Burns, skin conditions', stock: 'high' },
  { name: 'Moringa', emoji: '🍃', use: 'Nutrition, immunity boost', stock: 'high' },
  { name: 'Neem', emoji: '🌱', use: 'Fever, infections', stock: 'medium' },
  { name: 'Ginger Root', emoji: '🫚', use: 'Digestion, nausea', stock: 'high' },
  { name: 'Turmeric', emoji: '🟡', use: 'Inflammation, wounds', stock: 'medium' },
  { name: 'Hibiscus', emoji: '🌺', use: 'Blood pressure, heart', stock: 'low' },
  { name: 'African Basil', emoji: '🌿', use: 'Headaches, malaria', stock: 'medium' },
  { name: 'Baobab Bark', emoji: '🪵', use: 'Fever, diarrhea', stock: 'low' },
]

const patients = [
  { name: 'Elder Kwame', condition: 'Fever', status: 'recovering', days: 2 },
  { name: 'Child Amara', condition: 'Cough', status: 'stable', days: 1 },
  { name: 'Farmer Tunde', condition: 'Broken arm', status: 'healing', days: 5 },
  { name: 'Guard Fatima', condition: 'Battle wound', status: 'critical', days: 3 },
]

const remedies = [
  { name: 'Fever Brew', ingredients: ['Neem leaves', 'Ginger', 'Honey'], time: '30 mins', effect: 'Reduces fever within 2 hours' },
  { name: 'Wound Paste', ingredients: ['Turmeric', 'Aloe Vera', 'Palm oil'], time: '15 mins', effect: 'Seals wounds and prevents infection' },
  { name: 'Energy Tonic', ingredients: ['Moringa', 'Baobab', 'Hibiscus'], time: '45 mins', effect: 'Restores strength after illness' },
  { name: 'Sleep Remedy', ingredients: ['African Basil', 'Honey', 'Warm water'], time: '10 mins', effect: 'Calms the mind and aids rest' },
]

const stockColor = (stock) => ({ high: '#50c050', medium: '#c8a040', low: '#e05020' })[stock]

export default function HealingHouseInterior() {
  const health = useGameStore((state) => state.stats.health)
  const [view, setView] = useState('main')
  const [selectedRemedy, setSelectedRemedy] = useState(null)

  const activePatients = health < 40
    ? patients
    : health < 70
    ? patients.slice(0, 2)
    : patients.slice(0, 1)

  if (view === 'remedies') {
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setView('main')}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#50a05022', color: '#50a050' }}>
          ← Back to Healing House
        </button>
        <div className="rounded-2xl p-5" style={{ background: '#0a1a0a', border: '1px solid #50a05040' }}>
          <h2 className="text-xl font-bold text-green-400">🌿 Remedy Kitchen</h2>
          <p className="text-stone-400 text-sm mt-1">Ancient recipes passed down through generations of Mentedore healers</p>
        </div>
        <div className="flex flex-col gap-3">
          {remedies.map(remedy => (
            <div key={remedy.name}>
              <button
                onClick={() => setSelectedRemedy(selectedRemedy === remedy.name ? null : remedy.name)}
                className="w-full rounded-2xl p-4 text-left"
                style={{ background: selectedRemedy === remedy.name ? 'rgba(80,160,80,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${selectedRemedy === remedy.name ? 'rgba(80,160,80,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
                <div className="flex items-center justify-between">
                  <p className="text-stone-200 text-sm font-medium">🧪 {remedy.name}</p>
                  <span className="text-xs text-stone-600">⏱ {remedy.time}</span>
                </div>
                {selectedRemedy === remedy.name && (
                  <div className="mt-3 flex flex-col gap-2">
                    <div>
                      <p className="text-xs text-stone-500 mb-1">Ingredients:</p>
                      <div className="flex gap-2 flex-wrap">
                        {remedy.ingredients.map(ing => (
                          <span key={ing} className="text-xs rounded-full px-2 py-0.5"
                            style={{ background: '#50a05022', color: '#50a050' }}>{ing}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-stone-400 text-xs mt-1">✨ {remedy.effect}</p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Healing House scene */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#050f05' }}>
        <svg width="100%" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="700" height="240" fill="#050f05"/>
          <rect x="0" y="190" width="700" height="50" fill="#0a1408"/>
          {[0,1,2,3,4,5,6].map(i => (
            <rect key={i} x={i*100} y="190" width="100" height="50"
              fill={i%2===0 ? '#0a1408' : '#081205'}/>
          ))}
          {/* Herb bundles hanging */}
          {[0,1,2,3,4,5,6].map(i => (
            <g key={i}>
              <line x1={50+i*95} y1="0" x2={50+i*95} y2="30"
                stroke="#5a3510" strokeWidth="1.5" opacity="0.6"/>
              <ellipse cx={50+i*95} cy="38" rx="12" ry="18"
                fill={['#2a5a2a','#3a6a1a','#1a5a3a','#5a4a1a','#2a4a2a','#3a3a1a','#1a4a2a'][i]}
                opacity="0.8"/>
              <text x={50+i*95} y="42" textAnchor="middle" fontSize="12">🌿</text>
            </g>
          ))}
          {/* Patient beds */}
          {[0,1,2,3].map(i => (
            <g key={i} opacity={i < activePatients.length ? 1 : 0.2}>
              <rect x={30+i*165} y="100" width="130" height="55" rx="4" fill="#1a2a1a"/>
              <rect x={25+i*165} y="95" width="140" height="12" rx="3" fill="#223a22"/>
              <ellipse cx={50+i*165} cy="110" rx="18" ry="14" fill="#c8a070" opacity="0.8"/>
              <rect x={35+i*165} y="120" width="105" height="30" rx="3"
                fill={i < activePatients.length ? '#8B0000' : '#1a3a1a'} opacity="0.4"/>
            </g>
          ))}
          {/* Fire/brazier for medicines */}
          <ellipse cx="650" cy="165" rx="25" ry="12" fill="#1a2a1a"/>
          <ellipse cx="650" cy="158" rx="12" ry="15" fill="#e06020" opacity="0.4"/>
          <ellipse cx="650" cy="150" rx="7" ry="10" fill="#ffe066" opacity="0.3"/>
          {/* Health warning */}
          {health < 30 && (
            <text x="350" y="230" textAnchor="middle" fontSize="10"
              fill="#e05020" opacity="0.8">⚠ Health critical — healing house overwhelmed</text>
          )}
          <text x="350" y="18" textAnchor="middle" fontSize="12"
            fill="#50a050" fontWeight="500" opacity="0.8">The Healing House of Mentedore</text>
        </svg>
      </div>

      {/* Health stat */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-300 w-16">Health</span>
          <div className="flex-1 bg-stone-800 rounded-full h-2.5">
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${health}%`, background: health < 30 ? '#e05020' : health < 60 ? '#c8a040' : '#50a050' }}/>
          </div>
          <span className="text-sm text-stone-400 w-8 text-right">{health}</span>
        </div>
        <p className="text-stone-500 text-xs mt-2 italic">
          {health < 30 ? 'The healing house is overwhelmed. Disease spreads through Mentedore.'
            : health < 60 ? `${activePatients.length} patients being treated. Healers working hard.`
            : 'The healing house is quiet. Mentedore is healthy.'}
        </p>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setView('remedies')}
          className="rounded-xl p-4 text-left"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(80,160,80,0.2)' }}>
          <p className="text-lg mb-1">🧪</p>
          <p className="text-green-400 text-sm font-medium">Remedy Kitchen</p>
          <p className="text-stone-500 text-xs mt-1">{remedies.length} recipes</p>
        </button>
        <div className="rounded-xl p-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(80,160,80,0.2)' }}>
          <p className="text-lg mb-1">🛏️</p>
          <p className="text-green-400 text-sm font-medium">Patient Ward</p>
          <p className="text-stone-500 text-xs mt-1">{activePatients.length} patients</p>
        </div>
      </div>

      {/* Herb stocks */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">🌿 Herb Stores</p>
        <div className="grid grid-cols-2 gap-2">
          {herbs.map(herb => {
            const actualStock = health < 30 ? 'low' : health < 60 && herb.stock === 'high' ? 'medium' : herb.stock
            return (
              <div key={herb.name} className="flex items-center justify-between rounded-lg px-3 py-2"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-2">
                  <span>{herb.emoji}</span>
                  <div>
                    <p className="text-stone-300 text-xs">{herb.name}</p>
                    <p className="text-stone-600 text-xs">{herb.use}</p>
                  </div>
                </div>
                <span className="text-xs rounded-full px-2 py-0.5 ml-2"
                  style={{ background: stockColor(actualStock) + '22', color: stockColor(actualStock) }}>
                  {actualStock}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Patient roster */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">🛏️ Current Patients</p>
        {activePatients.length === 0 ? (
          <p className="text-stone-600 text-sm italic">No patients. Mentedore is in good health.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {activePatients.map(patient => (
              <div key={patient.name} className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div>
                  <p className="text-stone-200 text-sm">{patient.name}</p>
                  <p className="text-stone-500 text-xs">{patient.condition} · Day {patient.days}</p>
                </div>
                <span className="text-xs rounded-full px-2 py-0.5"
                  style={{
                    background: patient.status === 'recovering' ? '#1a3a1a' : patient.status === 'stable' ? '#1a2a3a' : patient.status === 'healing' ? '#2a2a1a' : '#3a1a1a',
                    color: patient.status === 'recovering' ? '#50c050' : patient.status === 'stable' ? '#4a90d9' : patient.status === 'healing' ? '#c8a040' : '#e05020'
                  }}>
                  {patient.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}