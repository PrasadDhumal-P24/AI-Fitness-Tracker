import { useState } from 'react'
import {
    Dumbbell, Plus, X, ChevronDown,
    ChevronUp, Trophy, Clock, Flame,
    Brain, Check, Trash2, Zap
} from 'lucide-react'
import { useFitness } from '../context/FitnessContext'
import './Workout.css'

// Workout Categories
const CATEGORIES = [
    { id: 'chest', label: 'Chest', emoji: '💪', color: '#FF6B35' },
    { id: 'back', label: 'Back', emoji: '🦾', color: '#7C3AED' },
    { id: 'legs', label: 'Legs', emoji: '🦵', color: '#0EA5E9' },
    { id: 'shoulders', label: 'Shoulders', emoji: '🏋️', color: '#10B981' },
    { id: 'arms', label: 'Arms', emoji: '💪', color: '#F59E0B' },
    { id: 'core', label: 'Core', emoji: '🔥', color: '#EF4444' },
    { id: 'cardio', label: 'Cardio', emoji: '🏃', color: '#06B6D4' },
    { id: 'fullbody', label: 'Full Body', emoji: '⚡', color: '#8B5CF6' },
]

// Suggested exercises per category
const SUGGESTED_EXERCISES = {
    chest: ['Bench Press', 'Incline DB Press', 'Cable Flyes', 'Push Ups', 'Chest Dips'],
    back: ['Pull Ups', 'Barbell Row', 'Lat Pulldown', 'Seated Row', 'Deadlift'],
    legs: ['Squats', 'Leg Press', 'Romanian Deadlift', 'Leg Curl', 'Calf Raises'],
    shoulders: ['OHP', 'Lateral Raises', 'Front Raises', 'Face Pulls', 'Shrugs'],
    arms: ['Bicep Curl', 'Tricep Pushdown', 'Hammer Curl', 'Skull Crushers', 'Preacher Curl'],
    core: ['Plank', 'Crunches', 'Russian Twist', 'Leg Raises', 'Ab Wheel'],
    cardio: ['Running', 'Cycling', 'Jump Rope', 'Burpees', 'Mountain Climbers'],
    fullbody: ['Deadlift', 'Clean & Press', 'Thrusters', 'Kettlebell Swing', 'Bear Crawl'],
}

