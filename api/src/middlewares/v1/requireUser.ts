import { NextFunction, Request, Response } from 'express';
import { User } from '../../models';
import { jwtVerify } from '../../utils/jwtHelper';

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) throw new Error();

    const token = bearerToken.split('Bearer ')[1];

    const payload = jwtVerify(token);
    if (!payload) throw new Error();

    const user = await User.findOne({ where: { id: payload.userId } });
    if (!user) throw new Error();
    req.user = user;

    next();
  } catch (error) {
    res.status(401);
  }
};

export default requireUser;
