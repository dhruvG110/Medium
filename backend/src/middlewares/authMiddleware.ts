import { Context, Next } from "hono";
import { decode, sign, verify, jwt } from 'hono/jwt'
// JWT Authentication Middleware
export const authMiddleware = async (c: Context, next: Next) => {
  
};
