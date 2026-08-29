import { useState, useRef, useEffect } from 'react'
import {
    Brain, Send, Zap, Dumbbell,
    Apple, Moon, TrendingUp, Flame,
    RefreshCw, User, Sparkles, Clock,
    Target
} from 'lucide-react'
import { useFitness } from '../context/FitnessContext'
import {
    getAIResponse,
    generateWorkoutPlan,
    generateMealPlan
} from '../services/claude'
import './AICoach.css'

// Quick prompt suggestions
const QUICK_PROMPTS = [
    { icon: '💪', text: 'Give me a chest workout' },
    { icon: '🥗', text: 'What should I eat today?' },
    { icon: '🔥', text: 'How to lose belly fat fast?' },
    { icon: '😴', text: 'Tips for better recovery?' },
    { icon: '🏃', text: 'Best cardio for fat loss?' },
    { icon: '💊', text: 'Do I need supplements?' },
]

// Format AI message text
function formatMessage(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br/>')
}

// Message Bubble
function MessageBubble({ msg }) {
    const isUser = msg.role === 'user'

    return (
        <div className={`chat__message ${isUser ? 'chat__message--user' : 'chat__message--ai'}`}>
            {!isUser && (
                <div className="chat__avatar chat__avatar--ai">
                    <Brain size={16} />
                </div>
            )}
            <div className={`chat__bubble ${isUser ? 'chat__bubble--user' : 'chat__bubble--ai'}`}>
                {isUser ? (
                    <p>{msg.text}</p>
                ) : (
                    <div
                        dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                    />
                )}
                <div className="chat__meta">
                    {!isUser && !msg.isAI && (
                        <span className="chat__smart-badge">
                            <Zap size={10} /> Smart Response
                        </span>
                    )}
                    {!isUser && msg.isAI && (
                        <span className="chat__ai-badge">
                            <Brain size={10} /> AI Response
                        </span>
                    )}
                    <span className="chat__time">
                        {new Date(msg.timestamp).toLocaleTimeString(
                            'en-US', { hour: '2-digit', minute: '2-digit' }
                        )}
                    </span>
                </div>
            </div>
            {isUser && (
                <div className="chat__avatar chat__avatar--user">
                    <User size={16} />
                </div>
            )}
        </div>
    )
}

