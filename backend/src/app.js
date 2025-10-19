import express from 'express'
import { configDotenv } from 'dotenv'
import cookieParser from 'cookie-parser'

const app = express()
configDotenv()
app.use(express.json())
app.use(cookieParser)












export default app