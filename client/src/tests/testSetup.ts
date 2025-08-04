import { afterEach, beforeAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import axios from 'axios'
import logger from '../utils/logger'

const verifyTestServer = async () => {
  if (import.meta.env.VITE_NOTES_API === undefined) throw Error('VITE_NOTES_API env variable not set correctly or undefined')

  const response = await axios.get(import.meta.env.VITE_NOTES_API + '/env')

  logger.info(String(response.status))
  if (response.data.env !== 'test') throw Error('Test server not running')
}

beforeAll(async () => {
  await verifyTestServer()
})

beforeEach(async () => {
  await axios.delete(import.meta.env.VITE_NOTES_API)
})

afterEach(() => {
  cleanup()
  axios.delete(import.meta.env.VITE_NOTES_API)
})
