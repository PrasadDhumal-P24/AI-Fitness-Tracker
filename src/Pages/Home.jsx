import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Dumbbell, Brain, BarChart3, Apple,
  Droplets, Moon, Zap, ArrowRight,
  CheckCircle, Star, Users, Trophy,
  ChevronRight, Flame, X,
  Target, Heart, Activity
} from 'lucide-react'
import './Home.css'

// Demo Modal Component
function DemoModal({ onClose }) {
  return (
    <div className="demo__overlay" onClick={onClose}>
      <div className="demo__modal" onClick={e => e.stopPropagation()}>
        <button className="demo__close" onClick={onClose}>
          <X size={20} />
        </button>
        <h3>See GetFit in Action 💪</h3>
        <p>Your complete AI fitness dashboard</p>

        {/* Mock Dashboard Preview */}
        <div className="demo__preview">

          {/* Top Stats */}
          <div className="demo__stats-row">
            <div className="demo__stat-card demo__stat-card--orange">
              <Flame size={18} />
              <div>
                <strong>1,840</strong>
                <span>Calories Burned</span>
              </div>
            </div>
            <div className="demo__stat-card demo__stat-card--blue">
              <Droplets size={18} />
              <div>
                <strong>2.4L</strong>
                <span>Water Intake</span>
              </div>
            </div>
            <div className="demo__stat-card demo__stat-card--purple">
              <Dumbbell size={18} />
              <div>
                <strong>45min</strong>
                <span>Workout</span>
              </div>
            </div>
            <div className="demo__stat-card demo__stat-card--green">
              <Moon size={18} />
              <div>
                <strong>7.5hrs</strong>
                <span>Sleep</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="demo__progress-section">
            <div className="demo__progress-title">
              <span>Weekly Goal Progress</span>
              <span className="demo__progress-pct">68%</span>
            </div>
            <div className="demo__progress-bar">
              <div className="demo__progress-fill" style={{ width: '68%' }}></div>
            </div>
          </div>

          {/* Workout List */}
          <div className="demo__workout-list">
            <div className="demo__workout-header">Today's Workout — AI Generated 🤖</div>
            {[
              { name: 'Bench Press', sets: '4×12', done: true },
              { name: 'Incline DB Press', sets: '3×15', done: true },
              { name: 'Cable Flyes', sets: '3×12', done: false },
              { name: 'Tricep Pushdown', sets: '3×15', done: false },
            ].map((w, i) => (
              <div key={i} className={`demo__workout-item ${w.done ? 'done' : ''}`}>
                <div className={`demo__workout-check ${w.done ? 'done' : ''}`}>
                  {w.done && '✓'}
                </div>
                <span>{w.name}</span>
                <span className="demo__workout-sets">{w.sets}</span>
              </div>
            ))}
          </div>

          {/* AI Message */}
          <div className="demo__ai-tip">
            <Brain size={16} color="var(--primary)" />
            <span>
              <strong>AI Coach:</strong> Great progress! You're 68% through your weekly goal.
              Add Cable Flyes to complete today's chest workout! 💪
            </span>
          </div>

        </div>

        <Link to="/signup">
          <button className="demo__cta" onClick={onClose}>
            Start Tracking Free →
          </button>
        </Link>
      </div>
    </div>
  )
}

