import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Router } from 'hono/router'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt'
import { userRouter } from './router/user'
import { blogRouter } from './router/blog'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>()
app.use('/*',cors())

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)


export default app
