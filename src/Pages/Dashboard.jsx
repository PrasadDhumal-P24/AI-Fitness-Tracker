// // import { useState } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import {
// //   LayoutDashboard, Dumbbell, Apple,
// //   BarChart3, Brain, LogOut, Menu, X,
// //   Flame, Droplets, Footprints, Moon,
// //   Heart, Target, Trophy, Zap,
// //   Plus, ChevronRight, TrendingUp,
// //   CheckCircle, Clock, Star
// // } from 'lucide-react'
// // import { useFitness } from '../context/FitnessContext'
// // import './Dashboard.css'
// // import Workout from './Workout'

// // // Sidebar nav items
// // const NAV_ITEMS = [
// //   { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
// //   { icon: Dumbbell, label: 'Workouts', id: 'workouts' },
// //   { icon: Apple, label: 'Nutrition', id: 'nutrition' },
// //   { icon: BarChart3, label: 'Progress', id: 'progress' },
// //   { icon: Brain, label: 'AI Coach', id: 'ai' },
// // ]

// // // Quick log data
// // const QUICK_LOG = [
// //   {
// //     id: 'water',
// //     icon: Droplets,
// //     label: 'Water',
// //     unit: 'glasses',
// //     color: '#0EA5E9',
// //     bg: 'rgba(14,165,233,0.12)',
// //     max: 8,
// //     step: 1
// //   },
// //   {
// //     id: 'steps',
// //     icon: Footprints,
// //     label: 'Steps',
// //     unit: 'steps',
// //     color: '#10B981',
// //     bg: 'rgba(16,185,129,0.12)',
// //     max: 10000,
// //     step: 500
// //   },
// //   {
// //     id: 'calories',
// //     icon: Flame,
// //     label: 'Calories',
// //     unit: 'kcal',
// //     color: '#FF6B35',
// //     bg: 'rgba(255,107,53,0.12)',
// //     max: 2000,
// //     step: 50
// //   },
// //   {
// //     id: 'sleep',
// //     icon: Moon,
// //     label: 'Sleep',
// //     unit: 'hrs',
// //     color: '#7C3AED',
// //     bg: 'rgba(124,58,237,0.12)',
// //     max: 9,
// //     step: 0.5
// //   },
// // ]

// // // Stat Card Component
// // function StatCard({ icon: Icon, label, value, unit, max, color, bg }) {
// //   const percent = Math.min((value / max) * 100, 100)

// //   // const renderContent = () => {
// //   //   switch (activeNav) {
// //   //     case 'workouts': return <Workout />
// //   //     default: return null
// //   //   }
// //   // }

// //   return (
// //     <div className="stat__card" style={{ borderColor: `${color}22` }}>
// //       <div className="stat__card-top">
// //         <div className="stat__icon" style={{ color, background: bg }}>
// //           <Icon size={22} />
// //         </div>
// //         <div className="stat__ring-wrap">
// //           <svg width="52" height="52" viewBox="0 0 52 52">
// //             <circle
// //               cx="26" cy="26" r="20"
// //               fill="none"
// //               stroke={`${color}18`}
// //               strokeWidth="4"
// //             />
// //             <circle
// //               cx="26" cy="26" r="20"
// //               fill="none"
// //               stroke={color}
// //               strokeWidth="4"
// //               strokeDasharray={`${percent * 1.257} 125.7`}
// //               strokeLinecap="round"
// //               transform="rotate(-90 26 26)"
// //               style={{ transition: 'stroke-dasharray 0.8s ease' }}
// //             />
// //           </svg>
// //           <span className="stat__ring-pct" style={{ color }}>
// //             {Math.round(percent)}%
// //           </span>
// //         </div>
// //       </div>
// //       <div className="stat__card-bottom">
// //         <div className="stat__value" style={{ color }}>
// //           {typeof value === 'number' && value % 1 !== 0
// //             ? value.toFixed(1)
// //             : value}
// //           <span className="stat__unit">{unit}</span>
// //         </div>
// //         <div className="stat__label">{label}</div>
// //         <div className="stat__bar">
// //           <div
// //             className="stat__bar-fill"
// //             style={{
// //               width: `${percent}%`,
// //               background: `linear-gradient(90deg, ${color}, ${color}99)`
// //             }}
// //           ></div>
// //         </div>
// //         <div className="stat__goal">
// //           Goal: {max} {unit}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // // Quick Log Component
// // function QuickLogCard({ item, value, onUpdate }) {
// //   const Icon = item.icon
// //   const percent = Math.min((value / item.max) * 100, 100)

// //   return (
// //     <div className="qlog__card" style={{ borderColor: `${item.color}20` }}>
// //       <div className="qlog__header">
// //         <div className="qlog__icon" style={{ color: item.color, background: item.bg }}>
// //           <Icon size={18} />
// //         </div>
// //         <span className="qlog__label">{item.label}</span>
// //         <span className="qlog__val" style={{ color: item.color }}>
// //           {typeof value === 'number' && value % 1 !== 0
// //             ? value.toFixed(1) : value}
// //           <small> {item.unit}</small>
// //         </span>
// //       </div>
// //       <div className="qlog__bar">
// //         <div
// //           className="qlog__bar-fill"
// //           style={{
// //             width: `${percent}%`,
// //             background: item.color
// //           }}
// //         ></div>
// //       </div>
// //       <div className="qlog__btns">
// //         <button
// //           className="qlog__btn qlog__btn--minus"
// //           onClick={() => onUpdate(Math.max(0, value - item.step))}
// //         >
// //           −
// //         </button>
// //         <span className="qlog__pct">{Math.round(percent)}%</span>
// //         <button
// //           className="qlog__btn qlog__btn--plus"
// //           style={{ background: item.color }}
// //           onClick={() => onUpdate(Math.min(item.max, value + item.step))}
// //         >
// //           +
// //         </button>
// //       </div>
// //     </div>
// //   )
// // }

// // // Main Dashboard
// // function Dashboard() {
// //   const { currentUser, logout, fitnessData, updateToday } = useFitness()
// //   const navigate = useNavigate()
// //   const [activeNav, setActiveNav] = useState('dashboard')
// //   const [sidebarOpen, setSidebarOpen] = useState(false)

// //   const today = fitnessData.today

// //   const handleLogout = () => {
// //     logout()
// //     navigate('/')
// //   }

// //   const handleTodayUpdate = (field, value) => {
// //     updateToday(field, value)
// //   }

// //   // Overall progress
// //   const overallProgress = Math.round(
// //     (
// //       (today.water / 8) +
// //       (today.steps / 10000) +
// //       (today.calories / 2000) +
// //       (today.sleep / 8)
// //     ) / 4 * 100
// //   )

// //   const greeting = () => {
// //     const h = new Date().getHours()
// //     if (h < 12) return 'Good Morning'
// //     if (h < 17) return 'Good Afternoon'
// //     return 'Good Evening'
// //   }

// //   const renderContent = () => {
// //     switch (activeNav) {
// //       case 'workouts':
// //         return <Workout />
// //       default:
// //         return null
// //     }
// //   }

// //   return (
// //     <div className="dash">

// //       {/* ===== SIDEBAR ===== */}
// //       <aside className={`dash__sidebar ${sidebarOpen ? 'dash__sidebar--open' : ''}`}>

// //         {/* Logo */}
// //         <div className="dash__logo">
// //           <div className="dash__logo-icon">
// //             <Dumbbell size={20} />
// //           </div>
// //           <span>Get<strong>Fit</strong></span>
// //         </div>

// //         {/* Nav */}
// //         <nav className="dash__nav">
// //           {NAV_ITEMS.map(item => {
// //             const Icon = item.icon
// //             return (
// //               <button
// //                 key={item.id}
// //                 className={`dash__nav-item ${activeNav === item.id ? 'active' : ''}`}
// //                 onClick={() => {
// //                   setActiveNav(item.id)
// //                   setSidebarOpen(false)
// //                 }}
// //               >
// //                 <Icon size={20} />
// //                 <span>{item.label}</span>
// //                 {activeNav === item.id && (
// //                   <div className="dash__nav-indicator"></div>
// //                 )}
// //               </button>
// //             )
// //           })}
// //         </nav>

