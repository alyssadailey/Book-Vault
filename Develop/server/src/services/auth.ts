import type { Request, Response, NextFunction } from 'express';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import type { ExpressContext } from 'apollo-server-express'


dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}


// Middleware to authenticate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

// Apollo Server context version (for GraphQL)
export const authenticateTokenContext = async ({ req }: ExpressContextFunctionArgument) => {
  const token = req.headers.authorization?.split(' ')[1];
  const secret = process.env.JWT_SECRET_KEY || '';

  if (!token) return { user: null };

  try {
    const decodedUser = jwt.verify(token, secret);
    return { user: decodedUser };
  } catch (err) {
    console.error('Invalid token');
    return { user: null };
  }
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

// Apollo-compatible context function
export const getUserFromToken = ({ req }: { req: any }) => {
  let token = req.headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  if (!token) {
    return { user: null };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
    return { user: decoded };
  } catch (err) {
    console.warn('Invalid token:', err);
    return { user: null };
  }
};


