// src/shared/utils/JwtProvider.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente de .env
dotenv.config();

// Garante que a variável exista (ou defina um fallback vazio)
const JWT_SECRET = process.env.JWT_SECRET || "";

export class JwtProvider {
  /**
   * Gera um token JWT a partir de um payload (por exemplo: { userId: "abc123" })
   * @param payload objeto com dados que serão codificados no token
   * @param expiresIn string de expiração (ex: "1d", "2h"). Padrão: "1d"
   * @returns string (token JWT)
   */
  static sign(payload: object, expiresIn = "1d"): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  }

  /**
   * Decodifica e valida um token JWT
   * @param token token gerado anteriormente com .sign()
   * @returns o payload original (jo, userId, etc.) ou lança se inválido/expirado
   */
  static verify<T = any>(token: string): T {
    return jwt.verify(token, JWT_SECRET) as T;
  }
}
