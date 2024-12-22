import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  boolean,
} from 'drizzle-orm/pg-core'

// Exercise library
export const exercises = pgTable('exercises', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  instructions: text('instructions'),
  isCustom: boolean('is_custom').default(false),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// Workout templates
export const workoutTemplates = pgTable('workout_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// Template exercises
export const templateExercises = pgTable('template_exercises', {
  id: uuid('id').primaryKey().defaultRandom(),
  templateId: uuid('template_id')
    .references(() => workoutTemplates.id)
    .notNull(),
  exerciseId: uuid('exercise_id')
    .references(() => exercises.id)
    .notNull(),
  order: integer('order').notNull(),
  sets: integer('sets').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// Completed workouts
export const workouts = pgTable('workouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  templateId: uuid('template_id').references(() => workoutTemplates.id),
  name: text('name').notNull(),
  notes: text('notes'),
  startedAt: timestamp('started_at').notNull(),
  completedAt: timestamp('completed_at'),
})

// Exercise logs
export const exerciseLogs = pgTable('exercise_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  workoutId: uuid('workout_id')
    .references(() => workouts.id)
    .notNull(),
  exerciseId: uuid('exercise_id')
    .references(() => exercises.id)
    .notNull(),
  order: integer('order').notNull(),
  weight: integer('weight').notNull(),
  reps: integer('reps').notNull(),
  rpe: integer('rpe'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
})
