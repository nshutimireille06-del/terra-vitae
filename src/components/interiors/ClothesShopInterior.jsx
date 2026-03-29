import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const collections = {
  ankara: {
    name: 'Ankara Collection',
    emoji: '🌺',
    accent: '#e07030',
    items: [
      { id: 'a1', name: 'Ankara Wrap Dress', emoji: '👗', price: 25, desc: 'Bold geometric patterns in deep orange and gold', season: 'All Season' },
      { id: 'a2', name: 'Dashiki Top', emoji: '👕', price: 15, desc: 'Classic V-neck with intricate embroidery', season: 'Summer' },
      { id: 'a3', name: 'Kente Robe', emoji: '🥻', price: 40, desc: 'Woven in the royal Kente tradition of Mentedore', season: 'Ceremonial' },
      { id: 'a4', name: 'Ankara Trousers', emoji: '👖', price: 20, desc: 'Wide-leg cut in vibrant blue and green print', season: 'All Season' },
      { id: 'a5', name: 'Headwrap Set', emoji: '🎀', price: 12, desc: 'Three matching headwraps in sunrise colors', season: 'All Season' },
      { id: 'a6', name: 'Boubou Grand', emoji: '🥻', price: 55, desc: 'Flowing formal boubou for royal occasions', season: 'Ceremonial' },
    ]
  },
  fantasy: {
    name: 'Fantasy Collection',
    emoji: '✨',
    accent: '#9a70e0',
    items: [
      { id: 'f1', name: 'Scholar\'s Robe', emoji: '🧥', price: 35, desc: 'Deep purple with silver constellations stitched along the hem', season: 'Winter' },
      { id: 'f2', name: 'Warrior Cloak', emoji: '🧣', price: 45, desc: 'Midnight black, lined with fireproof thread', season: 'Winter' },
      { id: 'f3', name: 'Forest Tunic', emoji: '👕', price: 22, desc: 'Sage green with leaf patterns that shimmer at dusk', season: 'Spring' },
      { id: 'f4', name: 'Moonweave Dress', emoji: '👗', price: 60, desc: 'Shimmers silver under moonlight. Rare enchanted fabric.', season: 'Ceremonial' },
      { id: 'f5', name: 'Kingdom Guard Uniform', emoji: '🥋', price: 50, desc: 'Official uniform of the Mentedore city guard', season: 'All Season' },
      { id: 'f6', name: 'Traveler\'s Vest', emoji: '🦺', price: 28, desc: 'Many pockets. Enchanted to stay dry in rain.', season: 'All Season' },
    ]
  },
  accessories: {
    name: 'Accessories',
    emoji: '💍',
    accent: '#c8a040',
    items: [
      { id: 'ac1', name: 'Gold Cuff Bracelet', emoji: '💛', price: 18, desc: 'Hand-hammered gold, inscribed with Mentedore symbols', season: 'All Season' },
      { id: 'ac2', name: 'Beaded Necklace', emoji: '📿', price: 12, desc: 'Multicolored beads from the Eastern markets', season: 'All Season' },
      { id: 'ac3', name: 'Royal Crown', emoji: '👑', price: 120, desc: 'Reserved for the highest morale civilizations only', season: 'Ceremonial' },
      { id: 'ac4', name: 'Leather Sandals', emoji: '👡', price: 15, desc: 'Hand-stitched leather from the market tannery', season: 'Summer' },
      { id: 'ac5', name: 'Warrior\'s Armband', emoji: '💪', price: 20, desc: 'Bronze armband engraved with the Mentedore crest', season: 'All Season' },
      { id: 'ac6', name: 'Silk Scarf', emoji: '🧣', price: 14, desc: 'Lightweight silk in sunset orange and gold', season: 'All Season' },
    ]
  },
  seasonal: {
    name: 'Seasonal Collection',
    emoji: '🌿',
    accent: '#50c050',
    items: [
      { id: 's1', name: 'Harvest Festival Gown', emoji: '👗', price: 70, desc: 'Worn at the annual harvest celebration. Deep amber tones.', season: 'Autumn' },
      { id: 's2', name: 'Rain Season Coat', emoji: '🧥', price: 45, desc: 'Waterproof outer shell with warm lining inside', season: 'Winter' },
      { id: 's3', name: 'Summer Linen Set', emoji: '👔', price: 30, desc: 'Breathable linen in ivory and cream. Perfect for heat.', season: 'Summer' },
      { id: 's4', name: 'New Year Ceremonial Robe', emoji: '🥻', price: 90, desc: 'Only available at the turn of each new era', season: 'Ceremonial' },
    ]
  }
}

