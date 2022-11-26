import jwt, { JwtPayload } from 'jsonwebtoken';

export const jwtSign = (data: JwtPayload, expiresIn: string | number = '2h') =>
  jwt.sign({ ...data, expiresIn }, process.env.JWT_SECRET!, {
    algorithm: 'HS256'
  });
