import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { createBlog ,updateBlog } from "@dhruv98/commons";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
blogRouter.use("/*", async (c, next) => {
  //extract the user id
  const authHeader = c.req.header("auth") || "jshds";
  console.log(authHeader, c.env.JWT_SECRET);
  const user = await verify(authHeader, c.env.JWT_SECRET) ;
  if (user) {
    //@ts-ignore
    c.set("userId", user.id);
    return await next();
  } else {
    return c.json(
      {
        messaage: "You are not authorized",
      },
      403
    );
  }
});
blogRouter.post("/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = createBlog.safeParse(body)
  if(!success){
    c.status(411);
    return c.json({
      msg:"Invalid inputs"
    })
  }
  console.log(c.get("userId"));
  const blog = await prisma.blogs.create({
    data: {
      title: body.title,
      description: body.description,
      //@ts-ignore
      userId: c.get("userId"),
    },
  });
  return c.json({
    blog,
  });
});
blogRouter.put("/update/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = createBlog.safeParse(body)
  if(!success){
    c.status(411);
    return c.json({
      msg:"Invalid inputs"
    })
  }
  try {
    const blog = await prisma.blogs.update({
      where: {
        id: c.req.param('id'),
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    console.log(blog)
    return c.json({
      blog,
    },200);
  } catch (error) {
    console.log(error);
  }
});
blogRouter.get("/get/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
try {
  const body = await c.req.json();
  const id = await c.req.param('id')
  const blog = await prisma.blogs.findFirst({
    where: {
      id: id,
    },
  });
  return c.json(
    {
      blog,
    },
    200
  );

} catch (error) {
  console.log(error)
}
});

// pagination add
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    
    const allBlogs = await prisma.blogs.findMany();
    console.log(!!allBlogs)
    return c.json({
      allBlogs,
      "message":true
    },200);
  } catch (error) {
    console.log(error)
  }
});
