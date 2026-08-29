const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// ===== REAL AI CALL =====
async function callGemini(prompt) {
  if (!API_KEY) throw new Error('NO_KEY')

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 600
        }
      })
    }
  )

  const data = await response.json()

  if (data.error) throw new Error(data.error.message)
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error('NO_RESPONSE')
  }

  return data.candidates[0].content.parts[0].text
}

// ===== SMART FALLBACK =====
function smartFallback(userMessage, userProfile) {
  const msg = userMessage.toLowerCase()
  const goal = userProfile?.goal?.toLowerCase() || 'get fit'
  const level = userProfile?.level?.toLowerCase() || 'beginner'

  const isBeginner = level.includes('beginner')
  const isIntermediate = level.includes('intermediate')
  const isAdvanced = level.includes('advanced')

  const wantsLoseWeight = goal.includes('lose') || goal.includes('weight')
  const wantsMuscle = goal.includes('muscle') || goal.includes('build')
  const wantsEndurance = goal.includes('endurance') || goal.includes('cardio')

  // Workout requests
  if (msg.includes('workout') || msg.includes('exercise') || msg.includes('train')) {
    if (msg.includes('chest')) {
      return `💪 **Chest Workout — ${isBeginner ? 'Beginner' : isIntermediate ? 'Intermediate' : 'Advanced'} Level**

🔥 **Warm Up (5 min)**
- Arm circles × 20
- Push-up hold × 30 sec

💪 **Main Exercises:**
1. ${isBeginner ? 'Push-ups — 3×10' : isIntermediate ? 'Bench Press — 4×10 @ 60-70% 1RM' : 'Barbell Bench Press — 5×5 @ 80% 1RM'}
2. ${isBeginner ? 'Incline Push-ups — 3×12' : isIntermediate ? 'DB Incline Press — 3×12' : 'Weighted Dips — 4×8'}
3. ${isBeginner ? 'Wall Push-ups — 2×15' : isIntermediate ? 'Cable Flyes — 3×15' : 'DB Flyes — 4×12'}
4. ${isBeginner ? 'Plank — 3×20 sec' : isIntermediate ? 'Push-up Variations — 3×failure' : 'Close Grip Bench — 3×10'}

🧘 **Cool Down (5 min)**
- Chest stretch × 30 sec each side
- Deep breathing

⏱️ Rest: ${isBeginner ? '90 sec' : isIntermediate ? '60 sec' : '45 sec'} between sets`
    }

    if (msg.includes('back')) {
      return `🦾 **Back Workout**

💪 **Exercises:**
1. ${isBeginner ? 'Lat Pulldown — 3×12' : 'Pull-ups — 4×8'}
2. ${isBeginner ? 'Seated Cable Row — 3×12' : 'Barbell Row — 4×10'}
3. ${isBeginner ? 'Dumbbell Row — 3×12 each' : 'T-Bar Row — 3×10'}
4. Face Pulls — 3×15
5. ${isBeginner ? 'Back Extensions — 2×15' : 'Deadlift — 4×5'}

⏱️ Rest: ${isBeginner ? '90 sec' : '60 sec'} between sets`
    }

    if (msg.includes('leg')) {
      return `🦵 **Leg Workout**

💪 **Exercises:**
1. ${isBeginner ? 'Bodyweight Squats — 3×15' : 'Barbell Squats — 4×10'}
2. ${isBeginner ? 'Reverse Lunges — 3×12 each' : 'Romanian Deadlift — 4×10'}
3. Leg Press — 3×12
4. ${isBeginner ? 'Glute Bridge — 3×15' : 'Leg Curl — 3×12'}
5. Calf Raises — 4×20

⏱️ Rest: 90 sec between sets`
    }

    if (msg.includes('arm') || msg.includes('bicep') || msg.includes('tricep')) {
      return `💪 **Arms Workout**

**Biceps:**
1. ${isBeginner ? 'DB Curl — 3×12' : 'Barbell Curl — 4×10'}
2. Hammer Curl — 3×12
3. ${isBeginner ? 'Concentration Curl — 2×15' : 'Preacher Curl — 3×10'}

**Triceps:**
1. ${isBeginner ? 'Tricep Dips — 3×10' : 'Close-Grip Bench — 4×8'}
2. Overhead Extension — 3×12
3. ${isBeginner ? 'Pushdowns — 3×15' : 'Skull Crushers — 3×10'}

⏱️ Rest: 60 sec between sets`
    }

    if (msg.includes('cardio') || msg.includes('run')) {
      return `🏃 **Cardio Plan — ${wantsLoseWeight ? 'Fat Burn Focus' : 'Endurance Focus'}**

${isBeginner
  ? `**Beginner Plan (30 min):**
- 5 min warm-up walk
- 1 min jog / 2 min walk × 8 rounds
- 5 min cool-down walk

🎯 Do this 3x per week`
  : `**${isIntermediate ? 'Intermediate' : 'Advanced'} Plan (45 min):**
- 5 min warm-up
- ${isAdvanced ? '30 min steady-state run @ 70% HR' : '20 min moderate run + 10 min HIIT'}
- 10 min cool-down

🎯 Do this 4x per week`}

💡 **Tip:** ${wantsLoseWeight
  ? 'Morning cardio on empty stomach burns 20% more fat!'
  : 'Track your pace each session — aim to improve by 5% each week!'}`
    }

    // Generic workout
    return `💪 **${isBeginner ? 'Beginner' : isIntermediate ? 'Intermediate' : 'Advanced'} Full Body Workout**

${wantsLoseWeight
  ? `🎯 Goal: Fat Loss — High reps, short rest

1. Jump Squats — 3×15
2. Push-ups — 3×12
3. Mountain Climbers — 3×30 sec
4. Burpees — 3×10
5. Plank — 3×30 sec

⏱️ Rest: 45 sec | Duration: 35-40 min`
  : wantsMuscle
  ? `🎯 Goal: Muscle Building — Progressive overload

1. Compound lifts first (Squat/Bench/Deadlift)
2. 4 sets × 8-12 reps
3. Progressive overload each week
4. Rest 60-90 sec between sets

💡 Track your weights every session!`
  : `🎯 Goal: General Fitness

1. Warm-up — 5 min
2. Squats — 3×15
3. Push-ups — 3×12
4. Rows — 3×12
5. Plank — 3×30 sec
6. Cool-down — 5 min`}`
  }

  // Diet / Meal requests
  if (msg.includes('diet') || msg.includes('meal') || msg.includes('eat') || msg.includes('food') || msg.includes('nutrition')) {
    return `🥗 **${wantsLoseWeight ? 'Fat Loss' : wantsMuscle ? 'Muscle Gain' : 'Balanced'} Meal Plan**

${wantsLoseWeight
  ? `🎯 Calorie Target: 300-500 kcal deficit

**Breakfast:**
- 3 egg whites + 1 whole egg scrambled
- 1 cup oats with berries
- Green tea

**Lunch:**
- 150g grilled chicken
- 1 cup brown rice
- Large salad with olive oil

**Snack:**
- Apple + 1 tbsp peanut butter
- Curd (no sugar)

**Dinner:**
- 150g fish/chicken
- 2 cups steamed vegetables
- Dal soup

💡 Drink 3-4L water daily!`
  : wantsMuscle
  ? `🎯 Calorie Target: 300-500 kcal surplus

**Breakfast:**
- 4 whole eggs + toast
- 1 cup oats with banana
- Milk (250ml)

**Pre-workout:**
- Banana + peanut butter sandwich

**Post-workout (within 30 min):**
- Protein rich food — chicken/eggs/paneer
- Rice/roti for carbs

**Dinner:**
- 200g chicken/fish
- Rice or roti (2-3)
- Vegetables + dal

💡 Total protein target: ${Math.round(70 * 1.6)}g/day`
  : `🎯 Balanced Nutrition

- Protein: 30% of calories
- Carbs: 45% of calories
- Fats: 25% of calories

Focus on whole foods, drink plenty of water!`}`
  }

  // Motivation
  if (msg.includes('motivat') || msg.includes('tired') || msg.includes('give up') || msg.includes('cant') || msg.includes("can't")) {
    const quotes = [
      "💪 Every champion was once a beginner who refused to give up. You've got this!",
      "🔥 The pain you feel today is the strength you'll feel tomorrow. Keep going!",
      "⚡ Progress, not perfection. Every workout counts — even bad ones!",
      "🏆 You didn't come this far to only come this far. Push through!",
      "💫 Your future self is counting on the decisions you make today!"
    ]
    return quotes[Math.floor(Math.random() * quotes.length)] +
      `\n\n**Quick tip for ${goal}:**\n${
        wantsLoseWeight
          ? '• Even a 20-min walk counts. Start small, build momentum!'
          : wantsMuscle
          ? '• A light session is better than no session. Try 50% intensity today!'
          : '• Consistency beats perfection. Show up, even if it\'s just for 15 minutes!'
      }`
  }

  // Sleep
  if (msg.includes('sleep') || msg.includes('rest') || msg.includes('recovery')) {
    return `😴 **Sleep & Recovery — The Hidden Gains**

**Why Sleep Matters:**
- 80% of muscle growth happens during sleep
- Growth hormone peaks at night
- Poor sleep = slow progress + more fat storage

**Sleep Tips for Fitness:**
- 7-9 hours every night — non-negotiable
- Sleep by 11pm, wake by 7am ideally
- Avoid screens 30 min before bed
- Cool room = better sleep (18-20°C)
- Consistent sleep schedule, even weekends

**Signs you need more rest:**
- Always sore muscles
- Low motivation
- Plateau in progress

💡 If you're ${isBeginner ? 'a beginner' : 'training hard'}, prioritize sleep over extra workouts!`
  }

  // Default smart response
  return `🤖 **AI Fitness Coach**

I'm here to help you with your ${goal} goal!

**What I can help you with:**
- 💪 Custom workout plans (any muscle group)
- 🥗 Diet and meal planning
- 📊 Progress tips and advice
- 😴 Recovery and sleep optimization
- 🏃 Cardio and fat loss strategies

**Try asking me:**
- "Give me a chest workout"
- "What should I eat for muscle gain?"
- "How do I lose belly fat?"
- "I'm feeling tired, should I workout?"

Your goal: **${userProfile?.goal || 'Get Fit'}** | Level: **${userProfile?.level || 'Beginner'}**
I'll customize every response for YOU! 💪`
}

