import z from 'zod'
export const signupInput = z.object({
    name :z.string().min(2),
    email:z.string().email(),
    password: z.string().min(5)
}) 
export const signInInput = z.object({
    email:z.string().email(),
    password: z.string().min(5)
}) 

export const createBlog = z.object({
    title:z.string().min(5).max(255),
    description:z.string().min(5).max(255),  
}) 
export const updateBlog = z.object({
    title:z.string().min(5).max(255),
    description:z.string().min(5).max(255), 
})
//type inference 
export type SignUpInput = z.infer<typeof signupInput>
export type SignInInput = z.infer<typeof signInInput>
export type CreateBlog = z.infer<typeof createBlog>
export type updateBlog = z.infer<typeof createBlog>