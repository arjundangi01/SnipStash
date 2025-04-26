import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_URL: z.string().url(),
    SESSION_SECRET: z.string(),
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string(),
  },
  server: {},
  runtimeEnv: {
   
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
   
  },

  server: {
   
  },

 
  skipValidation: true,
});
