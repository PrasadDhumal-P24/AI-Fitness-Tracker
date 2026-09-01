// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// // ===== REAL AI CALL =====
// async function callGemini(prompt) {
//     if (!API_KEY) throw new Error('NO_KEY')

//     const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
//         {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 contents: [{ parts: [{ text: prompt }] }],
//                 generationConfig: {
//                     temperature: 0.8,
//                     maxOutputTokens: 600
//                 }
//             })
//         }
//     )

//     const data = await response.json()

//     if (data.error) throw new Error(data.error.message)
//     if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
//         throw new Error('NO_RESPONSE')
//     }

//     return data.candidates[0].content.parts[0].text
// }

// // ===== SMART FALLBACK =====
// function smartFallback(userMessage, userProfile) {
//     const msg = userMessage.toLowerCase()
//     const goal = userProfile?.goal?.toLowerCase() || 'get fit'
//     const level = userProfile?.level?.toLowerCase() || 'beginner'

//     const isBeginner = level.includes('beginner')
//     const isIntermediate = level.includes('intermediate')
//     const isAdvanced = level.includes('advanced')

//     const wantsLoseWeight = goal.includes('lose') || goal.includes('weight')
//     const wantsMuscle = goal.includes('muscle') || goal.includes('build')
//     const wantsEndurance = goal.includes('endurance') || goal.includes('cardio')

//     // Workout requests
//     if (msg.includes('workout') || msg.includes('exercise') || msg.includes('train')) {
//         if (msg.includes('chest')) {
//             return `💪 **Chest Workout — ${isBeginner ? 'Beginner' : isIntermediate ? 'Intermediate' : 'Advanced'} Level**

// 🔥 **Warm Up (5 min)**
// - Arm circles × 20
// - Push-up hold × 30 sec

// 💪 **Main Exercises:**
// 1. ${isBeginner ? 'Push-ups — 3×10' : isIntermediate ? 'Bench Press — 4×10 @ 60-70% 1RM' : 'Barbell Bench Press — 5×5 @ 80% 1RM'}
// 2. ${isBeginner ? 'Incline Push-ups — 3×12' : isIntermediate ? 'DB Incline Press — 3×12' : 'Weighted Dips — 4×8'}
// 3. ${isBeginner ? 'Wall Push-ups — 2×15' : isIntermediate ? 'Cable Flyes — 3×15' : 'DB Flyes — 4×12'}
// 4. ${isBeginner ? 'Plank — 3×20 sec' : isIntermediate ? 'Push-up Variations — 3×failure' : 'Close Grip Bench — 3×10'}

// 🧘 **Cool Down (5 min)**
// - Chest stretch × 30 sec each side
// - Deep breathing

// ⏱️ Rest: ${isBeginner ? '90 sec' : isIntermediate ? '60 sec' : '45 sec'} between sets`
//         }

//         if (msg.includes('back')) {
//             return `🦾 **Back Workout**

// 💪 **Exercises:**
// 1. ${isBeginner ? 'Lat Pulldown — 3×12' : 'Pull-ups — 4×8'}
// 2. ${isBeginner ? 'Seated Cable Row — 3×12' : 'Barbell Row — 4×10'}
// 3. ${isBeginner ? 'Dumbbell Row — 3×12 each' : 'T-Bar Row — 3×10'}
// 4. Face Pulls — 3×15
// 5. ${isBeginner ? 'Back Extensions — 2×15' : 'Deadlift — 4×5'}

// ⏱️ Rest: ${isBeginner ? '90 sec' : '60 sec'} between sets`
//         }

//         if (msg.includes('leg')) {
//             return `🦵 **Leg Workout**

// 💪 **Exercises:**
// 1. ${isBeginner ? 'Bodyweight Squats — 3×15' : 'Barbell Squats — 4×10'}
// 2. ${isBeginner ? 'Reverse Lunges — 3×12 each' : 'Romanian Deadlift — 4×10'}
// 3. Leg Press — 3×12
// 4. ${isBeginner ? 'Glute Bridge — 3×15' : 'Leg Curl — 3×12'}
// 5. Calf Raises — 4×20

// ⏱️ Rest: 90 sec between sets`
//         }

//         if (msg.includes('arm') || msg.includes('bicep') || msg.includes('tricep')) {
//             return `💪 **Arms Workout**

// **Biceps:**
// 1. ${isBeginner ? 'DB Curl — 3×12' : 'Barbell Curl — 4×10'}
// 2. Hammer Curl — 3×12
// 3. ${isBeginner ? 'Concentration Curl — 2×15' : 'Preacher Curl — 3×10'}

// **Triceps:**
// 1. ${isBeginner ? 'Tricep Dips — 3×10' : 'Close-Grip Bench — 4×8'}
// 2. Overhead Extension — 3×12
// 3. ${isBeginner ? 'Pushdowns — 3×15' : 'Skull Crushers — 3×10'}

// ⏱️ Rest: 60 sec between sets`
//         }

//         if (msg.includes('cardio') || msg.includes('run')) {
//             return `🏃 **Cardio Plan — ${wantsLoseWeight ? 'Fat Burn Focus' : 'Endurance Focus'}**

// ${isBeginner
//                     ? `**Beginner Plan (30 min):**
// - 5 min warm-up walk
// - 1 min jog / 2 min walk × 8 rounds
// - 5 min cool-down walk

// 🎯 Do this 3x per week`
//                     : `**${isIntermediate ? 'Intermediate' : 'Advanced'} Plan (45 min):**
// - 5 min warm-up
// - ${isAdvanced ? '30 min steady-state run @ 70% HR' : '20 min moderate run + 10 min HIIT'}
// - 10 min cool-down

// 🎯 Do this 4x per week`}

// 💡 **Tip:** ${wantsLoseWeight
//                     ? 'Morning cardio on empty stomach burns 20% more fat!'
//                     : 'Track your pace each session — aim to improve by 5% each week!'}`
//         }

//         // Generic workout
//         return `💪 **${isBeginner ? 'Beginner' : isIntermediate ? 'Intermediate' : 'Advanced'} Full Body Workout**

// ${wantsLoseWeight
//                 ? `🎯 Goal: Fat Loss — High reps, short rest

