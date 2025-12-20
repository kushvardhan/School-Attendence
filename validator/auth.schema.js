const {z} = require("zod");

const registerSchema = z.object({
    name: z
        .string()
        .max(50, "Name too long")
        .regex(/^[a-zA-Z ]+$/, "Invalid name"),
    
    email: z
      .string()
      .email("Invalid email")
      .max(100)
      .transform((val) => val.toLowerCase().trim()),
    
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
      .min(3)
      .max(20)
      .transform(sanitizeString)
      .regex(/^[a-zA-Z0-9-]+$/, "Invalid roll number"),
})