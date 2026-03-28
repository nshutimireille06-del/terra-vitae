import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const rooms = [
  { id: 'african',       name: 'African Art',            door: '#3d0a0a', doorDark: '#1a0000', accent: '#8B3030', color: '#0f0000', description: 'Ancient and contemporary works from across the African continent.', artworks: [ { title: 'Benin Bronze Head', artist: 'Benin Kingdom, Nigeria', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Benin_bronze_head.jpg/400px-Benin_bronze_head.jpg' }, { title: 'Kente Cloth Pattern', artist: 'Ashanti Kingdom, Ghana', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Kente-x.jpg/400px-Kente-x.jpg' }, { title: 'Ndebele Wall Painting', artist: 'Ndebele People, South Africa', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ndebele_wall_painting.jpg/400px-Ndebele_wall_painting.jpg' }, { title: 'Ethiopian Icon', artist: 'Ethiopian Orthodox Tradition', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Ethiopian_Coptic_icon.jpg/400px-Ethiopian_Coptic_icon.jpg' } ] },
  { id: 'blackart',      name: 'Black Art & Culture',    door: '#1a0505', doorDark: '#0a0000', accent: '#6b1515', color: '#080000', description: 'A celebration of Black identity, history, struggle, and joy.', artworks: [ { title: 'Aspects of Negro Life', artist: 'Aaron Douglas, 1934', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Aaron_Douglas_-_Aspects_of_Negro_Life_from_Slavery_to_Reconstruction.jpg/400px-Aaron_Douglas_-_Aspects_of_Negro_Life_from_Slavery_to_Reconstruction.jpg' }, { title: 'The Migration Series', artist: 'Jacob Lawrence, 1940–41', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Jacob_Lawrence_-_The_Migration_Series%2C_Panel_no._1.jpg/400px-Jacob_Lawrence_-_The_Migration_Series%2C_Panel_no._1.jpg' }, { title: 'Kehinde Wiley — Napoleon', artist: 'Kehinde Wiley', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Kehinde_Wiley_-_Napoleon_Leading_the_Army_over_the_Alps.jpg/400px-Kehinde_Wiley_-_Napoleon_Leading_the_Army_over_the_Alps.jpg' }, { title: 'Martin Luther King Jr', artist: 'Kadir Nelson', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Martin_Luther_King_Jr_NYWTS.jpg/400px-Martin_Luther_King_Jr_NYWTS.jpg' } ] },
  { id: 'impressionism',  name: 'Impressionism',          door: '#0a1a2a', doorDark: '#050d14', accent: '#2a5a7a', color: '#020810', description: 'Light, color, and movement captured in a fleeting moment.', artworks: [ { title: 'Water Lilies', artist: 'Claude Monet, 1906', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/400px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg' }, { title: 'Dance at Le Moulin de la Galette', artist: 'Renoir, 1876', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Auguste_Renoir_-_Dance_at_Le_Moulin_de_la_Galette.jpg/400px-Auguste_Renoir_-_Dance_at_Le_Moulin_de_la_Galette.jpg' }, { title: 'A Sunday on La Grande Jatte', artist: 'Seurat, 1886', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/400px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg' }, { title: 'The Ballet Class', artist: 'Edgar Degas, 1874', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg/400px-Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg' } ] },
  { id: 'abstract',       name: 'Abstract',               door: '#050a1a', doorDark: '#02050d', accent: '#1a2a5a', color: '#010308', description: 'Form, color, and emotion freed from the literal.', artworks: [ { title: 'Composition VIII', artist: 'Kandinsky, 1923', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vassily_Kandinsky%2C_1923_-_Composition_8%2C_huile_sur_toile%2C_140_cm_x_201_cm%2C_Mus%C3%A9e_Guggenheim%2C_New_York.jpg/400px-Vassily_Kandinsky%2C_1923_-_Composition_8%2C_huile_sur_toile%2C_140_cm_x_201_cm%2C_Mus%C3%A9e_Guggenheim%2C_New_York.jpg' }, { title: 'Broadway Boogie Woogie', artist: 'Mondrian, 1942–43', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Piet_Mondriaan%2C_1942_-_Broadway_Boogie-Woogie.jpg/400px-Piet_Mondriaan%2C_1942_-_Broadway_Boogie-Woogie.jpg' }, { title: 'Black Square', artist: 'Malevich, 1915', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Malevich_black_square.jpg/400px-Malevich_black_square.jpg' }, { title: 'Blue, Orange, Red', artist: 'Mark Rothko, 1961', url: 'https://upload.wikimedia.org/wikipedia/en/8/84/Rothko_No_61.jpg' } ] },
  { id: 'nature',         name: 'Nature & Landscapes',    door: '#0a1a0a', doorDark: '#050d05', accent: '#2a5a2a', color: '#020802', description: 'The world in its most breathtaking form.', artworks: [ { title: 'The Starry Night', artist: 'Van Gogh, 1889', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/400px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' }, { title: 'Wanderer Above the Sea of Fog', artist: 'Friedrich, 1818', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/400px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg' }, { title: 'The Great Wave', artist: 'Hokusai, 1831', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/400px-Great_Wave_off_Kanagawa2.jpg' }, { title: 'Impression, Sunrise', artist: 'Monet, 1872', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/400px-Monet_-_Impression%2C_Sunrise.jpg' } ] },
  { id: 'streetart',      name: 'Street Art',             door: '#0a1a08', doorDark: '#051008', accent: '#205020', color: '#020802', description: 'Art that belongs to everyone. The streets are the gallery.', artworks: [ { title: 'Girl with Balloon', artist: 'Banksy, London', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Banksy_Girl_and_Heart_Balloon.jpg/400px-Banksy_Girl_and_Heart_Balloon.jpg' }, { title: 'Space Invader Mosaic', artist: 'Invader, Paris', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Space_Invader_mosaic_Paris.jpg/400px-Space_Invader_mosaic_Paris.jpg' }, { title: 'The Flower Thrower', artist: 'Banksy, Palestine', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Banksy_flower_thrower.jpg/400px-Banksy_flower_thrower.jpg' }, { title: 'Keith Haring Mural', artist: 'Keith Haring, New York', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Keith_Haring_-_Crack_is_Wack_mural.jpg/400px-Keith_Haring_-_Crack_is_Wack_mural.jpg' } ] },
  { id: 'modern',         name: 'Modern & Contemporary',  door: '#1a0a10', doorDark: '#0d0508', accent: '#5a2035', color: '#080205', description: 'Art that challenges, provokes, and reimagines.', artworks: [ { title: 'The Persistence of Memory', artist: 'Salvador Dalí, 1931', url: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg' }, { title: "Campbell's Soup Cans", artist: 'Andy Warhol, 1962', url: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Campbells_Soup_Cans_MOMA.jpg' }, { title: 'No. 31', artist: 'Jackson Pollock, 1950', url: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Pollock_No_31.jpg' }, { title: 'Woman I', artist: 'Willem de Kooning, 1950–52', url: 'https://upload.wikimedia.org/wikipedia/en/0/0e/De_Kooning_Woman_I.jpg' } ] },
  { id: 'cubism',         name: 'Cubism',                 door: '#1a0515', doorDark: '#0d020a', accent: '#5a1545', color: '#080105', description: 'Reality shattered and reassembled. Every angle at once.', artworks: [ { title: "Les Demoiselles d'Avignon", artist: 'Picasso, 1907', url: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Les_Demoiselles_d%27Avignon.jpg' }, { title: 'Guernica', artist: 'Picasso, 1937', url: 'https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg' }, { title: 'Violin and Candlestick', artist: 'Braque, 1910', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Georges_Braque%2C_1910%2C_Violin_and_Candlestick%2C_San_Francisco_Museum_of_Modern_Art.jpg/400px-Georges_Braque%2C_1910%2C_Violin_and_Candlestick%2C_San_Francisco_Museum_of_Modern_Art.jpg' }, { title: 'The Portuguese', artist: 'Braque, 1911', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Georges_Braque%2C_1911-12%2C_Le_Portugais_%28The_Emigrant%29.jpg/400px-Georges_Braque%2C_1911-12%2C_Le_Portugais_%28The_Emigrant%29.jpg' } ] },
  { id: 'photography',    name: 'Photography',            door: '#0f0f0f', doorDark: '#080808', accent: '#3a3a3a', color: '#040404', description: 'The world as it was — and as the photographer chose to see it.', artworks: [ { title: 'Migrant Mother', artist: 'Dorothea Lange, 1936', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Lange-MigrantMother02.jpg/400px-Lange-MigrantMother02.jpg' }, { title: 'Afghan Girl', artist: 'Steve McCurry, 1984', url: 'https://upload.wikimedia.org/wikipedia/en/6/6e/SharabatGula.jpg' }, { title: 'Tank Man', artist: 'Jeff Widener, 1989', url: 'https://upload.wikimedia.org/wikipedia/en/3/38/Tianasquare.jpg' }, { title: 'The Tetons and the Snake River', artist: 'Ansel Adams, 1942', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Adams_The_Tetons_and_the_Snake_River.jpg/400px-Adams_The_Tetons_and_the_Snake_River.jpg' } ] },
  { id: 'renaissance',    name: 'Renaissance',            door: '#181818', doorDark: '#0a0a0a', accent: '#484848', color: '#060606', description: 'The rebirth of classical ideals — human form, perspective, and the divine.', artworks: [ { title: 'The Birth of Venus', artist: 'Botticelli, 1484–86', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/400px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg' }, { title: 'The Creation of Adam', artist: 'Michelangelo, 1512', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/400px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg' }, { title: 'School of Athens', artist: 'Raphael, 1509–11', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/400px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg' }, { title: 'The Last Supper', artist: 'Leonardo da Vinci, 1495–98', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/400px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg' } ] },
]

const artQuestions = [
  { question: 'What is chiaroscuro?', answer: 'The use of strong contrasts between light and dark to give the illusion of volume in painting', keywords: ['light', 'dark', 'contrast', 'shadow', 'volume'] },
  { question: 'Define pointillism.', answer: 'A technique of painting in which small distinct dots of color are applied in patterns to form an image', keywords: ['dots', 'points', 'color', 'technique', 'pattern'] },
  { question: 'What is the golden ratio in art?', answer: 'A mathematical ratio of approximately 1.618 used to create aesthetically pleasing compositions', keywords: ['ratio', 'proportion', 'composition', 'mathematical', '1.618'] },
  { question: 'What does sfumato mean?', answer: "Leonardo da Vinci's technique of blending colors and tones so subtly that there is no clear line", keywords: ['blend', 'smoke', 'Leonardo', 'soft', 'transition'] },
  { question: 'Define trompe-l\'oeil.', answer: 'A technique that uses realistic imagery to create the illusion that depicted objects exist in three dimensions', keywords: ['illusion', 'three', '3d', 'realistic', 'trick'] },
  { question: 'What is impasto?', answer: 'A technique where paint is laid on thickly so that brush or palette knife strokes are visible', keywords: ['thick', 'texture', 'brush', 'palette', 'raised'] },
  { question: 'What is negative space in art?', answer: 'The space around and between the subjects of an image, which helps define the subject itself', keywords: ['space', 'around', 'between', 'background', 'subject'] },
  { question: 'Define chroma in color theory.', answer: 'The purity or intensity of a color, how saturated or vivid it appears', keywords: ['purity', 'intensity', 'saturation', 'vivid', 'color'] },
  { question: 'What is foreshortening?', answer: 'A technique that represents an object or figure as shorter than it actually is to create the illusion of depth', keywords: ['depth', 'shorter', 'perspective', 'illusion', 'angle'] },
  { question: 'What is a vanishing point?', answer: 'The point in a perspective drawing where parallel lines appear to converge in the distance', keywords: ['perspective', 'converge', 'horizon', 'parallel', 'distance'] },
]

export default function ArtGalleryInterior() {
  const morale = useGameStore((state) => state.stats.morale)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [quizAnswer, setQuizAnswer] = useState('')
  const [quizResult, setQuizResult] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(
    () => artQuestions[Math.floor(Math.random() * artQuestions.length)]
  )

  const checkAnswer = () => {
    const answer = quizAnswer.toLowerCase()
    const correct = currentQuestion.keywords.some(k => answer.includes(k))
    setQuizResult(correct ? 'correct' : 'incorrect')
    setTimeout(() => {
      setQuizResult(null)
      setQuizAnswer('')
      setCurrentQuestion(artQuestions[Math.floor(Math.random() * artQuestions.length)])
    }, 3000)
  }

  if (currentRoom) {
    const room = rooms.find(r => r.id === currentRoom)
    return (
      <div className="flex flex-col gap-6">
        <button
          onClick={() => setCurrentRoom(null)}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: room.accent + '22', color: room.accent }}
        >
          ← Back to Corridor
        </button>

        <div className="rounded-2xl p-5" style={{ background: room.color, border: `1px solid ${room.accent}40` }}>
          <h2 className="text-2xl font-bold" style={{ color: room.accent }}>{room.name}</h2>
          <p className="text-stone-400 text-sm mt-2">{room.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {room.artworks.map((art, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="rounded-xl overflow-hidden aspect-square bg-stone-800"
                style={{ border: `2px solid ${room.accent}40` }}>
                <img src={art.url} alt={art.title}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none' }}/>
              </div>
              <p className="text-stone-200 text-sm font-medium">{art.title}</p>
              <p className="text-stone-500 text-xs">{art.artist}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Door layout: 5 on each side of corridor
  const leftDoors = rooms.slice(0, 5)
  const rightDoors = rooms.slice(5, 10)

  const doorWidth = 52
  const doorHeight = 160
  const corridorW = 700
  const corridorH = 420

  return (
    <div className="flex flex-col gap-6">

      {/* Corridor with colored doors */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#0f0900' }}>
        <svg width="100%" viewBox={`0 0 ${corridorW} ${corridorH}`} xmlns="http://www.w3.org/2000/svg">

          {/* Floor */}
          <polygon points={`0,${corridorH} ${corridorW},${corridorH} 480,210 220,210`} fill="#1e1005"/>
          {[0,1,2,3,4,5,6].map(i => (
            <line key={i} x1={i*116} y1={corridorH} x2="350" y2="210"
              stroke="#2a1808" strokeWidth="1" opacity="0.4"/>
          ))}

          {/* Ceiling */}
          <polygon points={`0,0 ${corridorW},0 480,210 220,210`} fill="#0d0700"/>

          {/* Left wall */}
          <polygon points={`0,0 220,210 220,210 0,${corridorH}`} fill="#1a0e05"/>
          {/* Right wall */}
          <polygon points={`${corridorW},0 480,210 480,210 ${corridorW},${corridorH}`} fill="#160c04"/>

          {/* Back wall */}
          <rect x="220" y="210" width="260" height="210" fill="#1e1208"/>
          <rect x="295" y="230" width="110" height="190" rx="2" fill="#0f0700"
            stroke="#c8a040" strokeWidth="1" opacity="0.4"/>

          {/* Globe lights */}
          {[140, 280, 350, 420, 560].map((x, i) => {
            const size = i === 2 ? 14 : 18
            const y = i === 2 ? 60 : 30
            return (
              <g key={x}>
                <line x1={x} y1="0" x2={x} y2={y} stroke="#c8a040" strokeWidth="1" opacity="0.5"/>
                <circle cx={x} cy={y + size} r={size} fill="#fff8e0" opacity="0.85"/>
                <circle cx={x} cy={y + size} r={size * 0.5} fill="white" opacity="0.6"/>
                <ellipse cx={x} cy={y + size * 2 + 10} rx={size * 2.5} ry="6"
                  fill="#c8a040" opacity="0.08"/>
              </g>
            )
          })}

         {/* LEFT WALL DOORS — 5 doors */}
          {leftDoors.map((room, i) => {
            const x = 2 + i * 58
            const y = 55 + i * 28
            const h = doorHeight - i * 28
            const w = doorWidth - i * 4
            return (
              <g key={room.id} style={{ cursor: 'pointer' }}
                onClick={() => setCurrentRoom(room.id)}>
                <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx="3"
                  fill="#3a2010" stroke="#c8a040" strokeWidth="1" opacity="0.6"/>
                <rect x={x} y={y} width={w} height={h} rx="2" fill={room.door}/>
                <rect x={x} y={y} width={w * 0.35} height={h} rx="2"
                  fill="white" opacity="0.05"/>
                <circle cx={x + w - 8} cy={y + h * 0.55} r="3.5"
                  fill="#c8a040" opacity="0.9"/>
                <text x={x + w / 2} y={y - 9} textAnchor="middle"
                  fontSize={`${8.5 - i * 0.4}`} fill="#c8a96e" opacity="0.8"
                  fontWeight="500">
                  {room.name.length > 10 ? room.name.slice(0, 9) + '…' : room.name}
                </text>
              </g>
            )
          })}

          {/* RIGHT WALL DOORS — 5 doors (mirror of left) */}
          {rightDoors.map((room, i) => {
            const idx = 4 - i
            const w = doorWidth - idx * 4
            const h = doorHeight - idx * 28
            const x = corridorW - 2 - w - idx * 58
            const y = 55 + idx * 28
            return (
              <g key={room.id} style={{ cursor: 'pointer' }}
                onClick={() => setCurrentRoom(room.id)}>
                <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx="3"
                  fill="#3a2010" stroke="#c8a040" strokeWidth="1" opacity="0.6"/>
                <rect x={x} y={y} width={w} height={h} rx="2" fill={room.door}/>
                <rect x={x} y={y} width={w * 0.35} height={h} rx="2"
                  fill="white" opacity="0.05"/>
                <circle cx={x + 8} cy={y + h * 0.55} r="3.5"
                  fill="#c8a040" opacity="0.9"/>
                <text x={x + w / 2} y={y - 9} textAnchor="middle"
                  fontSize={`${8.5 - idx * 0.4}`} fill="#c8a96e" opacity="0.8"
                  fontWeight="500">
                  {room.name.length > 10 ? room.name.slice(0, 9) + '…' : room.name}
                </text>
              </g>
            )
          })}
          {/* Skirting boards */}
          <line x1="0" y1={corridorH - 2} x2="220" y2="210"
            stroke="#c8a040" strokeWidth="1" opacity="0.2"/>
          <line x1={corridorW} y1={corridorH - 2} x2="480" y2="210"
            stroke="#c8a040" strokeWidth="1" opacity="0.2"/>

          <text x="350" y={corridorH - 8} textAnchor="middle" fontSize="10"
            fill="#c8a96e" opacity="0.4">The Grand Corridor of Mentedore Gallery</text>

        </svg>
      </div>

      {/* Art Quiz */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,160,64,0.2)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Art Knowledge Quiz</p>
        <p className="text-xs text-stone-600 mb-3">Answer correctly to improve the gallery's morale</p>
        <p className="text-stone-200 text-sm font-medium mb-3">
          🎨 {currentQuestion.question}
        </p>
        <div className="flex flex-col gap-2">
          <textarea
            className="bg-stone-800 text-stone-100 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            placeholder="Describe it in your own words..."
            rows={3}
            value={quizAnswer}
            onChange={e => setQuizAnswer(e.target.value)}
          />
          <button
            onClick={checkAnswer}
            disabled={!quizAnswer.trim()}
            className="rounded-lg py-2 px-4 text-sm font-medium transition-colors disabled:opacity-40"
            style={{ background: '#c8a040', color: '#1a0f05' }}
          >
            Submit Answer
          </button>
        </div>

        {quizResult && (
          <div className={`mt-3 rounded-lg px-4 py-3 text-sm ${
            quizResult === 'correct'
              ? 'bg-green-900 text-green-300'
              : 'bg-red-900 text-red-300'
          }`}>
            {quizResult === 'correct'
              ? '✅ Correct! The gallery flourishes. Morale +5'
              : `❌ Not quite. The answer: ${currentQuestion.answer}`}
          </div>
        )}
      </div>

     

    </div>
  )
}