// ===== MAIN EXPORT =====
export async function getAIResponse(message, userProfile) {
  try {
    // Try real AI first
    const prompt = `You are FitAI, a professional fitness coach. 
User profile: Goal: ${userProfile?.goal || 'Get Fit'}, Level: ${userProfile?.level || 'Beginner'}
Give specific, practical, encouraging advice. Use emojis. Format with markdown bold (**text**).
Keep response under 300 words.

User: ${message}`

    const response = await callGemini(prompt)
    return { text: response, isAI: true }

  } catch (error) {
    // Fallback — always works!
    console.log('Using smart fallback:', error.message)
    return {
      text: smartFallback(message, userProfile),
      isAI: false
    }
  }
}

export async function generateWorkoutPlan(goal, level, time, equipment) {
  try {
    const prompt = `Create a detailed ${time}-minute workout plan for someone who wants to ${goal}, is ${level} level, and has access to: ${equipment}.

Format:
- Warm up
- Main exercises (with sets×reps)
- Cool down
- Tips

Use emojis and be specific. Under 400 words.`

    const response = await callGemini(prompt)
    return { text: response, isAI: true }

  } catch {
    return {
      text: smartFallback(`${time} minute workout with ${equipment}`, { goal, level }),
      isAI: false
    }
  }
}

export async function generateMealPlan(goal, calories, available) {
  try {
    const prompt = `Create a full day meal plan for someone who wants to ${goal} with ${calories} calorie target.
Available foods: ${available}.
Include breakfast, lunch, dinner, snacks with approximate calories. Use emojis. Under 400 words.`

    const response = await callGemini(prompt)
    return { text: response, isAI: true }

  } catch {
    return {
      text: smartFallback('meal plan diet food', { goal }),
      isAI: false
    }
  }
}