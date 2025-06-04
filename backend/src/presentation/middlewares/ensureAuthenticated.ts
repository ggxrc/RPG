import { Request, Response, NextFunction } from "express";
import { JwtProvider } from "../../shared/utils/JwtProvider";
import { AppError } from "../../application/errors/AppError";

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token ausente", 401);
  }

  const [, token] = authHeader.split(" ");
  if (!token) {
    throw new AppError("Token inválido", 401);
  }

  try {
    const decoded = JwtProvider.verify(token) as DecodedToken;
    req.user = { id: decoded.userId }; // anexa userId ao req
    next();
  } catch {
    throw new AppError("Token inválido ou expirado", 401);
  }
}
