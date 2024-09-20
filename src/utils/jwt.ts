import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

export const createToken = (userId: string): string => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '7d' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch (error) {
    return null;
  }
};