// 1. Jump Squats — 3×15
// 2. Push-ups — 3×12
// 3. Mountain Climbers — 3×30 sec
// 4. Burpees — 3×10
// 5. Plank — 3×30 sec

// ⏱️ Rest: 45 sec | Duration: 35-40 min`
//                 : wantsMuscle
//                     ? `🎯 Goal: Muscle Building — Progressive overload

// 1. Compound lifts first (Squat/Bench/Deadlift)
// 2. 4 sets × 8-12 reps
// 3. Progressive overload each week
// 4. Rest 60-90 sec between sets

// 💡 Track your weights every session!`
//                     : `🎯 Goal: General Fitness

// 1. Warm-up — 5 min
// 2. Squats — 3×15
// 3. Push-ups — 3×12
// 4. Rows — 3×12
// 5. Plank — 3×30 sec
// 6. Cool-down — 5 min`}`
//     }

//     // Diet / Meal requests
//     if (msg.includes('diet') || msg.includes('meal') || msg.includes('eat') || msg.includes('food') || msg.includes('nutrition')) {
//         return `🥗 **${wantsLoseWeight ? 'Fat Loss' : wantsMuscle ? 'Muscle Gain' : 'Balanced'} Meal Plan**

// ${wantsLoseWeight
//                 ? `🎯 Calorie Target: 300-500 kcal deficit

// **Breakfast:**
// - 3 egg whites + 1 whole egg scrambled
// - 1 cup oats with berries
// - Green tea

// **Lunch:**
// - 150g grilled chicken
// - 1 cup brown rice
// - Large salad with olive oil

// **Snack:**
// - Apple + 1 tbsp peanut butter
// - Curd (no sugar)

// **Dinner:**
// - 150g fish/chicken
// - 2 cups steamed vegetables
// - Dal soup

// 💡 Drink 3-4L water daily!`
//                 : wantsMuscle
//                     ? `🎯 Calorie Target: 300-500 kcal surplus

// **Breakfast:**
// - 4 whole eggs + toast
// - 1 cup oats with banana
// - Milk (250ml)

// **Pre-workout:**
// - Banana + peanut butter sandwich

// **Post-workout (within 30 min):**
// - Protein rich food — chicken/eggs/paneer
// - Rice/roti for carbs

// **Dinner:**
// - 200g chicken/fish
// - Rice or roti (2-3)
// - Vegetables + dal

// 💡 Total protein target: ${Math.round(70 * 1.6)}g/day`
//                     : `🎯 Balanced Nutrition

// - Protein: 30% of calories
// - Carbs: 45% of calories
// - Fats: 25% of calories

// Focus on whole foods, drink plenty of water!`}`
//     }

//     // Motivation
//     if (msg.includes('motivat') || msg.includes('tired') || msg.includes('give up') || msg.includes('cant') || msg.includes("can't")) {
//         const quotes = [
//             "💪 Every champion was once a beginner who refused to give up. You've got this!",
//             "🔥 The pain you feel today is the strength you'll feel tomorrow. Keep going!",
//             "⚡ Progress, not perfection. Every workout counts — even bad ones!",
//             "🏆 You didn't come this far to only come this far. Push through!",
//             "💫 Your future self is counting on the decisions you make today!"
//         ]
//         return quotes[Math.floor(Math.random() * quotes.length)] +
//             `\n\n**Quick tip for ${goal}:**\n${wantsLoseWeight
//                 ? '• Even a 20-min walk counts. Start small, build momentum!'
//                 : wantsMuscle
//                     ? '• A light session is better than no session. Try 50% intensity today!'
//                     : '• Consistency beats perfection. Show up, even if it\'s just for 15 minutes!'
//             }`
//     }

//     // Sleep
//     if (msg.includes('sleep') || msg.includes('rest') || msg.includes('recovery')) {
//         return `😴 **Sleep & Recovery — The Hidden Gains**

// **Why Sleep Matters:**
// - 80% of muscle growth happens during sleep
// - Growth hormone peaks at night
// - Poor sleep = slow progress + more fat storage

// **Sleep Tips for Fitness:**
// - 7-9 hours every night — non-negotiable
// - Sleep by 11pm, wake by 7am ideally
// - Avoid screens 30 min before bed
// - Cool room = better sleep (18-20°C)
// - Consistent sleep schedule, even weekends

// **Signs you need more rest:**
// - Always sore muscles
// - Low motivation
// - Plateau in progress

// 💡 If you're ${isBeginner ? 'a beginner' : 'training hard'}, prioritize sleep over extra workouts!`
//     }

//     // Default smart response
//     return `🤖 **AI Fitness Coach**

// I'm here to help you with your ${goal} goal!

// **What I can help you with:**
// - 💪 Custom workout plans (any muscle group)
// - 🥗 Diet and meal planning
// - 📊 Progress tips and advice
// - 😴 Recovery and sleep optimization
// - 🏃 Cardio and fat loss strategies

// **Try asking me:**
// - "Give me a chest workout"
// - "What should I eat for muscle gain?"
// - "How do I lose belly fat?"
// - "I'm feeling tired, should I workout?"

// Your goal: **${userProfile?.goal || 'Get Fit'}** | Level: **${userProfile?.level || 'Beginner'}**
// I'll customize every response for YOU! 💪`
// }

// // ===== MAIN EXPORT =====
// export async function getAIResponse(message, userProfile) {
//     try {
//         // Try real AI first
//         const prompt = `You are FitAI, a professional fitness coach. 
// User profile: Goal: ${userProfile?.goal || 'Get Fit'}, Level: ${userProfile?.level || 'Beginner'}
// Give specific, practical, encouraging advice. Use emojis. Format with markdown bold (**text**).
// Keep response under 300 words.

// User: ${message}`

//         const response = await callGemini(prompt)
//         return { text: response, isAI: true }

//     } catch (error) {
//         // Fallback — always works!
//         console.log('Using smart fallback:', error.message)
//         return {
//             text: smartFallback(message, userProfile),
//             isAI: false
//         }
//     }
// }