const tailorOptions = [
  'Ankara wrap dress with custom colors',
  'Embroidered ceremonial robe',
  'Custom warrior cloak with family crest',
  'Traditional boubou in royal colors',
  'Moonweave gown with personalized symbols',
]

export default function ClothesShopInterior() {
  const morale = useGameStore((state) => state.stats.morale)
  const [floor, setFloor] = useState('ground')
  const [activeCollection, setActiveCollection] = useState('ankara')
  const [cart, setCart] = useState([])
  const [ordered, setOrdered] = useState(false)
  const [fittingItem, setFittingItem] = useState(null)
  const [tailorRequest, setTailorRequest] = useState('')
  const [tailorOrder, setTailorOrder] = useState(null)

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) return prev
      return [...prev, item]
    })
  }

  const total = cart.reduce((sum, c) => sum + c.price, 0)

  const placeOrder = () => {
    setOrdered(true)
    setTimeout(() => { setOrdered(false); setCart([]) }, 3000)
  }

  const collection = collections[activeCollection]

  // Fitting room view
  if (fittingItem) {
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setFittingItem(null)}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#c060a022', color: '#c060a0' }}>
          ← Back to Shop
        </button>
        <div className="rounded-2xl p-5" style={{ background: '#1a0a1a', border: '1px solid #c060a040' }}>
          <h2 className="text-xl font-bold" style={{ color: '#c060a0' }}>
            👗 Fitting Room
          </h2>
          <p className="text-stone-400 text-sm mt-1">Trying on: {fittingItem.name}</p>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#120810' }}>
          <svg width="100%" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="600" height="280" fill="#120810"/>
            {/* Mirror */}
            <rect x="200" y="20" width="200" height="220" rx="8" fill="#1a1020"
              stroke="#c060a0" strokeWidth="2" opacity="0.8"/>
            <rect x="204" y="24" width="192" height="212" rx="6" fill="#150c18" opacity="0.9"/>
            {/* Reflection glow */}
            <ellipse cx="300" cy="130" rx="80" ry="100" fill="#c060a0" opacity="0.05"/>
            {/* Figure in mirror */}
            <circle cx="300" cy="80" r="22" fill="#c8a070"/>
            <rect x="278" y="102" width="44" height="70" rx="4"
              fill={collection.accent} opacity="0.8"/>
            <rect x="270" y="172" width="25" height="55" rx="3" fill={collection.accent} opacity="0.7"/>
            <rect x="305" y="172" width="25" height="55" rx="3" fill={collection.accent} opacity="0.7"/>
            {/* Item name on mirror */}
            <text x="300" y="250" textAnchor="middle" fontSize="10"
              fill="#c060a0" opacity="0.8">{fittingItem.emoji} {fittingItem.name}</text>
            {/* Curtains */}
            <rect x="0" y="0" width="180" height="280" fill="#1a0518" opacity="0.7"/>
            <rect x="420" y="0" width="180" height="280" fill="#1a0518" opacity="0.7"/>
            <rect x="0" y="0" width="180" height="12" fill="#c060a0" opacity="0.4"/>
            <rect x="420" y="0" width="180" height="12" fill="#c060a0" opacity="0.4"/>
          </svg>
        </div>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-stone-300 text-sm">{fittingItem.desc}</p>
          <p className="text-stone-500 text-xs mt-2">Season: {fittingItem.season}</p>
          <div className="flex gap-3 mt-4">
            <button onClick={() => { addToCart(fittingItem); setFittingItem(null) }}
              className="flex-1 rounded-lg py-2 text-sm font-medium"
              style={{ background: '#c060a0', color: 'white' }}>
              Add to Cart — {fittingItem.price} coins
            </button>
            <button onClick={() => setFittingItem(null)}
              className="rounded-lg py-2 px-4 text-sm text-stone-400"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              Put Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Shop scene SVG */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#120810' }}>
        <svg width="100%" viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="700" height="220" fill="#120810"/>
          {/* Floor */}
          <rect x="0" y="170" width="700" height="50" fill="#1a0e14"/>
          {[0,1,2,3,4,5,6].map(i => (
            <rect key={i} x={i*100} y="170" width="100" height="50"
              fill={i%2===0 ? '#1a0e14' : '#160c10'}/>
          ))}
          {/* Clothing racks */}
          {[0,1,2,3,4].map(i => (
            <g key={i}>
              <line x1={60+i*130} y1="40" x2={60+i*130} y2="120"
                stroke="#c8a040" strokeWidth="2" opacity="0.6"/>
              <line x1={20+i*130} y1="40" x2={100+i*130} y2="40"
                stroke="#c8a040" strokeWidth="2" opacity="0.6"/>
              {/* Hangers */}
              {[0,1,2,3].map(j => (
                <g key={j}>
                  <line x1={25+j*20+i*130} y1="40" x2={35+j*20+i*130} y2="55"
                    stroke="#c8a040" strokeWidth="1" opacity="0.5"/>
                  <rect x={28+j*20+i*130} y="55" width="14" height="28" rx="2"
                    fill={['#e07030','#9a70e0','#c8a040','#50c050','#c060a0'][i]}
                    opacity={morale < 30 ? 0.3 : 0.8}/>
                </g>
              ))}
              <rect x={20+i*130} y="118" width="80" height="6" rx="2" fill="#3a2010"/>
            </g>
          ))}
          {/* Fitting room */}
          <rect x="610" y="30" width="75" height="140" rx="4" fill="#1a0518"
            stroke="#c060a0" strokeWidth="1.5" opacity="0.7"/>
          <text x="648" y="105" textAnchor="middle" fontSize="8"
            fill="#c060a0" opacity="0.8">Fitting Room</text>
          <circle cx="618" cy="105" r="3" fill="#c060a0" opacity="0.7"/>
          {/* Accessories display */}
          <rect x="20" y="130" width="120" height="35" rx="3" fill="#2a1a10"
            stroke="#c8a040" strokeWidth="1" opacity="0.7"/>
          <text x="80" y="151" textAnchor="middle" fontSize="18">💍👑📿</text>
          {/* Tailor corner */}
          <rect x="480" y="130" width="110" height="40" rx="3" fill="#1a0a2a"
            stroke="#9a70e0" strokeWidth="1" opacity="0.7"/>
          <text x="535" y="154" textAnchor="middle" fontSize="8"
            fill="#9a70e0" opacity="0.8">✂️ Tailor's Corner</text>
          {/* Stairs to showroom */}
          {[0,1,2,3,4].map(i => (
            <rect key={i} x={310+i*12} y={145+i*5} width="55" height="8"
              rx="1" fill="#3a2010" opacity="0.7"/>
          ))}
          <text x="355" y="210" textAnchor="middle" fontSize="8"
            fill="#c8a96e" opacity="0.6">↑ Showroom Upstairs</text>
          {/* Morale warning */}
          {morale < 30 && (
            <text x="350" y="215" textAnchor="middle" fontSize="9"
              fill="#e05020" opacity="0.8">⚠ Low morale — stock is sparse</text>
          )}
          <text x="350" y="18" textAnchor="middle" fontSize="12"
            fill="#c060a0" fontWeight="500" opacity="0.8">
            The Clothes Shop of Mentedore
          </text>
        </svg>
      </div>

      {/* Floor switcher */}
      <div className="flex gap-2">
        {['ground', 'showroom'].map(f => (
          <button key={f} onClick={() => setFloor(f)}
            className="flex-1 rounded-xl py-2 text-sm transition-colors"
            style={{
              background: floor === f ? '#c060a033' : 'rgba(255,255,255,0.04)',
              color: floor === f ? '#c060a0' : '#888',
              border: `1px solid ${floor === f ? '#c060a060' : 'transparent'}`
            }}>
            {f === 'ground' ? '🛍️ Ground Floor' : '✨ Showroom (Upstairs)'}
          </button>
        ))}
      </div>

      {floor === 'ground' && (
        <>
          {/* Collection tabs */}
          <div className="flex gap-2 flex-wrap">
            {Object.entries(collections).map(([key, col]) => (
              <button key={key} onClick={() => setActiveCollection(key)}
                className="text-xs rounded-full px-3 py-1 transition-colors"
                style={{
                  background: activeCollection === key ? col.accent + '33' : 'rgba(255,255,255,0.05)',
                  color: activeCollection === key ? col.accent : '#888',
                  border: `1px solid ${activeCollection === key ? col.accent + '60' : 'transparent'}`
                }}>
                {col.emoji} {col.name}
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div className="grid grid-cols-2 gap-3">
            {collection.items.map(item => {
              const inCart = cart.find(c => c.id === item.id)
              const locked = item.id === 'ac3' && morale < 80
              return (
                <div key={item.id} className="rounded-xl p-4 flex flex-col gap-2"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${locked ? '#333' : collection.accent + '30'}`,
                    opacity: locked ? 0.4 : 1
                  }}>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs text-stone-600">{item.season}</span>
                  </div>
                  <p className="text-stone-200 text-sm font-medium">{item.name}</p>
                  <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                  <div className="flex gap-2 mt-1">
                    <button onClick={() => setFittingItem(item)}
                      className="flex-1 text-xs rounded-lg py-1.5"
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#888' }}>
                      Try On
                    </button>
                    <button
                      onClick={() => !locked && addToCart(item)}
                      disabled={!!inCart || locked}
                      className="flex-1 text-xs rounded-lg py-1.5 disabled:opacity-40"
                      style={{ background: collection.accent + '33', color: collection.accent }}>
                      {locked ? '🔒 Locked' : inCart ? '✓ Added' : `${item.price} coins`}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Tailor's corner */}
          <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(154,112,224,0.2)' }}>
            <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">✂️ Tailor's Corner</p>
            <p className="text-stone-500 text-xs mb-3">Commission a custom piece — describe what you want</p>
            <div className="flex flex-col gap-2 mb-3">
              {tailorOptions.map(opt => (
                <button key={opt} onClick={() => setTailorRequest(opt)}
                  className="text-left text-xs rounded-lg px-3 py-2 transition-colors"
                  style={{
                    background: tailorRequest === opt ? '#9a70e033' : 'rgba(255,255,255,0.03)',
                    color: tailorRequest === opt ? '#9a70e0' : '#888',
                    border: `1px solid ${tailorRequest === opt ? '#9a70e060' : 'transparent'}`
                  }}>
                  {opt}
                </button>
              ))}
            </div>
            {tailorOrder ? (
              <div className="rounded-lg px-4 py-3 text-sm bg-purple-900 text-purple-300">
                ✅ Order placed! Your custom piece will be ready in 3 days.
              </div>
            ) : (
              <button
                onClick={() => { if (tailorRequest) { setTailorOrder(tailorRequest); setTimeout(() => setTailorOrder(null), 3000) } }}
                disabled={!tailorRequest}
                className="w-full rounded-lg py-2 text-sm font-medium disabled:opacity-40"
                style={{ background: '#9a70e0', color: 'white' }}>
                Commission This Piece
              </button>
            )}
          </div>
        </>
      )}

      {floor === 'showroom' && (
        <div className="flex flex-col gap-5">
          {/* Showroom scene */}
          <div className="rounded-2xl overflow-hidden" style={{ background: '#0d0610' }}>
            <svg width="100%" viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="700" height="180" fill="#0d0610"/>
              <rect x="0" y="140" width="700" height="40" fill="#150e18"/>
              {/* Spotlights */}
              {[100,250,400,550].map(x => (
                <g key={x}>
                  <polygon points={`${x-5},0 ${x+5},0 ${x+40},140 ${x-40},140`}
                    fill="#ffe066" opacity="0.04"/>
                  <circle cx={x} cy="8" r="8" fill="#ffe8a0" opacity="0.9"/>
                </g>
              ))}
              {/* Mannequins with outfits */}
              {[
                { x: 100, color: '#e07030', name: 'Ankara Wrap' },
                { x: 250, color: '#9a70e0', name: 'Scholar Robe' },
                { x: 400, color: '#c8a040', name: 'Kente Gown' },
                { x: 550, color: '#50c050', name: 'Forest Tunic' },
              ].map(m => (
                <g key={m.x}>
                  <circle cx={m.x} cy="50" r="14" fill="#c8a070"/>
                  <rect x={m.x-16} y="64" width="32" height="55" rx="4" fill={m.color} opacity="0.9"/>
                  <rect x={m.x-10} y="119" width="8" height="20" rx="2" fill={m.color} opacity="0.7"/>
                  <rect x={m.x+2} y="119" width="8" height="20" rx="2" fill={m.color} opacity="0.7"/>
                  <text x={m.x} y="155" textAnchor="middle" fontSize="8"
                    fill="#c8a96e" opacity="0.7">{m.name}</text>
                </g>
              ))}
              <text x="350" y="18" textAnchor="middle" fontSize="11"
                fill="#c060a0" opacity="0.7">✨ The Showroom — Seasonal Lookbook</text>
            </svg>
          </div>

          {/* Seasonal collection */}
          <div className="grid grid-cols-2 gap-3">
            {collections.seasonal.items.map(item => (
              <div key={item.id} className="rounded-xl p-4 flex flex-col gap-2"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(80,192,80,0.2)' }}>
                <span className="text-2xl">{item.emoji}</span>
                <p className="text-stone-200 text-sm font-medium">{item.name}</p>
                <p className="text-stone-500 text-xs">{item.desc}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs rounded-full px-2 py-0.5"
                    style={{ background: '#50c05022', color: '#50c050' }}>{item.season}</span>
                  <button onClick={() => addToCart(item)}
                    disabled={!!cart.find(c => c.id === item.id)}
                    className="text-xs rounded-lg px-3 py-1 disabled:opacity-40"
                    style={{ background: '#50c05033', color: '#50c050' }}>
                    {cart.find(c => c.id === item.id) ? '✓ Added' : `${item.price} coins`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cart */}
      {cart.length > 0 && (
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(192,96,160,0.3)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">🛍️ Your Bag</p>
          <div className="flex flex-col gap-2 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="text-stone-300 text-sm">{item.emoji} {item.name}</span>
                <span className="text-stone-400 text-sm">{item.price} coins</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-stone-700 pt-3">
            <span className="text-stone-300 text-sm font-medium">Total</span>
            <span className="text-amber-400 text-sm font-medium">{total} coins</span>
          </div>
          {ordered ? (
            <div className="mt-3 rounded-lg px-4 py-3 text-sm bg-green-900 text-green-300">
              ✅ Purchase complete! Your items have been added to your wardrobe.
            </div>
          ) : (
            <button onClick={placeOrder}
              className="mt-3 w-full rounded-lg py-2 text-sm font-medium"
              style={{ background: '#c060a0', color: 'white' }}>
              Purchase — {total} coins
            </button>
          )}
        </div>
      )}

    </div>
  )
}