// //         {/* User Card */}
// //         <div className="dash__user-card">
// //           <div className="dash__user-avatar">
// //             {currentUser?.name?.charAt(0).toUpperCase()}
// //           </div>
// //           <div className="dash__user-info">
// //             <strong>{currentUser?.name}</strong>
// //             <span>{currentUser?.goal?.replace(/^[^ ]+ /, '') || 'Get Fit'}</span>
// //           </div>
// //           <button className="dash__logout" onClick={handleLogout} title="Logout">
// //             <LogOut size={16} />
// //           </button>
// //         </div>

// //       </aside>

// //       {/* Sidebar Overlay (mobile) */}
// //       {sidebarOpen && (
// //         <div
// //           className="dash__overlay"
// //           onClick={() => setSidebarOpen(false)}
// //         ></div>
// //       )}

// //       {/* ===== MAIN CONTENT ===== */}
// //       <main className="dash__main">

// //         {/* Top Bar */}
// //         <header className="dash__topbar">
// //           <div className="dash__topbar-left">
// //             <button
// //               className="dash__menu-btn"
// //               onClick={() => setSidebarOpen(!sidebarOpen)}
// //             >
// //               {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
// //             </button>
// //             <div>
// //               <h1 className="dash__greeting">
// //                 {greeting()}, {currentUser?.name?.split(' ')[0]}! 👋
// //               </h1>
// //               <p className="dash__date">
// //                 {new Date().toLocaleDateString('en-US', {
// //                   weekday: 'long',
// //                   month: 'long',
// //                   day: 'numeric'
// //                 })}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="dash__topbar-right">
// //             {/* Streak Badge */}
// //             <div className="dash__streak">
// //               <Flame size={16} color="#FF6B35" />
// //               <span>5 Day Streak</span>
// //             </div>

// //             {/* Overall Progress */}
// //             <div className="dash__overall">
// //               <div className="dash__overall-ring">
// //                 <svg width="44" height="44" viewBox="0 0 44 44">
// //                   <circle cx="22" cy="22" r="16"
// //                     fill="none" stroke="rgba(255,107,53,0.15)" strokeWidth="4" />
// //                   <circle cx="22" cy="22" r="16"
// //                     fill="none" stroke="var(--primary)"
// //                     strokeWidth="4"
// //                     strokeDasharray={`${overallProgress * 1.005} 100.5`}
// //                     strokeLinecap="round"
// //                     transform="rotate(-90 22 22)"
// //                   />
// //                 </svg>
// //                 <span>{overallProgress}%</span>
// //               </div>
// //               <div>
// //                 <div className="dash__overall-label">Daily Goal</div>
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         {/* ===== DASHBOARD CONTENT ===== */}
// //         <div className="dash__content">

// //           {/* ===== TODAY'S STATS ===== */}
// //           <section className="dash__section">
// //             <div className="dash__section-header">
// //               <h2>
// //                 <Target size={18} color="var(--primary)" />
// //                 Today's Stats
// //               </h2>
// //               <span className="dash__section-date">
// //                 {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
// //               </span>
// //             </div>

// //             <div className="dash__stats-grid">
// //               <StatCard
// //                 icon={Flame}
// //                 label="Calories Burned"
// //                 value={today.calories}
// //                 unit="kcal"
// //                 max={2000}
// //                 color="#FF6B35"
// //                 bg="rgba(255,107,53,0.12)"
// //               />
// //               <StatCard
// //                 icon={Droplets}
// //                 label="Water Intake"
// //                 value={today.water}
// //                 unit="glasses"
// //                 max={8}
// //                 color="#0EA5E9"
// //                 bg="rgba(14,165,233,0.12)"
// //               />
// //               <StatCard
// //                 icon={Footprints}
// //                 label="Steps"
// //                 value={today.steps}
// //                 unit="steps"
// //                 max={10000}
// //                 color="#10B981"
// //                 bg="rgba(16,185,129,0.12)"
// //               />
// //               <StatCard
// //                 icon={Moon}
// //                 label="Sleep"
// //                 value={today.sleep}
// //                 unit="hrs"
// //                 max={8}
// //                 color="#7C3AED"
// //                 bg="rgba(124,58,237,0.12)"
// //               />
// //             </div>
// //           </section>

// //           {/* ===== QUICK LOG + AI TIP ===== */}
// //           <div className="dash__mid-grid">

// //             {/* Quick Log */}
// //             <section className="dash__section">
// //               <div className="dash__section-header">
// //                 <h2>
// //                   <Zap size={18} color="var(--primary)" />
// //                   Quick Log
// //                 </h2>
// //                 <span className="dash__section-sub">Tap + to update</span>
// //               </div>

// //               <div className="dash__qlog-grid">
// //                 {QUICK_LOG.map(item => (
// //                   <QuickLogCard
// //                     key={item.id}
// //                     item={item}
// //                     value={today[item.id] || 0}
// //                     onUpdate={(val) => handleTodayUpdate(item.id, val)}
// //                   />
// //                 ))}
// //               </div>
// //             </section>

// //             {/* Right Column */}
// //             <div className="dash__right-col">

// //               {/* AI Tip */}
// //               <div className="dash__ai-tip">
// //                 <div className="dash__ai-tip-header">
// //                   <div className="dash__ai-tip-icon">
// //                     <Brain size={18} />
// //                   </div>
// //                   <span>AI Coach Tip</span>
// //                   <div className="dash__ai-live">
// //                     <div className="dash__ai-dot"></div>
// //                     Live
// //                   </div>
// //                 </div>
// //                 <p>
// //                   {currentUser?.level?.includes('Beginner')
// //                     ? "💡 Start with compound movements like squats and push-ups. Focus on form before adding weight. Rest 60-90 seconds between sets."
// //                     : currentUser?.level?.includes('Intermediate')
// //                       ? "💡 Try progressive overload — add 2.5kg every week to your main lifts. Track your numbers to see consistent gains!"
// //                       : "💡 Consider periodization — alternate between high volume and high intensity weeks to break through plateaus."
// //                   }
// //                 </p>
// //                 <button className="dash__ai-chat-btn">
// //                   Chat with AI Coach
// //                   <ChevronRight size={16} />
// //                 </button>
// //               </div>

// //               {/* Streak Card */}
// //               <div className="dash__streak-card">
// //                 <div className="dash__streak-header">
// //                   <Trophy size={18} color="#F59E0B" />
// //                   <span>Weekly Streak</span>
// //                 </div>
// //                 <div className="dash__streak-days">
// //                   {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
// //                     const done = i < 5
// //                     const today = i === 4
// //                     return (
// //                       <div key={day} className="dash__streak-day">
// //                         <div className={`
// //                           dash__streak-circle
// //                           ${done ? 'done' : ''}
// //                           ${today ? 'today' : ''}
// //                         `}>
// //                           {done ? '✓' : ''}
// //                         </div>
// //                         <span>{day}</span>
// //                       </div>
// //                     )
// //                   })}
// //                 </div>
// //                 <div className="dash__streak-msg">
// //                   🔥 5 day streak! Keep it going!
// //                 </div>
// //               </div>

// //             </div>
// //           </div>

// //           {/* ===== TODAY'S WORKOUT + NUTRITION ===== */}
// //           <div className="dash__bottom-grid">

// //             {/* Today's Workout */}
// //             <section className="dash__section">
// //               <div className="dash__section-header">
// //                 <h2>
// //                   <Dumbbell size={18} color="var(--primary)" />
// //                   Today's Workout
// //                 </h2>
// //                 <button className="dash__add-btn">
// //                   <Plus size={16} />
// //                   Add
// //                 </button>
// //               </div>

