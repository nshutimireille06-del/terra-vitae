import useGameStore from '../store/gameStore'
import LibraryInterior from './interiors/LibraryInterior'
import ArtGalleryInterior from './interiors/ArtGalleryInterior'
import SchoolInterior from './interiors/SchoolInterior'
import MarketInterior from './interiors/MarketInterior'
import BakeryInterior from './interiors/BakeryInterior'
import HarborInterior from './interiors/HarborInterior'
import ClothesShopInterior from './interiors/ClothesShopInterior'
const placeContent = {
  library:     { name: 'The Grand Library',           description: 'Where wisdom lives. Every book you read adds to these shelves.',         interior: '📚 The shelves stretch high. Candles flicker between the stacks.',                color: '#2a1a0a', accent: '#c8a040' },
  school:      { name: 'Mentedore School',             description: 'Where young minds are shaped. Attendance reflects your academic tasks.',  interior: '🏫 Wooden desks, chalk dust, the smell of old paper.',                          color: '#0a1a2a', accent: '#4a90d9' },
  observatory: { name: 'The Observatory & Research Lab', description: 'Stars above, discoveries below. Knowledge powers this place.',          interior: '🔭 The dome rotates slowly. Below, researchers hunch over experiments.',         color: '#0a0a2a', accent: '#9a70e0' },
  castle:      { name: 'Castle Mentedore',             description: 'The seat of power. Its strength reflects your discipline.',              interior: '🏰 Stone corridors, banners on the walls, guards at every post.',               color: '#1a1a2a', accent: '#8a8ab0' },
  armory:      { name: 'The Royal Armory',             description: 'Weapons, armor, and training grounds. Fueled by exercise.',              interior: '⚔️ Racks of swords, shields polished to a mirror shine.',                      color: '#1a0a0a', accent: '#c04040' },
  healing:     { name: 'The Healing House',            description: 'Where the sick recover. Your wellness habits keep it thriving.',         interior: '🏥 Herb bundles hang from the ceiling. A fire burns low and warm.',             color: '#0a1a0a', accent: '#50a050' },
  garden:      { name: 'The Royal Garden',             description: 'A place of peace. Grows with the health of your civilization.',          interior: '🌿 Stone paths wind between beds of flowers and ancient trees.',               color: '#0a1a0a', accent: '#5a9e2f' },
  artgallery:  { name: 'The Art Gallery',              description: 'Masterpieces line the walls. Created when your morale soars.',           interior: '🎨 High ceilings, soft light, the quiet shuffle of visitors.',                 color: '#1a0a1a', accent: '#c050c0' },
  townsquare:  { name: 'The Town Square',              description: 'The heart of Mentedore. Festivals or unrest — it reflects your spirit.', interior: '🎭 A fountain at the center. Voices carry across the cobblestones.',           color: '#1a1a0a', accent: '#c8a050' },
  market:      { name: 'The Grand Market',             description: 'Trade and commerce. Stocked by your finance and food tasks.',            interior: '🛒 Vendors call out their wares. The smell of spices fills the air.',          color: '#1a0a0a', accent: '#e07030' },
  bakery:      { name: 'The Royal Bakery',             description: 'Fresh bread feeds the people. Tied to your food and finance tasks.',     interior: '🍞 Warm ovens, flour on every surface, loaves stacked high.',                  color: '#1a0a0a', accent: '#c87030' },
  clothes:     { name: 'The Clothes Shop',             description: 'Fashion and fabric. New stock arrives with your creative tasks.',        interior: '👗 Bolts of silk and wool line the walls. A tailor measures quietly.',         color: '#1a0a1a', accent: '#c060a0' },
  harbor:      { name: 'The Harbor',                   description: 'Ships come and go. The docks thrive when your water stat is high.',      interior: '⚓ Salt air, creaking ropes, boats bobbing on the water.',                     color: '#0a1a2a', accent: '#2980b9' },
  techhouse:   { name: 'The Tech House',               description: 'Where innovation happens. Powered by learning and knowledge tasks.',     interior: '💻 Blueprints cover every wall. The hum of invention fills the room.',        color: '#0a1a1a', accent: '#30c0c0' },
  prison:      { name: 'Mentedore Prison',             description: 'Order must be kept. Fills when defense and morale are neglected.',       interior: '🔒 Iron bars, echoing footsteps, a single torch in the corridor.',            color: '#1a1a1a', accent: '#808080' },
}

function getStatForPlace(placeId) {
  const map = {
    library: 'knowledge', school: 'knowledge', observatory: 'knowledge',
    techhouse: 'knowledge', castle: 'defense', armory: 'defense',
    prison: 'defense', healing: 'health', garden: 'health',
    artgallery: 'morale', townsquare: 'morale', clothes: 'morale',
    market: 'food', bakery: 'food', harbor: 'water',
  }
  return map[placeId] || 'morale'
}

