import jwt, { JwtPayload } from 'jsonwebtoken';

export const jwtSign = (data: JwtPayload, expiresIn: string | number = '2h') =>
  jwt.sign({ ...data, expiresIn }, process.env.JWT_SECRET!, {
    algorithm: 'HS256'
  });

export const jwtVerify = (token: string): JwtPayload | null => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!, {
      algorithms: ['HS256']
    });
    return payload as JwtPayload;
  } catch (error) {
    return null;
  }
};
