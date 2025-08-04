import express from 'express'
import cors from 'cors'
import noteRoutes from './routes/noteRoutes'
import dotenv from 'dotenv'

dotenv.config()

export const app = express()
export const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/notes', noteRoutes)

export default app