// //               {fitnessData.workouts.length === 0 ? (
// //                 <div className="dash__empty">
// //                   <Dumbbell size={40} color="var(--text-light)" />
// //                   <h3>No workout logged yet</h3>
// //                   <p>Start logging your workouts to track progress</p>
// //                   <button className="dash__empty-btn">
// //                     <Plus size={16} />
// //                     Log Workout
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <div className="dash__workout-list">
// //                   {fitnessData.workouts.slice(0, 4).map((w, i) => (
// //                     <div key={i} className="dash__workout-item">
// //                       <div className="dash__workout-icon">
// //                         <Dumbbell size={16} />
// //                       </div>
// //                       <div className="dash__workout-info">
// //                         <strong>{w.name}</strong>
// //                         <span>{w.sets} sets × {w.reps} reps</span>
// //                       </div>
// //                       <CheckCircle size={18} color="var(--primary)" />
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}

// //               {/* Suggested Workout */}
// //               <div className="dash__suggested">
// //                 <div className="dash__suggested-header">
// //                   <Zap size={14} color="var(--primary)" />
// //                   <span>AI Suggested — Chest Day</span>
// //                 </div>
// //                 {[
// //                   { name: 'Bench Press', detail: '4 × 12 reps' },
// //                   { name: 'Incline DB Press', detail: '3 × 15 reps' },
// //                   { name: 'Cable Flyes', detail: '3 × 12 reps' },
// //                 ].map((ex, i) => (
// //                   <div key={i} className="dash__suggested-item">
// //                     <div className="dash__suggested-num">{i + 1}</div>
// //                     <span>{ex.name}</span>
// //                     <span className="dash__suggested-detail">{ex.detail}</span>
// //                   </div>
// //                 ))}
// //                 <button className="dash__start-btn">
// //                   Start This Workout →
// //                 </button>
// //               </div>
// //             </section>

// //             {/* Nutrition Summary */}
// //             <section className="dash__section">
// //               <div className="dash__section-header">
// //                 <h2>
// //                   <Apple size={18} color="var(--primary)" />
// //                   Nutrition Today
// //                 </h2>
// //                 <button className="dash__add-btn">
// //                   <Plus size={16} />
// //                   Add Meal
// //                 </button>
// //               </div>

// //               {/* Macro Rings */}
// //               <div className="dash__macros">
// //                 {[
// //                   { label: 'Protein', val: 45, goal: 150, color: '#FF6B35', unit: 'g' },
// //                   { label: 'Carbs', val: 120, goal: 250, color: '#0EA5E9', unit: 'g' },
// //                   { label: 'Fats', val: 30, goal: 65, color: '#F59E0B', unit: 'g' },
// //                 ].map((m, i) => {
// //                   const pct = Math.round((m.val / m.goal) * 100)
// //                   return (
// //                     <div key={i} className="dash__macro-item">
// //                       <div className="dash__macro-ring-wrap">
// //                         <svg width="64" height="64" viewBox="0 0 64 64">
// //                           <circle cx="32" cy="32" r="26"
// //                             fill="none" stroke={`${m.color}18`} strokeWidth="5" />
// //                           <circle cx="32" cy="32" r="26"
// //                             fill="none" stroke={m.color}
// //                             strokeWidth="5"
// //                             strokeDasharray={`${pct * 1.634} 163.4`}
// //                             strokeLinecap="round"
// //                             transform="rotate(-90 32 32)"
// //                           />
// //                         </svg>
// //                         <span style={{ color: m.color }}>{pct}%</span>
// //                       </div>
// //                       <div className="dash__macro-label">{m.label}</div>
// //                       <div className="dash__macro-val" style={{ color: m.color }}>
// //                         {m.val}g
// //                       </div>
// //                       <div className="dash__macro-goal">/ {m.goal}g</div>
// //                     </div>
// //                   )
// //                 })}
// //               </div>

// //               {/* Calorie Summary */}
// //               <div className="dash__calorie-summary">
// //                 <div className="dash__calorie-row">
// //                   <span>Daily Calorie Goal</span>
// //                   <span style={{ color: 'white', fontWeight: 700 }}>2,000 kcal</span>
// //                 </div>
// //                 <div className="dash__calorie-row">
// //                   <span>Consumed</span>
// //                   <span style={{ color: '#FF6B35', fontWeight: 700 }}>1,240 kcal</span>
// //                 </div>
// //                 <div className="dash__calorie-row">
// //                   <span>Remaining</span>
// //                   <span style={{ color: '#10B981', fontWeight: 700 }}>760 kcal</span>
// //                 </div>
// //                 <div className="dash__calorie-bar">
// //                   <div className="dash__calorie-fill" style={{ width: '62%' }}></div>
// //                 </div>
// //               </div>

// //               {/* No meals */}
// //               {fitnessData.nutrition.length === 0 && (
// //                 <div className="dash__empty dash__empty--small">
// //                   <Apple size={32} color="var(--text-light)" />
// //                   <p>No meals logged today</p>
// //                   <button className="dash__empty-btn">
// //                     <Plus size={14} />
// //                     Log First Meal
// //                   </button>
// //                 </div>
// //               )}
// //             </section>

// //           </div>

// //           {/* ===== RECENT ACTIVITY ===== */}
// //           <section className="dash__section">
// //             <div className="dash__section-header">
// //               <h2>
// //                 <TrendingUp size={18} color="var(--primary)" />
// //                 Recent Activity
// //               </h2>
// //             </div>

// //             <div className="dash__activity-list">
// //               {[
// //                 {
// //                   icon: Dumbbell,
// //                   color: '#FF6B35',
// //                   title: 'Chest Workout Completed',
// //                   detail: '4 exercises • 45 minutes',
// //                   time: '2 hours ago',
// //                   badge: 'Workout'
// //                 },
// //                 {
// //                   icon: Droplets,
// //                   color: '#0EA5E9',
// //                   title: 'Water Goal Reached',
// //                   detail: '8 glasses consumed today',
// //                   time: '4 hours ago',
// //                   badge: 'Hydration'
// //                 },
// //                 {
// //                   icon: Trophy,
// //                   color: '#F59E0B',
// //                   title: 'New Personal Record!',
// //                   detail: 'Bench Press — 80kg × 5 reps',
// //                   time: 'Yesterday',
// //                   badge: 'PR'
// //                 },
// //                 {
// //                   icon: Brain,
// //                   color: '#7C3AED',
// //                   title: 'AI Workout Generated',
// //                   detail: 'Back & Biceps plan created',
// //                   time: '2 days ago',
// //                   badge: 'AI'
// //                 },
// //               ].map((a, i) => {
// //                 const Icon = a.icon
// //                 return (
// //                   <div key={i} className="dash__activity-item">
// //                     <div
// //                       className="dash__activity-icon"
// //                       style={{ color: a.color, background: `${a.color}15` }}
// //                     >
// //                       <Icon size={18} />
// //                     </div>
// //                     <div className="dash__activity-info">
// //                       <strong>{a.title}</strong>
// //                       <span>{a.detail}</span>
// //                     </div>
// //                     <div className="dash__activity-right">
// //                       <div
// //                         className="dash__activity-badge"
// //                         style={{
// //                           color: a.color,
// //                           background: `${a.color}12`,
// //                           border: `1px solid ${a.color}25`
// //                         }}
// //                       >
// //                         {a.badge}
// //                       </div>
// //                       <div className="dash__activity-time">
// //                         <Clock size={12} />
// //                         {a.time}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )
// //               })}
// //             </div>
// //           </section>

// //         </div>
// //       </main>
// //     </div>
// //   )
// // }

// // export default Dashboard




// // import Nutrition from './Nutrition'

// // const renderContent = () => {
// //   switch(activeNav) {
// //     case 'workouts': return <Workout />
// //     case 'nutrition': return <Nutrition />
// //     default: return null
// //   }
// // }



// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import {
//   LayoutDashboard, Dumbbell, Apple,
//   BarChart3, Brain, LogOut, Menu, X,
//   Flame, Droplets, Footprints, Moon,
//   Heart, Target, Trophy, Zap,
//   Plus, ChevronRight, TrendingUp,
//   CheckCircle, Clock, Star
// } from 'lucide-react'
// import { useFitness } from '../context/FitnessContext'
// import './Dashboard.css'
// import Workout from './Workout'
// import Nutrition from './Nutrition'

// // Sidebar nav items
// const NAV_ITEMS = [
//   { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
//   { icon: Dumbbell, label: 'Workouts', id: 'workouts' },
//   { icon: Apple, label: 'Nutrition', id: 'nutrition' },
//   { icon: BarChart3, label: 'Progress', id: 'progress' },
//   { icon: Brain, label: 'AI Coach', id: 'ai' },
// ]

// // Quick log data
// const QUICK_LOG = [
//   {
//     id: 'water',
//     icon: Droplets,
//     label: 'Water',
//     unit: 'glasses',
//     color: '#0EA5E9',
//     bg: 'rgba(14,165,233,0.12)',
//     max: 8,
//     step: 1
//   },
//   {
//     id: 'steps',
//     icon: Footprints,
//     label: 'Steps',
//     unit: 'steps',
//     color: '#10B981',
//     bg: 'rgba(16,185,129,0.12)',
//     max: 10000,
//     step: 500
//   },
//   {
//     id: 'calories',
//     icon: Flame,
//     label: 'Calories',
//     unit: 'kcal',
//     color: '#FF6B35',
//     bg: 'rgba(255,107,53,0.12)',
//     max: 2000,
//     step: 50
//   },
//   {
//     id: 'sleep',
//     icon: Moon,
//     label: 'Sleep',
//     unit: 'hrs',
//     color: '#7C3AED',
//     bg: 'rgba(124,58,237,0.12)',
//     max: 9,
//     step: 0.5
//   },
// ]

// // Stat Card Component
// function StatCard({ icon: Icon, label, value, unit, max, color, bg }) {
//   const percent = Math.min((value / max) * 100, 100)

//   return (
//     <div className="stat__card" style={{ borderColor: `${color}22` }}>
//       <div className="stat__card-top">
//         <div className="stat__icon" style={{ color, background: bg }}>
//           <Icon size={22} />
//         </div>
//         <div className="stat__ring-wrap">
//           <svg width="52" height="52" viewBox="0 0 52 52">
//             <circle
//               cx="26" cy="26" r="20"
//               fill="none"
//               stroke={`${color}18`}
//               strokeWidth="4"
//             />
//             <circle
//               cx="26" cy="26" r="20"
//               fill="none"
//               stroke={color}
//               strokeWidth="4"
//               strokeDasharray={`${percent * 1.257} 125.7`}
//               strokeLinecap="round"
//               transform="rotate(-90 26 26)"
//               style={{ transition: 'stroke-dasharray 0.8s ease' }}
//             />
//           </svg>
//           <span className="stat__ring-pct" style={{ color }}>
//             {Math.round(percent)}%
//           </span>
//         </div>
//       </div>
//       <div className="stat__card-bottom">
//         <div className="stat__value" style={{ color }}>
//           {typeof value === 'number' && value % 1 !== 0
//             ? value.toFixed(1)
//             : value}
//           <span className="stat__unit">{unit}</span>
//         </div>
//         <div className="stat__label">{label}</div>
//         <div className="stat__bar">
//           <div
//             className="stat__bar-fill"
//             style={{
//               width: `${percent}%`,
//               background: `linear-gradient(90deg, ${color}, ${color}99)`
//             }}
//           ></div>
//         </div>
//         <div className="stat__goal">
//           Goal: {max} {unit}
//         </div>
//       </div>
//     </div>
//   )
// }

// // Quick Log Component
// function QuickLogCard({ item, value, onUpdate }) {
//   const Icon = item.icon
//   const percent = Math.min((value / item.max) * 100, 100)

//   return (
//     <div className="qlog__card" style={{ borderColor: `${item.color}20` }}>
//       <div className="qlog__header">
//         <div className="qlog__icon" style={{ color: item.color, background: item.bg }}>
//           <Icon size={18} />
//         </div>
//         <span className="qlog__label">{item.label}</span>
//         <span className="qlog__val" style={{ color: item.color }}>
//           {typeof value === 'number' && value % 1 !== 0
//             ? value.toFixed(1) : value}
//           <small> {item.unit}</small>
//         </span>
//       </div>
//       <div className="qlog__bar">
//         <div
//           className="qlog__bar-fill"
//           style={{
//             width: `${percent}%`,
//             background: item.color
//           }}
//         ></div>
//       </div>
//       <div className="qlog__btns">
//         <button
//           className="qlog__btn qlog__btn--minus"
//           onClick={() => onUpdate(Math.max(0, value - item.step))}
//         >
//           −
//         </button>
//         <span className="qlog__pct">{Math.round(percent)}%</span>
//         <button
//           className="qlog__btn qlog__btn--plus"
//           style={{ background: item.color }}
//           onClick={() => onUpdate(Math.min(item.max, value + item.step))}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   )
// }

// // Main Dashboard
// function Dashboard() {
//   const { currentUser, logout, fitnessData, updateToday } = useFitness()
//   const navigate = useNavigate()
//   const [activeNav, setActiveNav] = useState('dashboard')
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   const today = fitnessData.today

//   const handleLogout = () => {
//     logout()
//     navigate('/')
//   }

//   const handleTodayUpdate = (field, value) => {
//     updateToday(field, value)
//   }

//   // Overall progress
//   const overallProgress = Math.round(
//     (
//       (today.water / 8) +
//       (today.steps / 10000) +
//       (today.calories / 2000) +
//       (today.sleep / 8)
//     ) / 4 * 100
//   )

//   const greeting = () => {
//     const h = new Date().getHours()
//     if (h < 12) return 'Good Morning'
//     if (h < 17) return 'Good Afternoon'
//     return 'Good Evening'
//   }

//   // Active Tab नुसार योग्य कॉम्पोनंट Render करण्यासाठी हे फंक्शन इथे जोडले आहे
//   const renderContent = () => {
//     switch (activeNav) {
//       case 'workouts':
//         return <Workout />
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="dash">

//       {/* ===== SIDEBAR ===== */}
//       <aside className={`dash__sidebar ${sidebarOpen ? 'dash__sidebar--open' : ''}`}>

//         {/* Logo */}
//         <div className="dash__logo">
//           <div className="dash__logo-icon">
//             <Dumbbell size={20} />
//           </div>
//           <span>Get<strong>Fit</strong></span>
//         </div>

//         {/* Nav */}
//         <nav className="dash__nav">
//           {NAV_ITEMS.map(item => {
//             const Icon = item.icon
//             return (
//               <button
//                 key={item.id}
//                 className={`dash__nav-item ${activeNav === item.id ? 'active' : ''}`}
//                 onClick={() => {
//                   setActiveNav(item.id)
//                   setSidebarOpen(false)
//                 }}
//               >
//                 <Icon size={20} />
//                 <span>{item.label}</span>
//                 {activeNav === item.id && (
//                   <div className="dash__nav-indicator"></div>
//                 )}
//               </button>
//             )
//           })}
//         </nav>

//         {/* User Card */}
//         <div className="dash__user-card">
//           <div className="dash__user-avatar">
//             {currentUser?.name?.charAt(0).toUpperCase()}
//           </div>
//           <div className="dash__user-info">
//             <strong>{currentUser?.name}</strong>
//             <span>{currentUser?.goal?.replace(/^[^ ]+ /, '') || 'Get Fit'}</span>
//           </div>
//           <button className="dash__logout" onClick={handleLogout} title="Logout">
//             <LogOut size={16} />
//           </button>
//         </div>

//       </aside>

//       {/* Sidebar Overlay (mobile) */}
//       {sidebarOpen && (
//         <div
//           className="dash__overlay"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       {/* ===== MAIN CONTENT ===== */}
//       <main className="dash__main">

