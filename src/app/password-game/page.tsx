'use client'

import { useState, useMemo } from 'react'
import ProjectLayout from '@/components/ProjectLayout'

interface Rule {
  id: number
  check: (password: string) => boolean
  message: string
}

const rules: Rule[] = [
  { id: 1, check: (p) => p.length >= 5, message: 'Your password must be at least 5 characters' },
  { id: 2, check: (p) => /[0-9]/.test(p), message: 'Your password must include a number' },
  { id: 3, check: (p) => /[A-Z]/.test(p), message: 'Your password must include an uppercase letter' },
  { id: 4, check: (p) => /[!@#$%^&*]/.test(p), message: 'Your password must include a special character' },
  { id: 5, check: (p) => {
    const digits = p.match(/[0-9]/g) || []
    const sum = digits.reduce((acc, d) => acc + parseInt(d), 0)
    return sum === 25
  }, message: 'The digits in your password must add up to 25' },
  { id: 6, check: (p) => /[a-z].*[A-Z].*[a-z]|[A-Z].*[a-z].*[A-Z]/.test(p), message: 'Your password must include alternating case letters' },
  { id: 7, check: (p) => p.length >= 10, message: 'Your password must be at least 10 characters' },
  { id: 8, check: (p) => /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(p), message: 'Your password must include a day of the week' },
  { id: 9, check: (p) => /�[�-�]|�[�-�]/u.test(p), message: 'Your password must include an emoji' },
  { id: 10, check: (p) => p.length >= 20, message: 'Your password must be at least 20 characters' },
]

export default function PasswordGame() {
  const [password, setPassword] = useState('')

  const ruleResults = useMemo(() => {
    const results: { rule: Rule; passed: boolean }[] = []
    let allPreviousPassed = true
    
    for (const rule of rules) {
      const passed = rule.check(password)
      if (allPreviousPassed || results.length === 0) {
        results.push({ rule, passed })
      }
      if (!passed) allPreviousPassed = false
      if (!allPreviousPassed && results.length >= 3) break
    }
    
    return results
  }, [password])

  const completedRules = ruleResults.filter(r => r.passed).length
  const isComplete = completedRules === rules.length

  return (
    <ProjectLayout title="Password Game" backColor="#ef4444">
      <div className="min-h-screen flex items-center justify-center p-8 pt-24">
        <div className="max-w-xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">The Password Game</h1>
            <p className="text-gray-600">Create a password that follows all the rules</p>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{completedRules}/{rules.length} rules</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300"
                style={{ width: `${(completedRules / rules.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Input */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              className="w-full text-xl p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors font-mono"
              autoComplete="off"
            />
            <div className="mt-2 text-right text-sm text-gray-500">
              {password.length} characters
            </div>
          </div>

          {/* Rules */}
          <div className="space-y-3">
            {ruleResults.map(({ rule, passed }) => (
              <div
                key={rule.id}
                className={`p-4 rounded-xl transition-all ${
                  passed 
                    ? 'bg-green-50 border-2 border-green-200' 
                    : 'bg-white border-2 border-red-200 shadow-lg'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`text-xl ${passed ? 'text-green-500' : 'text-red-500'}`}>
                    {passed ? '✓' : '✗'}
                  </span>
                  <div>
                    <span className="text-sm text-gray-500">Rule {rule.id}</span>
                    <p className={`font-medium ${passed ? 'text-green-700' : 'text-gray-800'}`}>
                      {rule.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Win state */}
          {isComplete && (
            <div className="mt-8 text-center bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
              <p>You created the perfect password!</p>
              <p className="mt-4 font-mono text-sm bg-white/20 rounded-lg p-3 break-all">
                {password}
              </p>
            </div>
          )}
        </div>
      </div>
    </ProjectLayout>
  )
}