// export async function generateWorkoutPlan(goal, level, time, equipment) {
//     try {
//         const prompt = `Create a detailed ${time}-minute workout plan for someone who wants to ${goal}, is ${level} level, and has access to: ${equipment}.

// Format:
// - Warm up
// - Main exercises (with sets×reps)
// - Cool down
// - Tips

// Use emojis and be specific. Under 400 words.`

//         const response = await callGemini(prompt)
//         return { text: response, isAI: true }

//     } catch {
//         return {
//             text: smartFallback(`${time} minute workout with ${equipment}`, { goal, level }),
//             isAI: false
//         }
//     }
// }

// export async function generateMealPlan(goal, calories, available) {
//     try {
//         const prompt = `Create a full day meal plan for someone who wants to ${goal} with ${calories} calorie target.
// Available foods: ${available}.
// Include breakfast, lunch, dinner, snacks with approximate calories. Use emojis. Under 400 words.`

//         const response = await callGemini(prompt)
//         return { text: response, isAI: true }

//     } catch {
//         return {
//             text: smartFallback('meal plan diet food', { goal }),
//             isAI: false
//         }
//     }
// }



const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// ===== REAL GEMINI CALL =====
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
                    maxOutputTokens: 800
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

// ===== COMPREHENSIVE SMART FALLBACK =====
function smartFallback(userMessage, userProfile) {
    const msg = userMessage.toLowerCase()
    const goal = userProfile?.goal?.toLowerCase() || 'get fit'
    const level = userProfile?.level?.toLowerCase() || 'beginner'

    const isBeginner = level.includes('beginner')
    const isIntermediate = level.includes('intermediate')
    const isAdvanced = level.includes('advanced')

    // ===== BODY RECOMPOSITION =====
    if (msg.includes('recomp') || msg.includes('recomposition') ||
        msg.includes('lose fat gain muscle') || msg.includes('body recomp')) {
        return `🔄 **Body Recomposition — Lose Fat & Build Muscle Simultaneously**

**What is Recomp?**
Recomposition means losing fat AND building muscle at the same time — it works best for beginners and people returning after a break.

**The 3 Key Rules:**
1. 🥩 **High Protein** — 1.6-2.2g per kg of bodyweight daily
2. 🏋️ **Strength Training** — 3-5x per week, progressive overload
3. ⚖️ **Slight Calorie Deficit** — Only 100-200 kcal below maintenance

**Your Recomp Plan:**

📅 **Training Split (4 days/week):**
- Monday: Upper Body Push (Chest, Shoulders, Triceps)
- Tuesday: Lower Body (Quads, Hamstrings, Glutes)
- Thursday: Upper Body Pull (Back, Biceps)
- Friday: Lower Body + Core

🥗 **Nutrition:**
- Calories: Maintenance or slight deficit (-200 kcal)
- Protein: ${Math.round(75 * 2)}g+ per day
- Carbs: Around workouts for energy
- Fats: 0.8-1g per kg bodyweight

⏱️ **Timeline:**
- First changes visible: 8-12 weeks
- Significant changes: 6 months

💡 **Pro Tips:**
- Track your lifts — increasing strength = building muscle
- Take progress photos every 2 weeks
- Sleep 7-9 hours — crucial for recomp
- Be patient — recomp is slower than bulk/cut but sustainable!`
    }

    // ===== ATHLETIC BODY =====
    if (msg.includes('athletic') || msg.includes('athlete') ||
        msg.includes('sports body') || msg.includes('sporty')) {
        return `⚡ **How to Build an Athletic Body**

**What Makes an Athletic Physique?**
Low body fat (10-15%) + functional muscle + power + agility

**Athletic Training Principles:**
1. Compound movements first
2. Explosive training (power)
3. Conditioning (cardio + endurance)
4. Mobility and flexibility

📅 **Athletic 5-Day Program:**

**Day 1 — Power Lower:**
- Box Jumps — 4×5
- Barbell Squats — 4×5 (heavy)
- Romanian Deadlift — 3×8
- Bulgarian Split Squat — 3×10 each
- Calf Raises — 4×15

**Day 2 — Power Upper:**
- Medicine Ball Throws — 4×6
- Bench Press — 4×5 (heavy)
- Pull-ups — 4×max
- Push Press — 3×8
- Plank — 3×45 sec

**Day 3 — Conditioning:**
- 400m Run × 6 (90 sec rest between)
- OR 20 min HIIT cycling
- Jump Rope — 5 min

**Day 4 — Strength Lower:**
- Deadlift — 4×5
- Leg Press — 3×12
- Leg Curl — 3×12
- Single Leg Squats — 3×8 each

**Day 5 — Strength Upper + Core:**
- Barbell Row — 4×8
- DB Shoulder Press — 3×10
- Lat Pulldown — 3×12
- Ab Circuit: 3 rounds of (Plank 45s + Russian Twist 20 + Leg Raises 15)

🥗 **Athletic Nutrition:**
- High protein: ${Math.round(75 * 2)}g/day
- Carbs around training for performance
- Don't go too low calorie — you need energy!
- Hydration: 3-4L water daily

💡 **Key to Athletic Look:**
- Sprinting > Long cardio
- Heavy compound lifts
- Low body fat (12-15% for males, 18-22% for females)`
    }

    // ===== HIGH INTENSITY LEG =====
    if ((msg.includes('high intensity') || msg.includes('intense') ||
        msg.includes('hiit') || msg.includes('killer')) &&
        (msg.includes('leg') || msg.includes('lower'))) {
        return `🔥 **High Intensity Leg Workout — BRUTAL Edition**

⚠️ Warning: This is tough. Warm up properly!

**Warm Up (5 min):**
- Leg swings × 20 each direction
- Hip circles × 10 each
- Bodyweight squats × 15
- Walking lunges × 10 each

**THE CIRCUIT (3 rounds, 30 sec rest between exercises):**

🏋️ Round 1 — Strength:
- Barbell Squats — 5×5 (85% max)
- Romanian Deadlift — 4×8
- Leg Press — 4×12

💥 Round 2 — Power:
- Jump Squats — 4×10
- Box Jumps — 4×8
- Explosive Lunges — 3×12 each

🔥 Round 3 — Burnout:
- Wall Sit — 3×60 sec
- Leg Extension — 3×20 (light weight)
- Leg Curl — 3×20 (light weight)
- Calf Raises — 5×25

⚡ **Finisher (if you can walk):**
- 5 min: 20 sec sprint / 10 sec rest

⏱️ Total: 55-65 minutes
🔥 Calories burned: ~400-500 kcal

💡 **Tips:**
- Eat carbs 1-2 hrs before
- Take creatine if you use it
- Ice bath or cold shower after
- Next 2 days = DOMS (delayed soreness) — NORMAL!`
    }

    // ===== SIMPLE LEG WORKOUT =====
    if ((msg.includes('simple') || msg.includes('easy') ||
        msg.includes('basic') || msg.includes('beginner')) &&
        (msg.includes('leg') || msg.includes('lower'))) {
        return `🦵 **Simple Leg Workout — ${isBeginner ? 'Beginner' : 'Easy Day'} Edition**

Perfect for starting out or a light training day!

**Warm Up (5 min):**
- Walking in place × 2 min
- Leg swings × 10 each
- Bodyweight squats × 10 (slow)

**Main Workout:**
1. **Bodyweight Squats** — 3×15
   → Stand feet shoulder-width, squat until thighs parallel

2. **Reverse Lunges** — 3×12 each leg
   → Step backward, lower knee to floor gently

3. **Glute Bridge** — 3×20
   → Lie on back, push hips up, squeeze at top

4. **Step-ups** (use stair/chair) — 3×12 each
   → Slow and controlled

5. **Calf Raises** — 3×25
   → Can hold wall for balance

6. **Wall Sit** — 3×30 sec
   → Back against wall, 90 degree angle

**Cool Down (5 min):**
- Quad stretch × 30 sec each
- Hamstring stretch × 30 sec each
- Hip flexor stretch × 30 sec each

⏱️ Total time: 30-35 minutes
💡 Do this 2x per week for best results!`
    }

    // ===== ANY LEG WORKOUT =====
    if (msg.includes('leg') || msg.includes('lower body') ||
        msg.includes('quad') || msg.includes('hamstring') ||
        msg.includes('glute') || msg.includes('squat')) {
        return `🦵 **${isAdvanced ? 'Advanced' : isIntermediate ? 'Intermediate' : 'Beginner'} Leg Workout**

**Warm Up (5 min):**
- Leg swings, hip circles, bodyweight squats × 15

**Main Exercises:**

1. **Squats** — ${isBeginner ? '3×15 bodyweight' : isIntermediate ? '4×10 @ 60-70% 1RM' : '5×5 @ 80% 1RM'}
2. **Romanian Deadlift** — ${isBeginner ? '3×12 (light)' : '4×10'}
3. **Leg Press** — 3×${isBeginner ? '15' : '12'}
4. **Lunges** — 3×12 each leg
5. **Leg Curl** — 3×${isBeginner ? '15' : '12'}
6. **Calf Raises** — 4×20
7. **Leg Extension** — 3×15
${isAdvanced ? '8. **Bulgarian Split Squat** — 3×10 each\n9. **Box Jumps** — 4×6' : ''}

**Cool Down:** Stretch all leg muscles × 30 sec each

⏱️ Rest: ${isBeginner ? '90 sec' : isIntermediate ? '60 sec' : '45-60 sec'} between sets
🔥 Estimated calories: ${isBeginner ? '250-300' : '350-450'} kcal`
    }

    // ===== CHEST WORKOUT =====
    if (msg.includes('chest') || msg.includes('pec') || msg.includes('bench')) {
        return `💪 **${isAdvanced ? 'Advanced' : isIntermediate ? 'Intermediate' : 'Beginner'} Chest Workout**

**Warm Up:** Arm circles × 20, push-up holds × 3

**Main Exercises:**
1. **${isBeginner ? 'Push-ups' : isIntermediate ? 'Bench Press' : 'Barbell Bench Press'}** — ${isBeginner ? '3×10-15' : isIntermediate ? '4×10 @ 70%' : '5×5 @ 80% 1RM'}
2. **Incline ${isBeginner ? 'Push-ups' : 'DB Press'}** — 3×${isBeginner ? '12' : '12'}
3. **${isBeginner ? 'Wide Push-ups' : 'Cable Flyes'}** — 3×15
4. **${isBeginner ? 'Chest Dips (assisted)' : 'Weighted Dips'}** — 3×${isBeginner ? '8' : '10'}
${isAdvanced ? '5. **Cable Crossover** — 4×15\n6. **Close Grip Bench** — 3×10' : ''}

⏱️ Rest: ${isBeginner ? '90' : '60'} sec | Total: 40-50 min

💡 **Mind-muscle connection** — squeeze chest at the top of every rep!`
    }

    // ===== BACK WORKOUT =====
    if (msg.includes('back') || msg.includes('lat') || msg.includes('pull') ||
        msg.includes('deadlift') || msg.includes('row')) {
        return `🦾 **${isAdvanced ? 'Advanced' : isIntermediate ? 'Intermediate' : 'Beginner'} Back Workout**

**Main Exercises:**
1. **${isBeginner ? 'Lat Pulldown' : 'Pull-ups'}** — ${isBeginner ? '3×12' : isIntermediate ? '4×8' : '5×max + weighted'}
2. **${isBeginner ? 'Seated Cable Row' : 'Barbell Row'}** — 4×${isBeginner ? '12' : '10'}
3. **${isBeginner ? 'DB Single Arm Row' : 'T-Bar Row'}** — 3×12 each
4. **Face Pulls** — 3×15 (great for posture!)
5. **${isBeginner ? 'Back Extensions' : 'Deadlift'}** — ${isBeginner ? '3×15' : '4×5 (heavy)'}
${isAdvanced ? '6. **Meadows Row** — 3×10 each\n7. **Rack Pulls** — 3×5' : ''}

💡 **Pull with your elbows, not your hands!** This activates lats more.`
    }

    // ===== SHOULDER WORKOUT =====
    if (msg.includes('shoulder') || msg.includes('delt') || msg.includes('ohp') ||
        msg.includes('overhead')) {
        return `🏋️ **Shoulder Workout**

**Main Exercises:**
1. **${isBeginner ? 'DB Shoulder Press' : 'Barbell OHP'}** — 4×${isBeginner ? '12' : '8'}
2. **Lateral Raises** — 4×15 (SLOW! 3 sec down)
3. **Front Raises** — 3×12
4. **Face Pulls** — 3×20
5. **Rear Delt Flyes** — 3×15
${isAdvanced ? '6. **Arnold Press** — 3×12\n7. **Cable Lateral Raises** — 3×20' : ''}

💡 **Key tip:** Lateral raises — use LIGHTER weight, focus on form. This builds the wide shoulder look!`
    }

    // ===== ARM / BICEP / TRICEP =====
    if (msg.includes('arm') || msg.includes('bicep') || msg.includes('tricep') ||
        msg.includes('curl')) {
        return `💪 **Arm Day Workout**

**BICEPS:**
1. **${isBeginner ? 'DB Curl' : 'Barbell Curl'}** — 4×${isBeginner ? '12' : '10'}
2. **Hammer Curl** — 3×12
3. **Concentration Curl** — 3×12 each
${isAdvanced ? '4. **Preacher Curl** — 3×10\n5. **Cable Curl** — 3×15' : ''}

**TRICEPS:**
1. **${isBeginner ? 'Tricep Dips (assisted)' : 'Close Grip Bench Press'}** — 4×${isBeginner ? '10' : '8'}
2. **Overhead Tricep Extension** — 3×12
3. **Rope Pushdown** — 3×15
${isAdvanced ? '4. **Skull Crushers** — 3×10\n5. **Diamond Push-ups** — 3×failure' : ''}

⏱️ Rest: 60 sec | Total: 45 min`
    }

    // ===== ABS / CORE =====
    if (msg.includes('abs') || msg.includes('core') || msg.includes('six pack') ||
        msg.includes('belly') || msg.includes('stomach')) {
        return `🔥 **Core & Abs Workout**

**Truth about Six Pack:**
Six pack = Low body fat (men <12%, women <18%) + Core muscle development

**The Workout (3 rounds):**
1. **Plank** — 45-60 sec
2. **Crunches** — 20 reps
3. **Russian Twists** — 20 reps (with weight if possible)
4. **Leg Raises** — 15 reps
5. **Mountain Climbers** — 30 sec
6. **Dead Bug** — 10 each side

Rest 30 sec between exercises, 90 sec between rounds.

🥗 **Diet for Six Pack:**
- Most important factor — you CANNOT out-train a bad diet
- Calorie deficit of 300-400 kcal
- High protein to preserve muscle
- Reduce sugar and processed foods

💡 **Timeline:**
- Visible abs: Depends on starting body fat
- Focus on diet first, then train core 3x/week`
    }

    // ===== FULL BODY =====
    if (msg.includes('full body') || msg.includes('total body') ||
        msg.includes('whole body')) {
        return `⚡ **Full Body Workout**

Perfect for 3x/week training!

**The Big 5 Compound Movements:**
1. **Squat** — ${isBeginner ? '3×15 bodyweight' : '4×8 with weight'}
2. **Hinge (Deadlift/RDL)** — ${isBeginner ? '3×12 light' : '4×8'}
3. **Push (Push-ups/Bench)** — ${isBeginner ? '3×10' : '4×10'}
4. **Pull (Row/Pull-up)** — ${isBeginner ? '3×12' : '4×8'}
5. **Core (Plank)** — 3×45 sec

**Additional:**
6. Lunges — 3×12 each
7. Shoulder Press — 3×12
8. Bicep Curl — 2×15

⏱️ Total: 50-60 min
🔄 Rest 48 hours between sessions`
    }

    // ===== HIIT =====
    if (msg.includes('hiit') || msg.includes('high intensity interval') ||
        msg.includes('interval training')) {
        return `🔥 **HIIT Workout — Fat Burning Mode**

**Why HIIT?**
Burns 25-30% more calories than steady cardio + afterburn effect for 24 hours!

**20-Minute HIIT Circuit:**

🔥 **Round 1-4 (20 sec ON / 10 sec rest):**
1. Burpees
2. Jump Squats
3. Mountain Climbers
4. High Knees

Rest 1 min between rounds.

**OR Treadmill HIIT:**
- 5 min warm-up walk (5 km/h)
- 30 sec sprint (12-14 km/h) / 90 sec walk (6 km/h) × 8
- 5 min cool-down walk

🔥 **Calories burned:** 300-400 kcal in 25 min

💡 Do HIIT max 3x/week — needs recovery time!`
    }

    // ===== CARDIO =====
    if (msg.includes('cardio') || msg.includes('run') || msg.includes('running') ||
        msg.includes('treadmill') || msg.includes('cycling')) {
        return `🏃 **Cardio Guide**

**Types of Cardio:**

**1. LISS (Low Intensity Steady State):**
- 40-60 min walk/jog at 60-65% max heart rate
- Best for: Fat loss, recovery days
- Frequency: 4-5x/week

**2. HIIT (High Intensity Interval):**
- 20-25 min sprint intervals
- Best for: Maximum calorie burn, time-efficient
- Frequency: 2-3x/week MAX

**3. MISS (Moderate Intensity):**
- 30 min moderate pace
- Best for: General fitness
- Frequency: 3-4x/week

**For your goal (${goal}):**
${goal.includes('lose') || goal.includes('weight')
                ? '🎯 Best: LISS in morning (fasted) + 2x HIIT/week'
                : goal.includes('muscle')
                    ? '🎯 Best: Minimal cardio (2x LISS/week) to preserve muscle'
                    : '🎯 Best: 3x MISS per week for overall fitness'}

**Heart Rate Zones:**
- Fat burn: 60-70% max HR (220 - your age)
- Cardio: 70-80% max HR
- HIIT: 80-90% max HR`
    }

    // ===== FAT LOSS =====
    if (msg.includes('fat loss') || msg.includes('lose fat') ||
        msg.includes('lose weight') || msg.includes('weight loss') ||
        msg.includes('slim') || msg.includes('cut')) {
        return `🔥 **Complete Fat Loss Guide**

**The 4 Keys to Fat Loss:**

**1. Calorie Deficit (Most Important!):**
- Calculate TDEE (Total Daily Energy Expenditure)
- Eat 300-500 kcal BELOW TDEE
- Never go below 1200 (women) / 1500 (men) kcal

**2. High Protein:**
- Preserves muscle while losing fat
- Keeps you full longer
- Target: ${Math.round(75 * 2)}g+ per day
- Sources: Chicken, fish, eggs, dal, paneer, curd

**3. Strength Training:**
- Builds muscle = higher metabolism
- 3-4x/week compound lifts
- Don't just do cardio!

**4. Cardio:**
- 2-3x HIIT per week
- Daily 8,000-10,000 steps
- Morning walks on empty stomach

**Sample Day:**
- Wake up → 30 min walk (fasted)
- Breakfast: High protein (eggs, oats)
- Lunch: Protein + veggies + small amount carbs
- Pre-workout: Banana
- Post-workout: Protein meal
- Dinner: Protein + veggies

💡 **Rate of Loss:**
- Safe: 0.5-1 kg per week
- Faster = muscle loss risk
- Take weekly average weight (not daily)`
    }

    // ===== MUSCLE GAIN / BULK =====
    if (msg.includes('muscle') || msg.includes('bulk') || msg.includes('gain') ||
        msg.includes('mass') || msg.includes('size') || msg.includes('big')) {
        return `💪 **Muscle Building Guide**

**The Science of Muscle Growth:**
Muscle grows when you: Lift heavy → Eat enough → Sleep well → Repeat

**3 Requirements:**
1. **Progressive Overload** — lift more each week
2. **Calorie Surplus** — 200-400 kcal above maintenance
3. **Protein** — ${Math.round(75 * 2)}g+ per day

**Best Training Split for Muscle:**

**PPL (Push Pull Legs) — 6 days:**
- Mon/Thu: Push (Chest, Shoulders, Triceps)
- Tue/Fri: Pull (Back, Biceps)
- Wed/Sat: Legs
- Sun: Rest

**OR Upper/Lower — 4 days:**
- Mon/Thu: Upper Body
- Tue/Fri: Lower Body

**Key Exercises for Maximum Muscle:**
🏋️ Squat, Deadlift, Bench Press, OHP, Pull-ups, Barbell Row

**Nutrition for Muscle:**
- Calories: Maintenance + 300-400 kcal
- Protein: ${Math.round(75 * 2)}g (2g per kg bodyweight)
- Carbs: 4-6g per kg (energy for training)
- Fats: 1g per kg minimum

💤 Sleep 8 hours — Growth hormone peaks during sleep!`
    }

    // ===== PROTEIN / SUPPLEMENTS =====
    if (msg.includes('protein') || msg.includes('supplement') ||
        msg.includes('creatine') || msg.includes('whey') || msg.includes('bcaa')) {
        return `💊 **Supplements Guide — What Actually Works**

**Tier 1 — Science Backed (WORTH IT):**

**1. Creatine Monohydrate** ⭐⭐⭐⭐⭐
- 3-5g per day, any time
- Increases strength by 5-10%
- Cheapest, most effective supplement
- No loading phase needed

**2. Protein Powder (Whey)** ⭐⭐⭐⭐
- Only if you can't get enough protein from food
- 25-30g per serving
- Post-workout or anytime

**3. Caffeine** ⭐⭐⭐⭐
- 150-200mg, 30 min pre-workout
- Increases performance 10-15%
- Black coffee works fine!

**Tier 2 — Some Evidence:**
- Vitamin D + K2 (if deficient)
- Omega-3 Fish Oil (anti-inflammatory)
- Magnesium (sleep quality)

**NOT Worth It:**
- BCAAs (if you eat enough protein)
- Most "fat burners"
- Testosterone boosters
- Most pre-workouts (just caffeine + fillers)

**Food First Always:**
Chicken, eggs, dal, paneer, curd, milk → All excellent protein sources without the cost!`
    }

    // ===== SLEEP / RECOVERY =====
    if (msg.includes('sleep') || msg.includes('recovery') || msg.includes('rest') ||
        msg.includes('overtraining') || msg.includes('sore')) {
        return `😴 **Sleep & Recovery — The Secret Weapon**

**Why Recovery = Gains:**
- Muscle repair happens DURING sleep, not during workout
- Growth hormone peaks 1-2 hours after sleep
- Poor sleep = slower progress + more fat storage + lower testosterone

**Sleep Tips for Athletes:**
- 7-9 hours MINIMUM (8 is optimal)
- Consistent sleep/wake time (even weekends)
- Dark, cool room (18-20°C)
- No screens 30 min before bed
- No caffeine after 2pm

**Active Recovery (Rest Days):**
- 30 min walk
- Light yoga or stretching
- Swimming (low impact)
- Foam rolling (10-15 min)

**Signs of Overtraining:**
- Always tired, even after sleep
- Strength going DOWN
- Always sick
- No motivation to train
- Persistent soreness

**If Overtrained:**
- Take 1 full week off
- Increase sleep to 9 hours
- Eat at maintenance calories
- Light walking only

**Muscle Soreness (DOMS):**
- Normal 24-72 hours after new exercise
- Move the muscle gently (light exercise helps)
- Not dangerous — keep training!`
    }

    // ===== BEGINNER - HOW TO START =====
    if (msg.includes('how to start') || msg.includes('beginner') ||
        msg.includes('new to gym') || msg.includes('first time') ||
        msg.includes('getting started') || msg.includes('newbie')) {
        return `🌱 **Complete Beginner's Guide to Fitness**

**Step 1: Set Your Goal**
Be specific: "Lose 10kg in 4 months" or "Build visible muscle in 6 months"

**Step 2: Start Simple (Week 1-4)**

**3-Day Full Body Routine:**
- Squats — 3×15
- Push-ups — 3×10
- DB Row — 3×12 each
- Plank — 3×30 sec

Tuesday, Thursday, Saturday → REST or 30 min walk

**Step 3: Nutrition Basics**
- Eat enough protein (eggs, chicken, dal, paneer)
- Don't cut calories too much in first month
- Focus on quality food first

**Step 4: Track Progress**
- Take photos Week 1, 4, 8, 12
- Track your lifts (note weight/reps)
- Weigh yourself weekly (morning, same time)

**Common Beginner Mistakes:**
❌ Doing too much too soon (leads to injury)
❌ Skipping warm-up
❌ Only doing cardio (no strength training)
❌ Changing program every week
❌ Expecting results in 2 weeks

**Timeline:**
- Week 1-4: Learning movements, some strength gain
- Month 2-3: Visible strength improvements
- Month 3-6: Visible body changes
- Year 1: Significant transformation possible

💡 **Most important:** CONSISTENCY over intensity. Show up 3x/week, every week!`
    }

    // ===== MOTIVATION =====
    if (msg.includes('motivat') || msg.includes('lazy') || msg.includes('tired') ||
        msg.includes('give up') || msg.includes("can't") || msg.includes('cant') ||
        msg.includes('no energy') || msg.includes('demotivat')) {
        const quotes = [
            `💪 **You don't have to be great to start, but you have to start to be great.**\n\nEvery champion was once a beginner who refused to give up. Your goal (${goal}) is absolutely achievable — the only thing standing between you and results is consistency.\n\n**Do this right now:**\n• Put on your workout clothes\n• Do just 10 minutes\n• 10 minutes usually turns into a full session\n\nThe hardest part is starting. You've got this! 🔥`,
            `⚡ **Feeling tired? That's your weakness leaving your body.**\n\nRemember why you started. That reason is stronger than any excuse. Results come to those who show up when they don't want to.\n\n**Quick motivation boost:**\n• Look at your Day 1 photo\n• Imagine yourself 6 months from now\n• Do ONE set of anything\n\nProgress > Perfection. Even 20 minutes counts! 💪`,
            `🏆 **Your future self is watching your decisions today.**\n\nOn days you feel like quitting, that's exactly when champions are made. The distance between who you are and who you want to be is closed one workout at a time.\n\n**Low energy workout option:**\n• 50% intensity today is better than 0%\n• Go for a walk instead\n• Do mobility/stretching\n• Come back stronger tomorrow!`
        ]
        return quotes[Math.floor(Math.random() * quotes.length)]
    }

    // ===== DIET PLAN =====
    if (msg.includes('diet') || msg.includes('meal plan') || msg.includes('what to eat') ||
        msg.includes('nutrition plan') || msg.includes('food')) {
        const isLosing = goal.includes('lose') || goal.includes('weight')
        const isGaining = goal.includes('muscle') || goal.includes('bulk') || goal.includes('gain')

        return `🥗 **${isLosing ? 'Fat Loss' : isGaining ? 'Muscle Gain' : 'Balanced'} Meal Plan**

**Daily Calorie Target:** ${isLosing ? '1600-1800' : isGaining ? '2500-2800' : '2000-2200'} kcal

**🌅 Breakfast (7-8 AM):**
${isLosing
                ? '• 3 egg whites + 1 whole egg scrambled\n• 1 cup oats (no sugar)\n• Green tea\n• Total: ~350 kcal'
                : '• 4 whole eggs any style\n• 2 slices whole grain toast\n• 1 cup oats with banana and milk\n• Total: ~600 kcal'}

**☀️ Lunch (12-1 PM):**
${isLosing
                ? '• 150g grilled chicken/fish\n• 1 small cup rice or 1 roti\n• Large salad + curd\n• Total: ~500 kcal'
                : '• 200g chicken or 150g paneer\n• 2 cups rice or 4 rotis\n• Dal + vegetables\n• Total: ~800 kcal'}

**🍎 Snack (4 PM):**
${isLosing
                ? '• Apple + 10 almonds\n• OR curd (no sugar)\n• Total: ~150 kcal'
                : '• Banana + 2 tbsp peanut butter\n• OR protein shake\n• Total: ~300 kcal'}

**🌙 Dinner (7-8 PM):**
${isLosing
                ? '• 150g fish/chicken\n• 2 cups vegetables (roasted/stir fried)\n• Dal soup\n• Total: ~400 kcal'
                : '• 200g chicken or dal + paneer\n• 2 rotis or 1 cup rice\n• Vegetables\n• Total: ~650 kcal'}

**💡 Key Rules:**
- Protein with EVERY meal
- Drink 3-4L water daily
- No sugary drinks
- Last meal 2-3 hrs before bed`
    }

    // ===== SPECIFIC EXERCISES =====
    if (msg.includes('squat') || msg.includes('deadlift') || msg.includes('bench press') ||
        msg.includes('pull up') || msg.includes('push up')) {
        const exercise = msg.includes('squat') ? 'Squat'
            : msg.includes('deadlift') ? 'Deadlift'
                : msg.includes('bench') ? 'Bench Press'
                    : msg.includes('pull up') ? 'Pull-up'
                        : 'Push-up'

        const guides = {
            'Squat': `🏋️ **How to Squat Correctly**\n\n**Setup:**\n• Feet shoulder-width apart, toes slightly out (30°)\n• Bar on upper traps (low bar) or upper back\n\n**The Movement:**\n1. Take breath, brace core hard\n2. Push knees out (don't let them cave in)\n3. Sit BACK and DOWN (hip crease below parallel)\n4. Drive through heels to stand up\n5. Lock hips and glutes at top\n\n**Common Mistakes:**\n❌ Knees caving in\n❌ Heels rising off floor\n❌ Back rounding\n❌ Not going deep enough\n\n**Programming:** ${isBeginner ? '3×15 bodyweight first, then add weight' : '4×8 @ 70%, 1 heavy set 5RM'}`,

            'Deadlift': `🏋️ **How to Deadlift Correctly**\n\n**Setup:**\n• Bar over mid-foot (1 inch from shins)\n• Feet hip-width, grip just outside legs\n• Hips down, chest up, back flat\n\n**The Pull:**\n1. Big breath, brace core\n2. Push floor away (don't think "pull")\n3. Bar stays close to body (drag up shins)\n4. Hips and shoulders rise at same rate\n5. Lock out — push hips forward at top\n\n**Common Mistakes:**\n❌ Rounding lower back (DANGEROUS)\n❌ Bar drifting away from body\n❌ Jerking the weight\n❌ Looking up too much\n\n**Programming:** ${isBeginner ? '3×5 light weight, focus on form' : '5×5 heavy OR 4×8 moderate'}`,

            'Bench Press': `💪 **How to Bench Press Correctly**\n\n**Setup:**\n• Eyes under bar\n• 5 points of contact: head, upper back, butt, both feet\n• Grip width: slightly wider than shoulder\n\n**The Movement:**\n1. Retract scapula (pull shoulder blades back)\n2. Arch lower back slightly\n3. Lower bar to lower chest/nipple line\n4. Flare elbows 45° (not 90°)\n5. Press up and slightly back\n\n**Common Mistakes:**\n❌ Bouncing bar off chest\n❌ Lifting butt off bench\n❌ Elbows flaring too wide\n\n**Programming:** ${isBeginner ? '3×10 (start light, learn form)' : '4×6-8 @ 75% 1RM'}`,

            'Pull-up': `🦾 **Pull-up Guide — From Zero to Hero**\n\n**Can't do one yet?**\n1. Dead hangs — 3×30 sec (build grip)\n2. Negative pull-ups — 3×5 (jump up, lower slowly 5 sec)\n3. Assisted pull-ups (band or machine)\n4. Build to 1 rep, then 3, then 5, then 10!\n\n**Form:**\n• Full hang start\n• Depress shoulders first\n• Drive elbows to hips\n• Chin over bar\n• Full extension at bottom\n\n**Programming:** ${isBeginner ? '5 sets of negatives daily' : '4×max reps, add weight when >12 reps'}`,

            'Push-up': `💪 **Push-up Mastery Guide**\n\n**Progression (Easiest to Hardest):**\n1. Wall push-ups\n2. Incline push-ups (hands on bench)\n3. Standard push-ups\n4. Diamond push-ups\n5. Decline push-ups\n6. Archer push-ups\n7. One-arm push-ups\n\n**Form:**\n• Body straight head to toe (plank position)\n• Hands shoulder-width\n• Elbows 45° angle\n• Chest touches floor\n• Full lockout at top\n\n**Goal:** ${isBeginner ? 'Work up to 3×10 standard push-ups' : '3×20 standard or advance to harder variations'}`
        }

        return guides[exercise] || guides['Squat']
    }

    // ===== WATER / HYDRATION =====
    if (msg.includes('water') || msg.includes('hydrat')) {
        return `💧 **Hydration Guide for Fitness**

**How Much Water:**
- Minimum: 2-3L per day
- Active person: 3-4L per day
- Hot weather/heavy training: 4-5L

**When to Drink:**
- 500ml when you wake up (rehydrate from sleep)
- 500ml before workout
- Sip during workout (150-250ml every 15-20 min)
- 500ml post workout
- Rest throughout day

**Signs of Dehydration:**
- Dark yellow urine (should be pale yellow)
- Decreased performance
- Headache during workout
- Dizziness
- Muscle cramps

**Tips:**
- Carry water bottle everywhere
- Add lemon/cucumber if plain water boring
- Eat water-rich foods (cucumber, watermelon)
- Avoid alcohol and excessive caffeine

💡 **Performance fact:** Even 2% dehydration reduces strength by 10-15%!`
    }

    // ===== DEFAULT - ALWAYS HELPFUL =====
    return `🤖 **FitAI Coach — Personalized for You**

**Your Profile:**
- 🎯 Goal: ${userProfile?.goal || 'Get Fit'}
- ⚡ Level: ${userProfile?.level || 'Beginner'}

**I can help you with:**

💪 **Workouts:**
- Specific muscle groups (chest, back, legs, arms, shoulders, abs)
- Training styles (HIIT, strength, cardio, athletic, full body)
- Specialized goals (recomposition, bulk, cut, athletic)

🥗 **Nutrition:**
- Meal plans for your goal
- What to eat pre/post workout
- Protein, supplements, hydration guide

📊 **Progress & Strategy:**
- How to lose fat effectively
- How to build muscle fast
- Body recomposition guide
- How to start as a beginner

😴 **Recovery:**
- Sleep optimization
- Dealing with soreness
- Overtraining signs

**Try asking:**
- "Give me a high intensity leg workout"
- "How to get an athletic body"
- "How to start recomposition"
- "What should I eat to build muscle"
- "Full body HIIT workout"
- "How to do a proper squat"

Ask anything — I'm here 24/7! 💪`
}

