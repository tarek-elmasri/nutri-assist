import { NextFunction, Request, Response } from 'express';
import { Profile } from '../../models';

const profileExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientId = req.params.clientId;

    const profileId = req.params.profileId;

    const profile = await Profile.findOne({
      where: { id: profileId, clientId }
    });

    if (!profile) throw new Error();

    next();
  } catch (error) {
    res.status(404).json({ error });
  }
};

export default profileExists;