//         {/* Top Bar */}
//         <header className="dash__topbar">
//           <div className="dash__topbar-left">
//             <button
//               className="dash__menu-btn"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
//             </button>
//             <div>
//               <h1 className="dash__greeting">
//                 {greeting()}, {currentUser?.name?.split(' ')[0]}! 👋
//               </h1>
//               <p className="dash__date">
//                 {new Date().toLocaleDateString('en-US', {
//                   weekday: 'long',
//                   month: 'long',
//                   day: 'numeric'
//                 })}
//               </p>
//             </div>
//           </div>

//           <div className="dash__topbar-right">
//             {/* Streak Badge */}
//             <div className="dash__streak">
//               <Flame size={16} color="#FF6B35" />
//               <span>5 Day Streak</span>
//             </div>

//             {/* Overall Progress */}
//             <div className="dash__overall">
//               <div className="dash__overall-ring">
//                 <svg width="44" height="44" viewBox="0 0 44 44">
//                   <circle cx="22" cy="22" r="16"
//                     fill="none" stroke="rgba(255,107,53,0.15)" strokeWidth="4" />
//                   <circle cx="22" cy="22" r="16"
//                     fill="none" stroke="var(--primary)"
//                     strokeWidth="4"
//                     strokeDasharray={`${overallProgress * 1.005} 100.5`}
//                     strokeLinecap="round"
//                     transform="rotate(-90 22 22)"
//                   />
//                 </svg>
//                 <span>{overallProgress}%</span>
//               </div>
//               <div>
//                 <div className="dash__overall-label">Daily Goal</div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* ===== MAIN CONTENT SWITCHER ===== */}
//         {activeNav === 'dashboard' ? (
//           <div className="dash__content">

//             {/* ===== TODAY'S STATS ===== */}
//             <section className="dash__section">
//               <div className="dash__section-header">
//                 <h2>
//                   <Target size={18} color="var(--primary)" />
//                   Today's Stats
//                 </h2>
//                 <span className="dash__section-date">
//                   {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                 </span>
//               </div>

//               <div className="dash__stats-grid">
//                 <StatCard
//                   icon={Flame}
//                   label="Calories Burned"
//                   value={today.calories}
//                   unit="kcal"
//                   max={2000}
//                   color="#FF6B35"
//                   bg="rgba(255,107,53,0.12)"
//                 />
//                 <StatCard
//                   icon={Droplets}
//                   label="Water Intake"
//                   value={today.water}
//                   unit="glasses"
//                   max={8}
//                   color="#0EA5E9"
//                   bg="rgba(14,165,233,0.12)"
//                 />
//                 <StatCard
//                   icon={Footprints}
//                   label="Steps"
//                   value={today.steps}
//                   unit="steps"
//                   max={10000}
//                   color="#10B981"
//                   bg="rgba(16,185,129,0.12)"
//                 />
//                 <StatCard
//                   icon={Moon}
//                   label="Sleep"
//                   value={today.sleep}
//                   unit="hrs"
//                   max={8}
//                   color="#7C3AED"
//                   bg="rgba(124,58,237,0.12)"
//                 />
//               </div>
//             </section>

//             {/* ===== QUICK LOG + AI TIP ===== */}
//             <div className="dash__mid-grid">

//               {/* Quick Log */}
//               <section className="dash__section">
//                 <div className="dash__section-header">
//                   <h2>
//                     <Zap size={18} color="var(--primary)" />
//                     Quick Log
//                   </h2>
//                   <span className="dash__section-sub">Tap + to update</span>
//                 </div>

//                 <div className="dash__qlog-grid">
//                   {QUICK_LOG.map(item => (
//                     <QuickLogCard
//                       key={item.id}
//                       item={item}
//                       value={today[item.id] || 0}
//                       onUpdate={(val) => handleTodayUpdate(item.id, val)}
//                     />
//                   ))}
//                 </div>
//               </section>

//               {/* Right Column */}
//               <div className="dash__right-col">

//                 {/* AI Tip */}
//                 <div className="dash__ai-tip">
//                   <div className="dash__ai-tip-header">
//                     <div className="dash__ai-tip-icon">
//                       <Brain size={18} />
//                     </div>
//                     <span>AI Coach Tip</span>
//                     <div className="dash__ai-live">
//                       <div className="dash__ai-dot"></div>
//                       Live
//                     </div>
//                   </div>
//                   <p>
//                     {currentUser?.level?.includes('Beginner')
//                       ? "💡 Start with compound movements like squats and push-ups. Focus on form before adding weight. Rest 60-90 seconds between sets."
//                       : currentUser?.level?.includes('Intermediate')
//                         ? "💡 Try progressive overload — add 2.5kg every week to your main lifts. Track your numbers to see consistent gains!"
//                         : "💡 Consider periodization — alternate between high volume and high intensity weeks to break through plateaus."
//                     }
//                   </p>
//                   <button className="dash__ai-chat-btn">
//                     Chat with AI Coach
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>

//                 {/* Streak Card */}
//                 <div className="dash__streak-card">
//                   <div className="dash__streak-header">
//                     <Trophy size={18} color="#F59E0B" />
//                     <span>Weekly Streak</span>
//                   </div>
//                   <div className="dash__streak-days">
//                     {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
//                       const done = i < 5
//                       const today = i === 4
//                       return (
//                         <div key={day} className="dash__streak-day">
//                           <div className={`
//                             dash__streak-circle
//                             ${done ? 'done' : ''}
//                             ${today ? 'today' : ''}
//                           `}>
//                             {done ? '✓' : ''}
//                           </div>
//                           <span>{day}</span>
//                         </div>
//                       )
//                     })}
//                   </div>
//                   <div className="dash__streak-msg">
//                     🔥 5 day streak! Keep it going!
//                   </div>
//                 </div>

//               </div>
//             </div>

//             {/* ===== TODAY'S WORKOUT + NUTRITION ===== */}
//             <div className="dash__bottom-grid">

//               {/* Today's Workout */}
//               <section className="dash__section">
//                 <div className="dash__section-header">
//                   <h2>
//                     <Dumbbell size={18} color="var(--primary)" />
//                     Today's Workout
//                   </h2>
//                   <button className="dash__add-btn">
//                     <Plus size={16} />
//                     Add
//                   </button>
//                 </div>

//                 {fitnessData.workouts.length === 0 ? (
//                   <div className="dash__empty">
//                     <Dumbbell size={40} color="var(--text-light)" />
//                     <h3>No workout logged yet</h3>
//                     <p>Start logging your workouts to track progress</p>
//                     <button className="dash__empty-btn">
//                       <Plus size={16} />
//                       Log Workout
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="dash__workout-list">
//                     {fitnessData.workouts.slice(0, 4).map((w, i) => (
//                       <div key={i} className="dash__workout-item">
//                         <div className="dash__workout-icon">
//                           <Dumbbell size={16} />
//                         </div>
//                         <div className="dash__workout-info">
//                           <strong>{w.name}</strong>
//                           <span>{w.sets} sets × {w.reps} reps</span>
//                         </div>
//                         <CheckCircle size={18} color="var(--primary)" />
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Suggested Workout */}
//                 <div className="dash__suggested">
//                   <div className="dash__suggested-header">
//                     <Zap size={14} color="var(--primary)" />
//                     <span>AI Suggested — Chest Day</span>
//                   </div>
//                   {[
//                     { name: 'Bench Press', detail: '4 × 12 reps' },
//                     { name: 'Incline DB Press', detail: '3 × 15 reps' },
//                     { name: 'Cable Flyes', detail: '3 × 12 reps' },
//                   ].map((ex, i) => (
//                     <div key={i} className="dash__suggested-item">
//                       <div className="dash__suggested-num">{i + 1}</div>
//                       <span>{ex.name}</span>
//                       <span className="dash__suggested-detail">{ex.detail}</span>
//                     </div>
//                   ))}
//                   <button className="dash__start-btn">
//                     Start This Workout →
//                   </button>
//                 </div>
//               </section>