// ===== MAIN EXPORT =====
export async function getAIResponse(message, userProfile) {
    try {
        const prompt = `You are FitAI, an expert personal fitness coach. Be specific, practical and encouraging.
User: Goal: ${userProfile?.goal || 'Get Fit'}, Level: ${userProfile?.level || 'Beginner'}
Use emojis, bold text (**text**), numbered lists. Max 400 words. Be very specific with sets/reps/weights.
Question: ${message}`

        const response = await callGemini(prompt)
        return { text: response, isAI: true }

    } catch (error) {
        console.log('Using smart fallback:', error.message)
        return {
            text: smartFallback(message, userProfile),
            isAI: false
        }
    }
}

export async function generateWorkoutPlan(goal, level, time, equipment) {
    try {
        const prompt = `Create a detailed ${time}-minute workout plan. Goal: ${goal}, Level: ${level}, Equipment: ${equipment}.
Include: warm-up, main exercises with sets×reps, cool-down, tips. Use emojis and bold. Max 400 words.`

        const response = await callGemini(prompt)
        return { text: response, isAI: true }

    } catch {
        return {
            text: smartFallback(
                `${time} minute workout ${equipment}`,
                { goal, level }
            ),
            isAI: false
        }
    }
}

export async function generateMealPlan(goal, calories, available) {
    try {
        const prompt = `Create a full day meal plan. Goal: ${goal}, Calories: ${calories}, Available foods: ${available}.
Include breakfast, lunch, dinner, snacks with calories. Use emojis. Max 400 words.`

        const response = await callGemini(prompt)
        return { text: response, isAI: true }

    } catch {
        return {
            text: smartFallback('meal plan diet food nutrition', { goal }),
            isAI: false
        }
    }
}