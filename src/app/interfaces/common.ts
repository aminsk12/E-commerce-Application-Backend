import { UserRole } from "@prisma/client";

export type IAuthUser = {
  id: string;
  email: string;
  role: UserRole;
} | null;