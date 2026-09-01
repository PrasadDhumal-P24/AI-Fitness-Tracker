import { useState } from 'react'
import {
  Droplets, Moon, Footprints, Sun,
  Check, Plus, Trash2, Trophy,
  Flame, Brain, Heart, Zap, Star
} from 'lucide-react'
import { useFitness } from '../context/FitnessContext'
import './Habits.css'

// Default Habits
const DEFAULT_HABITS = [
  { id: 'morning_workout', label: 'Morning Workout', emoji: '💪', category: 'fitness' },
  { id: 'drink_water', label: 'Drink 8 Glasses Water', emoji: '💧', category: 'health' },
  { id: 'protein_meal', label: 'Hit Protein Goal', emoji: '🥩', category: 'nutrition' },
  { id: 'no_junk', label: 'No Junk Food', emoji: '🚫', category: 'nutrition' },
  { id: 'sleep_8hrs', label: '8 Hours Sleep', emoji: '😴', category: 'recovery' },
  { id: 'meditation', label: '10 Min Meditation', emoji: '🧘', category: 'mental' },
  { id: 'steps_10k', label: '10,000 Steps', emoji: '🚶', category: 'fitness' },
  { id: 'no_phone_bed', label: 'No Phone Before Bed', emoji: '📵', category: 'mental' },
]

