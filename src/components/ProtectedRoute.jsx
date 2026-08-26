import { Navigate } from 'react-router-dom'
import { useFitness } from '../context/FitnessContext'
import { Dumbbell } from 'lucide-react'

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useFitness()

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        background: 'var(--dark)'
      }}>
        <div style={{
          width: '50px', height: '50px',
          background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse-green 1.5s infinite'
        }}>
          <Dumbbell size={24} color="white" />
        </div>
        <p style={{
          color: 'var(--text-secondary)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem'
        }}>
          Loading GetFit...
        </p>
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute