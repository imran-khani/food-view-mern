import express from 'express'
import { configDotenv } from 'dotenv'

const app = express()
configDotenv()
app.use(express.json())












export default app