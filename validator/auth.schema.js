const {z} = require("zod");

const registerSchema = z.object({
    name: z
        .string()
        .max(50, "Name too long")
        .regex(/^[a-zA-Z ]+$/, "Invalid name"),
    
    email: z
      .string()
      .email("Invalid email")
      .max(100),
    
    password: z
        .string()
        .min(8, "Password too short")
        .max(64, "Password too long")
        .regex(/[A-Z]/, "Must contain uppercase")
        .regex(/[a-z]/, "Must contain lowercase")
        .regex(/[0-9]/, "Must contain number")
        .regex(/[^a-zA-Z0-9]/, "Must contain special char"),
    rollNo: z
      .string()
      .max(20)
      .regex(/^[a-zA-Z0-9-]+$/, "Invalid roll number"),
})

const loginSchema = z
  .object({
    email: z
      .string()
      .email(),

    password: z
      .string()
      .min(8)
      .max(64),
  })
  .strict();

module.exports = {
  registerSchema,
  loginSchema,
};