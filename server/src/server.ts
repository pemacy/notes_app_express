import { app, PORT } from './app'
import connectDevDB from './db/dev_db'
import connectTestDB from './db/test_db'
import logger from '../src/utils/logger'

if (process.env.NODE_ENV === 'test') {
  connectTestDB()
} else if (process.env.NODE_ENV === 'development') {
  connectDevDB()
} else {
  logger.error('[Error] NODE_ENV not set correctly, NODE_ENV: ', String(process.env.NODE_ENV), 'server exited.')
  process.exit(1)
}

app.listen(PORT, () => {
  console.log('express server running on port', PORT)
})
