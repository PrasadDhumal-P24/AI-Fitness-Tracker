import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Mail, Lock, Eye, EyeOff,
  Dumbbell, Flame, Zap, ArrowRight
} from 'lucide-react'
import { useFitness } from '../../context/FitnessContext'
import './Auth.css'

function Login() {
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  const { login } = useFitness()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Realistic loading feel
    await new Promise(r => setTimeout(r, 900))

    const result = login(form.email, form.password)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <div className="auth__page">

      {/* Left Side — Motivation Image */}
      <div className="auth__left">
        <img
          src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80"
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
            <h2>Welcome Back,<br />Champion! 💪</h2>
            <p>Your fitness journey continues. Every rep counts, every day matters.</p>
          </div>

          {/* Stats */}
          <div className="auth__left-stats">
            <div className="auth__left-stat">
              <Flame size={18} color="#FF6B35" />
              <div>
                <strong>50K+</strong>
                <span>Active Athletes</span>
              </div>
            </div>
            <div className="auth__left-stat">
              <Zap size={18} color="#7C3AED" />
              <div>
                <strong>2M+</strong>
                <span>Workouts Done</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side — Form */}
      <div className="auth__right">
        <div className="auth__form-wrap">

          <div className="auth__form-header">
            <h1>Login to GetFit</h1>
            <p>Track your progress, crush your goals</p>
          </div>

          {/* Error */}
          {error && (
            <div className="auth__error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth__form">

            {/* Email */}
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
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth__field">
              <div className="auth__field-header">
                <label>Password</label>
                <a href="#" className="auth__forgot">Forgot Password?</a>
              </div>
              <div className="auth__input-wrap">
                <Lock size={18} className="auth__icon" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
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

            {/* Submit */}
            <button
              type="submit"
              className="auth__submit"
              disabled={loading}
            >
              {loading ? (
                <div className="auth__spinner"></div>
              ) : (
                <>
                  Login to Dashboard
                  <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="auth__divider">
            <span>or continue with</span>
          </div>

          {/* Google */}
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

          {/* Switch */}
          <p className="auth__switch">
            New to GetFit?{' '}
            <Link to="/signup">Create Free Account →</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login