//               {/* Nutrition Summary */}
//               <section className="dash__section">
//                 <div className="dash__section-header">
//                   <h2>
//                     <Apple size={18} color="var(--primary)" />
//                     Nutrition Today
//                   </h2>
//                   <button className="dash__add-btn">
//                     <Plus size={16} />
//                     Add Meal
//                   </button>
//                 </div>

//                 {/* Macro Rings */}
//                 <div className="dash__macros">
//                   {[
//                     { label: 'Protein', val: 45, goal: 150, color: '#FF6B35', unit: 'g' },
//                     { label: 'Carbs', val: 120, goal: 250, color: '#0EA5E9', unit: 'g' },
//                     { label: 'Fats', val: 30, goal: 65, color: '#F59E0B', unit: 'g' },
//                   ].map((m, i) => {
//                     const pct = Math.round((m.val / m.goal) * 100)
//                     return (
//                       <div key={i} className="dash__macro-item">
//                         <div className="dash__macro-ring-wrap">
//                           <svg width="64" height="64" viewBox="0 0 64 64">
//                             <circle cx="32" cy="32" r="26"
//                               fill="none" stroke={`${m.color}18`} strokeWidth="5" />
//                             <circle cx="32" cy="32" r="26"
//                               fill="none" stroke={m.color}
//                               strokeWidth="5"
//                               strokeDasharray={`${pct * 1.634} 163.4`}
//                               strokeLinecap="round"
//                               transform="rotate(-90 32 32)"
//                             />
//                           </svg>
//                           <span style={{ color: m.color }}>{pct}%</span>
//                         </div>
//                         <div className="dash__macro-label">{m.label}</div>
//                         <div className="dash__macro-val" style={{ color: m.color }}>
//                           {m.val}g
//                         </div>
//                         <div className="dash__macro-goal">/ {m.goal}g</div>
//                       </div>
//                     )
//                   })}
//                 </div>

//                 {/* Calorie Summary */}
//                 <div className="dash__calorie-summary">
//                   <div className="dash__calorie-row">
//                     <span>Daily Calorie Goal</span>
//                     <span style={{ color: 'white', fontWeight: 700 }}>2,000 kcal</span>
//                   </div>
//                   <div className="dash__calorie-row">
//                     <span>Consumed</span>
//                     <span style={{ color: '#FF6B35', fontWeight: 700 }}>1,240 kcal</span>
//                   </div>
//                   <div className="dash__calorie-row">
//                     <span>Remaining</span>
//                     <span style={{ color: '#10B981', fontWeight: 700 }}>760 kcal</span>
//                   </div>
//                   <div className="dash__calorie-bar">
//                     <div className="dash__calorie-fill" style={{ width: '62%' }}></div>
//                   </div>
//                 </div>

//                 {/* No meals */}
//                 {fitnessData.nutrition.length === 0 && (
//                   <div className="dash__empty dash__empty--small">
//                     <Apple size={32} color="var(--text-light)" />
//                     <p>No meals logged today</p>
//                     <button className="dash__empty-btn">
//                       <Plus size={14} />
//                       Log First Meal
//                     </button>
//                   </div>
//                 )}
//               </section>

//             </div>

//             {/* ===== RECENT ACTIVITY ===== */}
//             <section className="dash__section">
//               <div className="dash__section-header">
//                 <h2>
//                   <TrendingUp size={18} color="var(--primary)" />
//                   Recent Activity
//                 </h2>
//               </div>

//               <div className="dash__activity-list">
//                 {[
//                   {
//                     icon: Dumbbell,
//                     color: '#FF6B35',
//                     title: 'Chest Workout Completed',
//                     detail: '4 exercises • 45 minutes',
//                     time: '2 hours ago',
//                     badge: 'Workout'
//                   },
//                   {
//                     icon: Droplets,
//                     color: '#0EA5E9',
//                     title: 'Water Goal Reached',
//                     detail: '8 glasses consumed today',
//                     time: '4 hours ago',
//                     badge: 'Hydration'
//                   },
//                   {
//                     icon: Trophy,
//                     color: '#F59E0B',
//                     title: 'New Personal Record!',
//                     detail: 'Bench Press — 80kg × 5 reps',
//                     time: 'Yesterday',
//                     badge: 'PR'
//                   },
//                   {
//                     icon: Brain,
//                     color: '#7C3AED',
//                     title: 'AI Workout Generated',
//                     detail: 'Back & Biceps plan created',
//                     time: '2 days ago',
//                     badge: 'AI'
//                   },
//                 ].map((a, i) => {
//                   const Icon = a.icon
//                   return (
//                     <div key={i} className="dash__activity-item">
//                       <div
//                         className="dash__activity-icon"
//                         style={{ color: a.color, background: `${a.color}15` }}
//                       >
//                         <Icon size={18} />
//                       </div>
//                       <div className="dash__activity-info">
//                         <strong>{a.title}</strong>
//                         <span>{a.detail}</span>
//                       </div>
//                       <div className="dash__activity-right">
//                         <div
//                           className="dash__activity-badge"
//                           style={{
//                             color: a.color,
//                             background: `${a.color}12`,
//                             border: `1px solid ${a.color}25`
//                           }}
//                         >
//                           {a.badge}
//                         </div>
//                         <div className="dash__activity-time">
//                           <Clock size={12} />
//                           {a.time}
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>
//             </section>

//           </div>
//         ) : (
//           <div className="dash__page-content">
//             {renderContent()}
//           </div>
//         )}

//       </main>
//     </div>
//   )
// }

// export default Dashboard


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Dumbbell, Apple,
  BarChart3, Brain, LogOut, Menu, X,
  Flame, Droplets, Footprints, Moon,
  Heart, Target, Trophy, Zap,
  Plus, ChevronRight, TrendingUp,
  CheckCircle, Clock, Star
} from 'lucide-react'
import { useFitness } from '../context/FitnessContext'
import './Dashboard.css'
import Workout from './Workout'
import Nutrition from './Nutrition'
import Progress from './Progress'

// Sidebar nav items
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Dumbbell, label: 'Workouts', id: 'workouts' },
  { icon: Apple, label: 'Nutrition', id: 'nutrition' },
  { icon: BarChart3, label: 'Progress', id: 'progress' },
  { icon: Brain, label: 'AI Coach', id: 'ai' },
]

// Quick log data
const QUICK_LOG = [
  {
    id: 'water',
    icon: Droplets,
    label: 'Water',
    unit: 'glasses',
    color: '#0EA5E9',
    bg: 'rgba(14,165,233,0.12)',
    max: 8,
    step: 1
  },
  {
    id: 'steps',
    icon: Footprints,
    label: 'Steps',
    unit: 'steps',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.12)',
    max: 10000,
    step: 500
  },
  {
    id: 'calories',
    icon: Flame,
    label: 'Calories',
    unit: 'kcal',
    color: '#FF6B35',
    bg: 'rgba(255,107,53,0.12)',
    max: 2000,
    step: 50
  },
  {
    id: 'sleep',
    icon: Moon,
    label: 'Sleep',
    unit: 'hrs',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.12)',
    max: 9,
    step: 0.5
  },
]

// Stat Card Component
function StatCard({ icon: Icon, label, value, unit, max, color, bg }) {
  const percent = Math.min((value / max) * 100, 100)

  return (
    <div className="stat__card" style={{ borderColor: `${color}22` }}>
      <div className="stat__card-top">
        <div className="stat__icon" style={{ color, background: bg }}>
          <Icon size={22} />
        </div>
        <div className="stat__ring-wrap">
          <svg width="52" height="52" viewBox="0 0 52 52">
            <circle
              cx="26" cy="26" r="20"
              fill="none"
              stroke={`${color}18`}
              strokeWidth="4"
            />
            <circle
              cx="26" cy="26" r="20"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeDasharray={`${percent * 1.257} 125.7`}
              strokeLinecap="round"
              transform="rotate(-90 26 26)"
              style={{ transition: 'stroke-dasharray 0.8s ease' }}
            />
          </svg>
          <span className="stat__ring-pct" style={{ color }}>
            {Math.round(percent)}%
          </span>
        </div>
      </div>
      <div className="stat__card-bottom">
        <div className="stat__value" style={{ color }}>
          {typeof value === 'number' && value % 1 !== 0
            ? value.toFixed(1)
            : value}
          <span className="stat__unit">{unit}</span>
        </div>
        <div className="stat__label">{label}</div>
        <div className="stat__bar">
          <div
            className="stat__bar-fill"
            style={{
              width: `${percent}%`,
              background: `linear-gradient(90deg, ${color}, ${color}99)`
            }}
          ></div>
        </div>
        <div className="stat__goal">
          Goal: {max} {unit}
        </div>
      </div>
    </div>
  )
}

