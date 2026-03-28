const crisisEvents = {
  water: {
    name: 'The Great Drought',
    description: 'Crops wither. Rivers crack. Your people thirst.',
    resolution: 'Complete any reading task within 5 days',
    days: 5,
  },
  food: {
    name: 'Famine Sweeps the Land',
    description: 'Starvation spreads through your cities.',
    resolution: 'Complete 3 tasks of any type within 7 days',
    days: 7,
  },
  knowledge: {
    name: 'The Dark Age',
    description: 'Wisdom is lost. Your scholars flee.',
    resolution: 'Complete a writing or study task within 3 days',
    days: 3,
  },
  health: {
    name: 'The Plague',
    description: 'Disease moves through your cities like a shadow.',
    resolution: 'Complete 2 health tasks within 5 days',
    days: 5,
  },
  defense: {
    name: 'Raiders at the Gates',
    description: 'Enemies advance. Your walls are weak.',
    resolution: 'Complete 2 physical tasks within 4 days',
    days: 4,
  },
  morale: {
    name: 'Uprising',
    description: 'Unrest spreads. Your people whisper of revolt.',
    resolution: 'Complete a creative task within 4 days',
    days: 4,
  },
}

export default crisisEvents