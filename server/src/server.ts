import express from 'express'
import cors from 'cors'
import connectDevDB from './db/dev_db'

const app = express()
const PORT = process.env.PORT || 3001

connectDevDB()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log('express server running on port', PORT)
})
