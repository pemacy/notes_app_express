import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@reactcoursenotesapp.1rkxnqc.mongodb.net/${process.env.MONGO_DB_DEV}?retryWrites=true&w=majority&appName=ReactCourseNotesApp`

const connectDevDB = async () => {
  try {
    console.log('Database', process.env.MONGO_DB_DEV, 'connection successful')
    mongoose.connect(url)
  } catch (e: unknown) {
    if (e instanceof Error) throw Error(`A MongoDB error occured: ${e.message}`)
  }
}

export default connectDevDB
