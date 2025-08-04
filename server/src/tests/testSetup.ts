import { beforeAll, afterAll, afterEach } from 'vitest'
import connectTestDB from '../db/test_db'
import Note from '../models/Note'
import mongoose from 'mongoose'

beforeAll(async () => {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV !== 'test') throw new Error('NODE_ENV must be set to test')
  await connectTestDB()
})

afterEach(async () => {
  await Note.deleteMany({})
  console.log('All Notes Deleted')
})

afterAll(async () => {
  await mongoose.connection.close()
})
