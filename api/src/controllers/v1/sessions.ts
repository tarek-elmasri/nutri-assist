import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import { jwtSign, jwtVerify } from '../../utils/jwtHelper';

// Login controller
const create = async (req: Request, res: Response) => {
  try {
    const { phoneNo, password } = req.body;

    const user = await User.findOne({ where: { phoneNo } });
    if (!user) {
      res.status(404);
      return;
    }

    const pepper = process.env.PEPPER;
    const authenticated = await bcrypt.compare(
      password + pepper,
      user.password
    );
    if (!authenticated) {
      res.status(404);
      return;
    }

    const accessToken = jwtSign({ user_id: user.id }, '2h');
    const refreshToken = jwtSign({ user_id: user.id }, '7d');

    // setting user id in session
    req.session.user_id = user.id;

    res.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNo: user.phoneNo,
        email: user.email
      },
      tokens: { refreshToken, accessToken }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// updating session and generate new access token
const update = async (req: Request, res: Response) => {
  try {
    let user: User | null;
    let user_id = req.session.user_id;

    // refresh by session if available
    if (user_id) {
      res.json({ accessToken: jwtSign({ user_id }, '2h') });
      return;
    }

    // refresh with refresh token if available
    const payload = jwtVerify(req.body.refreshToken);
    if (!payload) {
      res.status(404);
      return;
    }
    user_id = payload.user_id;
    res.json({ accessToken: jwtSign({ user_id }, '2h') });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// removing user_id from session
const destroy = (req: Request, res: Response) => {
  req.session.user_id = undefined;
  res.status(200);
};

export default {
  create,
  update,
  destroy
};
