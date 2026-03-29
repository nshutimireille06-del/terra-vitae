import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const prisoners = [
  { id: 1, name: 'Unknown Raider', crime: 'Border raid', sentence: '30 days', status: 'serving', cell: 1 },
  { id: 2, name: 'Market Thief', crime: 'Theft from market stalls', sentence: '14 days', status: 'serving', cell: 2 },
  { id: 3, name: 'Forge Saboteur', crime: 'Sabotage of the royal forge', sentence: '60 days', status: 'serving', cell: 3 },
  { id: 4, name: 'Spy from Zara', crime: 'Espionage', sentence: '90 days', status: 'serving', cell: 4 },
  { id: 5, name: 'Deserter Guard', crime: 'Abandoning post', sentence: '7 days', status: 'serving', cell: 5 },
  { id: 6, name: 'Harbor Smuggler', crime: 'Illegal trade', sentence: '45 days', status: 'serving', cell: 6 },
]

const rules = [
  'No prisoner shall be held without a recorded crime.',
  'All prisoners receive one meal per day from the royal bakery.',
  'Guards must rotate every 6 hours.',
  'The dungeon beneath the castle holds those awaiting trial.',
  'Release requires approval from the throne room.',
]

const guards = [
  { name: 'Senior Guard Osei', shift: 'Day', cells: '1-3' },
  { name: 'Guard Mensah', shift: 'Day', cells: '4-6' },
  { name: 'Guard Abena', shift: 'Night', cells: '1-6' },
]

export default function PrisonInterior() {
  const defense = useGameStore((state) => state.stats.defense)
  const morale = useGameStore((state) => state.stats.morale)
  const [view, setView] = useState('main')

  const activePrisoners = defense < 30
    ? prisoners
    : defense < 60
    ? prisoners.slice(0, 3)
    : prisoners.slice(0, 1)

  const prisonCondition = defense < 30 ? 'overcrowded' : defense < 60 ? 'moderate' : 'quiet'

  return (
    <div className="flex flex-col gap-5">

      {/* Prison scene SVG */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#050508' }}>
        <svg width="100%" viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="700" height="260" fill="#050508"/>
          <rect x="0" y="210" width="700" height="50" fill="#080810"/>
          {/* Stone floor */}
          {[0,1,2,3,4,5,6].map(i => (
            <rect key={i} x={i*100} y="210" width="100" height="50"
              fill={i%2===0 ? '#080810' : '#060608'}/>
          ))}
          {/* Corridor */}
          <rect x="0" y="100" width="700" height="112" fill="#06060a"/>
          {/* Ceiling */}
          <rect x="0" y="0" width="700" height="100" fill="#050508"/>
          {/* Torch */}
          <rect x="346" y="30" width="8" height="25" rx="2" fill="#5a3510"/>
          <ellipse cx="350" cy="28" rx="10" ry="14" fill="#e06020" opacity="0.5"/>
          <ellipse cx="350" cy="22" rx="6" ry="10" fill="#ffe066" opacity="0.4"/>
          <ellipse cx="350" cy="95" rx="60" ry="20" fill="#c8a040" opacity="0.05"/>
          {/* Cells on left */}
          {[0,1,2].map(i => (
            <g key={i}>
              <rect x={20+i*215} y="100" width="180" height="112" rx="2"
                fill="#040406" stroke="#2a2a35" strokeWidth="1.5"/>
              {/* Bars */}
              {[0,1,2,3,4].map(j => (
                <line key={j} x1={38+j*30+i*215} y1="100" x2={38+j*30+i*215} y2="212"
                  stroke="#3a3a4a" strokeWidth="2"/>
              ))}
              {/* Cell number */}
              <text x={110+i*215} y="125" textAnchor="middle" fontSize="9"
                fill="#3a3a4a" opacity="0.6">Cell {i+1}</text>
              {/* Prisoner silhouette if occupied */}
              {i < activePrisoners.length && (
                <g>
                  <circle cx={110+i*215} cy="160" r="12" fill="#2a2a35" opacity="0.7"/>
                  <rect x={102+i*215} y="172" width="16" height="25" rx="3"
                    fill="#1a1a25" opacity="0.7"/>
                </g>
              )}
            </g>
          ))}
          {/* Guard post */}
          <rect x="630" y="110" width="55" height="90" rx="3" fill="#0a0a12"
            stroke="#3a3a4a" strokeWidth="1"/>
          <text x="657" y="158" textAnchor="middle" fontSize="8"
            fill="#5a5a7a" opacity="0.7">Guard Post</text>
          {/* Status */}
          <text x="350" y="248" textAnchor="middle" fontSize="10"
            fill={defense < 30 ? '#e05020' : '#5a5a7a'} opacity="0.8">
            {defense < 30 ? '⚠ Prison overcrowded — order breaking down'
              : defense < 60 ? `${activePrisoners.length} prisoners held`
              : 'Prison quiet — Mentedore is well ordered'}
          </text>
          <text x="350" y="18" textAnchor="middle" fontSize="12"
            fill="#5a5a7a" fontWeight="500" opacity="0.6">Mentedore Prison</text>
        </svg>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">Defense</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-stone-800 rounded-full h-2">
              <div className="h-2 rounded-full"
                style={{ width: `${defense}%`, background: defense < 30 ? '#e05020' : '#8a8ab0' }}/>
            </div>
            <span className="text-xs text-stone-400">{defense}</span>
          </div>
        </div>
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Condition</p>
          <p className="text-sm font-medium" style={{
            color: prisonCondition === 'overcrowded' ? '#e05020' : prisonCondition === 'moderate' ? '#c8a040' : '#50c050'
          }}>
            {prisonCondition === 'overcrowded' ? '🔴 Overcrowded' : prisonCondition === 'moderate' ? '🟡 Moderate' : '🟢 Quiet'}
          </p>
        </div>
      </div>

      {/* Prisoner roster */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">
          ⛓️ Prisoner Roster — {activePrisoners.length} held
        </p>
        {activePrisoners.length === 0 ? (
          <p className="text-stone-600 text-sm italic">No prisoners. Mentedore is peaceful.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {activePrisoners.map(prisoner => (
              <div key={prisoner.id} className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div>
                  <p className="text-stone-300 text-sm">{prisoner.name}</p>
                  <p className="text-stone-600 text-xs">{prisoner.crime}</p>
                </div>
                <div className="text-right">
                  <p className="text-stone-500 text-xs">Cell {prisoner.cell}</p>
                  <p className="text-stone-600 text-xs">{prisoner.sentence}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Guards on duty */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">👮 Guards on Duty</p>
        <div className="flex flex-col gap-2">
          {guards.map(guard => (
            <div key={guard.name} className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="flex items-center gap-3">
                <span className="text-lg">🔒</span>
                <div>
                  <p className="text-stone-200 text-sm">{guard.name}</p>
                  <p className="text-stone-600 text-xs">Cells {guard.cells}</p>
                </div>
              </div>
              <span className="text-xs rounded-full px-2 py-0.5"
                style={{ background: guard.shift === 'Day' ? '#1a2a3a' : '#1a1a2a', color: guard.shift === 'Day' ? '#4a90d9' : '#9a70e0' }}>
                {guard.shift}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Prison rules */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">📜 Prison Rules</p>
        <div className="flex flex-col gap-2">
          {rules.map((rule, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-stone-600 text-xs mt-0.5">{i+1}.</span>
              <p className="text-stone-400 text-xs leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}