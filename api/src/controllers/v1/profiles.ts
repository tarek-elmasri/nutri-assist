import { Request, Response } from 'express';
import { Profile, Serve } from '../../models';

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

const show = async (req: Request, res: Response) => {
  try {
    const clientId = req.params.clientId;
    const profileId = req.params.profileId;

    const profile = await Profile.findOne({
      where: { id: profileId, clientId }
    });
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ msg: 'not found' });
    }
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
  show,
  create,
  update,
  destroy
};