// Quick Log Component
function QuickLogCard({ item, value, onUpdate }) {
  const Icon = item.icon
  const percent = Math.min((value / item.max) * 100, 100)

  return (
    <div className="qlog__card" style={{ borderColor: `${item.color}20` }}>
      <div className="qlog__header">
        <div className="qlog__icon" style={{ color: item.color, background: item.bg }}>
          <Icon size={18} />
        </div>
        <span className="qlog__label">{item.label}</span>
        <span className="qlog__val" style={{ color: item.color }}>
          {typeof value === 'number' && value % 1 !== 0
            ? value.toFixed(1) : value}
          <small> {item.unit}</small>
        </span>
      </div>
      <div className="qlog__bar">
        <div
          className="qlog__bar-fill"
          style={{
            width: `${percent}%`,
            background: item.color
          }}
        ></div>
      </div>
      <div className="qlog__btns">
        <button
          className="qlog__btn qlog__btn--minus"
          onClick={() => onUpdate(Math.max(0, value - item.step))}
        >
          −
        </button>
        <span className="qlog__pct">{Math.round(percent)}%</span>
        <button
          className="qlog__btn qlog__btn--plus"
          style={{ background: item.color }}
          onClick={() => onUpdate(Math.min(item.max, value + item.step))}
        >
          +
        </button>
      </div>
    </div>
  )
}

