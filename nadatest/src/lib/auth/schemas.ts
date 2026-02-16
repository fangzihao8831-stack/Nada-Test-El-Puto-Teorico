import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Introduce un correo valido"),
  password: z
    .string()
    .min(1, "La contrasena es obligatoria")
    .min(6, "La contrasena debe tener al menos 6 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    nombre: z
      .string()
      .min(1, "El nombre es obligatorio")
      .max(50, "El nombre no puede superar los 50 caracteres"),
    email: z
      .string()
      .min(1, "El correo es obligatorio")
      .email("Introduce un correo valido"),
    password: z
      .string()
      .min(1, "La contrasena es obligatoria")
      .min(6, "La contrasena debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu contrasena"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contrasenas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
