import z from "zod";

export const signupValidation = z.object({
    email:z.string(),
    password:z.string(),
    name:z.string(),
})

export type Signuptype = z.infer<typeof signupValidation>

export const signinValidation = z.object({
    email:z.string().email(),
    password:z.string().min(4),
})

export type Signintype = z.infer<typeof signinValidation>

export const createBlogInput = z.object({
    title:z.string(),
    content:z.string(),
})

export type CreateBlogInputtype = z.infer<typeof createBlogInput>

