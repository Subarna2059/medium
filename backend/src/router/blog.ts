import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { CreateBlogInputtype, createBlogInput } from "suberna-common-medium";
import { tuple } from "zod";
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL:string;
        JWT_SECRET:string;
    }, 
    Variables: {
        userId:string
    }
}>()

blogRouter.use("/*", async (c, next) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
    const requestHeader = await c.req.header("authorization")||(" ");
    const token = requestHeader.split(" ")[1];
    const tokenVerify = await verify(token, c.env.JWT_SECRET);
    if (!tokenVerify) {
      c.status(403);
      return c.json({
        msg:"Auth failed"
      })
    }
    c.set('userId', tokenVerify);
    await next()
  } catch(e) {
    c.status(411);
    return c.json({
      msg:"Failed to authinticate"
    })
  }
  })
  
  
  blogRouter.post("/", async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const body = await c.req.json();
        const {success} = createBlogInput.safeParse(body);
        if(!success) {
            c.status(411);
            return c.json({
                msg:"invalid input"
            })
        }
        const userId = Number(c.get("userId"));
        const insertPost = await prisma.post.create({
            data: {
            title:body.title,
            content:body.content,
            published:false,
            authorId:userId,
            }
        })
       if(insertPost) {
        c.status(200);
        return c.json({
            msg:"Post posted",
            data:insertPost,
        })
       }
    return c.json({
        msg:userId
    })
    } catch(e) {
        c.status(411);
        return c.text("failed");
    }


  })
  blogRouter.put("/:id", async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
   
    try {
        const body = await c.req.json();
        const {success} = createBlogInput.safeParse(body);
        if(!success) {
            c.status(411);
            return c.json({
                msg:"invalid input"
            })
        }
        const authorId = await prisma.post.findFirst({
            where: {
                id:Number(c.req.param("id")),
            }
        })
        if (Number(c.get("userId")) != authorId?.authorId) {
            return c.json({
                msg:"Sorry the post is not yours"
            })
        }
        const updateData = await prisma.post.update({
            where: {
                id: Number(c.req.param("id"))
            },
            data: {
                title:body.title,
                content:body.content,
            }
        }) 
        return c.json({
            msg:"Updated successfully"
        })
    } catch(e) {

    }
     
  })
  blogRouter.get("/bulk", async (c) =>{
    const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
       const data = await prisma.post.findMany({
        select: {
            title:true,
            content:true,
            id:true,
            author: {
                select: {
                    name:true,
                }
            }
        }
       });
       return c.json({
           posts:data
       })
    } catch (e) {
       return c.text("Failed")
    }
 }
)
  blogRouter.get("/:id", async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const data = await prisma.post.findFirst({
            where: {
                id:Number(c.req.param('id')),
            },
            select: {
                title:true,
                content:true,
                id:true,
                author: {
                    select: {
                        name:true,
                    }
                }
            }
        })
        return c.json({
            data:data
        })

    } catch(e) {
        return c.text("Failed")
    }
  })
 

