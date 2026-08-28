import { useState } from 'react'
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Area,
    AreaChart
} from 'recharts'
import {
    TrendingUp, Scale, Dumbbell,
    Plus, X, Trophy, Target,
    Flame, ChevronRight
} from 'lucide-react'
import { useFitness } from '../context/FitnessContext'
import './Progress.css'

// Custom Tooltip
function CustomTooltip({ active, payload, label, unit }) {
    if (!active || !payload?.length) return null
    return (
        <div className="chart__tooltip">
            <div className="chart__tooltip-label">{label}</div>
            {payload.map((p, i) => (
                <div key={i} className="chart__tooltip-val"
                    style={{ color: p.color }}
                >
                    {p.name}: {p.value} {unit}
                </div>
            ))}
        </div>
    )
}

// Add Weight Modal
function AddWeightModal({ onClose, onAdd }) {
    const [weight, setWeight] = useState('')
    const [note, setNote] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!weight) return
        onAdd({
            id: Date.now(),
            weight: parseFloat(weight),
            note: note.trim(),
            date: new Date().toISOString(),
            label: new Date().toLocaleDateString('en-US', {
                month: 'short', day: 'numeric'
            })
        })
        onClose()
    }

    return (
        <div className="modal__overlay" onClick={onClose}>
            <div className="modal__box" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                    <div className="modal__title">
                        <Scale size={20} color="var(--primary)" />
                        Log Weight
                    </div>
                    <button className="modal__close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="modal__form">
                    <div className="modal__field">
                        <label>Weight (kg) *</label>
                        <input
                            type="number"
                            step="0.1"
                            placeholder="Ex: 72.5"
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="modal__field">
                        <label>Note (optional)</label>
                        <input
                            type="text"
                            placeholder="Ex: Morning, post workout"
                            value={note}
                            onChange={e => setNote(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="modal__submit">
                        <Plus size={18} />
                        Save Weight
                    </button>
                </form>
            </div>
        </div>
    )
}

// Stat Box Component
function StatBox({ label, value, unit, change, color, icon: Icon }) {
    const isPositive = change > 0
    return (
        <div className="progress__stat-box" style={{ borderColor: `${color}25` }}>
            <div className="progress__stat-icon" style={{ color, background: `${color}15` }}>
                <Icon size={20} />
            </div>
            <div className="progress__stat-info">
                <div className="progress__stat-val" style={{ color }}>
                    {value}<span>{unit}</span>
                </div>
                <div className="progress__stat-label">{label}</div>
            </div>
            {change !== undefined && (
                <div className={`progress__stat-change ${isPositive ? 'up' : 'down'}`}>
                    {isPositive ? '↑' : '↓'} {Math.abs(change)}{unit}
                </div>
            )}
        </div>
    )
}

// Main Progress Component
function Progress() {
    const { fitnessData, updateFitnessData } = useFitness()
    const [showWeightModal, setShowWeightModal] = useState(false)
    const [activeTab, setActiveTab] = useState('weight')

    const weightHistory = fitnessData.weightHistory || []
    const workouts = fitnessData.workouts || []
    const personalRecords = fitnessData.personalRecords || []

    // Weight stats
    const latestWeight = weightHistory[weightHistory.length - 1]?.weight
    const firstWeight = weightHistory[0]?.weight
    const weightChange = latestWeight && firstWeight
        ? parseFloat((latestWeight - firstWeight).toFixed(1))
        : 0

    // Add weight
    const handleAddWeight = (entry) => {
        const updated = [...weightHistory, entry]
        updateFitnessData('weightHistory', updated)
    }

    // Workout frequency — last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - (6 - i))
        const label = d.toLocaleDateString('en-US', { weekday: 'short' })
        const dateStr = d.toDateString()
        const count = workouts.filter(
            w => new Date(w.date).toDateString() === dateStr
        ).length
        return { label, count }
    })

    // Calories — last 7 days
    const nutrition = fitnessData.nutrition || []
    const last7Calories = Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - (6 - i))
        const label = d.toLocaleDateString('en-US', { weekday: 'short' })
        const dateStr = d.toDateString()
        const cal = nutrition
            .filter(m => new Date(m.date).toDateString() === dateStr)
            .reduce((sum, m) => sum + m.calories, 0)
        return { label, calories: cal }
    })

    // Sample weight data if empty
    const weightChartData = weightHistory.length > 0
        ? weightHistory.slice(-14)
        : [
            { label: 'Week 1', weight: 75 },
            { label: 'Week 2', weight: 74.2 },
            { label: 'Week 3', weight: 73.8 },
            { label: 'Week 4', weight: 72.5 },
        ]

    const totalWorkouts = workouts.length
    const completedWorkouts = workouts.filter(w => w.completed).length

    return (
        <div className="progress__page">

            {/* Header */}
            <div className="progress__header">
                <div>
                    <h1>Progress Tracker 📊</h1>
                    <p>Visualize your fitness journey over time</p>
                </div>
                <button
                    className="nutrition__add-btn"
                    onClick={() => setShowWeightModal(true)}
                >
                    <Scale size={18} />
                    Log Weight
                </button>
            </div>

            {/* Stats Row */}
            <div className="progress__stats-row">
                <StatBox
                    label="Current Weight"
                    value={latestWeight || '--'}
                    unit="kg"
                    change={weightChange}
                    color="#FF6B35"
                    icon={Scale}
                />
                <StatBox
                    label="Total Workouts"
                    value={totalWorkouts}
                    unit=""
                    color="#7C3AED"
                    icon={Dumbbell}
                />
                <StatBox
                    label="Personal Records"
                    value={personalRecords.length}
                    unit=""
                    color="#F59E0B"
                    icon={Trophy}
                />
                <StatBox
                    label="Completed"
                    value={completedWorkouts}
                    unit=""
                    color="#10B981"
                    icon={Target}
                />
            </div>

            {/* Tabs */}
            <div className="workout__tabs">
                {[
                    { id: 'weight', label: '⚖️ Weight' },
                    { id: 'workouts', label: '💪 Workouts' },
                    { id: 'calories', label: '🔥 Calories' },
                    { id: 'records', label: '🏆 Records' },
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

            {/* ===== WEIGHT CHART ===== */}
            {activeTab === 'weight' && (
                <div className="progress__chart-section">
                    <div className="progress__chart-header">
                        <div className="progress__chart-title">
                            <TrendingUp size={18} color="var(--primary)" />
                            Weight Progress
                        </div>
                        <div className="progress__chart-info">
                            {weightHistory.length} entries
                        </div>
                    </div>

                    <div className="progress__chart-wrap">
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={weightChartData}>
                                <defs>
                                    <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.04)"
                                />
                                <XAxis
                                    dataKey="label"
                                    tick={{ fill: '#606078', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: '#606078', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    domain={['dataMin - 2', 'dataMax + 2']}
                                />
                                <Tooltip
                                    content={<CustomTooltip unit="kg" />}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="weight"
                                    stroke="#FF6B35"
                                    strokeWidth={2.5}
                                    fill="url(#weightGrad)"
                                    dot={{ fill: '#FF6B35', r: 4 }}
                                    activeDot={{ r: 6 }}
                                    name="Weight"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Weight Log */}
                    <div className="progress__log">
                        <div className="progress__log-title">Weight History</div>
                        {weightHistory.length === 0 ? (
                            <div className="workout__empty" style={{ padding: '1.5rem' }}>
                                <Scale size={36} color="rgba(255,107,53,0.3)" />
                                <p>No weight entries yet — log your weight to start!</p>
                            </div>
                        ) : (
                            <div className="progress__log-list">
                                {[...weightHistory]
                                    .reverse()
                                    .slice(0, 8)
                                    .map((entry, i) => {
                                        const prev = weightHistory[weightHistory.length - 2 - i]
                                        const diff = prev
                                            ? parseFloat((entry.weight - prev.weight).toFixed(1))
                                            : 0
                                        return (
                                            <div key={entry.id} className="progress__log-item">
                                                <div className="progress__log-date">
                                                    {new Date(entry.date).toLocaleDateString('en-US', {
                                                        month: 'short', day: 'numeric', year: 'numeric'
                                                    })}
                                                </div>
                                                <div className="progress__log-weight">
                                                    {entry.weight} kg
                                                </div>
                                                {diff !== 0 && (
                                                    <div className={`progress__log-diff ${diff < 0 ? 'down' : 'up'}`}>
                                                        {diff > 0 ? '+' : ''}{diff} kg
                                                    </div>
                                                )}
                                                {entry.note && (
                                                    <div className="progress__log-note">{entry.note}</div>
                                                )}
                                            </div>
                                        )
                                    })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ===== WORKOUT FREQUENCY ===== */}
            {activeTab === 'workouts' && (
                <div className="progress__chart-section">
                    <div className="progress__chart-header">
                        <div className="progress__chart-title">
                            <Dumbbell size={18} color="var(--primary)" />
                            Weekly Workout Frequency
                        </div>
                    </div>

                    <div className="progress__chart-wrap">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={last7Days}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.04)"
                                />
                                <XAxis
                                    dataKey="label"
                                    tick={{ fill: '#606078', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: '#606078', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip content={<CustomTooltip unit="exercises" />} />
                                <Bar
                                    dataKey="count"
                                    name="Exercises"
                                    fill="url(#barGrad)"
                                    radius={[6, 6, 0, 0]}
                                />
                                <defs>
                                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#7C3AED" />
                                        <stop offset="100%" stopColor="#7C3AED99" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Workout Summary */}
                    <div className="progress__workout-summary">
                        <div className="progress__summary-card">
                            <Flame size={20} color="#FF6B35" />
                            <div>
                                <strong>{totalWorkouts}</strong>
                                <span>Total Exercises Logged</span>
                            </div>
                        </div>
                        <div className="progress__summary-card">
                            <Target size={20} color="#10B981" />
                            <div>
                                <strong>
                                    {totalWorkouts > 0
                                        ? Math.round((completedWorkouts / totalWorkouts) * 100)
                                        : 0}%
                                </strong>
                                <span>Completion Rate</span>
                            </div>
                        </div>
                        <div className="progress__summary-card">
                            <TrendingUp size={20} color="#0EA5E9" />
                            <div>
                                <strong>
                                    {last7Days.filter(d => d.count > 0).length}
                                </strong>
                                <span>Active Days (Last 7)</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== CALORIES CHART ===== */}
            {activeTab === 'calories' && (
                <div className="progress__chart-section">
                    <div className="progress__chart-header">
                        <div className="progress__chart-title">
                            <Flame size={18} color="var(--primary)" />
                            Daily Calorie Intake
                        </div>
                        <div className="progress__chart-info">
                            Goal: {fitnessData.goals?.calories || 2000} kcal
                        </div>
                    </div>

                    <div className="progress__chart-wrap">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={last7Calories}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.04)"
                                />
                                <XAxis
                                    dataKey="label"
                                    tick={{ fill: '#606078', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: '#606078', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip unit="kcal" />} />
                                <Bar
                                    dataKey="calories"
                                    name="Calories"
                                    radius={[6, 6, 0, 0]}
                                >
                                    {last7Calories.map((entry, i) => (
                                        <rect key={i}
                                            fill={entry.calories > (fitnessData.goals?.calories || 2000)
                                                ? '#EF4444'
                                                : '#FF6B35'
                                            }
                                        />
                                    ))}
                                </Bar>
                                <defs>
                                    <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#FF6B35" />
                                        <stop offset="100%" stopColor="#FF6B3599" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Calorie Stats */}
                    <div className="progress__workout-summary">
                        <div className="progress__summary-card">
                            <Flame size={20} color="#FF6B35" />
                            <div>
                                <strong>
                                    {last7Calories.length > 0
                                        ? Math.round(
                                            last7Calories.reduce((s, d) => s + d.calories, 0) /
                                            last7Calories.filter(d => d.calories > 0).length || 1
                                        )
                                        : 0}
                                </strong>
                                <span>Avg Daily Calories</span>
                            </div>
                        </div>
                        <div className="progress__summary-card">
                            <Target size={20} color="#10B981" />
                            <div>
                                <strong>
                                    {last7Calories.filter(
                                        d => d.calories >= (fitnessData.goals?.calories || 2000) * 0.9
                                            && d.calories <= (fitnessData.goals?.calories || 2000) * 1.1
                                    ).length}
                                </strong>
                                <span>Days On Target</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== PERSONAL RECORDS ===== */}
            {activeTab === 'records' && (
                <div className="progress__chart-section">
                    <div className="progress__chart-header">
                        <div className="progress__chart-title">
                            <Trophy size={18} color="#F59E0B" />
                            Personal Records
                        </div>
                        <div className="progress__chart-info">
                            {personalRecords.length} PRs
                        </div>
                    </div>

                    {personalRecords.length === 0 ? (
                        <div className="workout__empty">
                            <Trophy size={44} color="rgba(245,158,11,0.2)" />
                            <h3>No PRs yet!</h3>
                            <p>
                                Complete exercises in Workout Tracker
                                and mark them as PR to track here.
                            </p>
                        </div>
                    ) : (
                        <div className="progress__pr-grid">
                            {personalRecords
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map(pr => (
                                    <div key={pr.id} className="progress__pr-card">
                                        <div className="progress__pr-badge">
                                            <Trophy size={16} color="#F59E0B" />
                                            PR
                                        </div>
                                        <div className="progress__pr-name">{pr.exerciseName}</div>
                                        <div className="progress__pr-stats">
                                            {pr.sets && <span>{pr.sets} sets</span>}
                                            {pr.reps && <span>{pr.reps} reps</span>}
                                            {pr.weight && (
                                                <span className="progress__pr-weight">
                                                    {pr.weight} kg
                                                </span>
                                            )}
                                        </div>
                                        <div className="progress__pr-date">
                                            {new Date(pr.date).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            )}

            {/* Weight Modal */}
            {showWeightModal && (
                <AddWeightModal
                    onClose={() => setShowWeightModal(false)}
                    onAdd={handleAddWeight}
                />
            )}

        </div>
    )
}

export default Progress