import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { exercises } from './schema'
import { config } from 'dotenv'

config({ path: '.env.local' })

const seedClient = postgres(process.env.DATABASE_URL!, { max: 1 })
const db = drizzle(seedClient, { schema })

async function seed() {
  try {
    console.log('⏳ Seeding database...')

    // Add default exercises
    await db.insert(exercises).values([
      {
        name: 'Bench Press',
        category: 'chest',
        instructions: 'Lie on bench, press weight up',
        isCustom: false,
        userId: '00000000-0000-0000-0000-000000000000', // System UUID
      },
      {
        name: 'Squat',
        category: 'legs',
        instructions: 'Stand with barbell on shoulders, squat down, stand up',
        isCustom: false,
        userId: '00000000-0000-0000-0000-000000000000',
      },
      {
        name: 'Deadlift',
        category: 'back',
        instructions: 'Grip bar, keep back straight, lift with legs and back',
        isCustom: false,
        userId: '00000000-0000-0000-0000-000000000000',
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
