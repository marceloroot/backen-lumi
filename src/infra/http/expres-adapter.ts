import 'dotenv/config'
import cors from 'cors'
import express, { Errback, Request, Response } from 'express'

import router from '../routes/RoutesEmployee'
import routerInvoice from '../routes/routes-invoice'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)
app.use(routerInvoice)

app.use((_: Request, res: Response) => {
  res.status(404).json({ message: 'Page Not Found' })
})

app.use((_: Errback, _req: Request, res: Response) => {
  return res.status(500).json({ message: 'Internal Error' })
})


export default app