// Feedback Section Component
function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: 'Rahul M.',
      role: 'Lost 12kg in 3 months',
      text: 'GetFit completely transformed my fitness journey. The AI plans are incredibly personalized!',
      rating: 5,
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
    },
    {
      id: 2,
      name: 'Priya S.',
      role: 'Gained 5kg muscle',
      text: 'Best fitness app I have used. Nutrition tracking + AI suggestions are absolute game-changers.',
      rating: 5,
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
    },
    {
      id: 3,
      name: 'Amit K.',
      role: 'Marathon finisher',
      text: 'Tracked my entire marathon training here. The progress charts kept me motivated every day!',
      rating: 5,
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80'
    }
  ])

  const [form, setForm] = useState({ name: '', role: '', text: '', rating: 5 })
  const [submitted, setSubmitted] = useState(false)
  const [hover, setHover] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.text) return
    const newFb = {
      id: Date.now(),
      name: form.name,
      role: form.role || 'GetFit User',
      text: form.text,
      rating: form.rating,
      img: `https://ui-avatars.com/api/?name=${form.name}&background=FF6B35&color=fff`
    }
    setFeedbacks([newFb, ...feedbacks])
    setForm({ name: '', role: '', text: '', rating: 5 })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="feedback-sec">
      <div className="features__header">
        <div className="features__tag">
          <Star size={14} />
          User Reviews
        </div>
        <h2>Real People, <span>Real Results</span></h2>
        <p>Join thousands who transformed their fitness with GetFit</p>
      </div>

      {/* Feedback Cards */}
      <div className="feedback__grid">
        {feedbacks.slice(0, 3).map(fb => (
          <div key={fb.id} className="feedback__card">
            <div className="feedback__quote">"</div>
            <div className="feedback__stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  fill={i < fb.rating ? '#F59E0B' : 'none'}
                  color={i < fb.rating ? '#F59E0B' : '#444'}
                />
              ))}
            </div>
            <p>{fb.text}</p>
            <div className="feedback__author">
              <img src={fb.img} alt={fb.name} />
              <div>
                <strong>{fb.name}</strong>
                <span>{fb.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Form */}
      <div className="feedback__form-wrap">
        <div className="feedback__form-header">
          <h3>Share Your Success Story 🏆</h3>
          <p>Inspire others with your fitness journey</p>
        </div>

        {submitted && (
          <div className="feedback__success">
            ✅ Thank you! Your story inspires others!
          </div>
        )}

        <form onSubmit={handleSubmit} className="feedback__form">
          <div className="feedback__form-row">
            <input
              type="text"
              placeholder="Your Name *"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="feedback__input"
              required
            />
            <input
              type="text"
              placeholder="Your Achievement (e.g. Lost 10kg)"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="feedback__input"
            />
          </div>
          <textarea
            placeholder="Share your GetFit experience..."
            value={form.text}
            onChange={e => setForm({ ...form, text: e.target.value })}
            className="feedback__input feedback__textarea"
            rows={3}
            required
          />
          <div className="feedback__form-bottom">
            <div className="feedback__rating">
              <span>Rating:</span>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={26}
                  fill={star <= (hover || form.rating) ? '#F59E0B' : 'none'}
                  color={star <= (hover || form.rating) ? '#F59E0B' : '#555'}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setForm({ ...form, rating: star })}
                />
              ))}
            </div>
            <button type="submit" className="feedback__submit">
              <Trophy size={16} />
              Share Story
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

