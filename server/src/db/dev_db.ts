import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.set('strictQuery', false)

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@reactcoursenotesapp.1rkxnqc.mongodb.net/${process.env.MONGO_DB_DEV}?retryWrites=true&w=majority&appName=ReactCourseNotesApp`

const connectDevDB = async () => {
  try {
    console.log('Database', process.env.MONGO_DB_DEV, 'connection successful')
    mongoose.connect(url)
  } catch (err) {
    console.log('A MongoDB connection error occured:', err)
    process.exit(1)
  }
}

export default connectDevDB
