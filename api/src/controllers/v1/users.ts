import { Request, Response } from 'express';
import { User } from '../../models';
import { jwtSign } from '../../utils/jwtHelper';

// register user
const create = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body.user);
    const payload = { user_id: user.id };
    const refreshToken = jwtSign(payload, '7d');
    const accessToken = jwtSign(payload, '2h');
    res.status(201).json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNo: user.phoneNo,
        email: user.email
      },
      tokens: {
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default {
  create
};
