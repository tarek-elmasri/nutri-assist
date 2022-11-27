import { Request, Response } from 'express';
import Serve from '../../models/serve';

const index = async (req: Request, res: Response) => {
  try {
    const profileId = req.params.profileId;

    const serves = await Serve.findAll({ where: { profileId } });

    res.json(serves);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const profileId = req.params.profileId;
    const serveParams = req.body.serve;

    const serve = await Serve.create({ profileId, ...serveParams });
    res.status(201).json(serve);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const update = async () => {};

const destroy = async () => {};

export default {
  index,
  create,
  update,
  destroy
};
