import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import bcrypt from 'bcryptjs'
import { signupInput ,signInInput} from '@dhruv98/commons';
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			mesaage:"Inputs not correct"
		});
	}
	try {
		const user = await prisma.user.create({
			data: {
                name:body.name,
				email: body.email,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET) ;
		return c.json({ jwt , user ,message:"Signed Up"});
	} catch(e) {
		c.status(403);
		console.log(e)
		return c.json({ error: "error while signing up" });
	}
})

userRouter.post('/signin',async(c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success} = signInInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			mesaage:"Inputs not correct"
		});
	}
	try {
		
    const user = await prisma.user.findFirst({
      where:{
        email:body.email,
        password:body.password
      },include:{
		blogs:true
	  }
    })
    if(!user){
      return c.text("Unauthorized",403)
    }
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt , user ,message:"Logged In"});
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while Logging up" });
	}
})