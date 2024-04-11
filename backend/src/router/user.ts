import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signupValidation, signinValidation } from "suberna-common-medium";
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL:string;
        JWT_SECRET:string;
    }
}>();

userRouter.post("/signup",async (c) =>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
    const body = await c.req.json();
    const {success} = signupValidation.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        msg:"invalid input"
      })
    }
    const userData = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      }
    })
    const token = await sign(userData.id,c.env.JWT_SECRET);
    return c.json({
      msg:token
    });
  } catch(e) {
    c.status(411)
    return c.json({
      msg:"Failed to signup"
    })
  } 
})
userRouter.post("/signin", async (c) =>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
  const body = await c.req.json();
  const {success} = signinValidation.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({
      msg:"invalid input"
    })
  }
  const findUser = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password
    }
  })
  if(!findUser) {
    c.status(403)
    return c.json({
      msg:"Invalid credentials",
    })
  }
   const token = await sign(findUser.id, c.env.JWT_SECRET);
   return c.json({
    msg:token
   })
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "Failed to signin"
    })
  }
})