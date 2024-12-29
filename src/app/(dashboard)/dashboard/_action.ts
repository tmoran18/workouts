'use server'

import { db } from '@/db'
import { desc, eq, and, sql, isNull, isNotNull, gte } from 'drizzle-orm'
import {
  workouts,
  exerciseLogs,
  exercises,
  workoutTemplates,
  templateExercises,
} from '@/db/schema'

export async function getRecentWorkouts(userId: string) {
  return await db
    .select()
    .from(workouts)
    .where(and(eq(workouts.userId, userId)))
    .orderBy(desc(workouts.startedAt))
    .limit(5)
}

export async function getUserTemplates(userId: string) {
  return await db.query.workoutTemplates.findMany({
    where: eq(workoutTemplates.userId, userId),
    with: {
      templateExercises: {
        with: {
          exercise: true,
        },
        orderBy: te => [te.order],
      },
      workouts: {
        // Get related workouts
        where: isNotNull(workouts.completedAt),
        orderBy: [desc(workouts.completedAt)],
        limit: 1,
      },
    },
    orderBy: wt => [desc(wt.createdAt)],
  })
}

export async function getWeeklyStats(userId: string) {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const stats = await db
    .select({
      totalWorkouts: sql<number>`count(distinct ${workouts.id})`,
      totalExercises: sql<number>`count(distinct ${exerciseLogs.exerciseId})`,
      totalSets: sql<number>`count(${exerciseLogs.id})`,
      totalReps: sql<number>`sum(${exerciseLogs.reps})`,
      totalWeight: sql<number>`sum(${exerciseLogs.weight})`,
    })
    .from(workouts)
    .leftJoin(exerciseLogs, eq(exerciseLogs.workoutId, workouts.id))
    .where(
      and(
        eq(workouts.userId, userId),
        // gte(workouts.startedAt, oneWeekAgo),
        isNotNull(workouts.completedAt)
      )
    )

  return stats[0]
}