// Typing Indicator
function TypingIndicator() {
    return (
        <div className="chat__message chat__message--ai">
            <div className="chat__avatar chat__avatar--ai">
                <Brain size={16} />
            </div>
            <div className="chat__bubble chat__bubble--ai chat__typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

// Plan Generator Tab
function PlanGenerator({ currentUser }) {
    const [activeGen, setActiveGen] = useState('workout')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)

    // Workout form
    const [wGoal, setWGoal] = useState(currentUser?.goal || 'Build Muscle')
    const [wLevel, setWLevel] = useState(currentUser?.level || 'Beginner')
    const [wTime, setWTime] = useState('45')
    const [wEquipment, setWEquipment] = useState('Dumbbells and barbell')

    // Meal form
    const [mGoal, setMGoal] = useState(currentUser?.goal || 'Build Muscle')
    const [mCalories, setMCalories] = useState('2000')
    const [mFoods, setMFoods] = useState('Rice, chicken, eggs, dal, vegetables')

    const handleGenerateWorkout = async () => {
        setLoading(true)
        setResult(null)
        const res = await generateWorkoutPlan(wGoal, wLevel, wTime, wEquipment)
        setResult(res)
        setLoading(false)
    }

    const handleGenerateMeal = async () => {
        setLoading(true)
        setResult(null)
        const res = await generateMealPlan(mGoal, mCalories, mFoods)
        setResult(res)
        setLoading(false)
    }

    return (
        <div className="plan__gen">

            {/* Toggle */}
            <div className="plan__toggle">
                <button
                    className={`plan__toggle-btn ${activeGen === 'workout' ? 'active' : ''}`}
                    onClick={() => { setActiveGen('workout'); setResult(null) }}
                >
                    <Dumbbell size={16} />
                    Workout Plan
                </button>
                <button
                    className={`plan__toggle-btn ${activeGen === 'meal' ? 'active' : ''}`}
                    onClick={() => { setActiveGen('meal'); setResult(null) }}
                >
                    <Apple size={16} />
                    Meal Plan
                </button>
            </div>

            {/* Workout Generator */}
            {activeGen === 'workout' && (
                <div className="plan__form">
                    <div className="plan__form-grid">
                        <div className="plan__field">
                            <label>Your Goal</label>
                            <select value={wGoal} onChange={e => setWGoal(e.target.value)}>
                                <option>Lose Weight</option>
                                <option>Build Muscle</option>
                                <option>Improve Endurance</option>
                                <option>Get Stronger</option>
                                <option>Stay Active</option>
                            </select>
                        </div>
                        <div className="plan__field">
                            <label>Fitness Level</label>
                            <select value={wLevel} onChange={e => setWLevel(e.target.value)}>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <div className="plan__field">
                            <label>Time Available</label>
                            <select value={wTime} onChange={e => setWTime(e.target.value)}>
                                <option value="20">20 minutes</option>
                                <option value="30">30 minutes</option>
                                <option value="45">45 minutes</option>
                                <option value="60">60 minutes</option>
                                <option value="90">90 minutes</option>
                            </select>
                        </div>
                        <div className="plan__field">
                            <label>Equipment</label>
                            <select
                                value={wEquipment}
                                onChange={e => setWEquipment(e.target.value)}
                            >
                                <option>No equipment (bodyweight)</option>
                                <option>Dumbbells only</option>
                                <option>Dumbbells and barbell</option>
                                <option>Full gym access</option>
                                <option>Resistance bands</option>
                            </select>
                        </div>
                    </div>

                    <button
                        className="plan__generate-btn"
                        onClick={handleGenerateWorkout}
                        disabled={loading}
                    >
                        {loading ? (
                            <><RefreshCw size={18} className="spin" /> Generating...</>
                        ) : (
                            <><Zap size={18} /> Generate My Workout Plan</>
                        )}
                    </button>
                </div>
            )}

            {/* Meal Generator */}
            {activeGen === 'meal' && (
                <div className="plan__form">
                    <div className="plan__form-grid">
                        <div className="plan__field">
                            <label>Your Goal</label>
                            <select value={mGoal} onChange={e => setMGoal(e.target.value)}>
                                <option>Lose Weight</option>
                                <option>Build Muscle</option>
                                <option>Maintain Weight</option>
                                <option>Improve Energy</option>
                            </select>
                        </div>
                        <div className="plan__field">
                            <label>Daily Calories</label>
                            <select
                                value={mCalories}
                                onChange={e => setMCalories(e.target.value)}
                            >
                                <option value="1500">1500 kcal (deficit)</option>
                                <option value="1800">1800 kcal (mild deficit)</option>
                                <option value="2000">2000 kcal (maintenance)</option>
                                <option value="2500">2500 kcal (mild surplus)</option>
                                <option value="3000">3000 kcal (surplus)</option>
                            </select>
                        </div>
                    </div>
                    <div className="plan__field plan__field--full">
                        <label>Available Foods</label>
                        <input
                            type="text"
                            value={mFoods}
                            onChange={e => setMFoods(e.target.value)}
                            placeholder="Ex: Rice, chicken, eggs, dal, vegetables..."
                        />
                    </div>

                    <button
                        className="plan__generate-btn"
                        onClick={handleGenerateMeal}
                        disabled={loading}
                    >
                        {loading ? (
                            <><RefreshCw size={18} className="spin" /> Generating...</>
                        ) : (
                            <><Apple size={18} /> Generate My Meal Plan</>
                        )}
                    </button>
                </div>
            )}

            {/* Result */}
            {result && (
                <div className="plan__result">
                    <div className="plan__result-header">
                        <div className="plan__result-badge">
                            {result.isAI
                                ? <><Brain size={14} /> AI Generated</>
                                : <><Zap size={14} /> Smart Plan</>
                            }
                        </div>
                        <button
                            className="plan__result-refresh"
                            onClick={activeGen === 'workout'
                                ? handleGenerateWorkout
                                : handleGenerateMeal
                            }
                        >
                            <RefreshCw size={14} /> Regenerate
                        </button>
                    </div>
                    <div
                        className="plan__result-content"
                        dangerouslySetInnerHTML={{
                            __html: formatMessage(result.text)
                        }}
                    />
                </div>
            )}
        </div>
    )
}

// Main AI Coach Component
function AICoach() {
    const { currentUser } = useFitness()
    const [activeTab, setActiveTab] = useState('chat')
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'ai',
            text: `Hey ${currentUser?.name?.split(' ')[0] || 'there'}! 👋 I'm your personal AI Fitness Coach!\n\nI know your goal is **${currentUser?.goal || 'Get Fit'}** and you're at **${currentUser?.level || 'Beginner'}** level — so every advice I give will be customized for YOU!\n\n💪 Ask me anything about workouts, diet, recovery, or motivation. I'm here 24/7!`,
            isAI: false,
            timestamp: new Date().toISOString()
        }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)

    // Auto scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    const sendMessage = async (text) => {
        if (!text.trim() || isTyping) return

        // Add user message
        const userMsg = {
            id: Date.now(),
            role: 'user',
            text: text.trim(),
            timestamp: new Date().toISOString()
        }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsTyping(true)

        // Get AI response
        const response = await getAIResponse(text, currentUser)

        setIsTyping(false)
        setMessages(prev => [...prev, {
            id: Date.now() + 1,
            role: 'ai',
            text: response.text,
            isAI: response.isAI,
            timestamp: new Date().toISOString()
        }])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(input)
    }

    const clearChat = () => {
        setMessages([{
            id: 1,
            role: 'ai',
            text: `Chat cleared! How can I help you today, ${currentUser?.name?.split(' ')[0] || 'there'}? 💪`,
            isAI: false,
            timestamp: new Date().toISOString()
        }])
    }

    return (
        <div className="ai__coach">

            {/* Header */}
            <div className="ai__header">
                <div className="ai__header-left">
                    <div className="ai__header-icon">
                        <Brain size={22} />
                    </div>
                    <div>
                        <h1>AI Fitness Coach 🤖</h1>
                        <p>Personalized coaching, available 24/7</p>
                    </div>
                </div>
                <div className="ai__header-status">
                    <div className="ai__status-dot"></div>
                    <span>Online</span>
                </div>
            </div>

            {/* User Profile Badge */}
            <div className="ai__profile-badge">
                <div className="ai__profile-item">
                    <Target size={14} color="var(--primary)" />
                    {currentUser?.goal || 'Get Fit'}
                </div>
                <div className="ai__profile-divider"></div>
                <div className="ai__profile-item">
                    <Zap size={14} color="#F59E0B" />
                    {currentUser?.level || 'Beginner'}
                </div>
                <div className="ai__profile-divider"></div>
                <div className="ai__profile-item">
                    <Sparkles size={14} color="#10B981" />
                    Personalized Mode
                </div>
            </div>

            {/* Tabs */}
            <div className="workout__tabs">
                <button
                    className={`workout__tab ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => setActiveTab('chat')}
                >
                    💬 AI Chat
                </button>
                <button
                    className={`workout__tab ${activeTab === 'plans' ? 'active' : ''}`}
                    onClick={() => setActiveTab('plans')}
                >
                    ⚡ Plan Generator
                </button>
            </div>

            {/* ===== CHAT TAB ===== */}
            {activeTab === 'chat' && (
                <div className="ai__chat-section">

                    {/* Messages */}
                    <div className="chat__messages">

                        {/* Quick Prompts — show only if 1 message */}
                        {messages.length === 1 && (
                            <div className="chat__quick-prompts">
                                <div className="chat__quick-title">
                                    <Zap size={14} color="var(--primary)" />
                                    Quick Questions
                                </div>
                                <div className="chat__quick-grid">
                                    {QUICK_PROMPTS.map((p, i) => (
                                        <button
                                            key={i}
                                            className="chat__quick-btn"
                                            onClick={() => sendMessage(p.text)}
                                        >
                                            <span>{p.icon}</span>
                                            {p.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        {messages.map(msg => (
                            <MessageBubble key={msg.id} msg={msg} />
                        ))}

                        {/* Typing */}
                        {isTyping && <TypingIndicator />}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="chat__input-section">
                        <form onSubmit={handleSubmit} className="chat__input-form">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Ask your AI coach anything..."
                                disabled={isTyping}
                                className="chat__input"
                            />
                            <button
                                type="submit"
                                className="chat__send-btn"
                                disabled={!input.trim() || isTyping}
                            >
                                <Send size={18} />
                            </button>
                        </form>
                        <button className="chat__clear-btn" onClick={clearChat}>
                            <RefreshCw size={14} /> Clear Chat
                        </button>
                    </div>
                </div>
            )}

            {/* ===== PLANS TAB ===== */}
            {activeTab === 'plans' && (
                <PlanGenerator currentUser={currentUser} />
            )}

        </div>
    )
}

export default AICoach