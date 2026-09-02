import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Mail, Lock, Eye, EyeOff, User,
  Dumbbell, Target, ChevronDown, ArrowRight
} from 'lucide-react'
import { useFitness } from '../../context/FitnessContext'
import './Auth.css'

const GOALS = [
  '🔥 Lose Weight',
  '💪 Build Muscle',
  '🏃 Improve Endurance',
  '⚡ Get Stronger',
  '🧘 Stay Active',
  '🏆 Athletic Performance'
]

const LEVELS = [
  '🌱 Beginner (0-6 months)',
  '🔥 Intermediate (6m - 2 years)',
  '💪 Advanced (2+ years)'
]

function Signup() {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // 2-step form!
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    goal: '',
    level: ''
  })

  const { signup } = useFitness()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleStep1 = (e) => {
    e.preventDefault()
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters!')
      return
    }
    setError('')
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.goal || !form.level) {
      setError('Please select your goal and fitness level!')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))

    const result = signup(
      form.name, form.email,
      form.password, form.goal, form.level
    )

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message)
      setStep(1)
    }
    setLoading(false)
  }

  return (
    <div className="auth__page">

      {/* Left Side */}
      <div className="auth__left">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
          alt="Fitness"
          className="auth__bg-img"
        />
        <div className="auth__left-overlay"></div>

        <div className="auth__left-content">
          <div className="auth__logo">
            <div className="auth__logo-icon">
              <Dumbbell size={22} />
            </div>
            <span>Get<strong>Fit</strong></span>
          </div>

          <div className="auth__left-text">
            <h2>Start Your<br />Fitness Journey! 🚀</h2>
            <p>
              Join 50,000+ athletes tracking their progress
              with AI-powered insights and personalized plans.
            </p>
          </div>

          {/* Benefits */}
          <div className="auth__benefits">
            {[
              '✅ AI-generated workout plans',
              '✅ Nutrition & calorie tracking',
              '✅ Progress charts & analytics',
              '✅ Personal record tracking',
              '✅ 100% Free — always'
            ].map((b, i) => (
              <div key={i} className="auth__benefit">{b}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="auth__right">
        <div className="auth__form-wrap">

          {/* Step Indicator */}
          <div className="auth__steps">
            <div className={`auth__step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`auth__step-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`auth__step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
          </div>

          <div className="auth__form-header">
            <h1>
              {step === 1 ? 'Create Account' : 'Your Fitness Goals'}
            </h1>
            <p>
              {step === 1
                ? 'Start your free fitness journey today'
                : 'Help us personalize your experience'}
            </p>
          </div>

          {error && (
            <div className="auth__error">⚠️ {error}</div>
          )}

          {/* Step 1 — Basic Info */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="auth__form">

              <div className="auth__field">
                <label>Full Name</label>
                <div className="auth__input-wrap">
                  <User size={18} className="auth__icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="auth__field">
                <label>Email Address</label>
                <div className="auth__input-wrap">
                  <Mail size={18} className="auth__icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="auth__field">
                <label>Password</label>
                <div className="auth__input-wrap">
                  <Lock size={18} className="auth__icon" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    placeholder="Min 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="auth__eye"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth__submit">
                Continue
                <ArrowRight size={18} />
              </button>

            </form>
          )}

          {/* Step 2 — Goals */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="auth__form">

              <div className="auth__field">
                <label>What's your primary goal?</label>
                <div className="auth__goals-grid">
                  {GOALS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={`auth__goal-btn ${form.goal === g ? 'selected' : ''}`}
                      onClick={() => setForm({...form, goal: g})}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="auth__field">
                <label>Your Fitness Level</label>
                <div className="auth__select-wrap">
                  <Target size={18} className="auth__icon" />
                  <select
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    className="auth__select"
                    required
                  >
                    <option value="">Select your level</option>
                    {LEVELS.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="auth__select-arrow" />
                </div>
              </div>

              <div className="auth__form-btns">
                <button
                  type="button"
                  className="auth__back-btn"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="auth__submit auth__submit--flex"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="auth__spinner"></div>
                  ) : (
                    <>
                      Start Tracking Free!
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* Divider — only step 1 */}
          {step === 1 && (
            <>
              <div className="auth__divider">
                <span>or continue with</span>
              </div>
              <button
                className="auth__google"
                onClick={() => alert('Google login coming soon!')}
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  width="20"
                />
                Continue with Google
              </button>
            </>
          )}

          <p className="auth__switch">
            Already have an account?{' '}
            <Link to="/login">Login →</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Signup