function getNarrative(placeId, val) {
  const state = val < 40 ? 'low' : val < 65 ? 'mid' : 'high'
  const narratives = {
    library:     { low: 'The shelves are bare. Dust settles where books once stood. A single candle flickers in the dark.', mid: 'A few scholars browse quietly. Some shelves are filled, others wait.', high: 'Every shelf overflows. Scholars debate loudly. The candles burn all night.' },
    school:      { low: 'The classrooms are empty. Chalk still marks the board from the last lesson, weeks ago.', mid: 'A handful of students sit at their desks. The teacher speaks to a half-full room.', high: 'Every seat is taken. Children spill into the hallway, eager to learn.' },
    observatory: { low: 'The telescope gathers dust. The research lab is dark. No one has looked at the stars in weeks.', mid: 'One astronomer charts the sky. Below, a researcher works alone by lamplight.', high: 'The dome spins nightly. The lab buzzes with discovery. New charts cover every wall.' },
    castle:      { low: 'The walls are cracked. Guards have abandoned their posts. The throne room echoes with emptiness.', mid: 'A skeleton crew holds the walls. The castle stands, but barely thrives.', high: 'Banners fly from every tower. Guards stand proud. The castle is impregnable.' },
    armory:      { low: 'Weapons rust in their racks. The training yard is empty and overgrown.', mid: 'Some soldiers train in the yard. The forge burns low but steadily.', high: 'The forge roars day and night. Every weapon gleams. Soldiers spar at dawn.' },
    healing:     { low: 'The beds are full. Healers rush between patients. Herbs are running low.', mid: 'The house tends to a few sick. Stocks of medicine are adequate.', high: 'The healing house is quiet and clean. Villagers come for checkups, not emergencies.' },
    garden:      { low: 'The flowers have wilted. The paths are overgrown. The fountain sits dry.', mid: 'Some blooms remain. Gardeners tend to the hardier plants.', high: 'The garden is in full bloom. Bees hum. Children play on the paths.' },
    artgallery:  { low: 'The walls are bare. The last exhibition closed months ago. The floors echo.', mid: 'A few pieces hang carefully. Visitors come on weekends.', high: 'Every wall is covered. A new exhibition opens this week. The queue stretches outside.' },
    townsquare:  { low: 'Fires smoulder in corners. People hurry past with heads down. Unrest is in the air.', mid: 'The fountain runs. Vendors set up stalls. Life continues cautiously.', high: 'Banners fly. Music plays. The square is full of laughter and the smell of food.' },
    market:      { low: 'Half the stalls are empty. Prices are high. Shelves are bare.', mid: 'Trade moves slowly but steadily. Most goods are available.', high: 'The market overflows with goods. Merchants argue happily over prices.' },
    bakery:      { low: 'The ovens are cold. The last loaf sold yesterday. A queue waits with no hope.', mid: 'Fresh bread in the morning, sold out by noon. The baker works alone.', high: 'The smell of bread fills the whole street. Three bakers work through the night.' },
    clothes:     { low: 'The racks are nearly empty. The tailor sits idle, waiting for materials.', mid: 'Some garments hang neatly. New orders trickle in slowly.', high: 'Bolts of silk and new designs fill every corner. There is a two-week waiting list.' },
    harbor:      { low: 'The docks are dry. Boats sit on cracked mud. No ships have come in weeks.', mid: 'A few fishing boats go out at dawn. One trade ship is moored at the pier.', high: 'The harbor is full of life. Trade ships from distant lands bring exotic goods.' },
    techhouse:   { low: 'Blueprints gather dust. The machines are silent. Inventors have moved on.', mid: 'One or two projects are underway. The hum of work is quiet but present.', high: 'Every workbench is occupied. New inventions are unveiled weekly.' },
    prison:      { low: 'The prison is overflowing. Order has broken down. Guards struggle to cope.', mid: 'A few cells are occupied. The guards keep a watchful eye.', high: 'The prison is nearly empty. Mentedore is peaceful and well-ordered.' },
  }
  return narratives[placeId]?.[state] ?? 'The place stands quietly, waiting.'
}

export default function PlaceView() {
  const currentPlace = useGameStore((state) => state.currentPlace)
  const setCurrentPlace = useGameStore((state) => state.setCurrentPlace)
  const stats = useGameStore((state) => state.stats)

  if (!currentPlace) return null
  const place = placeContent[currentPlace]
  if (!place) return null

  const statKey = getStatForPlace(currentPlace)
  const statVal = stats[statKey]

  return (
    <div className="min-h-screen p-6" style={{ background: place.color }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Back button */}
        <button
          onClick={() => setCurrentPlace(null)}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: place.accent + '33', color: place.accent }}
        >
          ← Back to Mentedore
        </button>

        {/* Header */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${place.accent}40` }}>
          <h1 className="text-3xl font-bold" style={{ color: place.accent }}>
            {place.name}
          </h1>
          <p className="text-stone-400 mt-2">{place.description}</p>
          <p className="text-stone-300 mt-4 italic text-sm">{place.interior}</p>
        </div>

        {/* Stat condition */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Current condition</p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-300 capitalize w-24">{statKey}</span>
            <div className="flex-1 bg-stone-800 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full transition-all duration-700"
                style={{
                  width: `${statVal}%`,
                  background: statVal < 40 ? '#e05020' : statVal < 65 ? '#e0a020' : place.accent
                }}
              />
            </div>
            <span className="text-sm text-stone-400 w-8 text-right">{statVal}</span>
          </div>
        </div>

      


        {/* Place specific interior */}
        {currentPlace === 'library' && <LibraryInterior />}
        {currentPlace === 'artgallery' && <ArtGalleryInterior />}
        {currentPlace === 'school' && <SchoolInterior />}
        {currentPlace === 'market' && <MarketInterior />}
        {currentPlace === 'bakery' && <BakeryInterior />}
        {currentPlace === 'harbor' && <HarborInterior />}
        {currentPlace === 'clothes' && <ClothesShopInterior />}
      </div>
    </div>
  )
}