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
): void {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError("Token ausente", 401);
    }

    const [, token] = authHeader.split(" ");
    if (!token) {
      throw new AppError("Token inválido", 401);
    }

    const decoded = JwtProvider.verify(token) as DecodedToken;
    req.user = { id: decoded.userId }; // anexa userId ao req
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError("Token inválido ou expirado", 401));
    }
  }
}
