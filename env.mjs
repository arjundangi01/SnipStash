import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    SESSION_SECRET: z.string(),
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string(),
    GEMINI_API_KEY: z.string()

  },
  server:{
    SESSION_SECRET: z.string(),
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string(),
    GEMINI_API_KEY: z.string()
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    SESSION_SECRET: process.env.SESSION_SECRET,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,

  },
  
  skipValidation:true
});
