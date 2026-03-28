import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const stalls = [
  {
    id: 'produce',
    name: 'Fresh Produce',
    emoji: '🥬',
    color: '#0a2a0a',
    accent: '#50c050',
    items: [
      { name: 'Plantain', emoji: '🍌', price: 2, stock: 40 },
      { name: 'Cassava', emoji: '🌿', price: 3, stock: 25 },
      { name: 'Yam', emoji: '🥔', price: 4, stock: 20 },
      { name: 'Spinach', emoji: '🥬', price: 2, stock: 35 },
      { name: 'Tomatoes', emoji: '🍅', price: 2, stock: 50 },
      { name: 'Peppers', emoji: '🌶️', price: 3, stock: 30 },
    ]
  },
  {
    id: 'grains',
    name: 'Grains & Spices',
    emoji: '🌾',
    color: '#1a1205',
    accent: '#c8a040',
    items: [
      { name: 'Maize', emoji: '🌽', price: 3, stock: 60 },
      { name: 'Millet', emoji: '🌾', price: 2, stock: 45 },
      { name: 'Rice', emoji: '🍚', price: 4, stock: 55 },
      { name: 'Groundnuts', emoji: '🥜', price: 3, stock: 40 },
      { name: 'Ginger', emoji: '🫚', price: 5, stock: 20 },
      { name: 'Turmeric', emoji: '🟡', price: 5, stock: 15 },
    ]
  },
  {
    id: 'protein',
    name: 'Meat & Fish',
    emoji: '🐟',
    color: '#0a1a2a',
    accent: '#4a90d9',
    items: [
      { name: 'Tilapia', emoji: '🐟', price: 8, stock: 20 },
      { name: 'Smoked Fish', emoji: '🐠', price: 6, stock: 15 },
      { name: 'Goat Meat', emoji: '🥩', price: 12, stock: 10 },
      { name: 'Chicken', emoji: '🍗', price: 10, stock: 12 },
      { name: 'Eggs', emoji: '🥚', price: 3, stock: 60 },
      { name: 'Beans', emoji: '🫘', price: 4, stock: 40 },
    ]
  },
  {
    id: 'fruits',
    name: 'Tropical Fruits',
    emoji: '🍍',
    color: '#1a0a00',
    accent: '#e07030',
    items: [
      { name: 'Mango', emoji: '🥭', price: 3, stock: 35 },
      { name: 'Pineapple', emoji: '🍍', price: 4, stock: 20 },
      { name: 'Papaya', emoji: '🫐', price: 3, stock: 25 },
      { name: 'Coconut', emoji: '🥥', price: 5, stock: 18 },
      { name: 'Banana', emoji: '🍌', price: 2, stock: 45 },
      { name: 'Guava', emoji: '🍈', price: 3, stock: 30 },
    ]
  },
]

const pantryItems = [
  { name: 'Palm Oil', emoji: '🫙', amount: 80 },
  { name: 'Salt', emoji: '🧂', amount: 95 },
  { name: 'Sugar', emoji: '🍬', amount: 60 },
  { name: 'Flour', emoji: '🌾', amount: 70 },
  { name: 'Dried Fish', emoji: '🐟', amount: 45 },
  { name: 'Groundnut Oil', emoji: '🫗', amount: 55 },
]

