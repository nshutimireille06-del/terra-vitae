import { useState } from 'react'
import useGameStore from '../../store/gameStore'

const bakedGoods = [
  { id: 'bread',      name: 'Sourdough Bread',    emoji: '🍞', price: 4,  time: '45 mins', ingredients: ['Flour', 'Water', 'Salt', 'Yeast'], stock: 'high' },
  { id: 'mandazi',    name: 'Mandazi',             emoji: '🍩', price: 2,  time: '20 mins', ingredients: ['Flour', 'Coconut Milk', 'Sugar', 'Cardamom'], stock: 'high' },
  { id: 'chapati',    name: 'Chapati',             emoji: '🫓', price: 2,  time: '15 mins', ingredients: ['Flour', 'Oil', 'Salt', 'Water'], stock: 'high' },
  { id: 'cake',       name: 'Celebration Cake',    emoji: '🎂', price: 20, time: '2 hours', ingredients: ['Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla'], stock: 'low' },
  { id: 'cookies',    name: 'Groundnut Cookies',   emoji: '🍪', price: 3,  time: '30 mins', ingredients: ['Groundnuts', 'Flour', 'Sugar', 'Butter'], stock: 'medium' },
  { id: 'buns',       name: 'Sweet Buns',          emoji: '🧁', price: 3,  time: '25 mins', ingredients: ['Flour', 'Sugar', 'Eggs', 'Butter'], stock: 'medium' },
  { id: 'pies',       name: 'Meat Pies',           emoji: '🥧', price: 6,  time: '50 mins', ingredients: ['Flour', 'Beef', 'Onion', 'Pepper'], stock: 'medium' },
  { id: 'samosa',     name: 'Samosas',             emoji: '🥟', price: 3,  time: '35 mins', ingredients: ['Flour', 'Potato', 'Peas', 'Spices'], stock: 'high' },
]

const recipes = [
  { name: 'Banana Bread', ingredients: ['3 ripe bananas', '2 cups flour', '1 cup sugar', '2 eggs', '1/2 cup butter', '1 tsp vanilla'], steps: ['Mash bananas', 'Mix wet ingredients', 'Fold in dry ingredients', 'Bake at 175°C for 60 mins'] },
  { name: 'Mandazi', ingredients: ['2 cups flour', '1/2 cup coconut milk', '3 tbsp sugar', '1 tsp cardamom', '1 tsp yeast'], steps: ['Mix dry ingredients', 'Add coconut milk gradually', 'Knead dough', 'Rest 30 mins', 'Deep fry until golden'] },
  { name: 'Groundnut Soup Bread', ingredients: ['3 cups flour', '1 tbsp sugar', '1 tsp salt', '2 tsp yeast', '1 cup warm water'], steps: ['Activate yeast in warm water', 'Mix all ingredients', 'Knead 10 mins', 'Rise 1 hour', 'Bake at 190°C for 30 mins'] },
]

const stockColor = (stock) => ({ high: '#50c050', medium: '#c8a040', low: '#e05020' })[stock]

export default function BakeryInterior() {
  const food = useGameStore((state) => state.stats.food)
  const [view, setView] = useState('main')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [cart, setCart] = useState([])
  const [ordered, setOrdered] = useState(false)

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0)

  const placeOrder = () => {
    setOrdered(true)
    setTimeout(() => { setOrdered(false); setCart([]) }, 3000)
  }

  if (view === 'recipe' && selectedRecipe) {
    const recipe = recipes.find(r => r.name === selectedRecipe)
    return (
      <div className="flex flex-col gap-5">
        <button onClick={() => setView('main')}
          className="flex items-center gap-2 text-sm w-fit rounded-lg py-2 px-4"
          style={{ background: '#c8703022', color: '#c87030' }}>
          ← Back to Bakery
        </button>
        <div className="rounded-2xl p-5" style={{ background: '#1a0a05', border: '1px solid #c8703040' }}>
          <h2 className="text-xl font-bold text-amber-400">{recipe.name}</h2>
        </div>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Ingredients</p>
          <div className="flex flex-col gap-2">
            {recipe.ingredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-amber-600">•</span>
                <span className="text-stone-300 text-sm">{ing}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Steps</p>
          <div className="flex flex-col gap-3">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-amber-600 font-bold text-sm w-5">{i+1}.</span>
                <span className="text-stone-300 text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Bakery scene SVG */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#1a0a05' }}>
        <svg width="100%" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">

          {/* Walls */}
          <rect x="0" y="0" width="700" height="240" fill="#1a0a05"/>
          {/* Floor */}
          <rect x="0" y="180" width="700" height="60" fill="#2a1508"/>
          {[0,1,2,3,4,5,6].map(i => (
            <rect key={i} x={i*100} y="180" width="100" height="60"
              fill={i%2===0 ? '#2a1508' : '#221205'}/>
          ))}

          {/* Oven */}
          <rect x="30" y="80" width="120" height="100" rx="6" fill="#3a2010"/>
          <rect x="40" y="90" width="100" height="70" rx="4" fill="#1a0a05"/>
          <rect x="45" y="95" width="90" height="60" rx="3" fill="#2a1508"/>
          {food >= 50 && <ellipse cx="90" cy="125" rx="30" ry="20" fill="#e06020" opacity="0.4"/>}
          {food >= 50 && <ellipse cx="90" cy="125" rx="15" ry="10" fill="#e08020" opacity="0.5"/>}
          <rect x="40" y="162" width="100" height="8" rx="2" fill="#4a3020"/>
          {[0,1,2].map(i => (
            <circle key={i} cx={60+i*30} cy="166" r="4" fill="#c8a040" opacity="0.8"/>
          ))}
          <text x="90" y="78" textAnchor="middle" fontSize="9" fill="#c87030" opacity="0.7">Oven</text>

          {/* Counter */}
          <rect x="180" y="130" width="360" height="55" rx="4" fill="#5a3510"/>
          <rect x="175" y="125" width="370" height="12" rx="3" fill="#6a4520"/>

          {/* Baked goods on counter */}
          {bakedGoods.slice(0,6).map((item, i) => (
            <g key={item.id}>
              <text x={200+i*58} y="120" fontSize="22">{item.emoji}</text>
              <text x={200+i*58} y="108" textAnchor="middle" fontSize="7"
                fill="#c8a96e" opacity="0.7">{item.name.split(' ')[0]}</text>
            </g>
          ))}

          {/* Recipe board on wall */}
          <rect x="560" y="30" width="120" height="130" rx="4" fill="#2a1a08"/>
          <rect x="564" y="34" width="112" height="122" rx="3" fill="#1e1405"/>
          <text x="620" y="52" textAnchor="middle" fontSize="9"
            fill="#c8a040" fontWeight="500">Today's Specials</text>
          {bakedGoods.slice(0,5).map((item, i) => (
            <text key={i} x="572" y={65+i*16} fontSize="8" fill="#c8a96e" opacity="0.8">
              {item.emoji} {item.name.slice(0,12)}
            </text>
          ))}

          {/* Steam from oven */}
          {food >= 60 && [0,1,2].map(i => (
            <ellipse key={i} cx={60+i*20} cy={60+i*5} rx="5" ry="8"
              fill="#c8c8c8" opacity="0.15"/>
          ))}

          {/* Pantry door */}
          <rect x="620" y="170" width="60" height="70" rx="3" fill="#2a1508"
            stroke="#c8a040" strokeWidth="1" opacity="0.7"/>
          <circle cx="634" cy="208" r="3" fill="#c8a040" opacity="0.8"/>
          <text x="650" y="248" textAnchor="middle" fontSize="8"
            fill="#c8a96e" opacity="0.6">Pantry</text>

          {/* Low food warning */}
          {food < 30 && (
            <text x="350" y="230" textAnchor="middle" fontSize="10"
              fill="#e05020" opacity="0.9">⚠ Ovens are cold. Complete food tasks to restock.</text>
          )}

          <text x="350" y="20" textAnchor="middle" fontSize="12"
            fill="#c87030" fontWeight="500" opacity="0.8">The Royal Bakery of Mentedore</text>

        </svg>
      </div>

      {/* Food stat */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-300 w-12">Food</span>
          <div className="flex-1 bg-stone-800 rounded-full h-2.5">
            <div className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${food}%`, background: food < 30 ? '#e05020' : food < 60 ? '#c8a040' : '#50c050' }}/>
          </div>
          <span className="text-sm text-stone-400 w-8 text-right">{food}</span>
        </div>
        <p className="text-stone-500 text-xs mt-2 italic">
          {food < 30 ? 'The ovens are cold and empty.'
            : food < 60 ? 'The bakery is working but supplies are limited.'
            : 'The bakery smells wonderful. Bread bakes from dawn to dusk.'}
        </p>
      </div>

      {/* Baked goods menu */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">🍞 Order from the Bakery</p>
        <div className="grid grid-cols-2 gap-3">
          {bakedGoods.map(item => {
            const actualStock = food < 30 ? 'low' : food < 60 && item.stock === 'high' ? 'medium' : item.stock
            return (
              <div key={item.id} className="rounded-xl p-3 flex flex-col gap-2"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-xs rounded-full px-2 py-0.5"
                    style={{ background: stockColor(actualStock) + '22', color: stockColor(actualStock) }}>
                    {actualStock}
                  </span>
                </div>
                <p className="text-stone-200 text-xs font-medium">{item.name}</p>
                <p className="text-stone-600 text-xs">⏱ {item.time}</p>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 text-xs">{item.price} coins</span>
                  <button onClick={() => addToCart(item)}
                    disabled={actualStock === 'low' && food < 20}
                    className="text-xs rounded-lg px-2 py-1 disabled:opacity-30"
                    style={{ background: '#c8703033', color: '#c87030' }}>
                    + Order
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recipe board */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">📋 Recipe Board</p>
        <div className="flex flex-col gap-2">
          {recipes.map(recipe => (
            <button key={recipe.name}
              onClick={() => { setSelectedRecipe(recipe.name); setView('recipe') }}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-left"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(200,112,48,0.2)' }}>
              <span className="text-stone-300 text-sm">🍞 {recipe.name}</span>
              <span className="text-stone-600 text-xs">View recipe →</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      {cart.length > 0 && (
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,160,64,0.3)' }}>
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">🛒 Your Order</p>
          <div className="flex flex-col gap-2 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="text-stone-300 text-sm">{item.emoji} {item.name} × {item.qty}</span>
                <span className="text-stone-400 text-sm">{item.price * item.qty} coins</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-stone-700 pt-3">
            <span className="text-stone-300 text-sm font-medium">Total</span>
            <span className="text-amber-400 text-sm font-medium">{total} coins</span>
          </div>
          {ordered ? (
            <div className="mt-3 rounded-lg px-4 py-3 text-sm bg-green-900 text-green-300">
              ✅ Order placed! Fresh from the Royal Bakery of Mentedore.
            </div>
          ) : (
            <button onClick={placeOrder}
              className="mt-3 w-full rounded-lg py-2 text-sm font-medium"
              style={{ background: '#c8a040', color: '#1a0f05' }}>
              Place Order — {total} coins
            </button>
          )}
        </div>
      )}

    </div>
  )
}