// Add Exercise Modal
function AddExerciseModal({ category, onClose, onAdd }) {
    const [name, setName] = useState('')
    const [sets, setSets] = useState('3')
    const [reps, setReps] = useState('12')
    const [weight, setWeight] = useState('')
    const [duration, setDuration] = useState('')
    const [notes, setNotes] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)

    const suggestions = SUGGESTED_EXERCISES[category?.id] || []
    const isCardio = category?.id === 'cardio'

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name.trim()) return

        onAdd({
            id: Date.now(),
            name: name.trim(),
            category: category.id,
            categoryLabel: category.label,
            sets: parseInt(sets) || 0,
            reps: parseInt(reps) || 0,
            weight: weight ? parseFloat(weight) : null,
            duration: duration || null,
            notes: notes.trim(),
            completed: false,
            date: new Date().toISOString()
        })
        onClose()
    }

    return (
        <div className="modal__overlay" onClick={onClose}>
            <div className="modal__box" onClick={e => e.stopPropagation()}>

                <div className="modal__header">
                    <div className="modal__title">
                        <span>{category?.emoji}</span>
                        Add {category?.label} Exercise
                    </div>
                    <button className="modal__close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal__form">

                    {/* Exercise Name */}
                    <div className="modal__field">
                        <label>Exercise Name *</label>
                        <div className="modal__input-wrap">
                            <input
                                type="text"
                                placeholder="Ex: Bench Press"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                autoFocus
                            />
                            <button
                                type="button"
                                className="modal__suggest-btn"
                                onClick={() => setShowSuggestions(!showSuggestions)}
                            >
                                {showSuggestions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                        </div>

                        {/* Suggestions */}
                        {showSuggestions && (
                            <div className="modal__suggestions">
                                {suggestions.map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        className="modal__suggestion-item"
                                        onClick={() => {
                                            setName(s)
                                            setShowSuggestions(false)
                                        }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sets + Reps OR Duration */}
                    {isCardio ? (
                        <div className="modal__field">
                            <label>Duration</label>
                            <input
                                type="text"
                                placeholder="Ex: 30 min, 5km"
                                value={duration}
                                onChange={e => setDuration(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className="modal__row">
                            <div className="modal__field">
                                <label>Sets</label>
                                <input
                                    type="number"
                                    min="1" max="20"
                                    value={sets}
                                    onChange={e => setSets(e.target.value)}
                                />
                            </div>
                            <div className="modal__field">
                                <label>Reps</label>
                                <input
                                    type="number"
                                    min="1" max="100"
                                    value={reps}
                                    onChange={e => setReps(e.target.value)}
                                />
                            </div>
                            <div className="modal__field">
                                <label>Weight (kg)</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.5"
                                    placeholder="Optional"
                                    value={weight}
                                    onChange={e => setWeight(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div className="modal__field">
                        <label>Notes (optional)</label>
                        <input
                            type="text"
                            placeholder="Ex: Focus on squeeze at top"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="modal__submit">
                        <Plus size={18} />
                        Add Exercise
                    </button>
                </form>
            </div>
        </div>
    )
}

// Exercise Card
function ExerciseCard({ exercise, onToggle, onDelete, onPR }) {
    const cat = CATEGORIES.find(c => c.id === exercise.category)

    return (
        <div className={`exercise__card ${exercise.completed ? 'completed' : ''}`}
            style={{ borderLeftColor: cat?.color || 'var(--primary)' }}
        >
            <div className="exercise__card-top">
                <div className="exercise__card-left">
                    <button
                        className={`exercise__check ${exercise.completed ? 'done' : ''}`}
                        style={exercise.completed ? { background: cat?.color, borderColor: cat?.color } : {}}
                        onClick={() => onToggle(exercise.id)}
                    >
                        {exercise.completed && <Check size={14} />}
                    </button>
                    <div>
                        <div className="exercise__name">{exercise.name}</div>
                        <div className="exercise__category"
                            style={{ color: cat?.color }}
                        >
                            {cat?.emoji} {exercise.categoryLabel}
                        </div>
                    </div>
                </div>

                <div className="exercise__card-right">
                    {!exercise.completed && (
                        <button
                            className="exercise__pr-btn"
                            onClick={() => onPR(exercise)}
                            title="Mark as PR"
                        >
                            <Trophy size={14} />
                        </button>
                    )}
                    <button
                        className="exercise__delete-btn"
                        onClick={() => onDelete(exercise.id)}
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            <div className="exercise__stats">
                {exercise.duration ? (
                    <div className="exercise__stat">
                        <Clock size={12} />
                        <span>{exercise.duration}</span>
                    </div>
                ) : (
                    <>
                        <div className="exercise__stat">
                            <span className="exercise__stat-val">{exercise.sets}</span>
                            <span className="exercise__stat-label">sets</span>
                        </div>
                        <div className="exercise__stat-dot"></div>
                        <div className="exercise__stat">
                            <span className="exercise__stat-val">{exercise.reps}</span>
                            <span className="exercise__stat-label">reps</span>
                        </div>
                        {exercise.weight && (
                            <>
                                <div className="exercise__stat-dot"></div>
                                <div className="exercise__stat">
                                    <span className="exercise__stat-val">{exercise.weight}</span>
                                    <span className="exercise__stat-label">kg</span>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>

            {exercise.notes && (
                <div className="exercise__notes">💬 {exercise.notes}</div>
            )}
        </div>
    )
}

// Main Workout Component
function Workout() {
    const { fitnessData, updateFitnessData } = useFitness()
    const [activeCategory, setActiveCategory] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [activeTab, setActiveTab] = useState('today') // today | history | records

    const workouts = fitnessData.workouts || []
    const personalRecords = fitnessData.personalRecords || []

    // Today's workouts
    const today = new Date().toDateString()
    const todayWorkouts = workouts.filter(
        w => new Date(w.date).toDateString() === today
    )

    // Completed count
    const completedCount = todayWorkouts.filter(w => w.completed).length

    // Add exercise
    const handleAddExercise = (exercise) => {
        const updated = [...workouts, exercise]
        updateFitnessData('workouts', updated)
    }

    // Toggle complete
    const handleToggle = (id) => {
        const updated = workouts.map(w =>
            w.id === id ? { ...w, completed: !w.completed } : w
        )
        updateFitnessData('workouts', updated)
    }

    // Delete
    const handleDelete = (id) => {
        const updated = workouts.filter(w => w.id !== id)
        updateFitnessData('workouts', updated)
    }

    // Mark PR
    const handlePR = (exercise) => {
        const pr = {
            id: Date.now(),
            exerciseName: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight,
            date: new Date().toISOString()
        }
        const updated = [...personalRecords, pr]
        updateFitnessData('personalRecords', updated)
        alert(`🏆 New PR saved for ${exercise.name}!`)
    }

    // History — group by date
    const history = workouts.reduce((acc, w) => {
        const date = new Date(w.date).toDateString()
        if (!acc[date]) acc[date] = []
        acc[date].push(w)
        return acc
    }, {})

    const totalCalories = todayWorkouts.length * 45

    return (
        <div className="workout">

            {/* Header */}
            <div className="workout__header">
                <div>
                    <h1>Workout Tracker 💪</h1>
                    <p>Log exercises, track progress, break records</p>
                </div>
                <div className="workout__header-stats">
                    <div className="workout__header-stat">
                        <Dumbbell size={16} color="var(--primary)" />
                        <strong>{todayWorkouts.length}</strong>
                        <span>Exercises</span>
                    </div>
                    <div className="workout__header-stat">
                        <Check size={16} color="#10B981" />
                        <strong>{completedCount}</strong>
                        <span>Done</span>
                    </div>
                    <div className="workout__header-stat">
                        <Flame size={16} color="#FF6B35" />
                        <strong>~{totalCalories}</strong>
                        <span>kcal</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="workout__tabs">
                {[
                    { id: 'today', label: "Today's Workout" },
                    { id: 'history', label: 'History' },
                    { id: 'records', label: '🏆 PRs' },
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

            {/* ===== TODAY'S WORKOUT ===== */}
            {activeTab === 'today' && (
                <div className="workout__content">

                    {/* Categories */}
                    <div className="workout__section">
                        <div className="workout__section-title">
                            <Zap size={16} color="var(--primary)" />
                            Select Category & Add Exercise
                        </div>
                        <div className="workout__categories">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`workout__cat-btn ${activeCategory?.id === cat.id ? 'active' : ''}`}
                                    style={activeCategory?.id === cat.id
                                        ? { background: cat.color, borderColor: cat.color }
                                        : { borderColor: `${cat.color}40` }
                                    }
                                    onClick={() => setActiveCategory(
                                        activeCategory?.id === cat.id ? null : cat
                                    )}
                                >
                                    <span className="workout__cat-emoji">{cat.emoji}</span>
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>

                        {activeCategory && (
                            <button
                                className="workout__add-btn"
                                style={{ background: `linear-gradient(135deg, ${activeCategory.color}, ${activeCategory.color}99)` }}
                                onClick={() => setShowModal(true)}
                            >
                                <Plus size={18} />
                                Add {activeCategory.label} Exercise
                            </button>
                        )}
                    </div>

                    {/* Today's exercises */}
                    <div className="workout__section">
                        <div className="workout__section-title">
                            <Clock size={16} color="var(--primary)" />
                            Today's Log
                            {todayWorkouts.length > 0 && (
                                <span className="workout__count">
                                    {completedCount}/{todayWorkouts.length} done
                                </span>
                            )}
                        </div>

                        {todayWorkouts.length === 0 ? (
                            <div className="workout__empty">
                                <Dumbbell size={44} color="rgba(255,107,53,0.3)" />
                                <h3>No exercises logged yet</h3>
                                <p>Select a category above and start logging!</p>
                            </div>
                        ) : (
                            <div className="workout__exercise-list">
                                {todayWorkouts.map(ex => (
                                    <ExerciseCard
                                        key={ex.id}
                                        exercise={ex}
                                        onToggle={handleToggle}
                                        onDelete={handleDelete}
                                        onPR={handlePR}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Progress Bar */}
                        {todayWorkouts.length > 0 && (
                            <div className="workout__progress">
                                <div className="workout__progress-label">
                                    <span>Session Progress</span>
                                    <span style={{ color: 'var(--primary)' }}>
                                        {Math.round((completedCount / todayWorkouts.length) * 100)}%
                                    </span>
                                </div>
                                <div className="workout__progress-bar">
                                    <div
                                        className="workout__progress-fill"
                                        style={{
                                            width: `${(completedCount / todayWorkouts.length) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* AI Suggestion */}
                    <div className="workout__ai-box">
                        <div className="workout__ai-header">
                            <Brain size={18} color="var(--primary)" />
                            <span>AI Workout Suggestion</span>
                            <div className="workout__ai-live">
                                <div className="workout__ai-dot"></div>
                                Live
                            </div>
                        </div>
                        <div className="workout__ai-suggestion">
                            {activeCategory ? (
                                <>
                                    <p>
                                        <strong>AI Coach recommends for {activeCategory.label}:</strong>
                                    </p>
                                    <div className="workout__ai-exercises">
                                        {SUGGESTED_EXERCISES[activeCategory.id]?.slice(0, 3).map((ex, i) => (
                                            <div key={i} className="workout__ai-exercise">
                                                <span className="workout__ai-num">{i + 1}</span>
                                                <span>{ex}</span>
                                                <span className="workout__ai-detail">
                                                    {activeCategory.id === 'cardio' ? '20-30 min' : '3×12 reps'}
                                                </span>
                                                <button
                                                    className="workout__ai-add"
                                                    onClick={() => {
                                                        handleAddExercise({
                                                            id: Date.now() + i,
                                                            name: ex,
                                                            category: activeCategory.id,
                                                            categoryLabel: activeCategory.label,
                                                            sets: 3,
                                                            reps: 12,
                                                            weight: null,
                                                            duration: activeCategory.id === 'cardio' ? '20 min' : null,
                                                            notes: '',
                                                            completed: false,
                                                            date: new Date().toISOString()
                                                        })
                                                    }}
                                                >
                                                    <Plus size={12} /> Add
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p>Select a workout category above to get AI exercise recommendations! 🤖</p>
                            )}
                        </div>
                    </div>

                </div>
            )}

            {/* ===== HISTORY ===== */}
            {activeTab === 'history' && (
                <div className="workout__content">
                    {Object.keys(history).length === 0 ? (
                        <div className="workout__empty">
                            <Clock size={44} color="rgba(255,107,53,0.3)" />
                            <h3>No workout history yet</h3>
                            <p>Start logging workouts to see your history!</p>
                        </div>
                    ) : (
                        Object.entries(history)
                            .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                            .map(([date, exercises]) => (
                                <div key={date} className="workout__history-group">
                                    <div className="workout__history-date">
                                        📅 {date === today ? 'Today' : date}
                                        <span className="workout__history-count">
                                            {exercises.length} exercises •{' '}
                                            {exercises.filter(e => e.completed).length} completed
                                        </span>
                                    </div>
                                    {exercises.map(ex => (
                                        <ExerciseCard
                                            key={ex.id}
                                            exercise={ex}
                                            onToggle={handleToggle}
                                            onDelete={handleDelete}
                                            onPR={handlePR}
                                        />
                                    ))}
                                </div>
                            ))
                    )}
                </div>
            )}

            {/* ===== PERSONAL RECORDS ===== */}
            {activeTab === 'records' && (
                <div className="workout__content">
                    {personalRecords.length === 0 ? (
                        <div className="workout__empty">
                            <Trophy size={44} color="rgba(245,158,11,0.3)" />
                            <h3>No personal records yet</h3>
                            <p>Complete an exercise and mark it as PR to save it here!</p>
                        </div>
                    ) : (
                        <div className="workout__pr-list">
                            {personalRecords
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map(pr => (
                                    <div key={pr.id} className="workout__pr-card">
                                        <div className="workout__pr-icon">
                                            <Trophy size={20} color="#F59E0B" />
                                        </div>
                                        <div className="workout__pr-info">
                                            <strong>{pr.exerciseName}</strong>
                                            <span>
                                                {pr.sets} sets × {pr.reps} reps
                                                {pr.weight && ` @ ${pr.weight}kg`}
                                            </span>
                                        </div>
                                        <div className="workout__pr-date">
                                            {new Date(pr.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            )}

            {/* Add Exercise Modal */}
            {showModal && activeCategory && (
                <AddExerciseModal
                    category={activeCategory}
                    onClose={() => setShowModal(false)}
                    onAdd={handleAddExercise}
                />
            )}

        </div>
    )
}

export default Workout