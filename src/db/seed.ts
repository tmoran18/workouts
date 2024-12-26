import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import {
  exercises,
  workoutTemplates,
  templateExercises,
  workouts,
  exerciseLogs,
} from './schema'
import { config } from 'dotenv'

import exerciseData from './seed-data/exercises.json'

config({ path: '.env.local' })

const seedClient = postgres(process.env.DATABASE_URL!, { max: 1 })
const db = drizzle(seedClient, { schema })

const SYSTEM_ID = process.env.SYSTEM_USER_ID!
const USER_1_ID = process.env.SEED_USER_1_ID!
const USER_2_ID = process.env.SEED_USER_2_ID!

async function seed() {
  try {
    console.log('⏳ Cleaning database...')

    // Delete in reverse order of dependencies
    await db.delete(exerciseLogs)
    await db.delete(workouts)
    await db.delete(templateExercises)
    await db.delete(workoutTemplates)
    await db.delete(exercises)

    console.log('✨ Database cleaned')
    console.log('🌱 Seeding database...')

    // 1. System exercises from our JSON file
    const systemExercises = await db
      .insert(exercises)
      .values(
        exerciseData.exercises.map(exercise => ({
          ...exercise,
          userId: SYSTEM_ID,
        }))
      )
      .returning()

    // 2. Custom exercises for each user
    const user1Exercises = await db
      .insert(exercises)
      .values([
        {
          name: 'My Custom Push-up',
          category: 'bodyweight',
          bodyPart: 'chest',
          instructions: 'Custom form push-up',
          isCustom: true,
          userId: USER_1_ID,
        },
      ])
      .returning()

    const user2Exercises = await db
      .insert(exercises)
      .values([
        {
          name: 'Special Pull-up',
          category: 'bodyweight',
          bodyPart: 'back',
          instructions: 'Wide grip pull-up',
          isCustom: true,
          userId: USER_2_ID,
        },
      ])
      .returning()

    // 3. Workout templates for each user
    const user1Template = await db
      .insert(workoutTemplates)
      .values({
        name: 'Push Day',
        description: 'Chest and triceps focus',
        userId: USER_1_ID,
      })
      .returning()

    const user2Template = await db
      .insert(workoutTemplates)
      .values({
        name: 'Pull Day',
        description: 'Back and biceps focus',
        userId: USER_2_ID,
      })
      .returning()

    // 4. Template exercises
    await db.insert(templateExercises).values([
      {
        templateId: user1Template[0].id,
        exerciseId: systemExercises[0].id, // Bench Press
        order: 1,
        sets: 3,
      },
      {
        templateId: user1Template[0].id,
        exerciseId: user1Exercises[0].id, // Custom Push-up
        order: 2,
        sets: 4,
      },
    ])

    await db.insert(templateExercises).values([
      {
        templateId: user2Template[0].id,
        exerciseId: systemExercises[2].id, // Deadlift
        order: 1,
        sets: 5,
      },
      {
        templateId: user2Template[0].id,
        exerciseId: user2Exercises[0].id, // Special Pull-up
        order: 2,
        sets: 3,
      },
    ])

    // 5. Completed workouts
    const user1Workout = await db
      .insert(workouts)
      .values({
        userId: USER_1_ID,
        templateId: user1Template[0].id,
        name: 'Morning Push Session',
        notes: 'Felt strong today',
        startedAt: new Date('2024-03-20T08:00:00'),
        completedAt: new Date('2024-03-20T09:15:00'),
      })
      .returning()

    const user2Workout = await db
      .insert(workouts)
      .values({
        userId: USER_2_ID,
        templateId: user2Template[0].id,
        name: 'Evening Pull Session',
        notes: 'New PR on deadlift',
        startedAt: new Date('2024-03-20T18:00:00'),
        completedAt: new Date('2024-03-20T19:30:00'),
      })
      .returning()

    // 6. Exercise logs
    await db.insert(exerciseLogs).values([
      {
        workoutId: user1Workout[0].id,
        exerciseId: systemExercises[0].id,
        order: 1,
        weight: 185,
        reps: 8,
        rpe: 8,
        notes: 'Felt good',
      },
      {
        workoutId: user1Workout[0].id,
        exerciseId: user1Exercises[0].id,
        order: 2,
        weight: 0,
        reps: 12,
        rpe: 7,
        notes: 'Easy set',
      },
    ])

    await db.insert(exerciseLogs).values([
      {
        workoutId: user2Workout[0].id,
        exerciseId: systemExercises[2].id,
        order: 1,
        weight: 315,
        reps: 5,
        rpe: 9,
        notes: 'New PR!',
      },
      {
        workoutId: user2Workout[0].id,
        exerciseId: user2Exercises[0].id,
        order: 2,
        weight: 0,
        reps: 10,
        rpe: 8,
        notes: 'Good form',
      },
    ])

    console.log('✅ Seeding completed')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  } finally {
    await seedClient.end()
  }
}

seed()
