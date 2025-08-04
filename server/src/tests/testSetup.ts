import { beforeAll, afterAll, afterEach } from 'vitest'
import logger from '../utils/logger'
import connectTestDB from '../db/test_db'
import Note from '../models/Note'
import mongoose from 'mongoose'

beforeAll(async () => {
  //logger.info('process.env.NODE_ENV: ', String(process.env.NODE_ENV))
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
