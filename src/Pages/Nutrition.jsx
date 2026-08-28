import { useState } from 'react'
import {
    Apple, Plus, X, Flame,
    Droplets, Brain, Trash2,
    ChevronDown, ChevronUp, Zap
} from 'lucide-react'
import { useFitness } from '../context/FitnessContext'
import './Nutrition.css'

// Meal categories
const MEAL_TYPES = [
    { id: 'breakfast', label: 'Breakfast', emoji: '🌅', color: '#F59E0B' },
    { id: 'lunch', label: 'Lunch', emoji: '☀️', color: '#10B981' },
    { id: 'dinner', label: 'Dinner', emoji: '🌙', color: '#7C3AED' },
    { id: 'snacks', label: 'Snacks', emoji: '🍎', color: '#0EA5E9' },
]

// Common foods database
const COMMON_FOODS = [
    { name: 'Rice (1 cup)', calories: 206, protein: 4, carbs: 45, fats: 0 },
    { name: 'Roti (1 piece)', calories: 120, protein: 3, carbs: 25, fats: 2 },
    { name: 'Egg (1 boiled)', calories: 78, protein: 6, carbs: 1, fats: 5 },
    { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fats: 4 },
    { name: 'Dal (1 bowl)', calories: 150, protein: 9, carbs: 27, fats: 1 },
    { name: 'Milk (1 glass)', calories: 150, protein: 8, carbs: 12, fats: 8 },
    { name: 'Banana', calories: 89, protein: 1, carbs: 23, fats: 0 },
    { name: 'Apple', calories: 52, protein: 0, carbs: 14, fats: 0 },
    { name: 'Peanut Butter (1 tbsp)', calories: 94, protein: 4, carbs: 3, fats: 8 },
    { name: 'Oats (1 cup)', calories: 307, protein: 11, carbs: 55, fats: 5 },
    { name: 'Paneer (100g)', calories: 265, protein: 18, carbs: 4, fats: 20 },
    { name: 'Curd (1 bowl)', calories: 100, protein: 6, carbs: 8, fats: 4 },
]

