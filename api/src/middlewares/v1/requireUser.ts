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

    const user = await User.findOne({ where: { id: payload.user_id } });
    if (!user) throw new Error();
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Unauthorized' });
  }
};

export default requireUser;
