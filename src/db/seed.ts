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
import templateData from './seed-data/templates.json'
import workoutData from './seed-data/workouts.json'

config({ path: '.env.local' })

const seedClient = postgres(process.env.DATABASE_URL!, { max: 1 })
const db = drizzle(seedClient, { schema })

const SYSTEM_ID = process.env.SYSTEM_USER_ID!
const USER_1_ID = process.env.SEED_USER_1_ID!
const USER_2_ID = process.env.SEED_USER_2_ID!

function getDateFromRelative(relativeDate: string): Date {
  const now = new Date()

  if (relativeDate.startsWith('-')) {
    const [days, time] = relativeDate.split(' ')
    const [hours, minutes] = time.split(':')

    const date = new Date(now)
    date.setDate(date.getDate() + parseInt(days))
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0)

    return date
  }

  return new Date(relativeDate)
}

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

    // 3. Workout templates for user 2
    const createdTemplates = await Promise.all(
      templateData.templates.map(template =>
        db
          .insert(workoutTemplates)
          .values({
            name: template.name,
            description: template.description,
            userId: USER_2_ID,
          })
          .returning()
      )
    )

    // 4. Template exercises
    for (let i = 0; i < templateData.templates.length; i++) {
      const template = templateData.templates[i]
      await db.insert(templateExercises).values(
        template.exercises.map(exercise => ({
          templateId: createdTemplates[i][0].id,
          exerciseId: systemExercises[exercise.exerciseIndex].id,
          order: exercise.order,
          sets: exercise.sets,
        }))
      )
    }

    // 5 & 6. Completed workouts and exercise logs
    for (const workout of workoutData.workouts) {
      const startedAt = getDateFromRelative(workout.startedAt)
      const completedAt = getDateFromRelative(workout.completedAt)

      const workoutRecord = await db
        .insert(workouts)
        .values({
          userId: USER_2_ID,
          templateId: createdTemplates[workout.templateIndex][0].id,
          name: workout.name,
          notes: workout.notes,
          startedAt,
          completedAt,
          status: 'completed',
        })
        .returning()

      for (const exercise of workout.exercises) {
        const exerciseId = systemExercises[exercise.exerciseIndex].id

        const exerciseLogValues = exercise.sets.map((set, index) => ({
          workoutId: workoutRecord[0].id,
          exerciseId,
          order: index + 1,
          weight: set.weight,
          reps: set.reps,
          rpe: set.rpe,
          notes: set.notes,
          setCount: exercise.sets.length,
          currentSetIndex: exercise.sets.length - 1, // Points to last set since completed
          isComplete: true, // All sets are complete in seed data
        }))

        await db.insert(exerciseLogs).values(exerciseLogValues)
      }
    }

    console.log('✅ Seeding completed')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  } finally {
    await seedClient.end()
  }
}

seed()
