import mongoose from 'mongoose'
import logger from '../utils/logger'

mongoose.set('strictQuery', false)

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@reactcoursenotesapp.1rkxnqc.mongodb.net/${process.env.MONGO_DB_TEST}?retryWrites=true&w=majority&appName=ReactCourseNotesApp`

const connectTestDB = async () => {
  try {
    const conn = await mongoose.connect(url)
    console.log('Test database connected')
    return conn
  } catch (err) {
    console.log('MongoDB connection error', err)
    process.exit(1)
  }
}

export default connectTestDB