// Main Dashboard
function Dashboard() {
  const { currentUser, logout, fitnessData, updateToday } = useFitness()
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const today = fitnessData.today

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleTodayUpdate = (field, value) => {
    updateToday(field, value)
  }

  // Overall progress
  const overallProgress = Math.round(
    (
      (today.water / 8) +
      (today.steps / 10000) +
      (today.calories / 2000) +
      (today.sleep / 8)
    ) / 4 * 100
  )

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  //  2. Active Tab 
  // const renderContent = () => {
  //   switch (activeNav) {
  //     case 'workouts':
  //       return <Workout />
  //     case 'nutrition':
  //       return <Nutrition />
  //     default:
  //       return null
  //   }
  // }

  const renderContent = () => {
    switch (activeNav) {
      case 'workouts': return <Workout />
      case 'nutrition': return <Nutrition />
      case 'progress': return <Progress />
      default: return null
    }
  }

  return (
    <div className="dash">

      {/* ===== SIDEBAR ===== */}
      <aside className={`dash__sidebar ${sidebarOpen ? 'dash__sidebar--open' : ''}`}>

        {/* Logo */}
        <div className="dash__logo">
          <div className="dash__logo-icon">
            <Dumbbell size={20} />
          </div>
          <span>Get<strong>Fit</strong></span>
        </div>

        {/* Nav */}
        <nav className="dash__nav">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`dash__nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(item.id)
                  setSidebarOpen(false)
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {activeNav === item.id && (
                  <div className="dash__nav-indicator"></div>
                )}
              </button>
            )
          })}
        </nav>

        {/* User Card */}
        <div className="dash__user-card">
          <div className="dash__user-avatar">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="dash__user-info">
            <strong>{currentUser?.name}</strong>
            <span>{currentUser?.goal?.replace(/^[^ ]+ /, '') || 'Get Fit'}</span>
          </div>
          <button className="dash__logout" onClick={handleLogout} title="Logout">
            <LogOut size={16} />
          </button>
        </div>

      </aside>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="dash__overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main className="dash__main">

        {/* Top Bar */}
        <header className="dash__topbar">
          <div className="dash__topbar-left">
            <button
              className="dash__menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div>
              <h1 className="dash__greeting">
                {greeting()}, {currentUser?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="dash__date">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="dash__topbar-right">
            {/* Streak Badge */}
            <div className="dash__streak">
              <Flame size={16} color="#FF6B35" />
              <span>5 Day Streak</span>
            </div>

            {/* Overall Progress */}
            <div className="dash__overall">
              <div className="dash__overall-ring">
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="16"
                    fill="none" stroke="rgba(255,107,53,0.15)" strokeWidth="4" />
                  <circle cx="22" cy="22" r="16"
                    fill="none" stroke="var(--primary)"
                    strokeWidth="4"
                    strokeDasharray={`${overallProgress * 1.005} 100.5`}
                    strokeLinecap="round"
                    transform="rotate(-90 22 22)"
                  />
                </svg>
                <span>{overallProgress}%</span>
              </div>
              <div>
                <div className="dash__overall-label">Daily Goal</div>
              </div>
            </div>
          </div>
        </header>

        {/* ===== MAIN CONTENT SWITCHER ===== */}
        {activeNav === 'dashboard' ? (
          <div className="dash__content">

            {/* ===== TODAY'S STATS ===== */}
            <section className="dash__section">
              <div className="dash__section-header">
                <h2>
                  <Target size={18} color="var(--primary)" />
                  Today's Stats
                </h2>
                <span className="dash__section-date">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div className="dash__stats-grid">
                <StatCard
                  icon={Flame}
                  label="Calories Burned"
                  value={today.calories}
                  unit="kcal"
                  max={2000}
                  color="#FF6B35"
                  bg="rgba(255,107,53,0.12)"
                />
                <StatCard
                  icon={Droplets}
                  label="Water Intake"
                  value={today.water}
                  unit="glasses"
                  max={8}
                  color="#0EA5E9"
                  bg="rgba(14,165,233,0.12)"
                />
                <StatCard
                  icon={Footprints}
                  label="Steps"
                  value={today.steps}
                  unit="steps"
                  max={10000}
                  color="#10B981"
                  bg="rgba(16,185,129,0.12)"
                />
                <StatCard
                  icon={Moon}
                  label="Sleep"
                  value={today.sleep}
                  unit="hrs"
                  max={8}
                  color="#7C3AED"
                  bg="rgba(124,58,237,0.12)"
                />
              </div>
            </section>

            {/* ===== QUICK LOG + AI TIP ===== */}
            <div className="dash__mid-grid">

              {/* Quick Log */}
              <section className="dash__section">
                <div className="dash__section-header">
                  <h2>
                    <Zap size={18} color="var(--primary)" />
                    Quick Log
                  </h2>
                  <span className="dash__section-sub">Tap + to update</span>
                </div>

                <div className="dash__qlog-grid">
                  {QUICK_LOG.map(item => (
                    <QuickLogCard
                      key={item.id}
                      item={item}
                      value={today[item.id] || 0}
                      onUpdate={(val) => handleTodayUpdate(item.id, val)}
                    />
                  ))}
                </div>
              </section>

              {/* Right Column */}
              <div className="dash__right-col">

                {/* AI Tip */}
                <div className="dash__ai-tip">
                  <div className="dash__ai-tip-header">
                    <div className="dash__ai-tip-icon">
                      <Brain size={18} />
                    </div>
                    <span>AI Coach Tip</span>
                    <div className="dash__ai-live">
                      <div className="dash__ai-dot"></div>
                      Live
                    </div>
                  </div>
                  <p>
                    {currentUser?.level?.includes('Beginner')
                      ? "💡 Start with compound movements like squats and push-ups. Focus on form before adding weight. Rest 60-90 seconds between sets."
                      : currentUser?.level?.includes('Intermediate')
                        ? "💡 Try progressive overload — add 2.5kg every week to your main lifts. Track your numbers to see consistent gains!"
                        : "💡 Consider periodization — alternate between high volume and high intensity weeks to break through plateaus."
                    }
                  </p>
                  <button className="dash__ai-chat-btn">
                    Chat with AI Coach
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Streak Card */}
                <div className="dash__streak-card">
                  <div className="dash__streak-header">
                    <Trophy size={18} color="#F59E0B" />
                    <span>Weekly Streak</span>
                  </div>
                  <div className="dash__streak-days">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                      const done = i < 5
                      const today = i === 4
                      return (
                        <div key={day} className="dash__streak-day">
                          <div className={`
                            dash__streak-circle
                            ${done ? 'done' : ''}
                            ${today ? 'today' : ''}
                          `}>
                            {done ? '✓' : ''}
                          </div>
                          <span>{day}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="dash__streak-msg">
                    🔥 5 day streak! Keep it going!
                  </div>
                </div>

              </div>
            </div>

            {/* ===== TODAY'S WORKOUT + NUTRITION ===== */}
            <div className="dash__bottom-grid">

              {/* Today's Workout */}
              <section className="dash__section">
                <div className="dash__section-header">
                  <h2>
                    <Dumbbell size={18} color="var(--primary)" />
                    Today's Workout
                  </h2>
                  <button className="dash__add-btn">
                    <Plus size={16} />
                    Add
                  </button>
                </div>

                {fitnessData.workouts.length === 0 ? (
                  <div className="dash__empty">
                    <Dumbbell size={40} color="var(--text-light)" />
                    <h3>No workout logged yet</h3>
                    <p>Start logging your workouts to track progress</p>
                    <button className="dash__empty-btn">
                      <Plus size={16} />
                      Log Workout
                    </button>
                  </div>
                ) : (
                  <div className="dash__workout-list">
                    {fitnessData.workouts.slice(0, 4).map((w, i) => (
                      <div key={i} className="dash__workout-item">
                        <div className="dash__workout-icon">
                          <Dumbbell size={16} />
                        </div>
                        <div className="dash__workout-info">
                          <strong>{w.name}</strong>
                          <span>{w.sets} sets × {w.reps} reps</span>
                        </div>
                        <CheckCircle size={18} color="var(--primary)" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested Workout */}
                <div className="dash__suggested">
                  <div className="dash__suggested-header">
                    <Zap size={14} color="var(--primary)" />
                    <span>AI Suggested — Chest Day</span>
                  </div>
                  {[
                    { name: 'Bench Press', detail: '4 × 12 reps' },
                    { name: 'Incline DB Press', detail: '3 × 15 reps' },
                    { name: 'Cable Flyes', detail: '3 × 12 reps' },
                  ].map((ex, i) => (
                    <div key={i} className="dash__suggested-item">
                      <div className="dash__suggested-num">{i + 1}</div>
                      <span>{ex.name}</span>
                      <span className="dash__suggested-detail">{ex.detail}</span>
                    </div>
                  ))}
                  <button className="dash__start-btn">
                    Start This Workout →
                  </button>
                </div>
              </section>

              {/* Nutrition Summary */}
              <section className="dash__section">
                <div className="dash__section-header">
                  <h2>
                    <Apple size={18} color="var(--primary)" />
                    Nutrition Today
                  </h2>
                  <button className="dash__add-btn">
                    <Plus size={16} />
                    Add Meal
                  </button>
                </div>

                {/* Macro Rings */}
                <div className="dash__macros">
                  {[
                    { label: 'Protein', val: 45, goal: 150, color: '#FF6B35', unit: 'g' },
                    { label: 'Carbs', val: 120, goal: 250, color: '#0EA5E9', unit: 'g' },
                    { label: 'Fats', val: 30, goal: 65, color: '#F59E0B', unit: 'g' },
                  ].map((m, i) => {
                    const pct = Math.round((m.val / m.goal) * 100)
                    return (
                      <div key={i} className="dash__macro-item">
                        <div className="dash__macro-ring-wrap">
                          <svg width="64" height="64" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="26"
                              fill="none" stroke={`${m.color}18`} strokeWidth="5" />
                            <circle cx="32" cy="32" r="26"
                              fill="none" stroke={m.color}
                              strokeWidth="5"
                              strokeDasharray={`${pct * 1.634} 163.4`}
                              strokeLinecap="round"
                              transform="rotate(-90 32 32)"
                            />
                          </svg>
                          <span style={{ color: m.color }}>{pct}%</span>
                        </div>
                        <div className="dash__macro-label">{m.label}</div>
                        <div className="dash__macro-val" style={{ color: m.color }}>
                          {m.val}g
                        </div>
                        <div className="dash__macro-goal">/ {m.goal}g</div>
                      </div>
                    )
                  })}
                </div>

                {/* Calorie Summary */}
                <div className="dash__calorie-summary">
                  <div className="dash__calorie-row">
                    <span>Daily Calorie Goal</span>
                    <span style={{ color: 'white', fontWeight: 700 }}>2,000 kcal</span>
                  </div>
                  <div className="dash__calorie-row">
                    <span>Consumed</span>
                    <span style={{ color: '#FF6B35', fontWeight: 700 }}>1,240 kcal</span>
                  </div>
                  <div className="dash__calorie-row">
                    <span>Remaining</span>
                    <span style={{ color: '#10B981', fontWeight: 700 }}>760 kcal</span>
                  </div>
                  <div className="dash__calorie-bar">
                    <div className="dash__calorie-fill" style={{ width: '62%' }}></div>
                  </div>
                </div>

                {/* No meals */}
                {fitnessData.nutrition.length === 0 && (
                  <div className="dash__empty dash__empty--small">
                    <Apple size={32} color="var(--text-light)" />
                    <p>No meals logged today</p>
                    <button className="dash__empty-btn">
                      <Plus size={14} />
                      Log First Meal
                    </button>
                  </div>
                )}
              </section>

            </div>

            {/* ===== RECENT ACTIVITY ===== */}
            <section className="dash__section">
              <div className="dash__section-header">
                <h2>
                  <TrendingUp size={18} color="var(--primary)" />
                  Recent Activity
                </h2>
              </div>

              <div className="dash__activity-list">
                {[
                  {
                    icon: Dumbbell,
                    color: '#FF6B35',
                    title: 'Chest Workout Completed',
                    detail: '4 exercises • 45 minutes',
                    time: '2 hours ago',
                    badge: 'Workout'
                  },
                  {
                    icon: Droplets,
                    color: '#0EA5E9',
                    title: 'Water Goal Reached',
                    detail: '8 glasses consumed today',
                    time: '4 hours ago',
                    badge: 'Hydration'
                  },
                  {
                    icon: Trophy,
                    color: '#F59E0B',
                    title: 'New Personal Record!',
                    detail: 'Bench Press — 80kg × 5 reps',
                    time: 'Yesterday',
                    badge: 'PR'
                  },
                  {
                    icon: Brain,
                    color: '#7C3AED',
                    title: 'AI Workout Generated',
                    detail: 'Back & Biceps plan created',
                    time: '2 days ago',
                    badge: 'AI'
                  },
                ].map((a, i) => {
                  const Icon = a.icon
                  return (
                    <div key={i} className="dash__activity-item">
                      <div
                        className="dash__activity-icon"
                        style={{ color: a.color, background: `${a.color}15` }}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="dash__activity-info">
                        <strong>{a.title}</strong>
                        <span>{a.detail}</span>
                      </div>
                      <div className="dash__activity-right">
                        <div
                          className="dash__activity-badge"
                          style={{
                            color: a.color,
                            background: `${a.color}12`,
                            border: `1px solid ${a.color}25`
                          }}
                        >
                          {a.badge}
                        </div>
                        <div className="dash__activity-time">
                          <Clock size={12} />
                          {a.time}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

          </div>
        ) : (
          <div className="dash__page-content">
            {renderContent()}
          </div>
        )}

      </main>
    </div>
  )
}

export default Dashboard