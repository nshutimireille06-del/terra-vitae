import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const classrooms = [
  {
    id: 'math', name: 'Mathematics', wing: 'lower', emoji: '🔢',
    color: '#0a1a2a', accent: '#4a90d9',
    teacher: 'Mr. Kalinda',
    subject: 'Numbers, algebra, geometry and the language of the universe.',
    topics: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Number Theory'],
    blackboard: 'x² + y² = r²',
  },
  {
    id: 'english', name: 'English', wing: 'lower', emoji: '✍️',
    color: '#1a1a0a', accent: '#c8a040',
    teacher: 'Ms. Uwera',
    subject: 'Reading, writing, and the art of expression.',
    topics: ['Creative Writing', 'Grammar', 'Poetry', 'Literature', 'Debate'],
    blackboard: '"The pen is mightier than the sword."',
  },
  {
    id: 'art', name: 'Art Class', wing: 'lower', emoji: '🎨',
    color: '#1a0a1a', accent: '#c050c0',
    teacher: 'Ms. Amara',
    subject: 'Color, form, and creative expression.',
    topics: ['Drawing', 'Painting', 'Sculpture', 'Mixed Media', 'Art History'],
    blackboard: 'Today: Still life sketching',
  },
  {
    id: 'science', name: 'Science', wing: 'lower', emoji: '🔬',
    color: '#0a1a0a', accent: '#50a050',
    teacher: 'Mr. Nkosi',
    subject: 'Experiments, discoveries, and the natural world.',
    topics: ['Biology', 'Chemistry', 'Physics', 'Earth Science', 'Experiments'],
    blackboard: 'H₂O + CO₂ → H₂CO₃',
  },
  {
    id: 'history', name: 'History', wing: 'upper', emoji: '📜',
    color: '#1a1205', accent: '#c87030',
    teacher: 'Dr. Mutombo',
    subject: 'The story of humanity — triumph, tragedy, and everything between.',
    topics: ['African History', 'World Wars', 'Ancient Civilizations', 'Colonial Era', 'Independence Movements'],
    blackboard: 'Those who forget history are doomed to repeat it.',
  },
  {
    id: 'geography', name: 'Geography', wing: 'upper', emoji: '🌍',
    color: '#051a05', accent: '#40a040',
    teacher: 'Ms. Osei',
    subject: 'Maps, landscapes, climates and the world we inhabit.',
    topics: ['Physical Geography', 'Human Geography', 'Cartography', 'Climate', 'Resources'],
    blackboard: 'Today: The Great Rift Valley',
  },
  {
    id: 'literature', name: 'Literature', wing: 'upper', emoji: '📚',
    color: '#1a0a05', accent: '#d06030',
    teacher: 'Ms. Diallo',
    subject: 'Stories that change how you see the world.',
    topics: ['African Literature', 'Poetry Analysis', 'Novel Study', 'Drama', 'Oral Traditions'],
    blackboard: '"Until the lion learns to write, every story will glorify the hunter."',
  },
  {
    id: 'physics', name: 'Physics', wing: 'upper', emoji: '⚡',
    color: '#05051a', accent: '#7070e0',
    teacher: 'Dr. Mensah',
    subject: 'Forces, energy, motion and the laws of the universe.',
    topics: ['Mechanics', 'Electricity', 'Waves', 'Thermodynamics', 'Quantum'],
    blackboard: 'E = mc²',
  },
]

const announcements = [
  'Term exams begin next Monday. All students must report by 7:30am.',
  'The school garden needs volunteers this Saturday.',
  'Upper school debate competition — sign up at the library.',
  'Lower school art exhibition — this Friday in the assembly hall.',
  'New books have arrived in the school library!',
]

