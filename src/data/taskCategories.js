const taskCategories = [
  { id: 'reading',  label: 'Reading',   statKey: 'knowledge', reward: 'Library glows — scholars arrive',    consequence: 'Library darkens — wisdom fades' },
  { id: 'writing',  label: 'Writing',   statKey: 'knowledge', reward: 'New building constructed',            consequence: 'Structural collapse' },
  { id: 'academic', label: 'Academic',  statKey: 'knowledge', reward: 'Scholars arrive',                     consequence: 'Plague of ignorance' },
  { id: 'exercise', label: 'Exercise',  statKey: 'defense',   reward: 'Army strengthened',                   consequence: 'Bandits raid' },
  { id: 'creative', label: 'Creative',  statKey: 'morale',    reward: 'Festival — happiness surges',         consequence: 'Cultural decay' },
  { id: 'finance',  label: 'Finance',   statKey: 'food',      reward: 'Trade route opened',                  consequence: 'Economic crisis' },
  { id: 'health',   label: 'Health',    statKey: 'health',    reward: 'Population grows',                    consequence: 'Disease outbreak' },
  { id: 'learning', label: 'Learning',  statKey: 'knowledge', reward: 'Technology unlocked',                 consequence: 'Stagnation' },
  { id: 'water',    label: 'Hydration', statKey: 'water',     reward: 'Lake fills — crops grow',             consequence: 'Lake shrinks — drought risk' },
  { id: 'custom',   label: 'Custom',    statKey: 'morale',    reward: 'Your choice',                         consequence: 'Your choice' },
]

export default taskCategories