export default function MarketInterior() {
  const food = useGameStore((state) => state.stats.food)
  const [currentStall, setCurrentStall] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('market') // market | pantry

  const stockMultiplier = food / 100
  const addToCart = (item) => setCart(c => [...c, item])
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  if (currentStall) {
    const stall = stalls.find(s => s.id === currentStall)
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setCurrentStall(null)}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: stall.accent + '22', color: stall.accent }}>
          ← Back to Market
        </button>

        <div className="rounded-2xl p-5"
          style={{ background: stall.color, border: `1px solid ${stall.accent}40` }}>
          <h2 className="text-xl font-bold" style={{ color: stall.accent }}>
            {stall.emoji} {stall.name}
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Stock levels reflect your food stat ({food}/100)
          </p>
        </div>

        {/* Stall SVG */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#1a0f05' }}>
          <svg width="100%" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
            {/* Sky */}
            <rect x="0" y="0" width="600" height="200" fill="#1a0f05"/>
            {/* Ground */}
            <rect x="0" y="160" width="600" height="40" fill="#2a1808"/>
            {/* Stall canopy */}
            <polygon points="0,60 600,60 560,20 40,20" fill={stall.accent} opacity="0.8"/>
            <polygon points="0,60 600,60 560,20 40,20" fill="none"
              stroke={stall.accent} strokeWidth="2"/>
            {/* Canopy stripes */}
            {[0,1,2,3,4].map(i => (
              <line key={i} x1={80+i*110} y1="20" x2={60+i*110} y2="60"
                stroke="rgba(0,0,0,0.2)" strokeWidth="20"/>
            ))}
            {/* Stall counter */}
            <rect x="20" y="100" width="560" height="60" rx="4" fill="#5a3510"/>
            <rect x="20" y="95" width="560" height="12" rx="3" fill="#6a4520"/>
            {/* Produce display */}
            {stall.items.map((item, i) => {
              const x = 60 + i * 90
              const stock = Math.floor(item.stock * stockMultiplier)
              return (
                <g key={i}>
                  <text x={x} y="92" textAnchor="middle" fontSize="20">{item.emoji}</text>
                  <text x={x} y="145" textAnchor="middle" fontSize="8"
                    fill="#c8a96e" opacity="0.8">{item.name}</text>
                  <text x={x} y="157" textAnchor="middle" fontSize="7"
                    fill={stock < 5 ? '#e05020' : '#50a050'} opacity="0.9">
                    {stock < 5 ? 'Low stock' : `${stock} left`}
                  </text>
                </g>
              )
            })}
            {/* Sun */}
            <circle cx="560" cy="30" r="18" fill="#e0a020" opacity="0.6"/>
          </svg>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-2 gap-3">
          {stall.items.map(item => {
            const stock = Math.floor(item.stock * stockMultiplier)
            const inStock = stock > 0
            return (
              <div key={item.name} className="rounded-xl p-3 flex items-center justify-between"
                style={{ background: 'rgba(255,255,255,0.04)', opacity: inStock ? 1 : 0.4 }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="text-stone-200 text-sm">{item.name}</p>
                    <p className="text-stone-500 text-xs">{stock} in stock</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: stall.accent }}>{item.price}g</span>
                  <button
                    onClick={() => inStock && addToCart(item)}
                    disabled={!inStock}
                    className="text-xs rounded px-2 py-1 disabled:opacity-30"
                    style={{ background: stall.accent + '33', color: stall.accent }}>
                    + Add
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cart */}
        {cart.length > 0 && (
          <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">Your Basket</p>
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between text-sm text-stone-300 py-1">
                <span>{item.emoji} {item.name}</span>
                <span>{item.price}g</span>
              </div>
            ))}
            <div className="border-t border-stone-700 mt-2 pt-2 flex justify-between">
              <span className="text-stone-300 text-sm font-medium">Total</span>
              <span className="text-amber-400 text-sm font-medium">{cartTotal}g</span>
            </div>
            <button
              onClick={() => setCart([])}
              className="mt-2 w-full text-xs rounded-lg py-2 text-center"
              style={{ background: '#c8a040', color: '#1a0f05' }}>
              Complete Purchase
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Market SVG — top down outdoor view */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#1a0f05' }}>
        <svg width="100%" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">

          {/* Sky and ground */}
          <rect x="0" y="0" width="700" height="300" fill="#1a1005"/>
          <rect x="0" y="240" width="700" height="60" fill="#2a1808"/>

          {/* Sun */}
          <circle cx="640" cy="40" r="30" fill="#e0a020" opacity="0.5"/>
          {[0,1,2,3,4,5,6,7].map(i => (
            <line key={i}
              x1={640 + Math.cos(i*Math.PI/4) * 35}
              y1={40 + Math.sin(i*Math.PI/4) * 35}
              x2={640 + Math.cos(i*Math.PI/4) * 45}
              y2={40 + Math.sin(i*Math.PI/4) * 45}
              stroke="#e0a020" strokeWidth="2" opacity="0.4"/>
          ))}

          {/* Dirt paths between stalls */}
          <rect x="0" y="140" width="700" height="30" fill="#2a1a08" opacity="0.5"/>
          <rect x="340" y="0" width="20" height="300" fill="#2a1a08" opacity="0.3"/>

          {/* Market stalls — 4 stalls in a grid */}
          {stalls.map((stall, i) => {
            const col = i % 2
            const row = Math.floor(i / 2)
            const x = col === 0 ? 30 : 380
            const y = row === 0 ? 20 : 160
            const stockLevel = food / 100
            return (
              <g key={stall.id} style={{ cursor: 'pointer' }}
                onClick={() => setCurrentStall(stall.id)}>
                {/* Canopy */}
                <rect x={x} y={y} width="290" height="110" rx="6"
                  fill={stall.color} stroke={stall.accent} strokeWidth="1.5" opacity="0.9"/>
                {/* Canopy top stripe */}
                <rect x={x} y={y} width="290" height="20" rx="6"
                  fill={stall.accent} opacity="0.4"/>
                {/* Stall name */}
                <text x={x + 145} y={y + 14} textAnchor="middle"
                  fontSize="10" fill={stall.accent} fontWeight="500">
                  {stall.emoji} {stall.name}
                </text>
                {/* Produce items */}
                {stall.items.slice(0, 4).map((item, j) => (
                  <text key={j} x={x + 35 + j * 60} y={y + 65}
                    textAnchor="middle" fontSize="22"
                    opacity={stockLevel < 0.3 ? 0.3 : stockLevel < 0.6 ? 0.6 : 1}>
                    {item.emoji}
                  </text>
                ))}
                {/* Stock bar */}
                <rect x={x + 10} y={y + 88} width="270" height="6" rx="3" fill="#1a1005"/>
                <rect x={x + 10} y={y + 88} width={270 * stockLevel} height="6" rx="3"
                  fill={food < 40 ? '#e05020' : food < 65 ? '#e0a020' : stall.accent}/>
                <text x={x + 145} y={y + 103} textAnchor="middle"
                  fontSize="7" fill={stall.accent} opacity="0.6">
                  Stock: {food < 40 ? 'Low' : food < 65 ? 'Medium' : 'Plentiful'} — click to browse
                </text>
              </g>
            )
          })}

          {/* Market sign */}
          <rect x="270" y="255" width="160" height="35" rx="4"
            fill="#3a2010" stroke="#c8a040" strokeWidth="1"/>
          <text x="350" y="272" textAnchor="middle" fontSize="10"
            fill="#c8a040" fontWeight="500">Mentedore Grand Market</text>
          <text x="350" y="284" textAnchor="middle" fontSize="7"
            fill="#c8a040" opacity="0.5">Open daily from sunrise</text>

        </svg>
      </div>

      {/* Food stat */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">Market condition</p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-300 w-12">Food</span>
          <div className="flex-1 bg-stone-800 rounded-full h-2.5">
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${food}%`, background: food < 40 ? '#e05020' : food < 65 ? '#e0a020' : '#50c050' }}/>
          </div>
          <span className="text-sm text-stone-400 w-8 text-right">{food}</span>
        </div>
        <p className="text-stone-500 text-xs mt-2 italic">
          {food < 40
            ? 'The market is sparse. Stalls are half-empty. Prices are high.'
            : food < 65
            ? 'Trade is steady. Most stalls are well-stocked.'
            : 'The market overflows! Vendors compete for customers. Prices are low.'}
        </p>
      </div>

      {/* View toggle */}
      <div className="flex gap-2">
        <button onClick={() => setView('market')}
          className="flex-1 text-sm rounded-lg py-2 transition-colors"
          style={{ background: view === 'market' ? '#c8a040' : 'rgba(255,255,255,0.06)',
            color: view === 'market' ? '#1a0f05' : '#c8a96e' }}>
          🛒 Market Stalls
        </button>
        <button onClick={() => setView('pantry')}
          className="flex-1 text-sm rounded-lg py-2 transition-colors"
          style={{ background: view === 'pantry' ? '#c8a040' : 'rgba(255,255,255,0.06)',
            color: view === 'pantry' ? '#1a0f05' : '#c8a96e' }}>
          🫙 Storage Pantry
        </button>
      </div>

      {/* Pantry view */}
      {view === 'pantry' && (
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Storage Room</p>
          <div className="grid grid-cols-2 gap-3">
            {pantryItems.map(item => {
              const level = Math.floor(item.amount * (food / 100))
              return (
                <div key={item.name} className="rounded-xl p-3"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{item.emoji}</span>
                    <p className="text-stone-300 text-sm">{item.name}</p>
                  </div>
                  <div className="bg-stone-800 rounded-full h-1.5 mb-1">
                    <div className="h-1.5 rounded-full"
                      style={{ width: `${level}%`,
                        background: level < 30 ? '#e05020' : level < 60 ? '#e0a020' : '#c8a040' }}/>
                  </div>
                  <p className="text-xs text-stone-600">{level}% full</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}