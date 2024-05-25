import 'dotenv/config'
import path from 'path';
import cors from 'cors'
import express, { Errback, Request, Response } from 'express'

import router from '../routes/routes-upload'
import routerInvoice from '../routes/routes-invoice'
import routerUser from '../routes/routes-user'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)
app.use(routerInvoice)
app.use(routerUser)

//poderia expoertar o static para acessar de uma rota e criar um middleware para bloquear o acesso indevido, mas deixei exposto.
app.use(express.static(path.join(__dirname, '../../../arquivos')));


app.use((_: Request, res: Response) => {
  res.status(404).json({ message: 'Page Not Found' })
})

app.use((_: Errback, _req: Request, res: Response) => {
  return res.status(500).json({ message: 'Internal Error' })
})


export default app