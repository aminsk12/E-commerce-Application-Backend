import { UserRole } from "@prisma/client";

export type IAuthUser = {
  userId: string;
  email: string;
  role: UserRole;
  imageUrl: string;
} | null;