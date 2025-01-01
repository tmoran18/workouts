import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  boolean,
  pgEnum,
  index,
} from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'

// Define Enums
export const workoutStatusEnum = pgEnum('workout_status', [
  'in_progress',
  'completed',
])

// Exercise library
export const exercises = pgTable('exercises' as const, {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  body_part: text('body_part').notNull(),
  instructions: text('instructions'),
  is_custom: boolean('is_custom').default(false),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// Workout templates
export const workoutTemplates = pgTable('workout_templates' as const, {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// Template exercises
export const templateExercises = pgTable('template_exercises' as const, {
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

// Workouts
export const workouts = pgTable(
  'workouts' as const,
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    templateId: uuid('template_id').references(() => workoutTemplates.id),
    name: text('name').notNull(),
    notes: text('notes'),
    startedAt: timestamp('started_at').notNull(),
    completedAt: timestamp('completed_at'),
    status: workoutStatusEnum('status').notNull().default('in_progress'),
    // Removed currentExerciseId to prevent circular dependency
    lastUpdatedAt: timestamp('last_updated_at').notNull().defaultNow(),
  },
  table => [
    index('user_status_idx').on(table.userId, table.status),
    index('user_started_idx').on(table.userId, table.startedAt),
    index('last_updated_idx').on(table.lastUpdatedAt),
  ]
)

// Exercise logs
export const exerciseLogs = pgTable(
  'exercise_logs' as const,
  {
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
    isComplete: boolean('is_complete').notNull().default(false),
    setCount: integer('set_count').notNull(),
    currentSetIndex: integer('current_set_index').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow(),
  },
  table => [
    index('workout_order_idx').on(table.workoutId, table.order),
    index('workout_exercise_idx').on(table.workoutId, table.exerciseId),
    index('created_at_idx').on(table.createdAt),
  ]
)

// Relations
export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  template: one(workoutTemplates, {
    fields: [workouts.templateId],
    references: [workoutTemplates.id],
  }),
  exerciseLogs: many(exerciseLogs),
}))

export const workoutTemplatesRelations = relations(
  workoutTemplates,
  ({ many }) => ({
    templateExercises: many(templateExercises),
    workouts: many(workouts),
  })
)

export const templateExercisesRelations = relations(
  templateExercises,
  ({ one }) => ({
    template: one(workoutTemplates, {
      fields: [templateExercises.templateId],
      references: [workoutTemplates.id],
    }),
    exercise: one(exercises, {
      fields: [templateExercises.exerciseId],
      references: [exercises.id],
    }),
  })
)

export const exercisesRelations = relations(exercises, ({ many }) => ({
  templateExercises: many(templateExercises),
  exerciseLogs: many(exerciseLogs),
}))

export const exerciseLogsRelations = relations(exerciseLogs, ({ one }) => ({
  workout: one(workouts, {
    fields: [exerciseLogs.workoutId],
    references: [workouts.id],
  }),
  exercise: one(exercises, {
    fields: [exerciseLogs.exerciseId],
    references: [exercises.id],
  }),
}))
