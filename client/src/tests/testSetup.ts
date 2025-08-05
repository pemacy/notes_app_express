import { afterEach, beforeAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import axios, { AxiosError } from 'axios'
import logger from '../utils/logger'

const verifyTestServer = async () => {
  if (import.meta.env.VITE_NOTES_API === undefined) throw Error('VITE_NOTES_API env variable not set correctly or undefined')

  let response
  try {
    response = await axios.get(import.meta.env.VITE_NOTES_API + '/env')

    logger.info(String(response.status))
    if (response.data.env !== 'test') throw Error('Test server not running')
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error('Notes server is not set to test, stop server and run with "npm run server:test" - ' + err.message)
  }
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