// Add Meal Modal
function AddMealModal({ onClose, onAdd }) {
    const [mealType, setMealType] = useState('breakfast')
    const [name, setName] = useState('')
    const [calories, setCalories] = useState('')
    const [protein, setProtein] = useState('')
    const [carbs, setCarbs] = useState('')
    const [fats, setFats] = useState('')
    const [showFoods, setShowFoods] = useState(false)

    // Quick select from common foods
    const selectFood = (food) => {
        setName(food.name)
        setCalories(food.calories.toString())
        setProtein(food.protein.toString())
        setCarbs(food.carbs.toString())
        setFats(food.fats.toString())
        setShowFoods(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !calories) return

        const meal = {
            id: Date.now(),
            mealType,
            name,
            calories: parseInt(calories) || 0,
            protein: parseInt(protein) || 0,
            carbs: parseInt(carbs) || 0,
            fats: parseInt(fats) || 0,
            date: new Date().toISOString()
        }
        onAdd(meal)
        onClose()
    }

    return (
        <div className="modal__overlay" onClick={onClose}>
            <div className="modal__box" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="modal__header">
                    <div className="modal__title">
                        <Apple size={20} color="var(--primary)" />
                        Add Meal
                    </div>
                    <button className="modal__close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal__form">

                    {/* Meal Type */}
                    <div className="modal__field">
                        <label>Meal Type</label>
                        <div className="nutrition__meal-types">
                            {MEAL_TYPES.map(m => (
                                <button
                                    key={m.id}
                                    type="button"
                                    className={`nutrition__meal-type-btn ${mealType === m.id ? 'active' : ''}`}
                                    style={mealType === m.id
                                        ? { background: m.color, borderColor: m.color }
                                        : { borderColor: `${m.color}40` }
                                    }
                                    onClick={() => setMealType(m.id)}
                                >
                                    {m.emoji} {m.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Food Name */}
                    <div className="modal__field">
                        <label>Food Name *</label>
                        <div className="modal__input-wrap">
                            <input
                                type="text"
                                placeholder="Ex: Rice, Chicken, Dal"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="modal__suggest-btn"
                                onClick={() => setShowFoods(!showFoods)}
                            >
                                {showFoods
                                    ? <ChevronUp size={16} />
                                    : <ChevronDown size={16} />
                                }
                            </button>
                        </div>

                        {/* Common Foods Dropdown */}
                        {showFoods && (
                            <div className="nutrition__food-list">
                                {COMMON_FOODS.map((food, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className="nutrition__food-item"
                                        onClick={() => selectFood(food)}
                                    >
                                        <span>{food.name}</span>
                                        <span className="nutrition__food-cal">
                                            {food.calories} kcal
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Calories */}
                    <div className="modal__field">
                        <label>Calories (kcal) *</label>
                        <input
                            type="number"
                            placeholder="Ex: 350"
                            value={calories}
                            onChange={e => setCalories(e.target.value)}
                            required
                            min="0"
                        />
                    </div>

                    {/* Macros */}
                    <div className="modal__row">
                        <div className="modal__field">
                            <label>Protein (g)</label>
                            <input
                                type="number"
                                placeholder="0"
                                value={protein}
                                onChange={e => setProtein(e.target.value)}
                                min="0"
                            />
                        </div>
                        <div className="modal__field">
                            <label>Carbs (g)</label>
                            <input
                                type="number"
                                placeholder="0"
                                value={carbs}
                                onChange={e => setCarbs(e.target.value)}
                                min="0"
                            />
                        </div>
                        <div className="modal__field">
                            <label>Fats (g)</label>
                            <input
                                type="number"
                                placeholder="0"
                                value={fats}
                                onChange={e => setFats(e.target.value)}
                                min="0"
                            />
                        </div>
                    </div>

                    <button type="submit" className="modal__submit">
                        <Plus size={18} />
                        Add to Log
                    </button>

                </form>
            </div>
        </div>
    )
}

// Macro Ring Component
function MacroRing({ label, value, goal, color, unit }) {
    const pct = Math.min(Math.round((value / goal) * 100), 100)
    const circumference = 2 * Math.PI * 28 // r=28

    return (
        <div className="macro__ring-wrap">
            <div className="macro__ring">
                <svg width="72" height="72" viewBox="0 0 72 72">
                    <circle
                        cx="36" cy="36" r="28"
                        fill="none"
                        stroke={`${color}18`}
                        strokeWidth="6"
                    />
                    <circle
                        cx="36" cy="36" r="28"
                        fill="none"
                        stroke={color}
                        strokeWidth="6"
                        strokeDasharray={`${pct * circumference / 100} ${circumference}`}
                        strokeLinecap="round"
                        transform="rotate(-90 36 36)"
                        style={{ transition: 'stroke-dasharray 0.8s ease' }}
                    />
                </svg>
                <span className="macro__ring-pct" style={{ color }}>
                    {pct}%
                </span>
            </div>
            <div className="macro__ring-label">{label}</div>
            <div className="macro__ring-val" style={{ color }}>
                {value}{unit}
            </div>
            <div className="macro__ring-goal">/ {goal}{unit}</div>
        </div>
    )
}

// Main Nutrition Component
function Nutrition() {
    const { fitnessData, updateFitnessData } = useFitness()
    const [showModal, setShowModal] = useState(false)
    const [activeTab, setActiveTab] = useState('today')

    const nutrition = fitnessData.nutrition || []
    const goals = fitnessData.goals || {
        calories: 2000,
        protein: 150,
        carbs: 250,
        fats: 65
    }

    // Today's meals
    const today = new Date().toDateString()
    const todayMeals = nutrition.filter(
        m => new Date(m.date).toDateString() === today
    )

    // Totals
    const totals = todayMeals.reduce(
        (acc, meal) => ({
            calories: acc.calories + meal.calories,
            protein: acc.protein + meal.protein,
            carbs: acc.carbs + meal.carbs,
            fats: acc.fats + meal.fats
        }),
        { calories: 0, protein: 0, carbs: 0, fats: 0 }
    )

    const remaining = goals.calories - totals.calories

    // Add meal
    const handleAddMeal = (meal) => {
        const updated = [...nutrition, meal]
        updateFitnessData('nutrition', updated)
    }

    // Delete meal
    const handleDelete = (id) => {
        const updated = nutrition.filter(m => m.id !== id)
        updateFitnessData('nutrition', updated)
    }

    // Group today's meals by type
    const mealsByType = MEAL_TYPES.reduce((acc, type) => {
        acc[type.id] = todayMeals.filter(m => m.mealType === type.id)
        return acc
    }, {})

    return (
        <div className="nutrition">

            {/* Header */}
            <div className="nutrition__header">
                <div>
                    <h1>Nutrition Tracker 🥗</h1>
                    <p>Track your daily meals and macronutrients</p>
                </div>
                <button
                    className="nutrition__add-btn"
                    onClick={() => setShowModal(true)}
                >
                    <Plus size={18} />
                    Log Meal
                </button>
            </div>

            {/* Tabs */}
            <div className="workout__tabs">
                {[
                    { id: 'today', label: "Today's Log" },
                    { id: 'history', label: 'History' },
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

            {/* TODAY */}
            {activeTab === 'today' && (
                <>
                    {/* Calorie Summary Card */}
                    <div className="nutrition__summary">
                        <div className="nutrition__cal-main">
                            <div>
                                <div className="nutrition__cal-val">
                                    {totals.calories}
                                    <span>kcal</span>
                                </div>
                                <div className="nutrition__cal-label">Consumed</div>
                            </div>

                            {/* Calorie Bar */}
                            <div className="nutrition__cal-bar-wrap">
                                <div className="nutrition__cal-bar">
                                    <div
                                        className="nutrition__cal-fill"
                                        style={{
                                            width: `${Math.min((totals.calories / goals.calories) * 100, 100)}%`,
                                            background: remaining < 0
                                                ? '#EF4444'
                                                : 'linear-gradient(90deg, var(--primary), #FF8C5A)'
                                        }}
                                    ></div>
                                </div>
                                <div className="nutrition__cal-info">
                                    <span>Goal: {goals.calories} kcal</span>
                                    <span style={{
                                        color: remaining < 0 ? '#EF4444' : '#10B981',
                                        fontWeight: 700
                                    }}>
                                        {remaining < 0
                                            ? `${Math.abs(remaining)} kcal over`
                                            : `${remaining} kcal left`
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Macro Rings */}
                        <div className="nutrition__macros">
                            <MacroRing
                                label="Protein"
                                value={totals.protein}
                                goal={goals.protein}
                                color="#FF6B35"
                                unit="g"
                            />
                            <MacroRing
                                label="Carbs"
                                value={totals.carbs}
                                goal={goals.carbs}
                                color="#0EA5E9"
                                unit="g"
                            />
                            <MacroRing
                                label="Fats"
                                value={totals.fats}
                                goal={goals.fats}
                                color="#F59E0B"
                                unit="g"
                            />
                        </div>
                    </div>

                    {/* Meals by Category */}
                    <div className="nutrition__meals">
                        {MEAL_TYPES.map(type => (
                            <div key={type.id} className="nutrition__meal-section">

                                {/* Meal Type Header */}
                                <div className="nutrition__meal-header">
                                    <div className="nutrition__meal-title">
                                        <span className="nutrition__meal-emoji">
                                            {type.emoji}
                                        </span>
                                        <span style={{ color: type.color }}>
                                            {type.label}
                                        </span>
                                        <span className="nutrition__meal-count">
                                            {mealsByType[type.id].length} items
                                        </span>
                                    </div>
                                    <div className="nutrition__meal-total">
                                        {mealsByType[type.id].reduce(
                                            (sum, m) => sum + m.calories, 0
                                        )} kcal
                                    </div>
                                </div>

                                {/* Meal Items */}
                                {mealsByType[type.id].length === 0 ? (
                                    <div className="nutrition__meal-empty">
                                        Nothing logged for {type.label.toLowerCase()} yet
                                    </div>
                                ) : (
                                    <div className="nutrition__meal-items">
                                        {mealsByType[type.id].map(meal => (
                                            <div key={meal.id} className="nutrition__meal-item">
                                                <div className="nutrition__meal-item-left">
                                                    <div className="nutrition__meal-name">
                                                        {meal.name}
                                                    </div>
                                                    <div className="nutrition__meal-macros">
                                                        <span>P: {meal.protein}g</span>
                                                        <span>C: {meal.carbs}g</span>
                                                        <span>F: {meal.fats}g</span>
                                                    </div>
                                                </div>
                                                <div className="nutrition__meal-item-right">
                                                    <span className="nutrition__meal-cal"
                                                        style={{ color: type.color }}
                                                    >
                                                        {meal.calories} kcal
                                                    </span>
                                                    <button
                                                        className="nutrition__delete"
                                                        onClick={() => handleDelete(meal.id)}
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* AI Meal Tip */}
                    <div className="nutrition__ai-box">
                        <div className="nutrition__ai-header">
                            <Brain size={18} color="var(--primary)" />
                            <span>AI Nutrition Coach</span>
                            <div className="workout__ai-live">
                                <div className="workout__ai-dot"></div>
                                Live
                            </div>
                        </div>
                        <div className="nutrition__ai-content">
                            {totals.protein < goals.protein * 0.5 ? (
                                <p>
                                    💡 <strong>Protein is low today!</strong> Add high-protein
                                    foods like chicken breast, eggs, dal, or paneer to meet
                                    your {goals.protein}g protein goal.
                                </p>
                            ) : remaining < 200 ? (
                                <p>
                                    ✅ <strong>Almost at your calorie goal!</strong> Just
                                    {remaining} kcal remaining. Choose a light snack if hungry.
                                </p>
                            ) : remaining < 0 ? (
                                <p>
                                    ⚠️ <strong>Calorie goal exceeded!</strong> You are{' '}
                                    {Math.abs(remaining)} kcal over. Balance it with a workout!
                                </p>
                            ) : (
                                <p>
                                    🥗 <strong>Keep it balanced!</strong> Aim for
                                    {' '}{goals.protein}g protein, {goals.carbs}g carbs
                                    and {goals.fats}g fats daily for optimal fitness.
                                </p>
                            )}

                            {/* Quick Add Suggestions */}
                            <div className="nutrition__ai-suggestions">
                                <div className="nutrition__ai-suggest-title">
                                    Quick Add:
                                </div>
                                <div className="nutrition__ai-suggest-items">
                                    {COMMON_FOODS.slice(0, 4).map((food, i) => (
                                        <button
                                            key={i}
                                            className="nutrition__ai-suggest-item"
                                            onClick={() => {
                                                const meal = {
                                                    id: Date.now() + i,
                                                    mealType: 'snacks',
                                                    name: food.name,
                                                    calories: food.calories,
                                                    protein: food.protein,
                                                    carbs: food.carbs,
                                                    fats: food.fats,
                                                    date: new Date().toISOString()
                                                }
                                                handleAddMeal(meal)
                                            }}
                                        >
                                            <span>{food.name}</span>
                                            <span className="nutrition__ai-suggest-cal">
                                                {food.calories} kcal
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* HISTORY */}
            {activeTab === 'history' && (
                <div className="nutrition__history">
                    {nutrition.length === 0 ? (
                        <div className="workout__empty">
                            <Apple size={44} color="rgba(255,107,53,0.3)" />
                            <h3>No meal history yet</h3>
                            <p>Start logging meals to see your history!</p>
                        </div>
                    ) : (
                        Object.entries(
                            nutrition.reduce((acc, m) => {
                                const date = new Date(m.date).toDateString()
                                if (!acc[date]) acc[date] = []
                                acc[date].push(m)
                                return acc
                            }, {})
                        )
                            .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                            .map(([date, meals]) => {
                                const dayTotal = meals.reduce(
                                    (sum, m) => sum + m.calories, 0
                                )
                                return (
                                    <div key={date} className="nutrition__history-group">
                                        <div className="nutrition__history-date">
                                            📅 {date === today ? 'Today' : date}
                                            <span>{dayTotal} kcal total</span>
                                        </div>
                                        {meals.map(meal => {
                                            const type = MEAL_TYPES.find(
                                                t => t.id === meal.mealType
                                            )
                                            return (
                                                <div key={meal.id} className="nutrition__meal-item">
                                                    <div className="nutrition__meal-item-left">
                                                        <div className="nutrition__meal-name">
                                                            {type?.emoji} {meal.name}
                                                        </div>
                                                        <div className="nutrition__meal-macros">
                                                            <span style={{ color: type?.color }}>
                                                                {type?.label}
                                                            </span>
                                                            <span>P: {meal.protein}g</span>
                                                            <span>C: {meal.carbs}g</span>
                                                        </div>
                                                    </div>
                                                    <div className="nutrition__meal-item-right">
                                                        <span className="nutrition__meal-cal"
                                                            style={{ color: type?.color }}
                                                        >
                                                            {meal.calories} kcal
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })
                    )}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <AddMealModal
                    onClose={() => setShowModal(false)}
                    onAdd={handleAddMeal}
                />
            )}

        </div>
    )
}

export default Nutrition