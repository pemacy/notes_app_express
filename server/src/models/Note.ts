import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  id: String,
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete (returnedObject as any)._id
    delete (returnedObject as any).__v
  }
})

const Note = mongoose.model('Note', noteSchema)
export default Note
