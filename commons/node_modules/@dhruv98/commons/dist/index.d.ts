import z from 'zod';
export declare const signupInput: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const signInInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createBlog: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
}, {
    title: string;
    description: string;
}>;
export declare const updateBlog: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    id: string;
}, {
    title: string;
    description: string;
    id: string;
}>;
export type SignUpInput = z.infer<typeof signupInput>;
export type SignInInput = z.infer<typeof signInInput>;
export type CreateBlog = z.infer<typeof createBlog>;
export type updateBlog = z.infer<typeof createBlog>;