export default function SchoolInterior() {
  const knowledge = useGameStore((state) => state.stats.knowledge)
  const health = useGameStore((state) => state.stats.health)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [currentWing, setCurrentWing] = useState(null)

  const studentCount = Math.floor(20 + (health / 100) * 80)
  const classSize = Math.floor(8 + (knowledge / 100) * 22)

  // Classroom interior view
  if (currentRoom) {
    const room = classrooms.find(r => r.id === currentRoom)
    const seats = Array.from({ length: classSize }, (_, i) => i)
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setCurrentRoom(null)}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: room.accent + '22', color: room.accent }}>
          ← Back to School
        </button>

        {/* Classroom SVG */}
        <div className="rounded-2xl overflow-hidden" style={{ background: room.color }}>
          <svg width="100%" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
            {/* Floor */}
            <rect x="0" y="220" width="600" height="60" fill="#1a1005"/>
            {[0,1,2,3,4,5].map(i => (
              <rect key={i} x={i*100} y="220" width="100" height="60"
                fill={i%2===0 ? '#1a1005' : '#150e04'} />
            ))}
            {/* Walls */}
            <rect x="0" y="0" width="600" height="222" fill={room.color}/>
            {/* Blackboard */}
            <rect x="80" y="20" width="440" height="100" rx="4" fill="#1a3a1a"/>
            <rect x="84" y="24" width="432" height="92" rx="3" fill="#1e3a1e"/>
            <text x="300" y="75" textAnchor="middle" fontSize="13"
              fill="#90c090" fontFamily="monospace" opacity="0.9">
              {room.blackboard.length > 45
                ? room.blackboard.slice(0, 45) + '...'
                : room.blackboard}
            </text>
            {/* Chalk tray */}
            <rect x="80" y="120" width="440" height="6" rx="2" fill="#2a4a2a"/>
            {[0,1,2,3].map(i => (
              <rect key={i} x={100+i*40} y="121" width="28" height="4" rx="1"
                fill={['#f0f0e0','#f0d0d0','#d0d0f0','#d0f0d0'][i]} opacity="0.8"/>
            ))}
            {/* Teacher's desk */}
            <rect x="230" y="148" width="140" height="30" rx="4" fill="#5a3510"/>
            <rect x="220" y="144" width="160" height="8" rx="3" fill="#6a4520"/>
            {/* Teacher figure */}
            <circle cx="190" cy="140" r="10" fill="#c8a070"/>
            <rect x="183" y="150" width="14" height="22" rx="3"
              fill={room.accent} opacity="0.8"/>
            {/* Student desks */}
            {seats.slice(0, Math.min(seats.length, 20)).map((_, i) => {
              const col = i % 5
              const row = Math.floor(i / 5)
              const x = 60 + col * 100
              const y = 185 + row * 18
              return (
                <g key={i}>
                  <rect x={x} y={y} width="55" height="18" rx="2"
                    fill="#4a3010" opacity="0.8"/>
                  <circle cx={x + 27} cy={y - 5} r="5"
                    fill="#c8a070" opacity={knowledge > 50 ? 0.8 : 0.4}/>
                </g>
              )
            })}
            {/* Subject label */}
            <text x="300" y="15" textAnchor="middle" fontSize="10"
              fill={room.accent} opacity="0.7">{room.name} — {room.teacher}</text>
          </svg>
        </div>

        {/* Room details */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-stone-300 text-sm leading-relaxed">{room.subject}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {room.topics.map(topic => (
              <span key={topic} className="text-xs rounded-full px-3 py-1"
                style={{ background: room.accent + '22', color: room.accent }}>
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Class stats */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">Class stats</p>
          <p className="text-stone-300 text-sm">Students in class: <span style={{ color: room.accent }}>{classSize}</span></p>
          <p className="text-stone-300 text-sm mt-1">Teacher: <span style={{ color: room.accent }}>{room.teacher}</span></p>
          <p className="text-stone-400 text-xs mt-2 italic">
            {knowledge < 40
              ? 'Half the seats are empty. Students are losing interest.'
              : knowledge < 70
              ? 'Most seats are filled. Learning continues steadily.'
              : 'Every seat is taken. Extra chairs have been brought in.'}
          </p>
        </div>
      </div>
    )
  }

  // Wing view
  if (currentWing) {
    const wingRooms = classrooms.filter(r => r.wing === currentWing)
    const isLower = currentWing === 'lower'
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setCurrentWing(null)}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: 'rgba(255,255,255,0.06)', color: '#c8a96e' }}>
          ← Back to Campus
        </button>

        <div className="rounded-2xl p-5"
          style={{ background: isLower ? '#0a1a0a' : '#1a1205', border: `1px solid ${isLower ? '#40a04060' : '#c8703060'}` }}>
          <h2 className="text-xl font-bold" style={{ color: isLower ? '#50c050' : '#c87030' }}>
            {isLower ? '🎒 Lower School Wing' : '🎓 Upper School Wing'}
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            {isLower
              ? 'Where young minds first discover the joy of learning.'
              : 'Advanced studies for the scholars of Mentedore.'}
          </p>
        </div>

        {/* Wing hallway SVG */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0f0900' }}>
          <svg width="100%" viewBox="0 0 600 160" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="160" fill="#0f0a05"/>
            <polygon points="0,160 600,160 450,80 150,80" fill="#1a1005"/>
            <polygon points="0,0 600,0 450,80 150,80" fill="#0d0800"/>
            <polygon points="0,0 150,80 150,80 0,160" fill="#120d04"/>
            <polygon points="600,0 450,80 450,80 600,160" fill="#100c04"/>
            {/* Doors */}
            {wingRooms.map((room, i) => {
              const side = i < 2 ? 'left' : 'right'
              const idx = i < 2 ? i : i - 2
              const x = side === 'left' ? 10 + idx * 70 : 600 - 55 - idx * 70
              return (
                <g key={room.id} style={{ cursor: 'pointer' }}
                  onClick={() => setCurrentRoom(room.id)}>
                  <rect x={x} y="30" width="48" height="110" rx="3"
                    fill={room.color} stroke={room.accent} strokeWidth="1.5" opacity="0.9"/>
                  <circle cx={side === 'left' ? x + 40 : x + 8} cy="88" r="3"
                    fill={room.accent} opacity="0.9"/>
                  <text x={x + 24} y="22" textAnchor="middle"
                    fontSize="8" fill={room.accent} opacity="0.9">{room.emoji}</text>
                  <text x={x + 24} y="152" textAnchor="middle"
                    fontSize="7" fill={room.accent} opacity="0.8">{room.name}</text>
                </g>
              )
            })}
            {/* Light */}
            <line x1="300" y1="0" x2="300" y2="25" stroke="#c8a040" strokeWidth="1" opacity="0.5"/>
            <circle cx="300" cy="33" r="10" fill="#fff8e0" opacity="0.9"/>
            <ellipse cx="300" cy="50" rx="25" ry="6" fill="#c8a040" opacity="0.08"/>
          </svg>
        </div>

        <p className="text-stone-500 text-xs text-center">Click a door to enter the classroom</p>
      </div>
    )
  }

  // Main campus view
  return (
    <div className="flex flex-col gap-5">

      {/* Campus SVG — top down map */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#0a1a08' }}>
        <svg width="100%" viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg">

          {/* Grass */}
          <rect x="0" y="0" width="700" height="380" fill="#0a1a08"/>
          {/* Paths */}
          <rect x="320" y="0" width="60" height="380" fill="#2a1e10" opacity="0.6"/>
          <rect x="0" y="170" width="700" height="40" fill="#2a1e10" opacity="0.6"/>

          {/* Main Gate */}
          <rect x="330" y="0" width="40" height="50" rx="2" fill="#5a3510"/>
          <rect x="320" y="15" width="20" height="35" rx="2" fill="#3a2008"
            stroke="#c8a040" strokeWidth="1.5"/>
          <rect x="360" y="15" width="20" height="35" rx="2" fill="#3a2008"
            stroke="#c8a040" strokeWidth="1.5"/>
          <text x="350" y="10" textAnchor="middle" fontSize="9"
            fill="#c8a040" opacity="0.9">Mentedore School</text>

          {/* Lower School Wing */}
          <g style={{ cursor: 'pointer' }} onClick={() => setCurrentWing('lower')}>
            <rect x="30" y="60" width="260" height="100" rx="6"
              fill="#0a2a0a" stroke="#50c050" strokeWidth="1.5" opacity="0.9"/>
            <text x="160" y="105" textAnchor="middle" fontSize="12"
              fill="#50c050" fontWeight="500">🎒 Lower School</text>
            <text x="160" y="120" textAnchor="middle" fontSize="8"
              fill="#50c050" opacity="0.6">Math · English · Art · Science</text>
          </g>

          {/* Upper School Wing */}
          <g style={{ cursor: 'pointer' }} onClick={() => setCurrentWing('upper')}>
            <rect x="410" y="60" width="260" height="100" rx="6"
              fill="#1a1205" stroke="#c87030" strokeWidth="1.5" opacity="0.9"/>
            <text x="540" y="105" textAnchor="middle" fontSize="12"
              fill="#c87030" fontWeight="500">🎓 Upper School</text>
            <text x="540" y="120" textAnchor="middle" fontSize="8"
              fill="#c87030" opacity="0.6">History · Geography · Literature · Physics</text>
          </g>

          {/* School Library */}
          <rect x="30" y="230" width="150" height="80" rx="6"
            fill="#1a0f05" stroke="#c8a040" strokeWidth="1.5" opacity="0.9"/>
          <text x="105" y="268" textAnchor="middle" fontSize="11"
            fill="#c8a040" fontWeight="500">📖 Library</text>
          <text x="105" y="283" textAnchor="middle" fontSize="8"
            fill="#c8a040" opacity="0.6">{Math.floor(knowledge * 0.8)} books</text>

          {/* Assembly Hall */}
          <rect x="270" y="230" width="160" height="80" rx="6"
            fill="#0a0a1a" stroke="#7070e0" strokeWidth="1.5" opacity="0.9"/>
          <text x="350" y="268" textAnchor="middle" fontSize="11"
            fill="#7070e0" fontWeight="500">🏛️ Assembly Hall</text>
          <text x="350" y="283" textAnchor="middle" fontSize="8"
            fill="#7070e0" opacity="0.6">Notices & Events</text>

          {/* Bathrooms */}
          <rect x="520" y="230" width="80" height="35" rx="4"
            fill="#1a1a2a" stroke="#5050a0" strokeWidth="1" opacity="0.7"/>
          <text x="560" y="252" textAnchor="middle" fontSize="9"
            fill="#8080c0">🚻 WC</text>

          {/* Playground */}
          <rect x="520" y="280" width="150" height="80" rx="6"
            fill="#051a05" stroke="#30a030" strokeWidth="1" opacity="0.7"/>
          <text x="595" y="318" textAnchor="middle" fontSize="10"
            fill="#30a030">🏃 Playground</text>

          {/* School Garden */}
          <rect x="30" y="325" width="200" height="50" rx="6"
            fill={knowledge < 40 ? '#0a0a08' : '#0a2a05'}
            stroke={knowledge < 40 ? '#304030' : '#50a030'}
            strokeWidth="1" opacity="0.8"/>
          <text x="130" y="354" textAnchor="middle" fontSize="10"
            fill={knowledge < 40 ? '#304030' : '#50a030'}>
            🌿 School Garden {knowledge < 40 ? '(neglected)' : ''}
          </text>

          {/* Students walking */}
          {knowledge >= 50 && [1,2,3,4,5].map(i => (
            <g key={i}>
              <circle cx={300 + i * 20} cy={185} r="5" fill="#c8a070" opacity="0.7"/>
              <rect x={296 + i * 20} y="190" width="8" height="12" rx="2"
                fill="#4a6a8a" opacity="0.6"/>
            </g>
          ))}

          {/* School name sign */}
          <rect x="250" y="330" width="200" height="40" rx="4"
            fill="#3a2010" stroke="#c8a040" strokeWidth="1" opacity="0.8"/>
          <text x="350" y="348" textAnchor="middle" fontSize="9"
            fill="#c8a040" fontWeight="500">Mentedore School</text>
          <text x="350" y="362" textAnchor="middle" fontSize="7"
            fill="#c8a040" opacity="0.6">Est. Year 1 of the Kingdom</text>

        </svg>
      </div>

      {/* Student Roster */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">
          Student Roster — {studentCount} enrolled
        </p>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: Math.min(studentCount, 18) }, (_, i) => {
            const names = ['Amara','Kofi','Zara','Emeka','Aisha','Kwame','Fatima','Seun','Nala','Jabari','Imani','Chidi','Sade','Tunde','Adaeze','Malik','Yemi','Nia']
            return (
              <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="w-5 h-5 rounded-full flex-shrink-0"
                  style={{ background: `hsl(${i * 37 % 360}, 40%, 35%)` }}/>
                <span className="text-xs text-stone-400">{names[i % names.length]}</span>
              </div>
            )
          })}
          {studentCount > 18 && (
            <div className="flex items-center justify-center rounded-lg px-2 py-1.5 col-span-3"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span className="text-xs text-stone-500">+{studentCount - 18} more students</span>
            </div>
          )}
        </div>
      </div>

      {/* Noticeboard */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">📋 Noticeboard</p>
        <div className="flex flex-col gap-2">
          {announcements.map((note, i) => (
            <div key={i} className="flex gap-3 rounded-lg px-3 py-2"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span className="text-amber-600 text-xs mt-0.5">📌</span>
              <p className="text-stone-400 text-xs leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}