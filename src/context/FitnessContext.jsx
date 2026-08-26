import { createContext, useContext, useState, useEffect } from 'react'

const FitnessContext = createContext()

export function FitnessProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fitness Data
  const [fitnessData, setFitnessData] = useState({
    // Today's tracking
    today: {
      calories: 0,
      water: 0,        // in glasses (1 glass = 250ml)
      steps: 0,
      sleep: 0,        // in hours
      heartRate: 72,
    },
    // Workouts log
    workouts: [],
    // Nutrition log
    nutrition: [],
    // Weight history
    weightHistory: [],
    // Personal Records
    personalRecords: [],
    // Weekly goals
    goals: {
      calories: 2000,
      water: 8,        // glasses
      steps: 10000,
      sleep: 8,
      workoutsPerWeek: 5
    }
  })

  //local storage check
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('fitai_user')
      if (savedUser) setCurrentUser(JSON.parse(savedUser))

      const savedData = localStorage.getItem('fitai_data')
      if (savedData) setFitnessData(JSON.parse(savedData))
    } catch (e) {
      console.error('Load error:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fitness data update + auto save
  const updateFitnessData = (section, data) => {
    setFitnessData(prev => {
      const updated = { ...prev, [section]: data }
      localStorage.setItem('fitai_data', JSON.stringify(updated))
      return updated
    })
  }

  // Today's data update
  const updateToday = (field, value) => {
    setFitnessData(prev => {
      const updated = {
        ...prev,
        today: { ...prev.today, [field]: value }
      }
      localStorage.setItem('fitai_data', JSON.stringify(updated))
      return updated
    })
  }

  // SIGNUP
  const signup = (name, email, password, goal, level) => {
    const users = JSON.parse(
      localStorage.getItem('fitai_users') || '[]'
    )

    // checking Email already exists 
    const exists = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase()
    )
    if (exists) {
      return { success: false, message: 'Email already registered!' }
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      goal: goal || 'Get Fit',
      level: level || 'Beginner',
      joinedAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('fitai_users', JSON.stringify(users))

    const userToSave = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      goal: newUser.goal,
      level: newUser.level
    }
    localStorage.setItem('fitai_user', JSON.stringify(userToSave))
    setCurrentUser(userToSave)

    return { success: true }
  }

  // LOGIN
  const login = (email, password) => {
    const users = JSON.parse(
      localStorage.getItem('fitai_users') || '[]'
    )

    const user = users.find(
      u =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password.trim()
    )

    if (!user) {
      return { success: false, message: 'Invalid email or password!' }
    }

    const userToSave = {
      id: user.id,
      name: user.name,
      email: user.email,
      goal: user.goal,
      level: user.level
    }
    localStorage.setItem('fitai_user', JSON.stringify(userToSave))
    setCurrentUser(userToSave)

    return { success: true }
  }

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('fitai_user')
    setCurrentUser(null)
  }

  return (
    <FitnessContext.Provider value={{
      currentUser,
      loading,
      fitnessData,
      updateFitnessData,
      updateToday,
      signup,
      login,
      logout
    }}>
      {children}
    </FitnessContext.Provider>
  )
}

// Custom hook
export function useFitness() {
  return useContext(FitnessContext)
}