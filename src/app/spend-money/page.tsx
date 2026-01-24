'use client'

import { useState, useMemo } from 'react'
import ProjectLayout from '@/components/ProjectLayout'

interface Item {
  name: string
  price: number
  image: string
  category: string
}

const items: Item[] = [
  { name: 'Big Mac', price: 5, image: '🍔', category: 'Food' },
  { name: 'Movie Ticket', price: 15, image: '🎬', category: 'Entertainment' },
  { name: 'AirPods', price: 250, image: '🎧', category: 'Tech' },
  { name: 'PlayStation 5', price: 500, image: '🎮', category: 'Tech' },
  { name: 'iPhone', price: 1200, image: '📱', category: 'Tech' },
  { name: 'Gaming PC', price: 3000, image: '🖥️', category: 'Tech' },
  { name: 'Used Car', price: 15000, image: '🚗', category: 'Vehicle' },
  { name: 'Tesla Model 3', price: 45000, image: '⚡', category: 'Vehicle' },
  { name: 'Rolex Watch', price: 10000, image: '⌚', category: 'Luxury' },
  { name: 'House', price: 500000, image: '🏠', category: 'Property' },
  { name: 'Yacht', price: 2000000, image: '🛥️', category: 'Luxury' },
  { name: 'Private Jet', price: 25000000, image: '✈️', category: 'Luxury' },
  { name: 'Skyscraper', price: 100000000, image: '🏢', category: 'Property' },
  { name: 'Sports Team', price: 500000000, image: '🏆', category: 'Luxury' },
]

const TOTAL_BUDGET = 1000000000 // 1 billion dollars

export default function SpendMoney() {
  const [cart, setCart] = useState<Record<string, number>>({})

  const spent = useMemo(() => {
    return items.reduce((total, item) => {
      return total + (cart[item.name] || 0) * item.price
    }, 0)
  }, [cart])

  const remaining = TOTAL_BUDGET - spent

  const updateQuantity = (itemName: string, delta: number) => {
    setCart(prev => {
      const current = prev[itemName] || 0
      const newQty = Math.max(0, current + delta)
      const item = items.find(i => i.name === itemName)!
      
      // Don't allow going over budget
      if (delta > 0 && item.price > remaining) return prev
      
      return { ...prev, [itemName]: newQty }
    })
  }

  const formatMoney = (amount: number) => {
    if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(2)}B`
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`
    return `$${amount.toLocaleString()}`
  }

  const percentSpent = (spent / TOTAL_BUDGET) * 100

  return (
    <ProjectLayout title="Spend Money" backColor="#22c55e">
      <div className="min-h-screen p-8 pt-24">
        {/* Fixed header with budget */}
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-white rounded-2xl shadow-xl p-4 w-full max-w-md">
          <div className="text-center mb-3">
            <div className="text-sm text-gray-500">Remaining</div>
            <div className={`text-3xl font-bold ${remaining < TOTAL_BUDGET * 0.1 ? 'text-red-500' : 'text-green-600'}`}>
              {formatMoney(remaining)}
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
              style={{ width: `${percentSpent}%` }}
            />
          </div>
          <div className="text-center text-sm text-gray-500 mt-2">
            {formatMoney(spent)} spent ({percentSpent.toFixed(1)}%)
          </div>
        </div>

        {/* Items grid */}
        <div className="max-w-4xl mx-auto pt-32">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Spend  Billion</h1>
            <p className="text-gray-600">How would you spend a billion dollars?</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => {
              const qty = cart[item.name] || 0
              const canBuy = item.price <= remaining
              
              return (
                <div
                  key={item.name}
                  className="bg-white rounded-xl shadow-lg p-4 flex flex-col"
                >
                  <div className="text-center mb-3">
                    <span className="text-4xl">{item.image}</span>
                    <h3 className="font-bold mt-2">{item.name}</h3>
                    <p className="text-green-600 font-semibold">{formatMoney(item.price)}</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 mt-auto">
                    <button
                      onClick={() => updateQuantity(item.name, -1)}
                      disabled={qty === 0}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xl transition-colors"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-bold text-xl">{qty}</span>
                    <button
                      onClick={() => updateQuantity(item.name, 1)}
                      disabled={!canBuy}
                      className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  {qty > 0 && (
                    <div className="text-center text-sm text-gray-500 mt-2">
                      Total: {formatMoney(qty * item.price)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Receipt */}
          {spent > 0 && (
            <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-4 text-center">Your Cart</h3>
              <div className="space-y-2">
                {items
                  .filter(item => (cart[item.name] || 0) > 0)
                  .map(item => (
                    <div key={item.name} className="flex justify-between">
                      <span>{item.image} {item.name} x{cart[item.name]}</span>
                      <span className="font-semibold">{formatMoney(cart[item.name] * item.price)}</span>
                    </div>
                  ))}
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">{formatMoney(spent)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProjectLayout>
  )
}
