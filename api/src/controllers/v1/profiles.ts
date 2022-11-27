import { Request, Response } from 'express';
import Profile from '../../models/profile';
import Serve from '../../models/serve';

const index = async (req: Request, res: Response) => {
  try {
    const clientId = req.params.clientId;

    const profiles = await Profile.findAll({
      where: { clientId },
      include: {
        model: Serve,
        as: 'serves'
      }
    });

    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const clientId = req.params.clientId;
    const profileParams = req.body.profile;

    const profile = await Profile.create({ clientId, ...profileParams });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const update = () => {};

const destroy = () => {};

export default {
  index,
  create,
  update,
  destroy
};