// Main Home Component
function Home() {
  const [demoOpen, setDemoOpen] = useState(false)

  return (
    <div className="home">

      {/* Demo Modal */}
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__bg">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80"
            alt="Fitness"
            className="hero__bg-img"
          />
          <div className="hero__bg-overlay"></div>
        </div>

        <div className="hero__particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`hero__particle hero__particle--${i + 1}`}></div>
          ))}
        </div>

        <div className="hero__content animate-fadeInUp">
          <div className="hero__badge">
            <Flame size={14} />
            <span>AI-Powered Fitness Revolution</span>
            <div className="hero__badge-dot"></div>
          </div>

          <h1 className="hero__title">
            Track Your Personal
            <span className="hero__title-gradient"> Fitness</span>
            <br />with AI
          </h1>

          <p className="hero__subtitle">
            Your smart fitness companion — track workouts, nutrition,
            sleep & progress. Let AI build your perfect plan based
            on your goals and available time.
          </p>

          <div className="hero__btns">
            <Link to="/signup">
              <button className="hero__btn-primary">
                Start Your Journey Free
                <ArrowRight size={18} />
              </button>
            </Link>
            <button
              className="hero__btn-secondary"
              onClick={() => setDemoOpen(true)}
            >
              <div className="hero__demo-icon">
                <Activity size={16} />
              </div>
              Watch Demo
            </button>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>50K+</strong>
              <span>Active Users</span>
            </div>
            <div className="hero__stat-div"></div>
            <div className="hero__stat">
              <strong>2M+</strong>
              <span>Workouts Logged</span>
            </div>
            <div className="hero__stat-div"></div>
            <div className="hero__stat">
              <strong>98%</strong>
              <span>Success Rate</span>
            </div>
          </div>
        </div>

        {/* Hero Right — Stats Visual */}
        <div className="hero__visual">
          <div className="hero__visual-card">

            {/* Header */}
            <div className="hero__visual-header">
              <div className="hero__visual-header-left">
                <Target size={15} color="var(--primary)" />
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>
                  Today's Dashboard
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="hero__visual-badge">
                  <div className="hero__visual-badge-dot"></div>
                  Live
                </div>
                <span className="hero__visual-date">Aug 16, 2025</span>
              </div>
            </div>

            {/* 4 Stat Cards — NEW DESIGN */}
            <div className="hero__stat-grid">
              {[
                {
                  icon: <Flame size={20} />,
                  val: '1,840',
                  unit: 'kcal',
                  label: 'Calories Burned',
                  color: '#FF6B35',
                  bg: 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,107,53,0.05))',
                  progress: 75
                },
                {
                  icon: <Droplets size={20} />,
                  val: '2.1',
                  unit: 'L',
                  label: 'Water Intake',
                  color: '#0EA5E9',
                  bg: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(14,165,233,0.05))',
                  progress: 70
                },
                {
                  icon: <Dumbbell size={20} />,
                  val: '45',
                  unit: 'min',
                  label: 'Workout',
                  color: '#7C3AED',
                  bg: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.05))',
                  progress: 90
                },
                {
                  icon: <Heart size={20} />,
                  val: '72',
                  unit: 'bpm',
                  label: 'Avg Heart Rate',
                  color: '#EF4444',
                  bg: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))',
                  progress: 60
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="hero__stat-item"
                  style={{ background: s.bg, borderColor: `${s.color}22` }}
                >
                  <div className="hero__stat-top">
                    <div
                      className="hero__stat-icon"
                      style={{ color: s.color, background: `${s.color}20` }}
                    >
                      {s.icon}
                    </div>
                    <div className="hero__stat-ring">
                      <svg width="36" height="36" viewBox="0 0 36 36">
                        <circle
                          cx="18" cy="18" r="14"
                          fill="none"
                          stroke={`${s.color}20`}
                          strokeWidth="3"
                        />
                        <circle
                          cx="18" cy="18" r="14"
                          fill="none"
                          stroke={s.color}
                          strokeWidth="3"
                          strokeDasharray={`${s.progress * 0.88} 88`}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <span style={{ color: s.color }}>{s.progress}%</span>
                    </div>
                  </div>
                  <div className="hero__stat-bottom">
                    <div className="hero__stat-val">
                      <strong style={{ color: s.color }}>{s.val}</strong>
                      <span className="hero__stat-unit">{s.unit}</span>
                    </div>
                    <div className="hero__stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Streak + Goal Row */}
            <div className="hero__info-row">
              <div className="hero__streak-box">
                <Flame size={16} color="#FF6B35" />
                <div>
                  <strong>12 Day Streak</strong>
                  <span>Keep it up! 🔥</span>
                </div>
              </div>
              <div className="hero__goal-box">
                <div className="hero__goal-label">
                  <Target size={14} color="var(--primary)" />
                  Weekly Goal
                  <span style={{ marginLeft: 'auto', color: 'var(--primary)', fontWeight: 700 }}>72%</span>
                </div>
                <div className="hero__goal-bar">
                  <div className="hero__goal-fill" style={{ width: '72%' }}></div>
                </div>
              </div>
            </div>

            {/* AI Tip */}
            <div className="hero__ai-message">
              <div className="hero__ai-message-icon">
                <Brain size={14} />
              </div>
              <div>
                <span className="hero__ai-message-label">AI Coach</span>
                <p>"On track! 2 more workouts to hit your weekly goal. Stay consistent! 💪"</p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ===== FEATURES ===== */}
      <section className="features" id="features">
        <div className="features__header">
          <div className="features__tag">
            <Zap size={14} />
            Everything You Need
          </div>
          <h2>All Your Fitness Tools <span>In One Place</span></h2>
          <p>Stop switching between apps. GetFit tracks everything that matters.</p>
        </div>

        <div className="features__grid">
          <div className="feature__card feature__card--large">
            <div className="feature__card-bg feature__card-bg--orange"></div>
            <div className="feature__icon-wrap feature__icon-wrap--orange">
              <Brain size={32} />
            </div>
            <h3>AI Personal Coach</h3>
            <p>Tell your goal, available time, and equipment. AI creates your perfect daily workout plan instantly.</p>
            <div className="feature__tags">
              <span>Smart Plans</span>
              <span>Personalized</span>
              <span>Real-time</span>
            </div>
          </div>

          <div className="feature__card">
            <div className="feature__card-bg feature__card-bg--purple"></div>
            <div className="feature__icon-wrap feature__icon-wrap--purple">
              <Dumbbell size={26} />
            </div>
            <h3>Workout Tracker</h3>
            <p>Log sets, reps, duration. Track every exercise with complete history.</p>
          </div>

          <div className="feature__card">
            <div className="feature__card-bg feature__card-bg--blue"></div>
            <div className="feature__icon-wrap feature__icon-wrap--blue">
              <Apple size={26} />
            </div>
            <h3>Nutrition Tracking</h3>
            <p>Daily calories, protein, carbs, fats. AI meal suggestions included.</p>
          </div>

          <div className="feature__card">
            <div className="feature__card-bg feature__card-bg--cyan"></div>
            <div className="feature__icon-wrap feature__icon-wrap--cyan">
              <BarChart3 size={26} />
            </div>
            <h3>Progress Charts</h3>
            <p>Visual graphs for weight, strength and consistency over time.</p>
          </div>

          <div className="feature__card">
            <div className="feature__card-bg feature__card-bg--green"></div>
            <div className="feature__icon-wrap feature__icon-wrap--green">
              <Droplets size={26} />
            </div>
            <h3>Hydration & Sleep</h3>
            <p>Track water intake and sleep quality for complete wellness tracking.</p>
          </div>

          <div className="feature__card feature__card--highlight">
            <div className="feature__icon-wrap feature__icon-wrap--white">
              <Trophy size={26} />
            </div>
            <h3>Personal Records</h3>
            <p>Celebrate your PRs. Track your strongest lifts and milestones.</p>
            <div className="feature__badge">🔥 Most Loved</div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how" id="how">
        <div className="features__header">
          <div className="features__tag">
            <CheckCircle size={14} />
            Simple Process
          </div>
          <h2>Get Fit in <span>3 Simple Steps</span></h2>
        </div>

        <div className="how__steps">
          <div className="how__step">
            <div className="how__number">01</div>
            <div className="how__icon-wrap"><Users size={36} /></div>
            <h3>Create Your Profile</h3>
            <p>Sign up and tell us your fitness goals, current level, and available equipment.</p>
          </div>
          <div className="how__arrow">→</div>
          <div className="how__step">
            <div className="how__number">02</div>
            <div className="how__icon-wrap"><Brain size={36} /></div>
            <h3>AI Builds Your Plan</h3>
            <p>Our AI creates a personalized workout and meal plan just for you — instantly.</p>
          </div>
          <div className="how__arrow">→</div>
          <div className="how__step">
            <div className="how__number">03</div>
            <div className="how__icon-wrap"><Trophy size={36} /></div>
            <h3>Track & Achieve</h3>
            <p>Log workouts, track nutrition, see progress charts and crush your goals!</p>
          </div>
        </div>
      </section>

      {/* ===== AI SECTION ===== */}
      <section className="ai-section" id="ai">
        <div className="ai-section__bg">
          <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&q=80"
            alt="AI Fitness"
            className="ai-section__bg-img"
          />
          <div className="ai-section__overlay"></div>
        </div>

        <div className="ai-section__content">
          <div className="ai-section__text">
            <div className="features__tag">
              <Brain size={14} />
              Powered by Claude AI
            </div>
            <h2>Your 24/7 <span>AI Fitness Coach</span></h2>
            <p>
              Just tell the AI your situation — available time, equipment,
              energy level — and get a complete personalized workout instantly.
              No generic plans. 100% tailored to YOU.
            </p>
            <div className="ai-section__features">
              {[
                'Personalized workout plans in seconds',
                'Meal suggestions based on available foods',
                'Progress insights and motivation tips',
                'Available anytime, adapts to your schedule'
              ].map((f, i) => (
                <div key={i} className="ai-feature">
                  <CheckCircle size={18} color="var(--primary)" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <Link to="/signup">
              <button className="hero__btn-primary" style={{ marginTop: '1rem' }}>
                Try AI Coach Free
                <ChevronRight size={18} />
              </button>
            </Link>
          </div>

          {/* AI Demo — Chat Interface (no float) */}
          <div className="ai-demo__wrap">
            <div className="ai-demo__label">
              <div className="ai-demo__dot"></div>
              Live AI Coach Demo
            </div>

            <div className="ai-demo__chat">
              <div className="ai-chat__header">
                <Brain size={16} color="var(--primary)" />
                <span>GetFit AI Coach</span>
                <div className="ai-chat__status">
                  <div className="ai-chat__dot ai-chat__dot--green"></div>
                  Online
                </div>
              </div>

              <div className="ai-chat__messages">
                <div className="ai-chat__msg ai-chat__msg--user">
                  I have 30 minutes and only dumbbells at home. Give me a chest workout!
                </div>
                <div className="ai-chat__msg ai-chat__msg--ai">
                  <div className="ai-chat__ai-badge">
                    <Brain size={12} /> AI Coach
                  </div>
                  Perfect! Here's your 30-min dumbbell chest routine:
                  <br /><br />
                  🔥 <strong>Warm Up — 5 min</strong><br />
                  • Arm circles, shoulder rolls<br /><br />
                  💪 <strong>Main Circuit — 20 min</strong><br />
                  • DB Chest Press — 4×12 reps<br />
                  • DB Flyes — 3×15 reps<br />
                  • Push-ups — 3×failure<br />
                  • Incline DB Press — 3×12 reps<br /><br />
                  🧘 <strong>Cool Down — 5 min</strong><br />
                  • Chest stretch, deep breathing
                </div>
                <div className="ai-chat__msg ai-chat__msg--user">
                  What should I eat after this workout?
                </div>
                <div className="ai-chat__msg ai-chat__msg--ai">
                  <div className="ai-chat__ai-badge">
                    <Brain size={12} /> AI Coach
                  </div>
                  Post-workout meal within 30-45 mins:
                  <br /><br />
                  🥚 <strong>Protein (30-40g):</strong> 3 eggs + 200g chicken<br />
                  🍚 <strong>Carbs:</strong> 1 cup rice or 2 rotis<br />
                  🥗 <strong>Veggies:</strong> Salad or sabzi<br />
                  💧 <strong>Hydration:</strong> 500ml water minimum
                </div>
              </div>

              <div className="ai-chat__input-bar">
                <span>Ask your AI coach anything...</span>
                <button className="ai-chat__send">
                  <Zap size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEEDBACK ===== */}
      <FeedbackSection />

      {/* ===== CTA ===== */}
      <section className="cta">
        <div className="cta__bg">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=80"
            alt="CTA"
            className="cta__bg-img"
          />
          <div className="cta__overlay"></div>
        </div>
        <div className="cta__content">
          <h2>Ready to Transform<br />Your Body?</h2>
          <p>Join 50,000+ people already crushing their fitness goals with AI.</p>
          <Link to="/signup">
            <button className="cta__btn">
              Start Free Today
              <ArrowRight size={20} />
            </button>
          </Link>
          <div className="cta__note">
            ✓ No credit card &nbsp;✓ Free forever &nbsp;✓ Cancel anytime
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="header__logo">
              <div className="header__logo-icon">
                <Dumbbell size={18} />
              </div>
              <span>Get<strong style={{ color: 'var(--primary)' }}>Fit</strong></span>
            </div>
            <p>Your AI-powered fitness companion for a healthier life.</p>
          </div>
          <div className="footer__copy">
            © 2025 GetFit. Built with React + AI 💪
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Home