// Water Tracker Component
function WaterTracker({ value, onUpdate }) {
  const glasses = 8
  const filled = Math.min(value, glasses)

  return (
    <div className="habit__water-card">
      <div className="habit__card-header">
        <div className="habit__card-title">
          <Droplets size={20} color="#0EA5E9" />
          Water Intake
        </div>
        <div className="habit__water-val">
          <span style={{ color: '#0EA5E9' }}>{value}</span>
          <span>/ {glasses} glasses</span>
        </div>
      </div>

      {/* Glass Grid */}
      <div className="habit__water-grid">
        {Array.from({ length: glasses }, (_, i) => (
          <button
            key={i}
            className={`habit__glass ${i < filled ? 'filled' : ''}`}
            onClick={() => onUpdate(i < filled ? i : i + 1)}
          >
            <Droplets size={20} />
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="habit__water-bar">
        <div
          className="habit__water-fill"
          style={{ width: `${(filled / glasses) * 100}%` }}
        ></div>
      </div>

      <div className="habit__water-info">
        {value === 0 && <span>Start drinking water! 💧</span>}
        {value > 0 && value < 4 && <span>Keep going! {glasses - value} more glasses needed</span>}
        {value >= 4 && value < 8 && <span>Halfway there! 🎯 {glasses - value} more to go!</span>}
        {value >= 8 && <span>🎉 Daily water goal achieved!</span>}
      </div>

      {/* Quick Buttons */}
      <div className="habit__water-btns">
        <button
          className="habit__water-btn habit__water-btn--minus"
          onClick={() => onUpdate(Math.max(0, value - 1))}
        >
          −
        </button>
        <span className="habit__water-ml">{value * 250}ml / {glasses * 250}ml</span>
        <button
          className="habit__water-btn habit__water-btn--plus"
          onClick={() => onUpdate(Math.min(glasses + 4, value + 1))}
        >
          + Add Glass
        </button>
      </div>
    </div>
  )
}

// Sleep Tracker Component
function SleepTracker({ value, onUpdate }) {
  const target = 8
  const pct = Math.min((value / target) * 100, 100)

  const getQuality = () => {
    if (value >= 8) return { label: 'Excellent! 🌟', color: '#10B981' }
    if (value >= 7) return { label: 'Good 👍', color: '#0EA5E9' }
    if (value >= 6) return { label: 'Okay 😐', color: '#F59E0B' }
    return { label: 'Poor 😴', color: '#EF4444' }
  }

  const quality = getQuality()

  return (
    <div className="habit__sleep-card">
      <div className="habit__card-header">
        <div className="habit__card-title">
          <Moon size={20} color="#7C3AED" />
          Sleep Tracker
        </div>
        <div
          className="habit__sleep-quality"
          style={{ color: quality.color, background: `${quality.color}15` }}
        >
          {quality.label}
        </div>
      </div>

      {/* Sleep Hours Display */}
      <div className="habit__sleep-display">
        <div className="habit__sleep-ring">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="rgba(124,58,237,0.15)"
              strokeWidth="8"
            />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="8"
              strokeDasharray={`${pct * 3.14} 314`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dasharray 0.8s ease' }}
            />
          </svg>
          <div className="habit__sleep-center">
            <strong style={{ color: '#7C3AED' }}>{value}</strong>
            <span>hrs</span>
          </div>
        </div>

        <div className="habit__sleep-info">
          <div className="habit__sleep-stat">
            <span>Target</span>
            <strong>{target} hrs</strong>
          </div>
          <div className="habit__sleep-stat">
            <span>Status</span>
            <strong style={{ color: quality.color }}>{quality.label}</strong>
          </div>
          <div className="habit__sleep-stat">
            <span>Deficit</span>
            <strong style={{ color: value >= target ? '#10B981' : '#EF4444' }}>
              {value >= target ? '0 hrs' : `${(target - value).toFixed(1)} hrs`}
            </strong>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="habit__sleep-slider-wrap">
        <span>0h</span>
        <input
          type="range"
          min="0"
          max="12"
          step="0.5"
          value={value}
          onChange={e => onUpdate(parseFloat(e.target.value))}
          className="habit__sleep-slider"
        />
        <span>12h</span>
      </div>

      <div className="habit__sleep-tip">
        💡 {value < 7
          ? 'Try sleeping 30 min earlier tonight for better recovery!'
          : value >= 8
          ? 'Perfect sleep! Your muscles are recovering optimally.'
          : 'Good sleep! Aim for 8 hours for maximum gains.'}
      </div>
    </div>
  )
}

// Steps Tracker Component
function StepsTracker({ value, onUpdate }) {
  const target = 10000
  const pct = Math.min((value / target) * 100, 100)
  const cal = Math.round(value * 0.04)

  return (
    <div className="habit__steps-card">
      <div className="habit__card-header">
        <div className="habit__card-title">
          <Footprints size={20} color="#10B981" />
          Daily Steps
        </div>
        <div className="habit__steps-cal">
          <Flame size={14} color="#FF6B35" />
          ~{cal} kcal
        </div>
      </div>

      {/* Steps Display */}
      <div className="habit__steps-display">
        <div className="habit__steps-num" style={{ color: '#10B981' }}>
          {value.toLocaleString()}
        </div>
        <div className="habit__steps-target">
          / {target.toLocaleString()} steps
        </div>
      </div>

      {/* Progress Bar */}
      <div className="habit__steps-bar">
        <div
          className="habit__steps-fill"
          style={{ width: `${pct}%` }}
        ></div>
        {/* Milestones */}
        <div className="habit__steps-milestone" style={{ left: '25%' }}>
          <div className="habit__milestone-dot" style={{
            background: value >= 2500 ? '#10B981' : 'var(--dark-border)'
          }}></div>
          <span>2.5K</span>
        </div>
        <div className="habit__steps-milestone" style={{ left: '50%' }}>
          <div className="habit__milestone-dot" style={{
            background: value >= 5000 ? '#10B981' : 'var(--dark-border)'
          }}></div>
          <span>5K</span>
        </div>
        <div className="habit__steps-milestone" style={{ left: '75%' }}>
          <div className="habit__milestone-dot" style={{
            background: value >= 7500 ? '#10B981' : 'var(--dark-border)'
          }}></div>
          <span>7.5K</span>
        </div>
      </div>

      <div className="habit__steps-pct">
        {Math.round(pct)}% of daily goal
        {pct >= 100 && ' 🎉'}
      </div>

      {/* Quick Add Buttons */}
      <div className="habit__steps-btns">
        {[500, 1000, 2000, 5000].map(n => (
          <button
            key={n}
            className="habit__steps-btn"
            onClick={() => onUpdate(Math.min(value + n, 50000))}
          >
            +{n >= 1000 ? `${n/1000}k` : n}
          </button>
        ))}
        <button
          className="habit__steps-btn habit__steps-btn--reset"
          onClick={() => onUpdate(0)}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

// Habit Item Component
function HabitItem({ habit, completed, onToggle }) {
  return (
    <button
      className={`habit__item ${completed ? 'completed' : ''}`}
      onClick={() => onToggle(habit.id)}
    >
      <div
        className={`habit__item-check ${completed ? 'done' : ''}`}
      >
        {completed && <Check size={14} />}
      </div>
      <span className="habit__item-emoji">{habit.emoji}</span>
      <span className="habit__item-label">{habit.label}</span>
      {completed && (
        <span className="habit__item-done">Done! ✓</span>
      )}
    </button>
  )
}

// Main Habits Component
function Habits() {
  const { fitnessData, updateToday, updateFitnessData } = useFitness()
  const [activeTab, setActiveTab] = useState('today')
  const [newHabit, setNewHabit] = useState('')
  const [showAddHabit, setShowAddHabit] = useState(false)

  const today = fitnessData.today || {}
  const completedHabits = today.habits || []
  const customHabits = fitnessData.customHabits || []
  const allHabits = [...DEFAULT_HABITS, ...customHabits]

  // Completed count
  const completedCount = allHabits.filter(
    h => completedHabits.includes(h.id)
  ).length

  const completionPct = Math.round(
    (completedCount / allHabits.length) * 100
  )

  // Toggle habit
  const toggleHabit = (id) => {
    const updated = completedHabits.includes(id)
      ? completedHabits.filter(h => h !== id)
      : [...completedHabits, id]
    updateToday('habits', updated)
  }

  // Add custom habit
  const addCustomHabit = () => {
    if (!newHabit.trim()) return
    const habit = {
      id: `custom_${Date.now()}`,
      label: newHabit.trim(),
      emoji: '⭐',
      category: 'custom'
    }
    updateFitnessData('customHabits', [...customHabits, habit])
    setNewHabit('')
    setShowAddHabit(false)
  }

  // Delete custom habit
  const deleteCustomHabit = (id) => {
    updateFitnessData(
      'customHabits',
      customHabits.filter(h => h.id !== id)
    )
  }

  // Weekly data
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return {
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      isToday: i === 6
    }
  })

  return (
    <div className="habits">

      {/* Header */}
      <div className="habits__header">
        <div>
          <h1>Daily Habits 🌟</h1>
          <p>Track water, sleep, steps and daily routines</p>
        </div>
        <div className="habits__score">
          <div className="habits__score-ring">
            <svg width="56" height="56" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22"
                fill="none"
                stroke="rgba(255,107,53,0.15)"
                strokeWidth="5"
              />
              <circle cx="28" cy="28" r="22"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="5"
                strokeDasharray={`${completionPct * 1.382} 138.2`}
                strokeLinecap="round"
                transform="rotate(-90 28 28)"
              />
            </svg>
            <span style={{ color: 'var(--primary)' }}>
              {completionPct}%
            </span>
          </div>
          <div>
            <strong style={{ color: 'white', display: 'block' }}>
              {completedCount}/{allHabits.length}
            </strong>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Done today
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="workout__tabs">
        {[
          { id: 'today', label: '📅 Today' },
          { id: 'trackers', label: '📊 Trackers' },
          { id: 'habits', label: '✅ Habits' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`workout__tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== TODAY TAB ===== */}
      {activeTab === 'today' && (
        <div className="habits__content">

          {/* Summary Cards */}
          <div className="habits__summary-grid">
            <div className="habits__summary-card"
              style={{ borderColor: 'rgba(14,165,233,0.2)' }}
            >
              <Droplets size={20} color="#0EA5E9" />
              <div>
                <strong style={{ color: '#0EA5E9' }}>
                  {today.water || 0}/8
                </strong>
                <span>Glasses</span>
              </div>
            </div>
            <div className="habits__summary-card"
              style={{ borderColor: 'rgba(124,58,237,0.2)' }}
            >
              <Moon size={20} color="#7C3AED" />
              <div>
                <strong style={{ color: '#7C3AED' }}>
                  {today.sleep || 0}hrs
                </strong>
                <span>Sleep</span>
              </div>
            </div>
            <div className="habits__summary-card"
              style={{ borderColor: 'rgba(16,185,129,0.2)' }}
            >
              <Footprints size={20} color="#10B981" />
              <div>
                <strong style={{ color: '#10B981' }}>
                  {(today.steps || 0).toLocaleString()}
                </strong>
                <span>Steps</span>
              </div>
            </div>
            <div className="habits__summary-card"
              style={{ borderColor: 'rgba(255,107,53,0.2)' }}
            >
              <Check size={20} color="var(--primary)" />
              <div>
                <strong style={{ color: 'var(--primary)' }}>
                  {completedCount}/{allHabits.length}
                </strong>
                <span>Habits</span>
              </div>
            </div>
          </div>

          {/* Weekly Streak */}
          <div className="habits__week">
            <div className="habits__week-title">
              <Trophy size={16} color="#F59E0B" />
              This Week
            </div>
            <div className="habits__week-days">
              {weekDays.map((day, i) => (
                <div key={i} className="habits__week-day">
                  <div className={`habits__week-circle
                    ${day.isToday ? 'today' : i < 5 ? 'done' : ''}`}
                  >
                    {i < 5 && !day.isToday && '✓'}
                    {day.isToday && '⭐'}
                  </div>
                  <span>{day.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Motivation */}
          <div className="habits__motivation">
            <Brain size={18} color="var(--primary)" />
            <p>
              {completionPct >= 80
                ? "🔥 Incredible! You're crushing your daily habits. This consistency will show results!"
                : completionPct >= 50
                ? "💪 Good progress! Complete remaining habits for a perfect day!"
                : "⚡ Start with water and sleep — these two habits alone transform your fitness!"}
            </p>
          </div>

        </div>
      )}

      {/* ===== TRACKERS TAB ===== */}
      {activeTab === 'trackers' && (
        <div className="habits__content">
          <WaterTracker
            value={today.water || 0}
            onUpdate={(val) => updateToday('water', val)}
          />
          <SleepTracker
            value={today.sleep || 0}
            onUpdate={(val) => updateToday('sleep', val)}
          />
          <StepsTracker
            value={today.steps || 0}
            onUpdate={(val) => updateToday('steps', val)}
          />
        </div>
      )}

      {/* ===== HABITS TAB ===== */}
      {activeTab === 'habits' && (
        <div className="habits__content">

          {/* Habit List */}
          <div className="habits__section">
            <div className="habits__section-header">
              <div className="habits__section-title">
                <Sun size={16} color="var(--primary)" />
                Daily Habits
                <span className="habits__section-count">
                  {completedCount}/{allHabits.length}
                </span>
              </div>
              <button
                className="habits__add-btn"
                onClick={() => setShowAddHabit(!showAddHabit)}
              >
                <Plus size={16} />
                Add Habit
              </button>
            </div>

            {/* Add Custom Habit */}
            {showAddHabit && (
              <div className="habits__add-form">
                <input
                  type="text"
                  placeholder="Ex: Read 20 pages, No sugar..."
                  value={newHabit}
                  onChange={e => setNewHabit(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCustomHabit()}
                  autoFocus
                />
                <button onClick={addCustomHabit}>Add</button>
              </div>
            )}

            {/* Default Habits */}
            <div className="habits__list">
              {DEFAULT_HABITS.map(habit => (
                <HabitItem
                  key={habit.id}
                  habit={habit}
                  completed={completedHabits.includes(habit.id)}
                  onToggle={toggleHabit}
                />
              ))}
            </div>

            {/* Custom Habits */}
            {customHabits.length > 0 && (
              <>
                <div className="habits__custom-title">
                  ⭐ My Custom Habits
                </div>
                <div className="habits__list">
                  {customHabits.map(habit => (
                    <div key={habit.id} className="habits__custom-item">
                      <HabitItem
                        habit={habit}
                        completed={completedHabits.includes(habit.id)}
                        onToggle={toggleHabit}
                      />
                      <button
                        className="habits__delete-btn"
                        onClick={() => deleteCustomHabit(habit.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>

          {/* Completion Summary */}
          <div className="habits__completion">
            <div className="habits__completion-header">
              <Trophy size={18} color="#F59E0B" />
              Today's Score
            </div>
            <div className="habits__completion-bar">
              <div
                className="habits__completion-fill"
                style={{ width: `${completionPct}%` }}
              ></div>
            </div>
            <div className="habits__completion-text">
              {completionPct}% complete —{' '}
              {completionPct === 100
                ? '🏆 Perfect Day! You are a champion!'
                : completionPct >= 75
                ? '🔥 Almost there! Keep going!'
                : completionPct >= 50
                ? '💪 Halfway done! Push through!'
                : '⚡ Just getting started! Every habit counts!'}
            </div>
          </div>

        </div>
      )}

    </div>
  )
}

export default Habits